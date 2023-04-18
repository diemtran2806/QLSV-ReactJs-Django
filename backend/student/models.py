from django.db import models


class Student(models.Model):
    id_user = models.OneToOneField('users.Users', on_delete=models.CASCADE, primary_key=True)
    id_class = models.ForeignKey('Class.Class', on_delete=models.CASCADE)
    avg_score = models.FloatField()
