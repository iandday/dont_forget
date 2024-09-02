import uuid
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords
from api.models import ShoppingListGroup


class ShoppingList(models.Model):

    class Meta:
        verbose_name = 'Shopping List'
        constraints = [
            models.UniqueConstraint(fields=['name'], name="shopping-list-name")
        ]

    def __str__(self):
        return self.name

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(name="name", unique=True, blank=False, null=False)
    list_group = models.ForeignKey(ShoppingListGroup, on_delete=models.CASCADE)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='sl_created_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='sl_updated_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    history = HistoricalRecords()
