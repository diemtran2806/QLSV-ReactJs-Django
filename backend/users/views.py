from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def login_view(request):
    # Xác thực thông tin đăng nhập
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Tạo JWT token
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': UserSerializer(user).data,
    })

@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    # Hủy JWT token
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
  def post(self, request):
    data = request.data

    serializer = UserSerializer(data=data)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.create(serializer.validated_data)
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['GET'])
def user_view(request):
    user = request.user
    if user.is_authenticated:
        return Response(UserSerializer(user).data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    