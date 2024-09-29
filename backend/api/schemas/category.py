# schemas.py
from datetime import datetime
from typing import Optional
from uuid import UUID

from ninja import ModelSchema, Schema


from api.models import Category


class CategoryIn(ModelSchema):
    class Meta:
        model = Category
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by']


class CategoryOut(ModelSchema):
    class Meta:
        model = Category
        fields = '__all__'


class MinimizedCategorypOut(ModelSchema):
    class Meta:
        model = Category
        fields = ['id', 'name']
