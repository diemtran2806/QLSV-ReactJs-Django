from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from .models import Users


@csrf_exempt
@api_view(['POST'])
def login_view(request):
    # Xác thực thông tin đăng nhập
    mssv = request.data.get('mssv')
    password = request.data.get('password')
    user = authenticate(mssv=mssv, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Tạo JWT token
    refresh = RefreshToken.for_user(user)
    return Response({
        'refreshToken': str(refresh),
        'accessToken': str(refresh.access_token),
        'user': UserSerializer(user).data,
    })

@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    # Hủy JWT token
    try:
        refresh_token = request.data.get('refreshToken')
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
def users_view(request):
    users = Users.objects.all()
    return Response(UserSerializer(users, many=True).data)    

def get_object(id):
    try:
        return Users.objects.get(id=id)
    except Users.DoesNotExist:
        raise Http404

@csrf_exempt
@api_view(['GET'])
def user_view(request, id):
    user = get_object(id)
    if user.is_authenticated:        
        return Response(UserSerializer(user).data)

@csrf_exempt
@api_view(['PUT'])
def user_update_view(request, id):
    user = get_object(id)
    if user.is_authenticated:
        data = request.data        
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)    

@csrf_exempt
@api_view(['PATCH'])
def user_update_password_view(request, id):
    user = get_object(id)
    if user.is_authenticated:
        data = request.data        
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@csrf_exempt
@api_view(['DELETE'])
def user_delete_view(request, id):
    user = get_object(id)
    if user.is_authenticated:        
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

    