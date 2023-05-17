from django.urls import path
from .views import *

urlpatterns = [
    path('', roles_view),
    path('<int:id>', role_view),
]
