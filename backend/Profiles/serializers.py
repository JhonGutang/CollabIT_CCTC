from rest_framework import serializers
from .models import Users, Friends
from django.db import models

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

class FriendUserSerializer(serializers.ModelSerializer):
    avatar_link = serializers.SerializerMethodField()
    
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 
                 'year_level', 'avatar_link', 'is_active', 'date_joined']
    
    def get_avatar_link(self, obj):
        return obj.avatar.image_link.url if obj.avatar and obj.avatar.image_link else None

class FriendSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = Friends
        fields = ['friends']

    def get_friends(self, obj):
        user = self.context['request'].user
        
        # Get all friendships where the current user is either user or friend
        friend_relationships = Friends.objects.filter(
            models.Q(user=user) | models.Q(friend=user)
        ).values_list('user_id', 'friend_id')
        
        # Create a set to avoid duplicate IDs
        friend_ids = set()
        for user_id, friend_id in friend_relationships:
            friend_ids.add(friend_id if user_id == user.id else user_id)
        
        return list(friend_ids)

    def create(self, validated_data):
        user = self.context['request'].user
        friend_id = self.context['request'].data.get('friend_id')
        return Friends.objects.create(user=user, friend_id=friend_id)
