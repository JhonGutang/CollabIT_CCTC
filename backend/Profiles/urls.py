from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserListCreateView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('update/', views.UserUpdateView.as_view()),
    path('', views.UserListCreateView.as_view()),
    path('friend/', views.FriendListCreateView.as_view(), name='friend-list-create'),
]
