# Generated by Django 4.2 on 2023-04-18 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_users_dob'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='username',
            new_name='mssv',
        ),
        migrations.AddField(
            model_name='users',
            name='address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='users',
            name='avatar',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='cccd',
            field=models.CharField(blank=True, max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='password',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
