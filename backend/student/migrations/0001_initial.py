# Generated by Django 4.2 on 2023-04-18 11:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Class', '0001_initial'),
        ('users', '0006_rename_username_users_mssv_users_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('avg_score', models.FloatField()),
                ('id_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Class.class')),
            ],
        ),
    ]
