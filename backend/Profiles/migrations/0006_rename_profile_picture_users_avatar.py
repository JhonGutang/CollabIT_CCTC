# Generated by Django 5.1.6 on 2025-02-18 03:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Profiles', '0005_rename_avatar_users_profile_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='profile_picture',
            new_name='avatar',
        ),
    ]
