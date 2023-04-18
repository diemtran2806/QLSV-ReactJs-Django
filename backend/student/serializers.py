from rest_framework import serializers
from .models import Student
from users.serializers import UserSerializer
# from Class.serializers import ClassSerializer


class StudentSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    # id_class = ClassSerializer()
    url = serializers.HyperlinkedIdentityField(view_name='student-detail', read_only=True)
    
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    def get(self, instance):
        return instance

    class Meta:
        model = Student
        fields = '__all__'