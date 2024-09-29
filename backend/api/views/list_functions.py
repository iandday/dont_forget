from collections import defaultdict
import logging
from uuid import UUID
from django.shortcuts import get_object_or_404
from ninja import Form, Router

from api.schemas import ListFunctionsAddIn, ListFunctionsAddOut, ListItemUpdate, ListItemOut
from api.models import Item, ListItem, ShoppingList, ShoppingListGroup, ListCustomization
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)

router = Router()


def get_shopping_list_group_output(slg: UUID):
    """
    Get shopping list group output taking into account list customization entries for items

    Args:
        slg (UUID): shopping list group object id

    Returns:
        _type_: customized list items
    """
    slg_obj = ShoppingListGroup.objects.get(id=slg)

    # get all list_items from slg
    slg_items = defaultdict(list)
    for item in ListItem.objects.filter(shopping_list_group=slg_obj):
        item_object = Item.objects.get(id=item.item.id)
        category = item_object.category
        combined_data = {
            'item': {
                'id': item_object.id,
                'name': item_object.name,
                'plural_name': item_object.plural_name,
                'unit_of_measure': F'{item_object.unit_of_measure}',
            },
            'id': item.id,
            'active': item.active,
            'completed': item.completed,
            'quantity': item.quantity,
        }
        slg_items[category].append(combined_data)

    # setup output
    output = {'shopping_list_group': slg_obj, 'lists': []}

    for s_list in ShoppingList.objects.filter(list_group=slg_obj):
        current_list = {'shopping_list': s_list, 'categories': []}
        for category in slg_items.keys():
            customized_items = defaultdict(list)

            # check for customizations
            for combined_item in slg_items[category]:
                try:
                    # logger.error(combined_item)
                    custom_item = ListCustomization.objects.get(item=combined_item['item']['id'], shopping_list=s_list)
                    try:
                        uom = f'{custom_item.default_unit_of_measure}'
                    except AttributeError:
                        uom = combined_item['item']['unit_of_measure']
                    customized_items[custom_item.category].append(
                        {
                            'item': {
                                'id': combined_item['item']['id'],
                                'name': combined_item['item']['name'],
                                'plural_name': combined_item['item']['plural_name'],
                                'unit_of_measure': uom,
                            },
                            'id': combined_item['id'],
                            'active': combined_item['active'],
                            'completed': combined_item['completed'],
                            'quantity': combined_item['quantity'],
                        }
                    )

                except ListCustomization.DoesNotExist:
                    customized_items[category].append(combined_item)
            for category, customized_items_list in customized_items.items():
                current_list['categories'].append({'category': category, 'items': customized_items_list})

        output['lists'].append(current_list)

    return {'lists': [output]}


@router.get('/shopping_list_group/{id}', response=ListFunctionsAddOut)
def get_shopping_list_group_list(request, id: UUID):
    return get_shopping_list_group_output(id)


@router.post('/list_item', response=ListFunctionsAddOut)
def add_item(request, payload: Form[ListFunctionsAddIn]):

    # add item to list
    item = get_object_or_404(Item, id=payload.item_id)
    list_item, created = ListItem.objects.get_or_create(
        item=item, shopping_list_group=item.list_group, active=True, completed=False, defaults={'quantity': payload.quantity}
    )

    # increment quanity if item already exists
    if not created:
        list_item.quantity += payload.quantity
        list_item.save()

    return get_shopping_list_group_output(item.list_group.id)


@router.put('/list_item/{id}', response=ListItemOut)
def update_item(request, id: UUID, payload: ListItemUpdate):
    user = get_user_model().objects.get(id=request.user.id)
    item = get_object_or_404(ListItem, id=id)
    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(item, attr, value)
    item.updated_by = user
    item.save()

    return item


@router.delete('/list_item/{id}')
def delete_item(request, id: UUID):
    item = get_object_or_404(ListItem, id=id)
    item.delete()
    return {"success": True}
