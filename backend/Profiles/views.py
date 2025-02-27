from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Users
from .serializers import UserSerializer, FriendUserSerializer, FriendSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.db import models

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        current_user = request.user
        friends = current_user.friends.all()
        queryset = list(friends) + [current_user]  
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
        return Users.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        user = request.user 
        friend_id = request.data.get('friend_id')

        try:
            friend = Users.objects.get(id=friend_id) 
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user.friends.add(friend)
        return Response({"message": "Friend added successfully"}, status=status.HTTP_201_CREATED)
