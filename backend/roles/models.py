from django.db import models

class Roles(models.Model):
    id_role = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=255)

    def _str_(self):
        return self.role_name