from django.db import models

class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=10)
    id_role = models.ForeignKey('roles.Roles', on_delete=models.CASCADE)
    cccd = models.CharField(max_length=20)
    gender = models.BooleanField()
    dob = models.DateField()
    avatar = models.CharField(max_length=255)

    def _str_(self):
        return self.username