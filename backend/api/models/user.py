import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from simple_history.models import HistoricalRecords
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **kwargs):
        if not email or not password:
            raise ValueError("User must have a username and password")

        user = self.model(email=CustomUserManager.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email, password, **kwargs):
        user = self._create_user(email, password, **kwargs)

        user.is_admin = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    email = models.EmailField(null=False, unique=True)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(editable=False, default=timezone.now)
    updated_on = models.DateTimeField(null=True)
    is_staff = models.BooleanField(default=False)

    # Add custom fields here
    api_token = models.UUIDField(default=uuid.uuid4, editable=False)
    token_created_date = models.DateTimeField(default=timezone.now)

    history = HistoricalRecords()

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_on = timezone.now
        self.modified_on = timezone.now
        return super(User, self).save(*args, **kwargs)
    
    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    def api_token_reset(self):
        self.api_token = models.UUIDField(default=uuid.uuid4, editable=False)

    class Meta:
        ordering = ("created_on",)
        db_table = "users"

    def __unicode__(self):
        return self.get_full_name()