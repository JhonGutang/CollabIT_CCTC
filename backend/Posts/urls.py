from django.urls import path
from . import views



urlpatterns = [
    path('', views.PostListCreateView.as_view()),
    path('<int:pk>/delete/', views.PostDeleteView.as_view()),
    path('<int:pk>/update/', views.PostUpdateView.as_view()),
    path('react/', views.ReactionListCreateView.as_view()),
    path('react/<int:pk>', views.ReactionDeleteView.as_view()),
]

