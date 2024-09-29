# schemas.py
from typing import Optional
from api.models import ListItem
from ninja import ModelSchema, Schema


class ListItemIn(ModelSchema):
    class Meta:
        model = ListItem
        exclude = ['created_at', 'updated_at', 'created_by', 'updated_by', 'active', 'completed', 'id']


class ListItemUpdate(Schema):
    quantity: Optional[int] = None
    active: Optional[bool] = None
    completed: Optional[bool] = None


class ListItemOut(ModelSchema):
    class Meta:
        model = ListItem
        fields = '__all__'
