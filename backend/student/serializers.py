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

    # def update(self, instance, validated_data):
    #     user_data = validated_data.pop('id_user')
    #     user = Users.objects.get(id=instance.id_user.id)
    #     user = Users.objects.update(user, user_data)
    #     # # for attr, value in user_data.items():
    #     # #     if attr == 'password':
    #     # #         instance_user.set_password(value)
    #     # #     else:
    #     # #         setattr(instance_user, attr, value)

    #     # # instance_user.save()
    #     # user_serializer = UserSerializer(user, data=user_data, partial=True)
    #     # if user_serializer.is_valid():
    #     #     user_serializer.update(user, user_data)
    #     # user_instance = Users.objects.get(id=instance.id_user.id)

    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)

    #     instance.save()
    #     return instance
    def update(self, student, student_data):
        user_data = student_data.pop('id_user')
        user = Users.objects.get(id=user_data['id'])
        student.avg_score = student_data.get('avg_score', student.avg_score)
        student.id_class = student_data.get('id_class', student.id_class)
        user.mssv = user_data.get('mssv', user.mssv)
        user.name = user_data.get('name', user.name)
        user.email = user_data.get('email', user.email)
        user.phone = user_data.get('phone', user.phone)
        user.gender = user_data.get('gender', user.gender)
        user.id_role = user_data.get('id_role', user.id_role)
        user.cccd = user_data.get('cccd', user.cccd)
        user.dob = datetime.datetime.strptime(user_data.get('dob', str(user.dob)), '%Y-%m-%d').date()
        user.address = user_data.get('address', user.address)
        user.avatar = user_data.get('avatar', user.avatar)
        user_serializer = UserSerializer(user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.update(user, user_data)
            
        student.save()
        return student

    class Meta:
        model = Student
        fields = '__all__'


class GetStudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    id_class = ClassSerializer()

    class Meta:
        model = Student
        fields = '__all__'