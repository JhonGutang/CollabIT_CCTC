from rest_framework import serializers
from .models import Users

class UserSerializer(serializers.ModelSerializer):
    avatar_link = serializers.CharField(source='avatar.image_link', read_only=True) 
    
    class Meta:
        model = Users
        fields = '__all__'

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

class FriendUserSerializer(serializers.ModelSerializer):
    avatar_link = serializers.SerializerMethodField()
    
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 
                 'year_level', 'avatar_link', 'is_active', 'date_joined']

    def get_avatar_link(self, obj):
        return obj.avatar.image_link.url if obj.avatar and obj.avatar.image_link else None

class FriendSerializer(serializers.ModelSerializer):
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True) 

    class Meta:
        model = Users
        fields = ['friends']
