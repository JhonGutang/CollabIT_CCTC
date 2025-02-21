from django.urls import path
from .views import CreateConversationView, CreateAndListMessagesView

urlpatterns = [
    path("create/", CreateConversationView.as_view(), name="create_conversation"),
    path("send-message/", CreateAndListMessagesView.as_view(), name="send_message"),
    path("<int:conversation_id>/messages/", CreateAndListMessagesView.as_view(), name="list_messages"),
]
