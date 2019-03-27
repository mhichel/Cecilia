from django.conf.urls import url
from apps.autenticacion.views import logeo

urlpatterns = [
	url(r'login', logeo, name="logeo"),
]
