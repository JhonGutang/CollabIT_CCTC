from django.urls import path
from .views import AvatarListCreateView

urlpatterns = [
    path('', AvatarListCreateView.as_view()),
]
