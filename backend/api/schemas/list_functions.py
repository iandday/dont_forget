from uuid import UUID

from ninja import Schema
from typing import List
from api.schemas import (
    ShoppingListOutMinimized,
    MinimizedCategorypOut,
    MinimizedShoppingListGroupOut,
)


class ListFunctionsAddIn(Schema):
    item_id: UUID
    quantity: int


# Start combined shopping list out
class ItemOutMinimized(Schema):

    id: UUID
    name: str
    plural_name: str
    unit_of_measure: str


class ListItemOutwithDetails(Schema):
    id: UUID
    active: bool
    completed: bool
    quantity: int
    item: ItemOutMinimized


class CategoryDetails(Schema):
    category: MinimizedCategorypOut
    items: List[ListItemOutwithDetails]


class ListDetails(Schema):
    shopping_list: ShoppingListOutMinimized
    categories: List[CategoryDetails]


class ShoppingListGroupDetails(Schema):
    shopping_list_group: MinimizedShoppingListGroupOut
    lists: List[ListDetails]


class ListFunctionsAddOut(Schema):
    lists: List[ShoppingListGroupDetails]
