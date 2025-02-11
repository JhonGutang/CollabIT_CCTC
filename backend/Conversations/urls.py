from django.urls import path
from .views import CreateConversationView, CreateAndListMessagesView

urlpatterns = [
    path('create/', CreateConversationView.as_view()),
    path('send-message/', CreateAndListMessagesView.as_view()),
    path('<int:conversation_id>/messages/', CreateAndListMessagesView.as_view()),  # New URL pattern for fetching messages
]
