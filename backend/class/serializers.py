from rest_framework import serializers
from faculty.serializers import FacultySerializer

from lecturer.models import Lecturer
from faculty.models import Faculty
from users.models import Users
from .models import Class
from lecturer.serializers import LecturerSerializer


class ClassSerializer(serializers.ModelSerializer):
    id_lecturer = serializers.PrimaryKeyRelatedField(
        queryset=Lecturer.objects.all())

    class Meta:
        model = Class
        fields = ('id_class', 'class_name', 'id_lecturer', 'id_faculty')

    def create(self, validated_data):
        # Lấy ra id_lecturer
        id_lecturer = validated_data.pop('id_lecturer')
        try:
            # Kiểm tra xem id_lecturer có tồn tại trong database hay không
            lecturer = Lecturer.objects.get(pk=id_lecturer.pk)
        except Lecturer.DoesNotExist:
            raise serializers.ValidationError(
                {"id_lecturer": ["Lecturer with this id does not exist."]}
            )
        # Lấy ra id_faculty
        id_faculty = validated_data.pop('id_faculty')
        try:
            # Kiểm tra xem id_lecturer có tồn tại trong database hay không
            faculty = Faculty.objects.get(pk=id_faculty.pk)
        except Faculty.DoesNotExist:
            raise serializers.ValidationError(
                {"id_faculty": ["Faculty with this id does not exist."]}
            )
        # Tạo một đối tượng Class mới với thông tin được truyền vào
        class_obj = Class.objects.create(
            id_lecturer=lecturer, id_faculty=faculty, **validated_data)
        return class_obj

    def update(self, instance, validated_data):
        # Lấy ra id_lecturer trong validated_data
        id_lecturer_data = validated_data.pop('id_lecturer', None)
        id_faculty_data = validated_data.pop('id_faculty', None)
        if id_lecturer_data:
            # Kiểm tra xem id_lecturer có tồn tại trong database hay không
            try:
                lecturer = Lecturer.objects.get(pk=id_lecturer_data.pk)
            except Lecturer.DoesNotExist:
                raise serializers.ValidationError(
                    {"id_lecturer": ["Lecturer with this id does not exist."]}
                )
            instance.id_lecturer = lecturer

        if id_faculty_data:
           # Kiểm tra xem id_lecturer có tồn tại trong database hay không
            try:
                faculty = Faculty.objects.get(pk=id_faculty_data.pk)
            except Faculty.DoesNotExist:
                raise serializers.ValidationError(
                    {"id_faculty_data": [
                        "Faculty with this id does not exist."]}
                )
            instance.id_faculty = faculty
        # Cập nhật các thông tin khác của đối tượng Class
        instance.class_name = validated_data.get(
            'class_name', instance.class_name)
        instance.save()

        return instance


class GetClassSerializer(serializers.ModelSerializer):
    id_lecturer = LecturerSerializer()
    id_faculty = FacultySerializer()

    class Meta:
        model = Class
        fields = ('id_class', 'class_name', 'id_lecturer', 'id_faculty')
