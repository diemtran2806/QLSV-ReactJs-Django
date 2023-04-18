from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import StudentSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from .models import Student

@csrf_exempt
@api_view(['GET'])
def students_view(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True, context={'request': request})
    return Response(serializer.data)

def get_object(id):
    try:
        return Student.objects.get(id=id)
    except Student.DoesNotExist:
        raise Http404

@csrf_exempt
@api_view(['GET'])
def student_view(request, id):
    student = get_object(id)
    serializer = StudentSerializer(student)
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def student_create_view(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
