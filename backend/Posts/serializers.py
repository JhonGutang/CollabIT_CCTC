from rest_framework import serializers
from .models import Posts, Reactions, Comments
from django.db import models

class PostsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username', read_only=True)
    avatar_link = serializers.CharField(source='user_id.avatar.image_link', read_only=True)
    reactions_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    reaction_id = serializers.SerializerMethodField()

    class Meta:
        model = Posts
        fields = '__all__'
        extra_fields = ['username', 'avatar_link', 'reactions_count', 'comments_count', 'reaction_id']

    def get_reactions_count(self, obj):
        return obj.reactions_set.count()
    
    def get_comments_count(self, obj):
        return obj.comments_set.count()

    def get_reaction_id(self, obj):
        user = self.context['request'].user
        reaction = obj.reactions_set.filter(user_id=user.id).first()
        return reaction.id if reaction else None 


    def validate(self, data):
        if not data.get('content') and not data.get('image_link') and not data.get('video_link'):
            raise serializers.ValidationError({
                "required_field": "At least one of 'content', 'image_link', or 'video_link' must be provided."
            })
        return data

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reactions
        fields = '__all__'
class CommentsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username', read_only=True)
    class Meta:
        model = Comments
        fields = ['id', 'user_id', 'username', 'post_id', 'content', 'image_link']
        read_only_fields = ['user_id']
