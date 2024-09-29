# dont_forget

Self hosted shopping list

## Data Structure

- A `ListGroup` (type of store), ex: Grocery, is made up of invidiual `List` objects (store), ex: Kroger
- A `Category` is a grouping of `Item` objects associated to a `ListGroup`, ex: Produce
- An `Item` is a object that is associated to a `Category`, ex: Bananas
- A `UnitOfMeasure` is used to determine the typical measurement for an `Item`, ex: Pound
- A `ListItem` is an item associated to a `ListGroup` and can customize the following values per `List`
  - stocked here
  - category
  - purchase count
  - note

## API Endpoints

- Model CRUD Endpoints
  - ShoppingListAGroup
  - ShoppingList
  - Category
  - UnitOfMeasure
  - Item
    #- ListItem
  - ListCustomization
  - Users
- Function Endpoints

  - Add item to list group
    - Create list customization object it not present
    - create ListItem for each list in shopping list group
  - Mark item completed

    - update `completed` in `ListItem` object for each list in shopping list group
    - increment purchase count in list customization object

  - Remove item from list group
    - update `active` in `ListItem` object

# https://github.com/suren-atoyan/react-pwa?tab=readme-ov-file
