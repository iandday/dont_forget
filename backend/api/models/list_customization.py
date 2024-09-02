import uuid

from api.models import Category, UnitOfMeasure, Item, ShoppingList
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords


class ListCustomization(models.Model):

    class Meta:
        verbose_name = 'List Customization'
        constraints = [
            models.UniqueConstraint(fields=['shopping_list', 'item'], name="item--shopping-list")
        ]

    def __str__(self):
        return str(self.item)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    stocked = models.BooleanField(verbose_name='Stocked Here')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    default_quantity = models.IntegerField(name="Default Quantity", default=1)
    default_unit_of_measure = models.ForeignKey(UnitOfMeasure, on_delete=models.CASCADE)
    purchase_count = models.IntegerField(name="Purchase Count", default=0)
    note = models.TextField(name="notes", null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='lc_created_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='lc_updated_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    history = HistoricalRecords()
