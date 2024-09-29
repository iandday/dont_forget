import logging
from typing import List

from api.models import ListItem
from api.schemas import ListItemIn, ListItemOut, ListItemUpdate
from api.utils.model_utils import set_created_updated_by_on_create, set_updated_by_on_update
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import CreateView, DeleteView, ListView, ReadView, UpdateView

logger = logging.getLogger(__name__)


class ListItemViewSet(viewsets.APIViewSet):
    model = ListItem

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='list_item_list', response_body=List[ListItemOut])
    create = CreateView(
        name='list_item_create',
        request_body=ListItemIn,
        response_body=ListItemOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='list_item_read', path='/{id}', response_body=ListItemOut)
    update = UpdateView(
        name='list_item_update',
        path='/{id}',
        request_body=ListItemUpdate,
        response_body=ListItemOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='list_item_delete', path='/{id}')


router = Router()
ListItemViewSet.add_views_to(router)
