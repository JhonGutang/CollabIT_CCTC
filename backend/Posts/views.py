from rest_framework import generics, serializers
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import PostsSerializer, ReactionSerializer, CommentsSerializer
from .models import Posts, Reactions, Comments

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
        serializer = self.get_serializer(data=request.data, context={'request': request}) 
        serializer.is_valid(raise_exception=True)
        post = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
    
        return Response(
            PostsSerializer(post, context={'request': request}).data,  
            status=status.HTTP_201_CREATED,
            headers=headers
        )

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
    
    
class ReactionListCreateView(generics.ListCreateAPIView):
    quweryset = Reactions.objects.all()
    serializer_class = ReactionSerializer

class ReactionDeleteView(generics.DestroyAPIView):
    queryset = Reactions.objects.all()
    serializer_class = ReactionSerializer

    def perform_destroy(self, instance):
        instance.delete()

    def delete(self, request, *args, **kwargs):
        reaction = self.get_object()
        self.perform_destroy(reaction)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post_id')
        
        try:
            post = Posts.objects.get(id=post_id)
        except Posts.DoesNotExist:
            raise serializers.ValidationError({"error": "Post not found"})

        serializer.save(user_id=self.request.user, post_id=post)

class CommentListView(generics.ListAPIView):
    serializer_class = CommentsSerializer
    def get_queryset(self):
        post_id = self.kwargs.get('post_id') 
        return Comments.objects.filter(post_id=post_id).order_by('-id')  
    
class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()
    lookup_field = 'id'
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    lookup_field = 'id'
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
