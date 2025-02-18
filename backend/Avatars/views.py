from rest_framework import generics
from .models import Avatars
from .serializers import AvatarSerializer

class AvatarListCreateView(generics.ListCreateAPIView):
    queryset = Avatars.objects.all()
    serializer_class = AvatarSerializer
