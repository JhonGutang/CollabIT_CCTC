from django.db import models
from Profiles.models import Users
from django.core.exceptions import ValidationError
from django.db import models

class Posts(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    content = models.CharField(max_length=255, blank=True, null=True)
    image_link = models.ImageField(upload_to='posts/images/', blank=True, null=True) 
    video_link = models.FileField(upload_to='posts/videos/', blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def clean(self):
        if not self.content and not self.image_link and not self.video_link:
            raise ValidationError("At least one of 'content', 'image', 'video', 'image_link', or 'video_link' must be provided.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class Comments(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image_link = models.URLField(max_length=500, blank=True, null=True) 

class Replies(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comments, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image_link = models.URLField(max_length=500, blank=True, null=True) 

class Reactions(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comments, on_delete=models.CASCADE)