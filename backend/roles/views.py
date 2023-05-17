from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from permissions.custom_permissions import IsRole1User, IsRole2User, IsRole3User, IsSameUser

from roles.serializers import RolesSerializer
from .models import Roles

# Create your views here.


@csrf_exempt
@api_view(['GET'])
def roles_view(request):
    faculties = Roles.objects.all()
    return Response(RolesSerializer(faculties, many=True).data)


def get_object(id):
    try:
        return Roles.objects.get(id_role=id)
    except Roles.DoesNotExist:
        raise Http404


@csrf_exempt
@api_view(['GET'])
def role_view(request, id):
    role = get_object(id)
    return Response(RolesSerializer(role).data)
