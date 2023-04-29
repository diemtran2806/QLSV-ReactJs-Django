from django.db import models


class Lecturer(models.Model):
    id_user = models.ForeignKey('users.Users', on_delete=models.CASCADE)
    is_admin = models.BooleanField()
    id_faculty = models.ForeignKey('faculty.Faculty', on_delete=models.CASCADE)
