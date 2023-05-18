from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from users.views import login_required
from .serializers import StudentSerializer, GetStudentSerializer
from django.views.decorators.csrf import csrf_exempt
from permissions.custom_permissions import IsStudent, IsLecturer, IsAdmin, IsSameUser
from django.http import Http404
from django.db.models import Q
from datetime import datetime
from .models import Student
from lecturer.models import Lecturer
from users.models import Users
from Class.models import Class


@csrf_exempt
@api_view(['GET'])
def students_view(request):
    search = request.GET.get('search', '')
    if search != '':
        search = search.lower()

        try:
            search_date = datetime.strptime(search, '%Y-%m-%d').date()
            students = Student.objects.filter(
                Q(id_user__dob=search_date)
            )
        except ValueError:
            try:
                avg_score = float(search)
                students = Student.objects.filter(
                    Q(avg_score=avg_score) |
                    Q(id_user__mssv__icontains=search) |
                    Q(id_user__email__icontains=search) |
                    Q(id_user__name__icontains=search) |
                    Q(id_user__phone__icontains=search) |
                    Q(id_user__address__icontains=search) |
                    Q(id_user__cccd__icontains=search) |
                    Q(id_class__class_name__icontains=search)
                )
            except ValueError:
                students = Student.objects.filter(
                    Q(id_user__mssv__icontains=search) |
                    Q(id_user__email__icontains=search) |
                    Q(id_user__name__icontains=search) |
                    Q(id_user__phone__icontains=search) |
                    Q(id_user__address__icontains=search) |
                    Q(id_user__cccd__icontains=search) |
                    Q(id_class__class_name__icontains=search)
                )
            gender = None
            try:
                if search == 'nam':
                    gender = True
                elif search == 'nữ':
                    gender = False
                students |= Student.objects.filter(Q(id_user__gender=gender))
            except ValueError:
                pass

        serializer = GetStudentSerializer(
            students, many=True, context={'request': request})
        return Response(serializer.data)
    students = Student.objects.all()
    serializer = GetStudentSerializer(
        students, many=True, context={'request': request})
    if (IsLecturer().has_permission(request, None) or IsAdmin().has_permission(request, None)):
        return Response(serializer.data)
    else:
        for item in serializer.data:
            item.pop('avg_score', None)
        return Response(serializer.data)


def get_object(id):
    try:
        return Student.objects.get(id_user=id)
    except Student.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdmin | IsSameUser | IsLecturer])
def student_view(request, id):
    student = get_object(id)
    # Kiểm tra xem người dùng hiện tại có là giảng viên quản lý của sinh viên hay không
    if student.id_class.id_lecturer.id_ != request.user:
        raise PermissionDenied("You do not have permission to access this student.")

    serializer = GetStudentSerializer(student)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def student_view_by_class(request, id_class):
    students = Student.objects.filter(id_class=id_class)
    serializer = GetStudentSerializer(
        students, many=True, context={'request': request})
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsLecturer | IsAdmin])
def student_view_by_lecturer(request, id_lecturer):
    if(IsLecturer().has_permission(request, None)):
        lecturer = Lecturer.objects.get(id_user=request.user.id).id
        print(lecturer,id_lecturer)
        if(lecturer != id_lecturer):
            return Response("Không có quyền truy cập.", status=status.HTTP_403_FORBIDDEN)
    classes = Class.objects.filter(id_lecturer=id_lecturer)
    students = Student.objects.filter(id_class__in=classes)
    serializer = GetStudentSerializer(students, many=True, context={'request': request})
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdmin | IsLecturer])
def student_create_view(request):
    data = request.data.copy()
    data['id_user']['id_role'] = 1
    print(data)
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdmin | IsSameUser | IsLecturer])
def student_update_view(request, id):
    student = get_object(id)
    serializer = StudentSerializer(student, data=request.data, partial=True)
    if serializer.is_valid():
        try:
            serializer.update(student, serializer.validated_data)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAdmin | IsLecturer])
def student_delete_view(request, id):
    try:
        student = get_object(id)
    except Student.DoesNotExist:
        return Response({"message": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
    user = student.id_user
    student.delete()
    if Users.objects.filter(id=user.id).exists():
        user.delete()
        return Response({"message": "Student and User deleted successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Student deleted successfully, but User not found."}, status=status.HTTP_200_OK)
