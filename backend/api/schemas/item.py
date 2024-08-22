# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from api.models import Item
from ninja import ModelSchema, Schema


class ItemIn(ModelSchema):
    class Meta:
        model = Item
        exclude = ['created_at', 'updated_at']


class ItemOut(Schema):
    id: UUID
    name: str
    plural_name: str
    list_group: UUID
    default_quantity: int
    unit_of_measure: UUID
    category: UUID
    note: str
    created_at: datetime
    created_by_id: Optional[UUID]
    updated_at: datetime
    updated_by_id: Optional[UUID]
    is_active: bool
    is_deleted: bool
    deleted_at: Optional[datetime]
