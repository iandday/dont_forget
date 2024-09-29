# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import ShoppingList


class ShoppingListIn(ModelSchema):
    class Meta:
        model = ShoppingList
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']


class ShoppingListOut(ModelSchema):
    class Meta:
        model = ShoppingList
        fields = '__all__'


class ShoppingListOutMinimized(ModelSchema):
    class Meta:
        model = ShoppingList
        fields = ['id', 'name']
