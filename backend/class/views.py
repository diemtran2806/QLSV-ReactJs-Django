from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from .models import Class
from .serializers import ClassSerializer
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
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['GET'])
def class_view(request, id):
    _class = get_object(id)
    serializer = ClassSerializer(_class)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
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
def class_delete_view(request, id):
    _class = get_object(id)
    _class.delete()
    return Response({"message": "Class deleted successfully."}, status=status.HTTP_200_OK)
