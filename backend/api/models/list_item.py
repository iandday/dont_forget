import uuid

from api.models import UnitOfMeasure, Item, ShoppingListGroup
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords


class ListItem(models.Model):

    class Meta:
        verbose_name = 'List Item'
        constraints = [
            models.UniqueConstraint(fields=['shopping_list_group', 'item'], name="item-shopping-list")
        ]

    def __str__(self):
        return str(self.item)

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shopping_list_group = models.ForeignKey(ShoppingListGroup, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    active = models.BooleanField(verbose_name='Active')
    completed = models.BooleanField(verbose_name='Completed')

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='li_created_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='li_updated_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    history = HistoricalRecords()
