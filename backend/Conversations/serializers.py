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
    avatar_link = serializers.SerializerMethodField()

    class Meta:
        model = Messages
        fields = '__all__'

    def get_avatar_link(self, obj):
        if obj.sender_id and obj.sender_id.avatar:
            return obj.sender_id.avatar.image_link.url if obj.sender_id.avatar.image_link else None
        return None
