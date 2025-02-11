from rest_framework import serializers
from .models import Conversations, Conversation_Members, Messages

class ConversationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversations
        fields = '__all__'

class ConversationMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation_Members
        fields = '__all__'

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'