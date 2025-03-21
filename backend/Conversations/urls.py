from django.urls import path
from .views import CreateConversationView, MessageListCreateView, MessageDeleteView

urlpatterns = [
    path("create/", CreateConversationView.as_view(), name="create_conversation"),
    path("send-message/", MessageListCreateView.as_view(), name="send_message"),
    path("<int:conversation_id>/messages/", MessageListCreateView.as_view(), name="list_messages"),
    path("messages/<int:id>/delete/", MessageDeleteView.as_view())
]
