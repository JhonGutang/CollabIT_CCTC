from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserListCreateView.as_view()),
    path('login/', views.UserLoginView.as_view()),
]
