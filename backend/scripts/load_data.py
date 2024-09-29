import random
from api.models import UnitOfMeasure, Category, ShoppingListGroup, ShoppingList, Item, ListItem, ListCustomization
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
        {"name": "Head", "plural_name": "Heads"},
    ]

    shopping_list_group_data = [
        {
            'name': 'Grocery',
            'categories': [
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
            ],
        },
        {'name': 'Home Improvement', 'categories': ['Tools', 'Hardware', 'Plumbing']},
    ]

    shopping_list_data = [
        ('Kroger', 'Grocery'),
        ('Costco', 'Grocery'),
        ('Home Depot', 'Home Improvement'),
        ('Lowes', 'Home Improvement'),
    ]

    # fmt: off
    item_data = {
        'Grocery': {
            'Produce': [
                {'name': 'Banana', 'plural_name': 'Bananas', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Blueberry', 'plural_name': 'Blueberries', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Blackberry', 'plural_name': 'Blackberries', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Strawberry', 'plural_name': 'Strawberries', 'default_quantity': 1, 'unit_of_measure': 'Quart'},
                {'name': 'Raspberry', 'plural_name': 'Raspberries', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Apple', 'plural_name': 'Apples', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Red Pepper', 'plural_name': 'Red Peppers', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Green Pepper', 'plural_name': 'Green Peppers', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Orange Pepper','plural_name': 'Orange Peppers','default_quantity': 1,'unit_of_measure': 'Piece'},
                {'name': 'Potatoes', 'plural_name': 'Potatoes', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Sweet Potatoe','plural_name': 'Sweet Potatoes', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Baby Spinach', 'plural_name': 'Baby Spinach', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Iceberg Lettuce','plural_name': 'Iceberg Lettuce','default_quantity': 1,'unit_of_measure': 'Head'},
                {'name': 'Mixed Greens Lettuce', 'plural_name': 'Mixed Greens Lettuce', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Red Seedless Grape', 'plural_name': 'Red Seedless Grapes', 'default_quantity': 1,'unit_of_measure': 'Pound'},
                {'name': 'Green Seedless Grape', 'plural_name': 'Green Seedless Grapes', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Avocado', 'plural_name': 'Avocados', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Mandarin', 'plural_name': 'Mandarins', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Tangerine', 'plural_name': 'Tangerines', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Orange', 'plural_name': 'Oranges', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Lemon', 'plural_name': 'Lemons', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Lime', 'plural_name': 'Limes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Canteloupe', 'plural_name': 'Canteloupes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Honeydew Melon', 'plural_name': 'Honeydew Melons', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Watermelon', 'plural_name': 'Watermelons', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Seedless Watermelon', 'plural_name': 'Seedless Watermelons', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Cherry', 'plural_name': 'Cherries', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Pineapple', 'plural_name': 'Pineapples', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Mango', 'plural_name': 'Mangos', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Kiwi Fruit', 'plural_name': 'Kiwi Fruits', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Pear', 'plural_name': 'Pears', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Peach', 'plural_name': 'Peaches', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Plum', 'plural_name': 'Plums', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Onion', 'plural_name': 'Onions', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Celery', 'plural_name': 'Celery', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Baby Carrot', 'plural_name': 'Baby Carrots', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Tomatoe', 'plural_name': 'Tomatoes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Grape Tomatoe','plural_name': 'Grape Tomatoes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Cucumber', 'plural_name': 'Cucumbers', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Carrot', 'plural_name': 'Carrots', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Broccoli', 'plural_name': 'Broccoli', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'White Mushroom', 'plural_name': 'White Mushrooms', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Portabello Mushroom', 'plural_name': 'Portabello Mushrooms', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Asparagus', 'plural_name': 'Asparagus', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Garlic', 'plural_name': 'Garlic', 'default_quantity': 1, 'unit_of_measure': 'Head'},
                {'name': 'Cilantro', 'plural_name': 'Cilantro', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Corn', 'plural_name': 'Corn', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Cauliflower', 'plural_name': 'Cauliflower', 'default_quantity': 1, 'unit_of_measure': 'Head'},
                {'name': 'Jalapeno Pepper', 'plural_name': 'Jalapeno Peppers','default_quantity': 1,'unit_of_measure': 'Piece'},
                {'name': 'Brussel Sprouts', 'plural_name': 'Brussel Sprouts', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Parsley', 'plural_name': 'Parsley', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Ginger', 'plural_name': 'Ginger', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Green Bean', 'plural_name': 'Green Beans', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Squash', 'plural_name': 'Squash', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Zucchini', 'plural_name': 'Zucchini', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Kale', 'plural_name': 'Kale', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Basil', 'plural_name': 'Basil', 'default_quantity': 1, 'unit_of_measure': 'Bunch'},
                {'name': 'Radish', 'plural_name': 'Radishes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Cabbage', 'plural_name': 'Cabbages', 'default_quantity': 1, 'unit_of_measure': 'Head'},
                {'name': 'Eggplant', 'plural_name': 'Eggplants', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Spinach', 'plural_name': 'Spinach', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Beet', 'plural_name': 'Beets', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
                {'name': 'Romaine Lettuce', 'plural_name': 'Romaine Lettuce', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Cole Slaw', 'plural_name': 'Cole Slaw', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Shredded Lettuce', 'plural_name': 'Shredded Lettuce', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
            ],
            'Deli': [
                {'name': 'Salami', 'plural_name': 'Salami', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Pepperoni', 'plural_name': 'Pepperoni', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Deli Ham', 'plural_name': 'Deli Ham', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Sliced Swiss Cheese', 'plural_name': 'Sliced Swiss Cheese', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Bologna', 'plural_name': 'Bologna', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Sliced Turkey', 'plural_name': 'Sliced Turkey', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Sliced Provolone', 'plural_name': 'Sliced Provolone', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Rotisserie Chicken', 'plural_name': 'Rotisserie Chicken', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
            ],
            'Dairy': [
                {'name': 'Whole Milk', 'plural_name': 'Whole Milk', 'default_quantity': 1, 'unit_of_measure': 'Gallon'},
                {'name': '1% Milk', 'plural_name': '1% Milk', 'default_quantity': 1, 'unit_of_measure': 'Gallon'},
                {'name': '2% Milk', 'plural_name': '2% Milk', 'default_quantity': 1, 'unit_of_measure': 'Gallon'},
                {'name': 'Skim Milk', 'plural_name': 'Skim Milk', 'default_quantity': 1, 'unit_of_measure': 'Gallon'},
                {'name': 'Butter', 'plural_name': 'Butter', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Eggs', 'plural_name': 'Eggs', 'default_quantity': 1, 'unit_of_measure': 'Carton'},
                {'name': 'Sour Cream', 'plural_name': 'Sour Cream', 'default_quantity': 1, 'unit_of_measure': 'Pint'},
                {'name': 'Cottage Cheese', 'plural_name': 'Cottage Cheese', 'default_quantity': 1, 'unit_of_measure': 'Quart'},
                {'name': 'Whipped Cream', 'plural_name': 'Whipped Cream', 'default_quantity': 1, 'unit_of_measure': 'Can'},
            ],
            'Bakery': [
                {'name': 'French Bread', 'plural_name': 'French Bread', 'default_quantity': 1, 'unit_of_measure': 'Loaf'},
                {'name': 'Italian Bread', 'plural_name': 'Italian Bread', 'default_quantity': 1, 'unit_of_measure': 'Loaf'},
            ],
            'Bread': [
                {'name': 'White Bread', 'plural_name': 'White Bread', 'default_quantity': 1, 'unit_of_measure': 'Loaf'},
                {'name': 'Wheat Bread', 'plural_name': 'Wheat Bread', 'default_quantity': 1, 'unit_of_measure': 'Loaf'},
                {'name': 'Cinnamon Raisin Bread', 'plural_name': 'Cinnamon Raisin Bread', 'default_quantity': 1, 'unit_of_measure': 'Loaf'},
                {'name': 'English Muffins Plain', 'plural_name': 'English Muffins Plain', 'default_quantity': 1, 'unit_of_measure': 'Package'},
                {'name': 'English Muffins Cinnamon Raisin', 'plural_name': 'English Muffins Cinnamon Raisin', 'default_quantity': 1, 'unit_of_measure': 'Package'},
            ],
            'Meat': [
                {'name': 'Ground Beef', 'plural_name': 'Ground Beef', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Ground Turkey', 'plural_name': 'Ground Turkey', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Ground Chicken', 'plural_name': 'Ground Chicken', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Pork Chop', 'plural_name': 'Pork Chops', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Filet Mignon', 'plural_name': 'Filet Mignon', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Strip Steak', 'plural_name': 'Strip Steak', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Chicken Breasts', 'plural_name': 'Chicken Breasts', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Chicken Drumsticks', 'plural_name': 'Chicken Drumsticks', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Italian Sausage', 'plural_name': 'Italian Sausage', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
            ],
            'Seafood': [
                {'name': 'Salmon', 'plural_name': 'Salmon', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
                {'name': 'Fresh Shrimp', 'plural_name': 'Fresh Shrimp', 'default_quantity': 1, 'unit_of_measure': 'Pound'},
            ],
            'Asian': [
                {'name': 'Soy Sauce', 'plural_name': 'Soy Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Chili Crisp', 'plural_name': 'Chili Crisp', 'default_quantity': 1, 'unit_of_measure': 'Jar'}
            ],
            'Mexican': [
                {'name': 'Taco Shell', 'plural_name': 'Taco Shells', 'default_quantity': 1, 'unit_of_measure': 'Package'},
                {'name': 'Salsa', 'plural_name': 'Salsa', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Taco Seasoning', 'plural_name': 'Taco Seasoning', 'default_quantity': 1, 'unit_of_measure': 'Package'},
                {'name': 'Tortillas', 'plural_name': 'Tortillas', 'default_quantity': 1, 'unit_of_measure': 'Package'},
            ],
            'Frozen Vegetables': [
                {'name': 'Frozen Spinach', 'plural_name': 'Frozen Spinach', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Broccoli', 'plural_name': 'Frozen Broccoli', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Corn', 'plural_name': 'Frozen Corn', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Green Beans', 'plural_name': 'Frozen Green Beans', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Peas', 'plural_name': 'Frozen Peas', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Strawberries', 'plural_name': 'Frozen Strawberries', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Blueberries', 'plural_name': 'Frozen Blueberries', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen Tater Tots', 'plural_name': 'Frozen Tater Tots', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Frozen French Fries', 'plural_name': 'Frozen French Fries', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
            ],
            'Baking Supplies': [
                {'name': 'Vegetable Oil', 'plural_name': 'Vegetable Oil', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Olive Oil', 'plural_name': 'Olive Oil', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Semi-Sweet Chocolate Chips', 'plural_name': 'Semi-Sweet Chocolate Chips', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Dark Chocolate Chips', 'plural_name': 'Dark Chocolate Chips', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Marshmallows', 'plural_name': 'Marshmallows', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Cornbread Mix', 'plural_name': 'Cornbread Mix', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Flour', 'plural_name': 'Flour', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Chia Seeds', 'plural_name': 'Chia Seeds', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Flaxseed', 'plural_name': 'Flaxseed', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Baking Soda', 'plural_name': 'Baking Soda', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Baking Powder', 'plural_name': 'Baking Powder', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Wheat Flour', 'plural_name': 'Wheat Flour', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Sugar', 'plural_name': 'Sugar', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Confectioners Sugar', 'plural_name': 'Confectioners Sugar', 'default_quantity': 1, 'unit_of_measure': 'Bag'},
                {'name': 'Cinnamon', 'plural_name': 'Cinnamon', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Salt', 'plural_name': 'Salt', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Ground Pepper', 'plural_name': 'Ground Pepper', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Chili Powder', 'plural_name': 'Chili Powder', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Basil (dried)', 'plural_name': 'Basil (dried)', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Oregano', 'plural_name': 'Oregano', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Nutmeg', 'plural_name': 'Nutmeg', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Ground Ginger', 'plural_name': 'Ground Ginger', 'default_quantity': 1, 'unit_of_measure': 'Container'},
            ],
            'Italian/Pasta/Sauce': [
                {'name': 'Pasta Sauce', 'plural_name': 'Pasta Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Pizza Sauce', 'plural_name': 'Pizza Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Spaghetti', 'plural_name': 'Spaghetti', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Pasta - Shells', 'plural_name': 'Pasta - Shells', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Pasta - Bowtie', 'plural_name': 'Pasta - Bowtie', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Pasta - Rotini', 'plural_name': 'Pasta - Rotini', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Pasta - Tricolor-Rotini', 'plural_name': 'Pasta - Tricolor-Rotini', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Linguini', 'plural_name': 'Linguini', 'default_quantity': 1, 'unit_of_measure': 'Box'},
                {'name': 'Fettuccine', 'plural_name': 'Fettuccine', 'default_quantity': 1, 'unit_of_measure': 'Box'},
            ],
            'Juice': [
                {'name': 'Tomato Juice', 'plural_name': 'Tomato Juice', 'default_quantity': 1, 'unit_of_measure': 'Bottle'},
                {'name': 'Cranberry Juice', 'plural_name': 'Cranberry Juice', 'default_quantity': 1, 'unit_of_measure': 'Bottle'},
            ],
            'Soda': [
                {'name': 'Coke', 'plural_name': 'Coke', 'default_quantity': 1, 'unit_of_measure': 'Case'},
                {'name': 'Diet Coke', 'plural_name': 'Diet Coke', 'default_quantity': 1, 'unit_of_measure': 'Case'},
                {'name': 'Bottled Water', 'plural_name': 'Bottled Water', 'default_quantity': 1, 'unit_of_measure': 'Bottle'},
                {'name': 'Seltzer Water', 'plural_name': 'Seltzer Water', 'default_quantity': 1, 'unit_of_measure': 'Bottle'},
                {'name': 'Sparkling Water', 'plural_name': 'Sparkling Water', 'default_quantity': 1, 'unit_of_measure': 'Bottle'},
            ],
            'Frozen Treats/Ice Cream': [
                {'name': 'Ice Cream', 'plural_name': 'Ice Cream', 'default_quantity': 1, 'unit_of_measure': 'Container'},
            ],
            'Canned Meats': [
                {'name': 'Canned Tuna in Water', 'plural_name': 'Canned Tuna in Water', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Canned Tuna in Oil', 'plural_name': 'Canned Tuna in Oil', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Canned Salmon', 'plural_name': 'Canned Salmon', 'default_quantity': 1, 'unit_of_measure': 'Container'},
                {'name': 'Salmon Pouch', 'plural_name': 'Salmon Pouch', 'default_quantity': 1, 'unit_of_measure': 'Container'},
            ],
            'Condiments': [    
                {'name': 'Blue Cheese Salad Dressing', 'plural_name': 'Blue Cheese Salad Dressing', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Ranch Salad Dressing', 'plural_name': 'Ranch Salad Dressing', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Balsamic Vinaigrette Salad Dressing', 'plural_name': 'Balsamic Vinaigrette Salad Dressing', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Worcestershire Sauce', 'plural_name': 'Worcestershire Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Hot sauce', 'plural_name': 'Hot Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Barbecue Sauce', 'plural_name': 'Barbecue Sauce', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Dijon Mustard', 'plural_name': 'Dijon Mustard', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Brown Mustard', 'plural_name': 'Brown Mustard', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Ketchup', 'plural_name': 'Ketchup', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
                {'name': 'Mayonnaise', 'plural_name': 'Mayonnaise', 'default_quantity': 1, 'unit_of_measure': 'Jar'},
            ],
        },
        'Home Improvement': {},
    }
    # fmt: on

    # {'name': 'Orange Juice', 'plural_name': 'Orange Juice', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Fresh Lemonade', 'plural_name': 'Fresh Lemonade', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Blueberry Muffins', 'plural_name': 'Blueberry Muffins', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Cinnamon Muffins', 'plural_name': 'Cinnamon Muffins', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Chocolate Chip Muffins', 'plural_name': 'Chocolate Chip Muffins', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Chips', 'plural_name': 'Chips', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'BBQ Chips', 'plural_name': 'BBQ Chips', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Sour Cream & Onion Chips', 'plural_name': 'Sour Cream & Onion Chips', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Tortilla Chips', 'plural_name': 'Tortilla Chips', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Pretzels', 'plural_name': 'Pretzels', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Mini Pretzels', 'plural_name': 'Mini Pretzels', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Saltines', 'plural_name': 'Saltines', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Almonds', 'plural_name': 'Almonds', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Peanuts', 'plural_name': 'Peanuts', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Honey Roasted Peanuts', 'plural_name': 'Honey Roasted Peanuts', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Mixed Nuts', 'plural_name': 'Mixed Nuts', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Walnuts', 'plural_name': 'Walnuts', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Pistachios', 'plural_name': 'Pistachios', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Corn', 'plural_name': 'Canned Corn', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Cream Corn', 'plural_name': 'Canned Cream Corn', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Green Beans', 'plural_name': 'Canned Green Beans', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Peas', 'plural_name': 'Canned Peas', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Mushrooms', 'plural_name': 'Canned Mushrooms', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Tomato Sauce', 'plural_name': 'Canned Tomato Sauce', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Tomato Paste', 'plural_name': 'Canned Tomato Paste', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Canned Petite Diced Tomatoes', 'plural_name': 'Canned Petite Diced Tomatoes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Tomato Soup', 'plural_name': 'Tomato Soup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Chicken Noodle Soup', 'plural_name': 'Chicken Noodle Soup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Cream of Mushroom Soup', 'plural_name': 'Cream of Mushroom Soup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Cream of Chicken Soup', 'plural_name': 'Cream of Chicken Soup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Vegetable Soup', 'plural_name': 'Vegetable Soup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Pierogies', 'plural_name': 'Pierogies', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Black Olives', 'plural_name': 'Black Olives', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Dishwashing Liquid', 'plural_name': 'Dishwashing Liquid', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Dishwashing Detergent', 'plural_name': 'Dishwashing Detergent', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Sponges', 'plural_name': 'Sponges', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Toilet Bowl Cleaner', 'plural_name': 'Toilet Bowl Cleaner', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Hand Soap', 'plural_name': 'Hand Soap', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Bleach Cleaner', 'plural_name': 'Bleach Cleaner', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Bleach', 'plural_name': 'Bleach', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Laundry Detergent', 'plural_name': 'Laundry Detergent', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Fabric Softener', 'plural_name': 'Fabric Softener', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Color Bleach', 'plural_name': 'Color Bleach', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Laundry Pods', 'plural_name': 'Laundry Pods', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Disinfecting Wipes', 'plural_name': 'Disinfecting Wipes', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Steel Wool Pads', 'plural_name': 'Steel Wool Pads', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Paper Towels', 'plural_name': 'Paper Towels', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Toilet Paper', 'plural_name': 'Toilet Paper', 'default_quantity': 1, 'unit_of_measure': 'Piece'},
    # {'name': 'Maple Syrup', 'plural_name': 'Maple Syrup', 'default_quantity': 1, 'unit_of_measure': 'Piece'},

    # list customization data
    list_customization = [
        {
            'shopping_list_group': 'Grocery',
            'list': 'Costco',
            'category': 'Produce',
            'name': 'Banana',
            'customization': {'default_unit_of_measure': 'Case'},
        },
        {
            'shopping_list_group': 'Grocery',
            'list': 'Kroger',
            'category': 'Produce',
            'name': 'Apple',
            'customization': {'stocked': False},
        },
    ]

    # create unit of measure
    for obj in uom_data:
        o, created = UnitOfMeasure.objects.get_or_create(name=obj['name'], plural_name=obj['plural_name'], created_by=user)
        if created:
            logger.info(F"Added: {obj['name']}")

    # create shopping list groups
    for obj in shopping_list_group_data:
        o, created = ShoppingListGroup.objects.get_or_create(name=obj['name'], created_by=user)
        if created:
            logger.info(F"Added: {obj['name']}")
        for category in obj['categories']:
            c, c_created = Category.objects.get_or_create(name=category, shopping_list_group=o, created_by=user)
            if c_created:
                logger.info(F"Added: {category}")

    # create shopping lists
    for obj in shopping_list_data:
        slg = ShoppingListGroup.objects.get(name=obj[1])
        o, created = ShoppingList.objects.get_or_create(name=obj[0], list_group=slg, created_by=user)
        if created:
            logger.info(F"Added: {obj[0]}")

    # create items
    for list_group, categories in item_data.items():
        slg = ShoppingListGroup.objects.get(name=list_group)
        for category, cat_items in categories.items():
            c = Category.objects.get(name=category)
            for item in cat_items:
                o, created = Item.objects.get_or_create(
                    name=item['name'],
                    plural_name=item['plural_name'],
                    list_group=slg,
                    default_quantity=item['default_quantity'],
                    unit_of_measure=UnitOfMeasure.objects.get(name=item['unit_of_measure']),
                    category=c,
                    created_by=user,
                )
                if created:
                    logger.info(F"Added: {item['name']}")

    # create list customazation objects
    for custom in list_customization:
        slg = ShoppingListGroup.objects.get(name=custom['shopping_list_group'])
        s_list = ShoppingList.objects.get(name=custom['list'], list_group=slg)
        category = Category.objects.get(name=custom['category'], shopping_list_group=slg)
        item = Item.objects.get(name=custom['name'], list_group=slg, category=category)

        list_customization_obj, created = ListCustomization.objects.get_or_create(
            shopping_list=s_list, category=category, item=item
        )
        for key, value in custom['customization'].items():
            if key == 'default_unit_of_measure':
                list_customization_obj.default_unit_of_measure = UnitOfMeasure.objects.get(name=value)
            else:
                setattr(list_customization_obj, key, value)
        list_customization_obj.save()
        logger.info(F"Customized item {custom['name']}")
