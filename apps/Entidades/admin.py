from django.contrib import admin

from apps.Entidades.models import aplicacion, cargo, ubicacion, persona, eliminacion_aplicacion, creacion_aplicacion, usuario, centro
# Register your models here.
admin.site.register(centro)
admin.site.register(aplicacion)
admin.site.register(cargo)
admin.site.register(ubicacion)
admin.site.register(persona)
admin.site.register(eliminacion_aplicacion)
admin.site.register(creacion_aplicacion)
admin.site.register(usuario)
