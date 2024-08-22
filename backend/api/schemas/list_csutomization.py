# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from api.models import ListCustomization
from ninja import ModelSchema, Schema


class ListCustomizationIn(ModelSchema):
    class Meta:
        model = ListCustomization
        exclude = ['created_at', 'updated_at']


class ListCustomizationOut(Schema):
    id: UUID
    shopping_list: UUID
    item: UUID
    stocked: bool
    category: UUID
    default_quantity: int
    default_unit_of_measure: UUID
    purchase_count: int
    note: str
    created_at: datetime
    created_by_id: Optional[UUID]
    updated_at: datetime
    updated_by_id: Optional[UUID]
    is_active: bool
    is_deleted: bool
    deleted_at: Optional[datetime]
