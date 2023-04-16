from rest_framework import serializers
from .models import Users
from roles.models import Roles
from datetime import datetime

class UserSerializer(serializers.HyperlinkedModelSerializer):
    id_role = serializers.PrimaryKeyRelatedField(queryset=Roles.objects.all())

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        dob = validated_data.pop('dob', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        if dob is not None:
            instance.dob = datetime.strptime(dob, '%Y-%m-%d').date()

        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        instance.save()
        return instance

    def get(self, instance):
        return instance

    class Meta:
        model = Users
        extra_kwargs = {'password': {'write_only': True}, 'is_active': {'read_only': True}, 'is_staff': {'read_only': True}, 
            'is_superuser': {'read_only': True}, 'created_at': {'read_only': True}, 'updated_at': {'read_only': True}, 'id': {'read_only': True}}
        fields = ('id', 'username', 'password', 'name', 'email', 'phone', 'gender', 'id_role', 'cccd', 'dob', 'avatar', 'created_at', 'updated_at',
                  'is_active', 'is_staff', 'is_superuser')
