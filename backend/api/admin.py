from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from api.models import UnitOfMeasure, User, Category, Item, ListCustomization, ListItem, ShoppingListGroup, ShoppingList


@admin.register(User)
class CustomUserClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(UnitOfMeasure)
class UnitOfMeasureClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ['name', 'plural_name', 'created_at', 'updated_at']
    


@admin.register(Category)
class CategoryClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(Item)
class ItemClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(ListCustomization)
class ListCustomizationClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(ListItem)
class ListItemClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(ShoppingListGroup)
class ShoppingListGroupClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass


@admin.register(ShoppingList)
class ShoppingListClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass
