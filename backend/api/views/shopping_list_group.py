import logging
from typing import List

from api.schemas import ShoppingListGroupIn, ShoppingListGroupOut, ShoppingListGroupAddItemOut
from api.utils.model_utils import (
    set_created_updated_by_on_create,
    set_updated_by_on_update,
)
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import (
    CreateView,
    ListView,
    ReadView,
    UpdateView,
    DeleteView
)

from api.models import ShoppingListGroup


logger = logging.getLogger(__name__)


class ShoppingListGroupViewSet(viewsets.APIViewSet):
    model = ShoppingListGroup

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='shopping_list_group_list', response_body=List[ShoppingListGroupOut])
    create = CreateView(
        name='shopping_list_group_create',
        request_body=ShoppingListGroupIn,
        response_body=ShoppingListGroupOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='shopping_list_group_read', path='/{id}', response_body=ShoppingListGroupOut)
    update = UpdateView(
        name='shopping_list_group_update',
        path='/{id}',
        request_body=ShoppingListGroupIn,
        response_body=ShoppingListGroupOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='shopping_list_group_delete', path='/{id}')


router = Router()
ShoppingListGroupViewSet.add_views_to(router)

# @router.post('/{id}/add_item', response=ShoppingListGroupAddItemOut)
# def cslg_add_item(request, payload: Form[ItemCreate] = None):
#     user = get_user_model().objects.get(id=request.user.id)
#     options = payload.dict(exclude_unset=True)
#     options["created_by"] = get_user_model().objects.get(id=request.user.id)
#     item = Item.objects.create(**options)
#     item.created_by = user
#     if photo:
#         item.photo.save(F'item-{item.id}.{item.name.split(".")[-1]}', photo)
#     return item