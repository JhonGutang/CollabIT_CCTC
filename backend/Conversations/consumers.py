import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from .models import Messages, Conversation_Members, Conversations
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Authenticate user and add them to the correct conversation group."""
        user = self.scope["user"]
        
        if isinstance(user, AnonymousUser): 
            await self.close()
            return

        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        is_member = await sync_to_async(Conversation_Members.objects.filter)(
            conversation_id=self.conversation_id, user_id=user.id
        )

        if not await sync_to_async(is_member.exists)():
            await self.close() 
            return

        self.room_group_name = f"conversation_{self.conversation_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"User {user.id} connected to room {self.room_group_name}")

    async def receive(self, text_data):
        """Receive messages from WebSocket, save to DB, and broadcast."""
        data = json.loads(text_data)
        message_text = data.get("message")
        user = self.scope["user"]
        
        if not message_text.strip():
            return

        message = await sync_to_async(Messages.objects.create)(
            sender_id=user, conversation_id_id=self.conversation_id, message=message_text
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message_text,
                "sender_id": user.id
            },
        )

    async def chat_message(self, event):
        """Send the received message to WebSocket clients."""
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender_id": event["sender_id"]
        }))

    async def disconnect(self, close_code):
        """Remove the user from the conversation group when disconnected."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"User {self.scope['user'].id} disconnected from room {self.room_group_name}")
