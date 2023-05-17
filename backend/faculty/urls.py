from django.urls import path
from .views import *

urlpatterns = [
    path('', faculties_view),
    path('/create/', faculty_create_view),
    path('/<int:id>/', faculty_view),
    path('/<int:id>/update/', faculty_update_view),
    path('/<int:id>/partial_update/',
         faculty_partial_update_view),
    path('/<int:id>/delete/', faculty_delete_view),
    path('/create_api_view/', FacultyCreate.as_view()),
]
