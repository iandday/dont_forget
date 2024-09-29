# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from api.models import Item
from ninja import ModelSchema, Schema


class ItemCreate(ModelSchema):
    class Meta:
        model = Item
        exclude = ['created_at', 'updated_at', 'photo', 'created_by', 'updated_by']


class ItemUpdate(ModelSchema):
    class Meta:
        model = Item
        exclude = ['created_at', 'updated_at', 'photo', 'created_by', 'updated_by']


class ItemOut(ModelSchema):
    class Meta:
        model = Item
        fields = '__all__'
