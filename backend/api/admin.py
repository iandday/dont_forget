from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from api.models import UnitOfMeasure, User
# Register your models here.

@admin.register(User)
class CustomUserClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    pass

@admin.register(UnitOfMeasure)
class UnitOfMeasureClass(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display=['name', 'plural_name', 'created_at', 'updated_at']