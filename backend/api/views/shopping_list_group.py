import logging
from typing import List

from api.schemas import ShoppingListGroupIn, ShoppingListGroupOut
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
