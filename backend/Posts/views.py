from rest_framework import generics, serializers
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import PostsSerializer
from .models import Posts

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Posts.objects.all().order_by('-created_at')
    serializer_class = PostsSerializer

  
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated] 

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

class PostUpdateView(generics.UpdateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        try:
            serializer.save()
        except ValidationError as e:
            raise serializers.ValidationError({"error": str(e)})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)



class PostDeleteView(generics.DestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    def perform_destroy(self, instance):
        if instance.image_link:
            instance.image_link.delete(save=False) 
        if instance.video_link:
            instance.video_link.delete(save=False)  

        instance.delete()

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        self.perform_destroy(post)
        return Response(status=status.HTTP_204_NO_CONTENT)