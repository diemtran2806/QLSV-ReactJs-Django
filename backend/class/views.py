from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from django.db.models import Q
from users.models import Users
from permissions.custom_permissions import IsLecturer, IsStudent, IsAdmin, IsSameUser
from .models import Class
from .serializers import ClassSerializer, GetClassSerializer
from lecturer.models import Lecturer
from faculty.models import Faculty


def get_object(id):
    try:
        return Class.objects.get(id_class=id)
    except Class.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
def classes_view(request):
    search = request.GET.get('search', '')
    if search != '':
        classes = Class.objects.filter(
            Q(class_name__icontains=search) |
            Q(id_lecturer__id_user__name__icontains=search) |
            Q(id_faculty__name_faculty__icontains=search)
        )
    else:
        classes = Class.objects.all()
    serializer = GetClassSerializer(
        classes, many=True, context={'request': request}
    )
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAdmin])
def class_view(request, id):
    _class = get_object(id)
    serializer = GetClassSerializer(
        _class
    )
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def class_view_by_faculty(request, id):
    try:
        classes = Class.objects.get(id_faculty=id)
    except Class.DoesNotExist:
        raise Http404
    serializer = GetClassSerializer(classes, many=True,)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
def class_view_by_lecturer(request, id):
    lecturer = Lecturer.objects.get(id_user=id)
    try:
        classes = Class.objects.filter(id_lecturer=lecturer.id)
    except Class.DoesNotExist:
        raise Http404
    serializer = GetClassSerializer(classes, many=True,)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdmin])
def class_create_view(request):
    serializer = ClassSerializer(data=request.data)
    if serializer.is_valid():
        lecturer_id = serializer.validated_data['id_lecturer'].pk
        if not Lecturer.objects.filter(pk=lecturer_id).exists():
            return Response({'id_lecturer': 'Lecturer with this id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        faculty_id = serializer.validated_data['id_faculty'].pk
        if not Faculty.objects.filter(pk=faculty_id).exists():
            return Response({'id_faculty': 'Faculty with this id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdmin])
def class_update_view(request, id):
    _class = get_object(id)
    serializer = ClassSerializer(_class, data=request.data, partial=True)
    if serializer.is_valid():
        lecturer_id = serializer.validated_data['id_lecturer'].pk
        if not Lecturer.objects.filter(pk=lecturer_id).exists():
            print("putput class update")
            return Response({'id_lecturer': 'Lecturer with this id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        faculty_id = serializer.validated_data['id_faculty'].pk
        if not Faculty.objects.filter(pk=faculty_id).exists():
            return Response({'id_faculty': 'Faculty with this id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAdmin])
def class_delete_view(request, id):
    _class = get_object(id)
    _class.delete()
    return Response({"message": "Class deleted successfully."}, status=status.HTTP_200_OK)
