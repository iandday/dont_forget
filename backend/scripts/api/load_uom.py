from api.models import UnitOfMeasure
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger("api.scripts.load_uom")


def run():
    user = get_user_model().objects.all()[0]
    data = [
        {"name": "Unit", "plural_name": "Units"},
        {"name": "Bunch", "plural_name": "Bunches"},
        {"name": "Ounce", "plural_name": "Ounces"},
        {"name": "Fluid Ounce", "plural_name": "Fluid Ounces"},
        {"name": "Pound", "plural_name": "Pounds"},
        {"name": "Gallon", "plural_name": "Gallons"},
        {"name": "Half Gallon", "plural_name": "Half Gallons"},
        {"name": "Quart", "plural_name": "Quarts"},
        {"name": "Liter", "plural_name": "Liters"},
        {"name": "Milliliter", "plural_name": "Milliliters"},
        {"name": "Kilogram", "plural_name": "Kilograms"},
        {"name": "Gram", "plural_name": "Grams"},
        {"name": "Box", "plural_name": "Boxes"},
        {"name": "Bag", "plural_name": "Bags"},
        {"name": "Bottle", "plural_name": "Bottles"},
        {"name": "Case", "plural_name": "Cases"},
        {"name": "Can", "plural_name": "Cans"},
        {"name": "Cup", "plural_name": "Cups"},
        {"name": "Carton", "plural_name": "Cartons"},
        {"name": "Container", "plural_name": "Containers"},
        {"name": "Dozen", "plural_name": "Dozen"},
        {"name": "Jar", "plural_name": "Jars"},
        {"name": "Loaf", "plural_name": "Loaves"},
        {"name": "Slice", "plural_name": "Slices"},
        {"name": "Stick", "plural_name": "Sticks"},
        {"name": "Piece", "plural_name": "Pieces"},
        {"name": "Package", "plural_name": "Packages"},
        {"name": "Pint", "plural_name": "Pints"},
        {"name": "Roll", "plural_name": "Rolls"},
        {"name": "Clove", "plural_name": "Cloves"},
        {"name": "Tablespoon","plural_name": "Tablespoons"},
        {"name": "Teaspoon","plural_name":"Teaspoons"}
    ]

    for obj in data:
        o, created = UnitOfMeasure.objects.get_or_create(name=obj['name'], plural_name=obj['plural_name'], created_by=user)
        if created:
            logger.info(F"Added: {obj['name']}")
