import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Creates an admin user non-interactively if it doesn't exist"

    def handle(self, *args, **options):
        User = get_user_model()

        options['email'] = os.environ['DJANGO_SUPERUSER_EMAIL']
        options['password'] = os.environ['DJANGO_SUPERUSER_PASSWORD']

        if not User.objects.filter(email=options['email']).exists():
            User.objects.create_superuser(email=options['email'], password=options['password'])