from django.urls import path
from .views import login_view, logout_view, RegisterView, user_view

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', login_view),
    path('logout/', logout_view),    
    path('', user_view),
]