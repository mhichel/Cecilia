from django.db import models
from django.utils import timezone

# Create your models here.
class centro(models.Model):
    sede = models.CharField(max_length=50)

    def __str__(self):
        return "{}".format(self.sede)


class aplicacion(models.Model):
    nombre_aplicacion = models.CharField(max_length=100)

    def __str__(self):
        return "{}".format(self.nombre_aplicacion)

class cargo(models.Model):
    nombre_cargo = models.CharField(max_length=100)

    def __str__(self):
        return "{}".format(self.nombre_cargo)

class ubicacion(models.Model):
    ubicacion_actual = models.CharField(max_length=50)

    def __str__(self):
        return "{}".format(self.ubicacion_actual)

class historico_creacion_persona(models.Model):
    hora = models.DateTimeField(auto_now_add=True)
    persona = models.CharField(max_length=100)
    aplicaciones = models.CharField(max_length=500)
    cargo = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=100)
    centro = models.CharField(max_length=100)


class historico_eliminacion_persona(models.Model):
    hora = models.DateTimeField(auto_now_add=True)
    persona = models.CharField(max_length=100)
    aplicaciones = models.CharField(max_length=500)
    cargo = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=100)
    centro = models.CharField(max_length=100)




class persona(models.Model):
    nombre_completo = models.CharField(max_length=100)
    aplicaciones = models.ManyToManyField(aplicacion)
    cargo = models.ForeignKey(cargo, on_delete=models.CASCADE)
    ubicacion = models.ForeignKey(ubicacion, on_delete=models.CASCADE)
    centro = models.ForeignKey(centro, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.nombre_completo)

class usuario(models.Model):
    usuario = models.CharField(max_length=50, unique=False)
    persona_relacionada = models.ForeignKey(persona, on_delete=models.CASCADE)
    aplicacion_relacionada = models.ManyToManyField(aplicacion)
    ticket = models.IntegerField()

    def __str__(self):
        return "{}".format(self.usuario)


class eliminacion_aplicacion(models.Model):
    ticket = models.IntegerField()
    persona_relacionada = models.CharField(max_length=50)
    aplicacion_relacionada = models.CharField(max_length=50)
    usuario = models.CharField(max_length=50)
    hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.persona_a_eliminar)

class creacion_aplicacion(models.Model):
    ticket = models.IntegerField()
    persona_relacionada = models.CharField(max_length=50)
    aplicacion_relacionada = models.CharField(max_length=50)
    usuario = models.CharField(max_length=50)
    hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.persona_a_crear)
