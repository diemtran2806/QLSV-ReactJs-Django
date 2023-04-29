# from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/users/', include('users.urls')),
    path('api/student/', include('student.urls')),
    path('api/faculty/', include('faculty.urls')),
    path('api/lecturer/', include('lecturer.urls')),
    path('api/class/', include('Class.urls')),
    # path('admin/', admin.site.urls),
]
