# dont_forget
Self hosted shopping list 




A listgroup (type of store) is made of up lists (store): Grocery Store
	A category is a grouping of items are are associated to a list group
		An item is associated to a list group and can customize the following values per list
			stocked here
			category
			purchase count
			note


ListGroup
	id
	name

List
	id
	name
	ListGroup(s)
	categories

Category
	id
	Name
	ListGroup(s)


Item
	id
	Name
	plural name
	listGroup(s)
	photo
	quantity
	category
	Note
	purchase_count

ListItem
	id
	quantity
	Item
	List
	active
	completed
