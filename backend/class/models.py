from django.db import models

class Class(models.Model):
    id_class = models.AutoField(primary_key=True)
    class_name = models.CharField(max_length=255)
    id_lecturer = models.ForeignKey('lecturer.Lecturer', on_delete=models.CASCADE)

    def _str_(self):
        return self.class_name