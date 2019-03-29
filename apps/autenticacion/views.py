#Este acceso directo es para poder renderizar las vistas
from django.shortcuts import render

#Con este metodo podemos hacer busquemas mas facilmente como se muestra en la vista de la busqueda general
from django.db.models import Q

#Nos devuelve un objeto resultado, en este caso lo utilizaremos para un archivo de excel
from django.http.response import HttpResponse

from apps.autenticacion.models import usuario_autenticado


def logeo(request):
    estado = ""
    print(request.META)
    print(request.META['USERNAME'])
    print(request.POST)
    estado = ""
    if usuario_autenticado.objects.get(usuario=request.META['USERNAME']):
        estado="logeado"
    else:
        estado="denegado"
    return render(request, "autenticacion/login.html", {'estado':estado})
    
