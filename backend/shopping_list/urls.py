from api.api import api
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
    path('', include('content.urls')),
]
