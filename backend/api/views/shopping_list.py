import logging
from typing import List

from api.schemas import ShoppingListIn, ShoppingListOut
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

from api.models import ShoppingList


logger = logging.getLogger(__name__)


class ShoppingListViewSet(viewsets.APIViewSet):
    model = ShoppingList

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='shopping_list_list', response_body=List[ShoppingListOut])
    create = CreateView(
        name='shopping_list_create',
        request_body=ShoppingListIn,
        response_body=ShoppingListOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='shopping_list_read', path='/{id}', response_body=ShoppingListOut)
    update = UpdateView(
        name='shopping_list_group_update',
        path='/{id}',
        request_body=ShoppingListIn,
        response_body=ShoppingListOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='shopping_list_delete', path='/{id}')


router = Router()
ShoppingListViewSet.add_views_to(router)
