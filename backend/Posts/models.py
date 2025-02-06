from django.db import models
from Profiles.models import Users
# Create your models here.
class Posts(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image_link = models.URLField(max_length=500, blank=True, null=True) 
    video_link = models.URLField(max_length=500, blank=True, null=True) 
    
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