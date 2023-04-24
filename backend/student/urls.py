from django.urls import path
from .views import *

urlpatterns = [
    path('', students_view),
    path('create', student_create_view),
    path('<int:id>/', student_view),
    path('<int:id>/update', student_update_view),
]