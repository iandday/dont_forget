# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import Category


class CategoryIn(ModelSchema):
    class Meta:
        model = Category
        exclude = ['created_at', 'updated_at']


class CategoryOut(Schema):
    id: UUID
    name: str
    created_at: datetime
    created_by_id: Optional[UUID]
    updated_at: datetime
    updated_by_id: Optional[UUID]
    is_active: bool
    is_deleted: bool
    deleted_at: Optional[datetime]
