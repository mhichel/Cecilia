function iniciar_ajax_busquedas(){
  //FILTROS DE ORDENADO**************************************************************
  //aqui obtenemos en una variable los botones que tengan la clase de filtro de ordenado, para que con un for se les ponga ala escucha de la funcion de busqeuda anidada, ya que alli seran evaluados y usados
  var order_by = document.getElementsByClassName('boton_filtro_ordenado');
  for (var i = 0; i < order_by.length; i++) {
    order_by[i].addEventListener('click', inicializar_ajax_busqueda_anidada, false)
  }
  //ESTE ES LA FUNCION DEL FILTRO QUE QUITA LOS DEMAS FILTROS
  var quitar_filtro = document.getElementById('quitar_filtro');
  quitar_filtro.addEventListener('click', inicializar_ajax_busqueda_anidada, false)
  //ESTE ES LA FUNCION DEL FILTRO QUE QUITA LOS DEMAS FILTROS

  //FILTROS DE ORDENADO**************************************************************

  //BUSCADOR CON FILTROS**************************************************************
  var tbody_listar_personas = document.getElementById('cuerpo_del_listado');
  var peticionHTTP_busqueda_anidada;
  var centro = document.getElementById('centro');
  var ubicacion = document.getElementById('bodegas');
  var nombre_completo = document.getElementById('nombre_completo');
  var cargo = document.getElementById('cargos');
  var aplicacion = document.getElementById('aplicaciones');
  var url = "?";

  centro.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  ubicacion.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  nombre_completo.addEventListener('keyup', inicializar_ajax_busqueda_anidada, false);
  cargo.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  ubicacion.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  nombre_completo.addEventListener('keyup', inicializar_ajax_busqueda_anidada, false);
  cargo.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  aplicacion.addEventListener('change', inicializar_ajax_busqueda_anidada, false);
  //BUSCADOR CON FILTROS***************************************************************

  //BUSCADOR GENERAL*******************************************************************
  var peticionHTTP_busqueda_general;
  var buscador_general = document.getElementById('buscador_general');
  buscador_general.addEventListener('keyup', inicializar_ajax_busqueda_general)
  //BUSCADOR GENERAL*******************************************************************


  /*EXPORTACION A EXCEL DE LAS DOS BUSQUEDAS*/
  //lo que vamos a hacer en esta parte del codigo sera mirar si el campo de busqueda general tiene alguns valor y si es asi entonces que exporte segun ese valor y si no, entonces que exporte segun los valores de filtrado de la tabla

  //primero obtenemos el boton que estara a la escucha del evento click el cual ejecutara la funcion requerida
  var exportar_excel = document.getElementById('exportar_excel');

  //luego lo ponemos a la escucha del evento click para que ejecute la funcion de validacion de que funcion ejecutara
  exportar_excel.addEventListener('click', validacion_expotar_excel, false);

  function validacion_expotar_excel(evento_boton_exportar_excel) {
    //aqui validamos si el input de busqueda general tiene algun valor, y si es asi entonces se ejecutara la la URL con los valores pasados en busqeuda general
    if (buscador_general.value) {
      //a la variable URL le pondremos el valor del input de busqueda general y tambien el valor de exportacion a excel que sera que si
      url+=`query_gral=${buscador_general.value}&exportacion_a_excel=si`;
      console.log("URL para el excel")
      console.log(url)
      //despues mandamos la URL por medio de windows.location para que no se vaya por ajax y no sea tan dificil recibir la informacion
      window.location='busquedas_con_filtros/' + url;
      // y luego limpiamos la variable URL
      url="?";
    // de lo contrario entonces se iniciara la funcion de busqueda con filtros y le pasamos por parametro el evento del click al boton de exportar en excel
    }else {
      //y dentro de esta funcion validara si lo que se quiere es exportar y si es asi entonces traera el archivo
      inicializar_ajax_busqueda_anidada(evento_boton_exportar_excel);
    }
  }

  /*EXPORTACION A EXCEL DE LAS DOS BUSQUEDAS*/





  //FUNCION PARA EL ENVIO DE DATOS POR AJAX DEL INPUT EN LA BUSQUEDA GENERAL***********************************************************************
  function inicializar_ajax_busqueda_general(e) {
    //SEGUN EL NAVEGADOR CHROME O MOZILLA O SI ES INTERNET EXPLORER, HACE LA PETICION
    if (window.XMLHttpRequest){
			peticionHTTP_busqueda_general = new XMLHttpRequest();
		}else{
			peticionHTTP_busqueda_general = new ActiveXObject("Microsoft.XMLHTTP")
		}

    //AQUI HACE LA FUNCION DE CUANDO CAMBIA ES EL ESTADO DE LA PETICION Y SI EL ESTADO DE LISTO ESTA EN 4 Y EL STATUS 200, PUES PONE LA PETICION EN LA TABLA
		peticionHTTP_busqueda_general.onreadystatechange = function(){
			console.log("hay algun problema")
			if (peticionHTTP_busqueda_general.readyState === 4 && peticionHTTP_busqueda_general.status === 200) {
        tbody_listar_personas.innerHTML = peticionHTTP_busqueda_general.responseText;
        iniciar_ajax_crear_aplicacion();
        iniciar_ajax_crear_persona();
        iniciar_ajax_editar_persona();
        iniciar_ajax_eliminar_persona();
        iniciar_ajax_eliminar_persona_aplicacion();
			}
		}

    //CON ESTA FUNCION LE PASAMOS LOS PARAMETROS PARA QUE URL VA A ENVIAR LOS DATOS Y QUE DATOS
		function enviar_peticion_search_general(data){
			peticionHTTP_busqueda_general.open('GET', 'busquedas_con_filtros/'+ data, true)
			peticionHTTP_busqueda_general.send();
      //aqui limpiamos la variable URL para que vuelva a validar i enviar informacion despues
      url="?";
		}
    //AQUI HACEMOS Y OBTENEMOS LO DATOS QUE SE VAN A ENVIAR A LA URL
    if (buscador_general.value){
      url+=`query_gral=${buscador_general.value}`
      console.log(buscador_general.value);
    }

    //AQUI LLAMAMOS LA FUNCION PCON LOS DATOS OBTENIDOS
    enviar_peticion_search_general(url);
  }
  //FUNCION PARA EL ENVIO DE DATOS POR AJAX DEL INPUT EN LA BUSQUEDA GENERAL***********************************************************************



  //ESTA ES LA FUNCION DE AJAX DE LA BUSQEUDA ANIDADA*******************************************************************************************************
  function inicializar_ajax_busqueda_anidada(e) {
    //AQUI EVALUAMOS SI PRESIONAMOS EL BOTON DE QUITAR FILTRO, SI FUE ASI ENTONCES CAMBIAMOS TODAS LAS FOTOS DE LOS FILTROS, PARA QUE SE VEA QUE SI LOS QUITAMOS
    if (e.target.id === "quitar_filtro") {
      for (var i = 0; i < order_by.length; i++){
        order_by[i].setAttribute('src', '/static/img/filtro_de_ordenar.gif');
        order_by[i].setAttribute('alt', 'filtro_ordenar')
      }
    }
    //AQUI EVALUAMOS SI PRESIONAMOS EL BOTON DE QUITAR FILTRO, SI FUE ASI ENTONCES CAMBIAMOS TODAS LAS FOTOS DE LOS FILTROS, PARA QUE SE VEA QUE SI LOS QUITAMOS

    if (e.target.classList.value === "boton_filtro_ordenado") {
      //EVALUA SI ENTRO UN BOTON DE FILTRO DE ORDENADO**************************************************************************************************
      //AQUI HACE UN FOR PARA TODOS LOS FILTROS Y EVALUA SI YA HAY UNO QUE ESTE ACTIVO Y SI VAMOS A ACTIVAR OTRO, ENTONCES QUE LO QUITE
      for (var i = 0; i < order_by.length; i++) {
        if (order_by[i].id == e.target.id) {
          //no hace nada
        }else{
          //CAMBIA LA IMAGEN A FILTRO SIN NADA
          order_by[i].setAttribute('src', '/static/img/filtro_de_ordenar.gif');
          order_by[i].setAttribute('alt', 'filtro_ordenar')
        }
      }

      //SI LA IMAGEN TIENE UN ALT DE FILTRO HACIA ABAJO, LO CAMBIA HACIA ARRIBA
      if (e.target.alt === 'filtro_ordenar_abajo') {
          e.target.setAttribute('src', '/static/img/filtro_de_ordenar_arriba.gif');
          e.target.setAttribute('alt', 'filtro_ordenar_arriba')
      }else{
        e.target.setAttribute('src', '/static/img/filtro_de_ordenar_abajo.gif');
        e.target.setAttribute('alt', 'filtro_ordenar_abajo')
      }
      //EVALUA SI ENTRO UN BOTON DE FILTRO DE ORDENADO******************************************************************************************************

    }


    //AQUI EVALUA SEGUN EL NAVEGADOR CON QUE HAYAMOS ABIERTO LA APLICACION, HACE LA PETICION DE AJAX
    if (window.XMLHttpRequest){
			peticionHTTP_busqueda_anidada = new XMLHttpRequest();
		}else{
			peticionHTTP_busqueda_anidada = new ActiveXObject("Microsoft.XMLHTTP")
		}

    //AQUI HACEMOS LA FUNCION DE EL CAMBIO DEL ESTADO DE LA PETICION AJAX, SI ESTA EN EL ESTADO DE LISTO 4 Y EL ESTADO DE LA PETICION EN 200, ENTONCES PONDRA EL RESPONSE DE LA PETICION EN LA TABLA
		peticionHTTP_busqueda_anidada.onreadystatechange = function(){
			console.log("hay algun problema")
			if (peticionHTTP_busqueda_anidada.readyState === 4 && peticionHTTP_busqueda_anidada.status === 200) {
        tbody_listar_personas.innerHTML = peticionHTTP_busqueda_anidada.responseText;
        iniciar_ajax_crear_aplicacion();
        iniciar_ajax_crear_persona();
        iniciar_ajax_editar_persona();
        iniciar_ajax_eliminar_persona();
        iniciar_ajax_eliminar_persona_aplicacion();
			}
		}

    //CON ESTA FUNCION LE ENVIAMOS QUE TIPO DE DATOS Y QUE DATOS SE VANA ENVIAR A QUE URL
		function enviar_peticion_search_anidado(data){
			peticionHTTP_busqueda_anidada.open('GET', 'busquedas_con_filtros/'+ data, true)
			peticionHTTP_busqueda_anidada.send();
      //aqui limpiamos la variable URL para que vuelva a validar i enviar informacion despues
      url="?";
		}

    //AQUI OBTENEMOS LOS DATOS Y LOS METEMOS EL VAR URL, EN LA CUAL SE VA A PASAR POR PARAMETRO A LA FUNCION ANTERIOR
    if (centro.value) {
      url+=`centro=${centro.value}`
    }
    if (ubicacion.value) {
      url+=`&ubicacion=${ubicacion.value}`
    }
    if (nombre_completo.value){
      url+=`&nombre_completo=${nombre_completo.value}`
    }
    if (cargo.value) {
      url+=`&cargo=${cargo.value}`
    }
    if (aplicacion.value){
      url+=`&aplicacion=${aplicacion.value}`
    }
    //AQUI EVALUA LA PARTE DEL FILTRO Y SI VA HACIA ARRIBA O HACIA ABAJO
    if (e.target.classList.value === "boton_filtro_ordenado") {
      if (e.target.alt === "filtro_ordenar_abajo") {
        url+=`&ordenado=${e.target.name}&direccion_filtro=acendente`
      }else if(e.target.alt === "filtro_ordenar_arriba"){
        url+=`&ordenado=${e.target.name}&direccion_filtro=desendente`
      }
    }
    //AQUI EVALUA LA PARTE DEL FILTRO Y SI VA HACIA ARRIBA O HACIA ABAJO

    //AQUI EVALUAMOS LO DE SI PRESIONAMOS EL BOTON DEL QUITADO DEL FILTRO O NO
    if (e.target.id === "quitar_filtro") {
      url+="&quitar_filtro=si"
    }
    //AQUI EVALUAMOS LO DE SI PRESIONAMOS EL BOTON DEL QUITADO DEL FILTRO O NO

    //aqui vamos a evaluar si lo que presionamos fue el boton de exportacion a excel, y si es asi entonces lo que hara sera utilizar el comando window.location, para asi enviar los datos ala URL sin utilizar AJAX, ya que lo que queremos traer es un archivo .XLS
    if (e.target.id=="exportar_excel") {
      //entonces que le agrege a la URL el parametro de que si se quiere exportar a excel
      url+="&exportacion_a_excel=si"
      //y luego enviamos toda la informacion a la URL directamente sin AJAX a Django
      console.log("URL para el excel")
      console.log(url)
      window.location='busquedas_con_filtros/'+ url
      // y luego limpiamos la variable URL
      url="?";
    }else{
      //AQUI LLAMAMOS LA FUNCION Y LE PASAMOS LOS DATOS A ENVIAR
      enviar_peticion_search_anidado(url)
    }

  }
  //ESTA ES LA FUNCION DE AJAX DE LA BUSQEUDA ANIDADA*******************************************************************************************************
}


window.addEventListener('load', iniciar_ajax_busquedas, false)
