from rest_framework import serializers
from .models import Posts
from Profiles.models import Users  # Add this import

class PostsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username', read_only=True)  # Add this line

    class Meta:
        model = Posts
        fields = '__all__'
        extra_fields = ['username']  # Add this line

    def validate(self, data):
        if not data.get('content') and not data.get('image_link') and not data.get('video_link'):
            raise serializers.ValidationError({
                "required_field": "At least one of 'content', 'image_link', or 'video_link' must be provided."
            })
        return data
