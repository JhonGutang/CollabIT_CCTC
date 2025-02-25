from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from Avatars.models import Avatars
from django.utils import timezone
from django.utils.timezone import now
class UsersManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        user = self.model(email=self.normalize_email(email), username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(email, username, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class Users(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, null=True )
    last_name = models.CharField(max_length=255, null=True)
    email = models.EmailField(unique=True, max_length=255)
    year_level = models.IntegerField(null=True, blank=True)
    avatar = models.ForeignKey(Avatars, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UsersManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']  

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Friends(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="friends")
    friend = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="friend_of")
    created_at = models.DateTimeField(default=now)

    class Meta:
        unique_together = ('user', 'friend')  # Prevent duplicate friendships

    def __str__(self):
        return f"{self.user.username} is friends with {self.friend.username}"

