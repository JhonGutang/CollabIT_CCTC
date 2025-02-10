# Generated by Django 5.1.6 on 2025-02-10 05:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Posts', '0004_rename_image_path_posts_image_link_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reactions',
            name='comment_id',
        ),
        migrations.AddField(
            model_name='reactions',
            name='post_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Posts.posts'),
        ),
    ]
