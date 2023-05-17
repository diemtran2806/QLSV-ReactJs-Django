from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404

from permissions.custom_permissions import IsRole1User, IsRole2User, IsRole3User, IsSameUser
from .models import Faculty
from .serializers import FacultySerializer


class FacultyCreate(APIView):
    def post(self, request):
        serializer = FacultySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
def faculties_view(request):
    search = request.GET.get('search', '')
    if search != '':
        faculties = Faculty.objects.filter(name_faculty__icontains=search)
    else:
        faculties = Faculty.objects.all()
    return Response(FacultySerializer(faculties, many=True).data)


def get_object(id):
    try:
        return Faculty.objects.get(id_faculty=id)
    except Faculty.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsRole3User])
def faculty_view(request, id):
    faculty = get_object(id)
    return Response(FacultySerializer(faculty).data)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsRole3User])
def faculty_create_view(request):
    serializer = FacultySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsRole3User])
def faculty_update_view(request, id):
    faculty = get_object(id)
    data = request.data
    serializer = FacultySerializer(faculty, data=data)
    if serializer.is_valid():
        serializer.update(faculty, serializer.validated_data)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PATCH'])
@permission_classes([IsRole3User])
def faculty_partial_update_view(request, id):
    faculty = get_object(id)
    data = request.data
    serializer = FacultySerializer(faculty, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@permission_classes([IsRole3User])
@api_view(['DELETE'])
def faculty_delete_view(request, id):
    faculty = get_object(id)
    faculty.delete()
    return Response({"message": "Faculty deleted successfully."}, status=status.HTTP_200_OK)
