from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from users.views import login_required
from .serializers import StudentSerializer, GetStudentSerializer
from django.views.decorators.csrf import csrf_exempt
from permissions.custom_permissions import IsRole1User, IsRole2User, IsRole3User, IsSameUser
from django.http import Http404
from .models import Student
from users.models import Users


@csrf_exempt
@api_view(['GET'])
def students_view(request):
    students = Student.objects.all()
    serializer = GetStudentSerializer(
        students, many=True, context={'request': request})
    return Response(serializer.data)


def get_object(id):
    try:
        return Student.objects.get(id_user=id)
    except Student.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsRole3User | IsSameUser])
def student_view(request, id):
    student = get_object(id)
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
@api_view(['POST'])
@permission_classes([IsRole3User])
def student_create_view(request):
    data = request.data.copy()
    data['id_user']['id_role'] = 1
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
@permission_classes([IsRole3User | IsSameUser])
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
@login_required
@permission_classes([IsRole3User])
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
