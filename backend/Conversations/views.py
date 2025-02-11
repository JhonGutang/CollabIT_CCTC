from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conversations, Types, Conversation_Members, Messages
from .serializers import ConversationsSerializer, MessagesSerializer
from django.contrib.auth.models import User

class CreateConversationView(APIView):
    def post(self, request):
        type = request.data.get('type', Types.private.value)
        recipient_id = request.data.get('recipient_id')
        sender_id = request.user.id  

        existing_conversation = Conversations.objects.filter(
            type=type,
            conversation_members__user_id_id=sender_id
        ).filter(
            conversation_members__user_id_id=recipient_id
        ).distinct()

        if existing_conversation.exists():
            serializer = ConversationsSerializer(existing_conversation.first())
            return Response({'can_chat': True, 'conversation': serializer.data}, status=status.HTTP_200_OK)

        conversation = Conversations(type=type)
        conversation.save()
        
        Conversation_Members.objects.create(conversation_id=conversation, user_id_id=sender_id)
        Conversation_Members.objects.create(conversation_id=conversation, user_id_id=recipient_id)

        serializer = ConversationsSerializer(conversation)
        return Response({'can_chat': True, 'conversation': serializer.data}, status=status.HTTP_201_CREATED)

class CreateAndListMessagesView(APIView):
    def post(self, request):
        sender_id = request.user.id
        conversation_id = request.data.get('conversation_id')
        message = request.data.get('message')

        if not conversation_id or not message:
            return Response({'error': 'Conversation ID and message are required.'}, status=status.HTTP_400_BAD_REQUEST)

        message_data = {
            'sender_id': sender_id,
            'conversation_id': conversation_id,
            'message': message
        }

        serializer = MessagesSerializer(data=message_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, conversation_id):
        user_id = request.user.id

        is_member = Conversation_Members.objects.filter(
            conversation_id=conversation_id,
            user_id=user_id
        ).exists()

        if not is_member:
            return Response({'error': 'You are not a member of this conversation.'}, status=status.HTTP_403_FORBIDDEN)

        messages = Messages.objects.filter(conversation_id=conversation_id)
        serializer = MessagesSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


