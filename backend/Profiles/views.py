from rest_framework import generics
from .models import Users
from .serializers import UserSerializer

class UserListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    

