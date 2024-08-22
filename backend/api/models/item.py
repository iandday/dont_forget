import uuid

from api.models import Category, ShoppingListGroup, UnitOfMeasure
from api.utils.model_manager import ActiveManager
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords


class Item(models.Model):

    class Meta:
        verbose_name = 'Item'
        constraints = [
            models.UniqueConstraint(fields=['name', 'list_group'], name="item-list-group-name")
        ]

    def __str__(self):
        return self.name

    objects = ActiveManager()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(name="name", unique=True, blank=False, null=False)
    plural_name = models.CharField(name="plural_name", unique=False, blank=False, null=False)  
    list_group = models.ForeignKey(ShoppingListGroup, on_delete=models.CASCADE)
    photo = models.ImageField(blank=True, upload_to="images/", null=True)
    default_quantity = models.IntegerField(name="default_quantity", verbose_name='Default Quantity', default=1)
    unit_of_measure = models.ForeignKey(UnitOfMeasure, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    note = models.TextField(name="notes", null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='item_created_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='item_updated_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords()
