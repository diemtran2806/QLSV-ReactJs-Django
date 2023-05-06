from rest_framework import serializers
from .models import Student
from users.serializers import UserSerializer
from Class.serializers import ClassSerializer
from datetime import datetime
from users.models import Users

class StudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()

    def create(self, validated_data):
        user_data = validated_data.pop('id_user')
        password = user_data.pop('password', None)
        dob = user_data.pop('dob', None)
        id_role = user_data.pop('id_role', None)
        instance_user = Users.objects.create(**user_data, id_role=id_role)

        if password is not None:
            instance_user.set_password(password)

        if dob is not None:
            dob_str = dob.strftime('%Y-%m-%d')
            instance_user.dob = datetime.strptime(dob_str, '%Y-%m-%d').date()

        instance_user.save()

        instance_student = self.Meta.model(id_user=instance_user, **validated_data)
        instance_student.save()
        return instance_student

    def update(self, instance, validated_data):
        user_data = validated_data.pop('id_user', {})
        user_data['id_role'] = instance.id_user.id_role.pk
        user_serializer = UserSerializer(
            instance=instance.id_user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Student
        fields = '__all__'


class GetStudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    id_class = ClassSerializer()

    class Meta:
        model = Student
        fields = '__all__'