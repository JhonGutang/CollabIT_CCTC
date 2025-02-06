from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=100)
    
def __str__(self):
    return self.name
    
class Friends(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    
    
