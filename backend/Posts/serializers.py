from rest_framework import serializers
from .models import Posts

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

    def validate(self, data):
        if not data.get('content') and not data.get('image_link') and not data.get('video_link'):
            raise serializers.ValidationError({
                "required_field": "At least one of 'content', 'image_link', or 'video_link' must be provided."
            })
        return data
