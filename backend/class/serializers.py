from rest_framework import serializers
from .models import Class
from users.serializers import UserSerializer

class ClassSerializer(serializers.ModelSerializer):
    id_user = UserSerializer()
    url = serializers.HyperlinkedIdentityField(view_name='class-detail', read_only=True)
    
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
        model = Class
        fields = '__all__'