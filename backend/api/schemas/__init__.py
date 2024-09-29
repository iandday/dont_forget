from ninja import Schema
from .unit_of_measure import UnitOfMeasureIn, UnitOfMeasureOut
from .category import CategoryIn, CategoryOut, MinimizedCategorypOut
from .user import UserIn, UserOut
from .shopping_list_group import (
    ShoppingListGroupIn,
    ShoppingListGroupOut,
    ShoppingListGroupAddItemOut,
    MinimizedShoppingListGroupOut,
    ShoppingListGroupAddItemIn,
)
from .shopping_list import ShoppingListIn, ShoppingListOut, ShoppingListOutMinimized
from .item import ItemCreate, ItemUpdate, ItemOut
from .list_customization import ListCustomizationIn, ListCustomizationOut
from .list_item import ListItemIn, ListItemOut, ListItemUpdate
from .list_functions import ListFunctionsAddIn, ListFunctionsAddOut


class Error(Schema):
    message: str
