from rest_framework import generics, serializers
from django.core.exceptions import ValidationError
from rest_framework.response import Response
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
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        updated_queryset = self.get_queryset()
        updated_data = PostsSerializer(updated_queryset, many=True).data
        return Response(updated_data)

