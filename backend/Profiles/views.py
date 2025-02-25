from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Users, Friends
from .serializers import UserSerializer, FriendSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.db import models

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        current_user = request.user
        queryset = self.get_queryset().exclude(id=current_user.id)
        return Response(UserSerializer(queryset, many=True).data, status=status.HTTP_200_OK)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            avatar_link = user.avatar.image_link.url if user.avatar and user.avatar.image_link else None
            return Response({
                "message": "Login successful",
                "token": token.key,
                "id": user.id,
                "username": user.username,
                "avatar_link": avatar_link
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Invalid credentials"
            }, status=status.HTTP_400_BAD_REQUEST)


class UserUpdateView(generics.UpdateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated] 
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FriendListCreateView(generics.ListCreateAPIView):
    serializer_class = FriendSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Friends.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer({})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        friend_id = request.data.get('friend_id')
        
        try:
            friend = Users.objects.exclude(id=request.user.id).get(id=friend_id)
        except Users.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        friendship_exists = Friends.objects.filter(
            (models.Q(user=request.user) & models.Q(friend=friend)) |
            (models.Q(user=friend) & models.Q(friend=request.user))
        ).exists()

        if friendship_exists:
            return Response({"message": "Friendship already exists"}, 
                          status=status.HTTP_400_BAD_REQUEST)

        friendship = Friends.objects.create(user=request.user, friend=friend)
        serializer = self.get_serializer(None)
        return Response({
            "message": "Friend added successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


