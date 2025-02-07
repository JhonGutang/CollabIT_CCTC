from rest_framework import generics, serializers
from django.core.exceptions import ValidationError
from .serializers import PostsSerializer
from .models import Posts

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
        except ValidationError as e:
            raise serializers.ValidationError({"error": str(e)})
