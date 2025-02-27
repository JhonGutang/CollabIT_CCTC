from django.db import models
from Profiles.models import Users
import enum


class Types(enum.Enum):
    private = 'Private'
    group = 'Group'
    
class Conversations(models.Model):
       type = models.CharField(
        max_length=10,
        choices=[(type.name, type.value) for type in Types], 
        default=Types.private.value,
    )
       
class Conversation_Members(models.Model):
    conversation_id = models.ForeignKey(Conversations, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    
class Messages(models.Model):
    sender_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    conversation_id = models.ForeignKey(Conversations, on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    image_link = models.ImageField(upload_to='messages/images/', blank=True, null=True) 
    video_link = models.ImageField(upload_to='messages/videos/', blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)