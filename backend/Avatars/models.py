from django.db import models

# Create your models here.
class Avatars(models.Model):
    name = models.CharField(max_length=255)
    image_link = models.ImageField(upload_to='avatars', blank='true', null='true')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name