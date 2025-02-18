from rest_framework import serializers
from .models import Avatars

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatars
        fields = '__all__'
