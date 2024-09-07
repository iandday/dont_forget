# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import UnitOfMeasure


class UnitOfMeasureIn(ModelSchema):
    class Meta:
        model = UnitOfMeasure
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']



class UnitOfMeasureOut(ModelSchema):
    class Meta:
        model = UnitOfMeasure
        fields='__all__'
