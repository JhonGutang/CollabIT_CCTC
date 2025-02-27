import json
import base64
import os
from django.core.files.base import ContentFile
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils.crypto import get_random_string
from django.contrib.auth.models import AnonymousUser
from .models import Messages, Conversation_Members, Conversations
from asgiref.sync import sync_to_async
from django.conf import settings

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

    async def receive(self, text_data):
        """Receive messages from WebSocket, save to DB, and broadcast."""
        data = json.loads(text_data)
        message_text = data.get("message", "").strip()
        image_data = data.get("image", None)  # Base64-encoded image
        user = self.scope["user"]
        
        if not message_text and not image_data:
            return  # Ignore empty messages
        
        image_link = None
        if image_data:
            # Extract base64 and file extension
            format, imgstr = image_data.split(";base64,")
            ext = format.split("/")[-1]
            random_str = get_random_string(8)
            file_name = f"message_{user.id}_{self.conversation_id}_{random_str}.{ext}"
            file_path = os.path.join("messages/images", file_name)

            # Save image to media folder
            full_path = os.path.join(settings.MEDIA_ROOT, file_path)
            with open(full_path, "wb") as f:
                f.write(base64.b64decode(imgstr))
            
            image_link = file_path

        message_obj = await sync_to_async(Messages.objects.create)(
            sender_id=user,
            conversation_id_id=self.conversation_id,
            message=message_text,
            image_link=image_link if image_link else None,
        )

        # Broadcast message
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "id": message_obj.id,
                "message": message_text,
                "image_link": image_link if image_link else "",
                "sender_id": user.id,
            },
        )

    async def chat_message(self, event):
        """Send the received message to WebSocket clients."""
        await self.send(text_data=json.dumps({
            "id": event["id"],
            "message": event["message"],
            "image_link": event["image_link"],
            "sender_id": event["sender_id"],
        }))

    async def disconnect(self, close_code):
        """Remove the user from the conversation group when disconnected."""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
