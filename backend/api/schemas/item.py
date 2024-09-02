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
        fields='__all__'

    # id: UUID
    # name: str
    # plural_name: str
    # list_group: UUID
    # default_quantity: int
    # unit_of_measure: UUID
    # category: UUID
    # note: str
    # created_at: datetime
    # created_by_id: Optional[UUID]
    # updated_at: datetime
    # updated_by_id: Optional[UUID]
