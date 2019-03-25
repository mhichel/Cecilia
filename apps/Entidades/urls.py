from django.conf.urls import url
from apps.Entidades.views import listar_personas, busquedas_con_filtros, home, crear_persona_aplicacion, crear_persona, eliminar_persona, editar_persona, eliminar_aplicacion_persona, busqueda_historico_personas_creadas, listar_historico_personas_creadas, listar_historico_personas_eliminadas, busqueda_historico_personas_eliminadas, listar_historico_aplicaciones_creadas, busqueda_historico_aplicaciones_creadas, listar_historico_aplicaciones_eliminadas, busqueda_historico_aplicaciones_eliminadas

urlpatterns = [
	url(r'^$', home, name="home"),
	url(r'crear_persona', crear_persona, name="crear_persona"),
	url(r'busquedas_con_filtros', busquedas_con_filtros, name="busquedas_con_filtros"),
	url(r'crear_aplicacion_persona', crear_persona_aplicacion, name="crear_persona_aplicacion"),
	url(r'eliminar_persona', eliminar_persona, name="eliminar_persona"),
	url(r'editar_persona', editar_persona, name="editar_persona"),
	url(r'eliminar_aplicacion_persona', eliminar_aplicacion_persona, name="eliminar_aplicacion_persona"),
	url(r'listar_historico_personas_creadas', listar_historico_personas_creadas, name="listar_historico_personas_creadas"),
	url(r'busqueda_historico_personas_creadas', busqueda_historico_personas_creadas, name="busqueda_historico_personas_creadas"),
	url(r'listar_historico_personas_eliminadas', listar_historico_personas_eliminadas, name="listar_historico_personas_eliminadas"),
	url(r'busqueda_historico_personas_eliminadas', busqueda_historico_personas_eliminadas, name="busqueda_historico_personas_eliminadas"),
	url(r'listar_historico_aplicaciones_creadas', listar_historico_aplicaciones_creadas, name="listar_historico_aplicaciones_creadas"),
	url(r'busqueda_historico_aplicaciones_creadas', busqueda_historico_aplicaciones_creadas, name="busqueda_historico_aplicaciones_creadas"),
	url(r'listar_historico_aplicaciones_eliminadas', listar_historico_aplicaciones_eliminadas, name="listar_historico_aplicaciones_eliminadas"),
	url(r'busqueda_historico_aplicaciones_eliminadas', busqueda_historico_aplicaciones_eliminadas, name="busqueda_historico_aplicaciones_eliminadas"),
	url(r'listar_personas', listar_personas, name="listar_personas"),#esta de listar persona, me toco dejarla en la parte ultima de las urls por que estaba generando un conflicto con las demas URLS, por que cuando le daba en el boton que me mandara a una URL que estuviera abajo de esta, traia y manda la de listar personas y no la url que no habia pepido, por eso la deje en la ultima parte
]
