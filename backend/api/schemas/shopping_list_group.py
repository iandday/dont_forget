# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import ShoppingListGroup


class ShoppingListGroupIn(ModelSchema):
    class Meta:
        model = ShoppingListGroup
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']


class ShoppingListGroupOut(ModelSchema):
    class Meta:
        model = ShoppingListGroup
        fields = '__all__'


class MinimizedShoppingListGroupOut(ModelSchema):
    class Meta:
        model = ShoppingListGroup
        fields = ['id', 'name']


class ShoppingListGroupAddItemOut(ModelSchema):
    class Meta:
        model = ShoppingListGroup
        fields = '__all__'


class ShoppingListGroupAddItemIn(Schema):
    item_id: UUID
