import logging
from typing import List

from api.models import Item
from api.schemas import ItemIn, ItemOut
from api.utils.model_utils import set_created_updated_by_on_create, set_updated_by_on_update
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import CreateView, DeleteView, ListView, ReadView, UpdateView

logger = logging.getLogger(__name__)


class ItemViewSet(viewsets.APIViewSet):
    model = Item

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='item_list', response_body=List[ItemOut])
    create = CreateView(
        name='item_create',
        request_body=ItemIn,
        response_body=ItemOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='item_read', path='/{id}', response_body=ItemOut)
    update = UpdateView(
        name='item_update',
        path='/{id}',
        request_body=ItemIn,
        response_body=ItemOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='item_delete', path='/{id}')


router = Router()
ItemViewSet.add_views_to(router)
