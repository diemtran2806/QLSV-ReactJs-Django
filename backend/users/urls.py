from django.urls import path
from .views import *

urlpatterns = [
    path('/register/', RegisterView.as_view()),
    path('/login/', login_view),
    path('/logout/', logout_view),
    path('/<int:id>/', user_view),
    path('/admin', admin_view),
    path('/<int:id>/update/', user_update_view),
    path('/<int:id>/delete/', user_delete_view),
    path('/<int:id>/change-password/', user_update_password_view),
    path('', users_view),
]
