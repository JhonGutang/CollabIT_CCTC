from rest_framework import serializers
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    avatar_link = serializers.CharField(source='avatar.image_link', read_only=True)
    class Meta:
        model = Users
        fields = '__all__'
        extra_fields = ['avatar_link']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance
