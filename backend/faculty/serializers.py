from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance_faculty = self.Meta.model(**validated_data)
        instance_faculty.save()
        return instance_faculty

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = Faculty
        fields = '__all__'
