from api.models import Category
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)


def run():
    user = get_user_model().objects.all()[0]
    data = [
        'Bakery',
        'Deli',
        'Dairy',
        'Baking Supplies',
        'Canned Meats',
        'Snacks-Chips',
        'Snacks-Pretzels',
        'Snacks-Cookies',
        'Snacks-Crackers',
        'Snacks-Nuts',
        'Canned Vegetables',
        'Canned Soup',
        'Paper Products',
        'Juice',
        'Soda',
        'Pharmacy',
        'Beverages',
        'Frozen Treats/Ice Cream',
        'Frozen Dinners',
        'Frozen Vegetables',
        'Frozen Other',
        'Laundry Supplies',
        'Meat',
        'Seafood',
        'Produce',
        'Condiments',
        'Mexican',
        'Asian',
        'Italian/Pasta/Sauce',
        'Cereal',
        'Bread',
        'Alcohol',
        'Floral',
        'Pet Food',
        'Cleaning Products',
        'Hair Products - Shampoo/Conditioner',
        'Automotive',
        'Office Supplies',
        'Beauty Supplies',
        'Other Breakfast',
        'Coffee/Tea',
    ]

    for obj in data:
        o, created = Category.objects.get_or_create(name=obj, created_by=user)
        if created:
            logger.info(F"Added: {obj}")
