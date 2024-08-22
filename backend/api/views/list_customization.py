import logging
from typing import List

from api.models import ListCustomization
from api.schemas import ListCustomizationIn, ListCustomizationOut
from api.utils.model_utils import set_created_updated_by_on_create, set_updated_by_on_update
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import CreateView, DeleteView, ListView, ReadView, UpdateView

logger = logging.getLogger(__name__)


class ListCustomizationViewSet(viewsets.APIViewSet):
    model = ListCustomization

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='list_customization_list', response_body=List[ListCustomizationOut])
    create = CreateView(
        name='list_customization_create',
        request_body=ListCustomizationIn,
        response_body=ListCustomizationOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='list_customization_read', path='/{id}', response_body=ListCustomizationOut)
    update = UpdateView(
        name='list_customization_update',
        path='/{id}',
        request_body=ListCustomizationIn,
        response_body=ListCustomizationOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='list_customization_delete', path='/{id}')


router = Router()
ListCustomizationViewSet.add_views_to(router)
