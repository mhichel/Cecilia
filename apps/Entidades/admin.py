from django.contrib import admin

from apps.Entidades.models import aplicacion, cargo, bodega, persona, eliminacion_aplicacion, creacion_aplicacion, usuario
# Register your models here.
admin.site.register(aplicacion)
admin.site.register(cargo)
admin.site.register(bodega)
admin.site.register(persona)
admin.site.register(eliminacion_aplicacion)
admin.site.register(creacion_aplicacion)
admin.site.register(usuario)
