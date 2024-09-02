import logging
from typing import List

from django.shortcuts import get_object_or_404

from api.models import Item
from api.schemas import ItemCreate, ItemUpdate, ItemOut
from api.utils.model_utils import set_created_updated_by_on_create, set_updated_by_on_update
from ninja import Router, Form, File, UploadedFile
from ninja_crud import viewsets
from ninja_crud.views import CreateView, DeleteView, ListView, ReadView, UpdateView
from django.contrib.auth import get_user_model


logger = logging.getLogger(__name__)


class ItemViewSet(viewsets.APIViewSet):
    model = Item
    list = ListView(name='item_list', response_body=List[ItemOut])
    retrieve = ReadView(name='item_read', path='/{id}', response_body=ItemOut)
    delete = DeleteView(name='item_delete', path='/{id}')

router = Router()
ItemViewSet.add_views_to(router)

# customized views due to file uploads
@router.post('/', response=ItemOut)
def create_item(request, payload: Form[ItemCreate], photo: File[UploadedFile] = None):
    user = get_user_model().objects.get(id=request.user.id)
    options = payload.dict(exclude_unset=True)
    options["created_by"] = get_user_model().objects.get(id=request.user.id)
    item = Item.objects.create(**options)
    item.created_by = user
    if photo:
        item.photo.save(F'item-{item.id}.{item.name.split(".")[-1]}', photo)
    return item

@router.put('/{id}', response=ItemOut)
def update_item(request, payload: Form[ItemUpdate], photo: File[UploadedFile] = None):
    user = get_user_model().objects.get(id=request.user.id)
    item = get_object_or_404(Item, id=id, user=user)
    for attr, value in payload.dict(exclude_unset=True).items():
       setattr(item, attr, value)
    item.updated_by = user
    item.save()

    if photo:
        item.photo.save(F'item-{item.id}.{item.name.split(".")[-1]}', photo)
    
    return item


