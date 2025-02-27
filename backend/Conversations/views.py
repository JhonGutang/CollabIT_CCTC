from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

from .models import Conversations, Types, Conversation_Members, Messages
from .serializers import ConversationsSerializer, MessagesSerializer
from django.contrib.auth.models import User


class CreateConversationView(generics.CreateAPIView):
    serializer_class = ConversationsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        type = request.data.get('type', Types.private.value)
        recipient_id = request.data.get('recipient_id')
        sender_id = request.user.id  

        if not recipient_id:
            return Response({"error": "Recipient ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        existing_conversation = Conversations.objects.filter(
            type=type,
            conversation_members__user_id_id=sender_id
        ).filter(
            conversation_members__user_id_id=recipient_id
        ).distinct()

        if existing_conversation.exists():
            serializer = self.get_serializer(existing_conversation.first())
            return Response({'can_chat': True, 'conversation': serializer.data}, status=status.HTTP_200_OK)

        conversation = Conversations.objects.create(type=type)

        Conversation_Members.objects.bulk_create([
            Conversation_Members(conversation_id=conversation, user_id_id=sender_id),
            Conversation_Members(conversation_id=conversation, user_id_id=recipient_id),
        ])

        serializer = self.get_serializer(conversation)
        return Response({'can_chat': True, 'conversation': serializer.data}, status=status.HTTP_201_CREATED)


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessagesSerializer
    authentication_classes = [TokenAuthentication]  
    permission_classes = [permissions.IsAuthenticated]  

    def get_queryset(self):
        """
        Ensure only conversation members can view messages.
        """
        conversation_id = self.kwargs.get('conversation_id')
        user_id = self.request.user.id

        if not Conversation_Members.objects.filter(conversation_id=conversation_id, user_id=user_id).exists():
            raise ValidationError({"error": "You are not a member of this conversation."})

        return Messages.objects.filter(conversation_id=conversation_id)

    def perform_create(self, serializer):
        """
        Save the message with the authenticated user as the sender.
        """
        conversation_id = self.request.data.get('conversation_id')
        message = self.request.data.get('message')

        if not conversation_id or not message:
            raise ValidationError({"error": "Conversation ID and message are required."})

        serializer.save(sender_id=self.request.user)
