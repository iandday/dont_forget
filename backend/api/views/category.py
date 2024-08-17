import logging
from typing import List

from api.schemas import CategoryOut, CategoryIn
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

from api.models.category import Category

logger = logging.getLogger(__name__)


class CategoryViewSet(viewsets.APIViewSet):
    model = Category

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='category_list', response_body=List[CategoryOut])
    create = CreateView(
        name='category_create',
        request_body=CategoryIn,
        response_body=CategoryOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='category_read', path='/{id}', response_body=CategoryOut)
    update = UpdateView(
        name='category_update',
        path='/{id}',
        request_body=CategoryIn,
        response_body=CategoryOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='category_delete', path='/{id}')


router = Router()
CategoryViewSet.add_views_to(router)
