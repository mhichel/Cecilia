from django.db import models
from django.utils import timezone
# Create your models here.

    
class usuario_autenticado(models.Model):
    usuario = models.CharField(max_length=100)
    nombre_completo = models.CharField(max_length=100)
    correo = models.EmailField()

    def __str__(self):
        return "{}".format(self.usuario)
