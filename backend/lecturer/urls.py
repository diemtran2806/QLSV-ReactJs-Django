from django.urls import path
from .views import *

urlpatterns = [
    path('', lecturers_view),
    path('create', lecturer_create_view),
    path('<int:id>/', lecturer_view),
    path('<int:id>/delete', lecturer_delete_view),
    path('<int:id>/update', lecturer_update_view),
    path('<int:id>/faculty/', lecturer_view_by_faculty),
]
