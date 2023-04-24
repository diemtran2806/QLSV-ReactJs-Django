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
            dob_str = dob.strftime('%Y-%m-%d')
            instance.dob = datetime.strptime(dob_str, '%Y-%m-%d').date()

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

    class Meta:
        model = Users
        extra_kwargs = {'password': {'write_only': True}, 'id_role': {'required': True}}
        fields = ('id', 'mssv', 'password', 'name', 'email', 'phone', 'gender', 'id_role', 'cccd', 'dob', 'address', 'avatar')
        

