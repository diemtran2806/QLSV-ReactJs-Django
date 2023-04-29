from django.urls import path
from .views import *

urlpatterns = [
    path('', classes_view),
    path('<int:id>/', class_view),
    path('create', class_create_view),
    path('<int:id>/update/', class_update_view),
    path('<int:id>/delete/', class_delete_view),
]
