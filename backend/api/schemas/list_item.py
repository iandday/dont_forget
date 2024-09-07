# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from api.models import ListCustomization
from ninja import ModelSchema, Schema


class ListItemIn(ModelSchema):
    class Meta:
        model = ListCustomization
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']


class ListItemOut(ModelSchema):
    class Meta:
        model = ListCustomization
        fields = '__all__'

