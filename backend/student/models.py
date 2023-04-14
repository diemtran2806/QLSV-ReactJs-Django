from django.db import models

class Student(models.Model):
    id_user = models.ForeignKey('users.Users', on_delete=models.CASCADE)
    id_class = models.ForeignKey('class.Class', on_delete=models.CASCADE)
    avg_score = models.FloatField()