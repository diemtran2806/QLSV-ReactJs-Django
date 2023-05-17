from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
from django.db.models import Q
from datetime import datetime
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from permissions.custom_permissions import IsStudent, IsLecturer, IsAdmin, IsSameUser
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


@permission_classes([IsAdmin])
class RegisterView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['id_role'] = 3
        serializer = UserSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = serializer.create(serializer.validated_data)
            user = UserSerializer(user)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(user.data, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['GET'])
def users_view(request):
    users = Users.objects.all()
    return Response(UserSerializer(users, many=True).data)


@csrf_exempt
@api_view(['GET'])
def admin_view(request):
    search = request.GET.get('search')
    if search:
        search = search.lower()
        try:
            search_date = datetime.strptime(search, '%Y-%m-%d').date()
            users = Users.objects.filter(
                Q(id_role=3) &
                Q(dob=search_date)
            )
        except ValueError:
            users = Users.objects.filter(
                Q(mssv__icontains=search) |
                Q(email__icontains=search) |
                Q(name__icontains=search) |
                Q(phone__icontains=search) |
                Q(address__icontains=search) |
                Q(cccd__icontains=search)
            )
            gender = None
            try:
                if search == 'nam':
                    gender = True
                elif search == 'nữ':
                    gender = False
                users |= Users.objects.filter(Q(gender=gender))
            except ValueError:
                pass
            users = users.filter(id_role=3)

        return Response(UserSerializer(users, many=True).data)

    users = Users.objects.filter(id_role=3)
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
@permission_classes([IsAdmin | IsSameUser])
def user_update_view(request, id):
    user = get_object(id)
    if user.is_authenticated:
        data = request.data
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            try:
                serializer.update(user, serializer.validated_data)
                return Response(serializer.data)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
@api_view(['PATCH'])
@permission_classes([IsAdmin | IsSameUser])
def user_update_password_view(request, id):
    user = get_object(id)
    if user.is_authenticated:
        data = request.data
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAdmin])
def user_delete_view(request, id):
    user = get_object(id)
    if user.is_authenticated:
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def login_required(function):
    def wrap(request, *args, **kwargs):
        auth = request.headers.get('Authorization')
        if auth is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = auth.split(' ')[1]
            decoded_token = AccessToken(token, verify=True)
            user_id = decoded_token['user_id']
            request.user_id = user_id
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return function(request, *args, **kwargs)
    return wrap
