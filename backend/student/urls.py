from django.urls import path
from .views import *

urlpatterns = [
    path('', students_view),
    path('<int:id>/', student_view),
]