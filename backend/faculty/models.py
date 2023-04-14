from django.db import models

class Faculty(models.Model):
    id_faculty = models.AutoField(primary_key=True)
    name_faculty = models.CharField(max_length=255)

    def _str_(self):
        return self.name_faculty