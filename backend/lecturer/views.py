from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LecturerSerializer, GetLecturerSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from django.db.models import Q
from datetime import datetime
from .models import Lecturer
from users.models import Users
from users.views import login_required
from permissions.custom_permissions import IsStudent, IsLecturer, IsAdmin, IsSameUser


@csrf_exempt
@api_view(['GET'])
def lecturers_view(request):
    search = request.GET.get('search', '')
    if search != '':
        search = search.lower()
        try:
            search_date = datetime.strptime(search, '%Y-%m-%d').date()
            lecturers = Lecturer.objects.filter(Q(id_user__dob=search_date))
        except ValueError:
            lecturers = Lecturer.objects.filter(
                Q(id_user__mssv__icontains=search) |
                Q(id_user__email__icontains=search) |
                Q(id_user__name__icontains=search) |
                Q(id_user__phone__icontains=search) |
                Q(id_user__address__icontains=search) |
                Q(id_user__cccd__icontains=search) |
                Q(id_faculty__name_faculty__icontains=search)
            )

            gender = None
            try:
                if search == 'nam':
                    gender = True
                elif search == 'nữ':
                    gender = False
                lecturers |= Lecturer.objects.filter(Q(id_user__gender=gender))
            except ValueError:
                pass

        serializer = GetLecturerSerializer(
            lecturers, many=True, context={'request': request})
        return Response(serializer.data)

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
@permission_classes([IsAdmin | IsSameUser])
def lecturer_view(request, id):
    lecturer = get_object(id)
    serializer = GetLecturerSerializer(lecturer)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def lecturer_view_by_faculty(request, id):
    try:
        lecturers = Lecturer.objects.filter(id_faculty=id)
    except Lecturer.DoesNotExist:
        raise Http404
    serializer = LecturerSerializer(lecturers, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdmin])
def lecturer_create_view(request):
    data = request.data.copy()
    data['id_user']['id_role'] = 2
    print(data)
    serializer = LecturerSerializer(data=data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("400 1")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    print("400 2")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdmin | IsSameUser])
def lecturer_update_view(request, id):
    lecturer = get_object(id)
    serializer = LecturerSerializer(lecturer, data=request.data, partial=True)
    if serializer.is_valid():
        try:
            serializer.update(lecturer, serializer.validated_data)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAdmin])
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
