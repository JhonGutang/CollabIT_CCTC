from rest_framework import generics, serializers
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostsSerializer
from .models import Posts

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Posts.objects.all().order_by('-created_at')
    serializer_class = PostsSerializer

    def perform_create(self, serializer):
        try:
            return serializer.save()
        except ValidationError as e:
            raise serializers.ValidationError({"error": str(e)})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = self.perform_create(serializer)  # Save the post instance
        headers = self.get_success_headers(serializer.data)
        return Response(PostsSerializer(post).data, status=status.HTTP_201_CREATED, headers=headers)
