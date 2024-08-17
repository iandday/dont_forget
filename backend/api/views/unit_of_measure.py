import logging
from typing import List

from api.schemas import UnitOfMeasureOut, UnitOfMeasureIn
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

from api.models.unit_of_measure import UnitOfMeasure

logger = logging.getLogger(__name__)


class UnitOfMeasureViewSet(viewsets.APIViewSet):
    model = UnitOfMeasure

    # AbstractModelView subclasses can be used as-is
    list = ListView(name='uom_list', response_body=List[UnitOfMeasureOut])
    create = CreateView(
        name='uom_create',
        request_body=UnitOfMeasureIn,
        response_body=UnitOfMeasureOut,
        pre_save=set_created_updated_by_on_create
    )
    retrieve = ReadView(name='uom_read', path='/{id}', response_body=UnitOfMeasureOut)
    update = UpdateView(
        name='uom_update',
        path='/{id}',
        request_body=UnitOfMeasureIn,
        response_body=UnitOfMeasureOut,
        pre_save=set_updated_by_on_update,
    )
    delete = DeleteView(name='uom_delete', path='/{id}')


router = Router()
UnitOfMeasureViewSet.add_views_to(router)
