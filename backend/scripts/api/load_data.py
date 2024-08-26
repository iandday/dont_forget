from api.models import UnitOfMeasure, Category, ShoppingListGroup, ShoppingList
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger("api.scripts.load_uom")


def run():
    user = get_user_model().objects.all()[0]

    uom_data = [
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
        {"name": "Tablespoon", "plural_name": "Tablespoons"},
        {"name": "Teaspoon", "plural_name": "Teaspoons"},
    ]

    category_data = [
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

    shopping_list_group_data = [
        'Grocery',
        'Home Improvement',
    ]

    shopping_list_data = [
        ('Kroger', 'Grocery'),
        ('Costco', 'Grocery'),
        ('Home Depot', 'Home Improvement'),
        ('Lowes', 'Home Improvement'),
    ]

    item_data = {'Grocery': {'': []}, 'Grocery': {'': []}}
    for obj in uom_data:
        o, created = UnitOfMeasure.objects.get_or_create(name=obj['name'], plural_name=obj['plural_name'], created_by=user)
        if created:
            logger.info(F"Added: {obj['name']}")

    for obj in category_data:
        o, created = Category.objects.get_or_create(name=obj, created_by=user)
        if created:
            logger.info(F"Added: {obj}")

    for obj in shopping_list_group_data:
        o, created = ShoppingListGroup.objects.get_or_create(name=obj, created_by=user)
        if created:
            logger.info(F"Added: {obj}")

    for obj in shopping_list_data:
        slg = ShoppingListGroup.objects.get(name=obj[1])
        o, created = ShoppingList.objects.get_or_create(name=obj[0], list_group=slg, created_by=user)
        if created:
            logger.info(F"Added: {obj[0]}")
