# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import ShoppingList


class ShoppingListIn(ModelSchema):
    class Meta:
        model = ShoppingList
        exclude = ['created_at', 'updated_at']


class ShoppingListOut(Schema):
    id: UUID
    name: str
    list_group: UUID
    created_at: datetime
    created_by_id: Optional[UUID]
    updated_at: datetime
    updated_by_id: Optional[UUID]
    is_active: bool
    is_deleted: bool
    deleted_at: Optional[datetime]
