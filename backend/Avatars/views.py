from rest_framework import generics
from .models import Avatars
from .serializers import AvatarSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class AvatarListCreateView(generics.ListCreateAPIView):
    queryset = Avatars.objects.all()
    serializer_class = AvatarSerializer

    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated] 