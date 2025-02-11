from rest_framework import generics, status
from rest_framework.response import Response
from .models import Users
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        current_user = request.user
        queryset = self.get_queryset().exclude(id=current_user.id).values('id', 'username', 'email')
        return Response(queryset, status=status.HTTP_200_OK)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful",
                "token": token.key,
                "id": user.id,
                "username": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Invalid credentials"
            }, status=status.HTTP_400_BAD_REQUEST)
