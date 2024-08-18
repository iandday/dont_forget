import uuid
from django.conf import settings
from django.db import models
from simple_history.models import HistoricalRecords

from api.utils.model_manager import ActiveManager
from api.models import Category


class ShoppingListGroup(models.Model):

    class Meta:
        verbose_name = 'Shopping List Group'
        constraints = [
            models.UniqueConstraint(fields=['name'], name="shopping-list-group-name")
        ]

    def __str__(self):
        return self.name

    objects = ActiveManager()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(name="name", unique=True, blank=False, null=False)
    categories = models.ManyToManyField(Category)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='slg_created_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='slg_updated_by',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    history = HistoricalRecords()
