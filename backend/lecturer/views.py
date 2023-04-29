from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import LecturerSerializer, GetLecturerSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from .models import Lecturer
from users.serializers import UserSerializer
from users.models import Users


@csrf_exempt
@api_view(['GET'])
def lecturers_view(request):
    lecturers = Lecturer.objects.all()
    serializer = GetLecturerSerializer(
        lecturers, many=True, context={'request': request})
    return Response(serializer.data)


def get_object(id):
    try:
        return Lecturer.objects.get(id_user=id)
    except Lecturer.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
def lecturer_view(request, id):
    lecturer = get_object(id)
    serializer = GetLecturerSerializer(lecturer)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def lecturer_create_view(request):
    serializer = LecturerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
def lecturer_update_view(request, id):
    lecturer = get_object(id)
    serializer = LecturerSerializer(
        lecturer, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
def lecturer_delete_view(request, id):
    try:
        lecturer = get_object(id)
    except Lecturer.DoesNotExist:
        return Response({"message": "Lecturer not found."}, status=status.HTTP_404_NOT_FOUND)

    user = lecturer.id_user
    lecturer.delete()

    if Users.objects.filter(id=user.id).exists():
        user.delete()
        return Response({"message": "Lecturer and User deleted successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Lecturer deleted successfully, but User not found."}, status=status.HTTP_200_OK)
