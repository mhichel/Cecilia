function iniciar_ajax_historico_aplicaciones_creadas(){
  /*LIMPIAR FORMULARIO*/
  //aqui vamos a guardar en una variavle el boton de limpiar, el cual va a quitar las fecha singresadas en el formulario de fechas segun la funcion que le pongamos al momento de presionar click
  var boton_limpiar_fechas_historico_aplicaciones_creadas = document.getElementById('limpiar_fechas_historico_aplicaciones_creadas');
  //con esta escucha hacemos que al momento de presionar el boton de limpiar se ejecute una funcon que lo que a hacer es limpiar el formulario de fechas
  boton_limpiar_fechas_historico_aplicaciones_creadas.addEventListener('click', limpia_formulario_de_fechas_aplicaciones_creadas, false);
  //esta es la funcion que va a vuscar por el Id al formualrio y lo va a resetear, le pasamos por parametro el evento, por si algo
  function limpia_formulario_de_fechas_aplicaciones_creadas(e) {
    //aqui buscamos el formulario de fechas y lo reseteamos
    document.getElementById('fechas_inicio_fin_historico_aplicaciones_creadas').reset();
  }
  /*LIMPIAR FORMULARIO*/

  /*EXPORTACION A EXCEL*/
  //aqui vamos a reciclar la funcion de busqueda general, la cual vamos a ejecutar en el momento en que se presione el boton de exportar a excel y lo que va a ser sera el mandar la informacion de personas a Django ydesde Django vamos acrear el Excel el cual vamos a despues a guardar
  //primero creamos la variable que guardara el boton de exportacion a Excel
  var exportar_a_excel_historico_aplicaciones_creadas = document.getElementById('exportar_excel_historico_aplicaciones_creadas');
  //despues vamos a ponerlo a la escucha del evvento click para que ejecute la funcion de inicializar_ajax_busqueda_general_historico_aplicaciones_creadas
  exportar_a_excel_historico_aplicaciones_creadas.addEventListener('click', inicializar_ajax_busqueda_general_historico_aplicaciones_creadas, false);
  /*EXPORTACION A EXCEL*/


  //aqui vamos a guardar en una variable el input de busqeuda general el cual ira ligado con la busqeuda por fechas para hacer mas amigable con el usuario las busquedas
  var boton_busqueda_general_historico_aplicaciones_creadas = document.getElementById('boton_busqueda_general_historico_aplicaciones_creadas');

  //aqui vamos a poner a la escucha el boton de busqeuda general, para que cada vez que se presione una tecla en el input, haga la busqueda de la letra en la BBDD y busque la coindicendia
  boton_busqueda_general_historico_aplicaciones_creadas.addEventListener('keyup', inicializar_ajax_busqueda_general_historico_aplicaciones_creadas, false);

  //CON ESTA FUNCION VAMOS ES SOLO A SACAR Y A CONDICIONAR SI EN EL INPUT SE COLOCO INFORMCION Y SI HYA VALORES DE BUSQUEDA POR FECHAS Y SE RECICLARA EL DEMAS CODIGO PARA ENVIAR LOS datos
  // O SEA SOLAMENTE AQUI SE HARA LA OBTENCION DE LOS DATOS Y SE ENVIARAN A LAS FUNCIONES YA HECHAS EN LA BUSQUEDA POR FECHA
  function inicializar_ajax_busqueda_general_historico_aplicaciones_creadas(e) {
    //vamos a crear una variable llamada data, la cual guardara la URL que le pasaremos a la funcion de envio de datos por AJAX
    var data;
    //aqui vamos a buscar si las fechas tienen algun valor, para que tambien vayan en el parametro de busqueda
    //declaramos las variables con el supuesto valor que tengan, esta es la de fecha de inicio
    var fecha_inicio_historico_creacion_aplicaciones = document.getElementById('fecha_inicio').value;
    //declaramos las variables con el supuesto valor que tengan, esta es la de fecha fin
    var fecha_fin_historico_creacion_aplicaciones = document.getElementById('fecha_fin').value;
    //luego aqui hacemos la condicional que si las fechas tienen algun valor entonces que se les sume las horas minutos y segundos
    // y si no pues que lo mande a la otra parte del codigo que enviara los datos solamente con las letras de busqueda y no con las fechas
    if (fecha_inicio_historico_creacion_aplicaciones && fecha_fin_historico_creacion_aplicaciones) {
      //aqui estamos sumandole las horas minutos y segundos a las variables, solamente si tienen la fecha
      fecha_inicio_historico_creacion_aplicaciones = fecha_inicio_historico_creacion_aplicaciones +" "+ "0" +":"+ "00" +":"+ "00";
      //aqui estamos sumandole las horas minutos y segundos a las variables, solamente si tienen la fecha
      fecha_fin_historico_creacion_aplicaciones = fecha_fin_historico_creacion_aplicaciones +" "+ "23" +":"+ "59" +":"+ "59";

      //aqui validamos si el objetivo de el evento el cual ejecuto la funcion es el boton de exportacion a excel, quiere decir que tendremos que cambiar la variable data para poder agregar el parametro de exportacion a excel
      //lo validamos por medio de el id
      if (e.target.id == "exportar_excel_historico_aplicaciones_creadas") {
        //aqui hacemos la nueva data que se le enviara como parametro a la funcion de envio a AJAX
        data = `fecha_inicio=${fecha_inicio_historico_creacion_aplicaciones}&fecha_fin=${fecha_fin_historico_creacion_aplicaciones}&query_general=${boton_busqueda_general_historico_aplicaciones_creadas.value}&exportacion_a_excel=si`;
        //luego aqui llamamos un HREF para que se nos abra la URL y le pasamos los aprametros, para que haga la descarga de una vez, no es necesario pasarlo por ajax, ya que no se va a recargar la apgina solo se va a descar una archivo
        window.location='busqueda_historico_aplicaciones_creadas/?' + data
      }else{
        //de lo contrario entonces se ejcutara la busqeuda general normalmente
        //despues aqui hacemos la URL, en la cual le pasamos la fecha inicio, fin y el valor que tiene en este momento el input de busqeuda general
        data = `fecha_inicio=${fecha_inicio_historico_creacion_aplicaciones}&fecha_fin=${fecha_fin_historico_creacion_aplicaciones}&query_general=${e.target.value}`;
        //luego de la obtencion de los datos, llamaremos a la funcion de envio de datos por AJAX a Django
        enviar_datos_AJAX_historico_aplicaciones_creadas(data);
        console.log(data)
      }



    //de lo contrario entonces solamente buscara con los parametros de letras indicadas en el input de busqueda general
    }else{
      console.log("no hay fechas ingresadas, solo busca por letras ingresadas");
      //aqui validamos si el objetivo de el evento el cual ejecuto la funcion es el boton de exportacion a excel, quiere decir que tendremos que cambiar la variable data para poder agregar el parametro de exportacion a excel
      //lo validamos por medio de el id
      if (e.target.id == "exportar_excel_historico_aplicaciones_creadas"){
        //aqui hacemos la data adicionandole el parametro de exportacion a excel
        data = `query_general=${boton_busqueda_general_historico_aplicaciones_creadas.value}&exportacion_a_excel=si`;
        //luego aqui llamamos un HREF para que se nos abra la URL y le pasamos los aprametros, para que haga la descarga de una vez, no es necesario pasarlo por ajax, ya que no se va a recargar la apgina solo se va a descar una archivo
        window.location='busqueda_historico_aplicaciones_creadas/?' + data
      }else{
        //aqui obtenemos la informacion a enviar por AJAX a Django y la metemos en la variable data
        data = `query_general=${e.target.value}`;
        //luego aqui llamamos la funcion que envia los datos a Dajngo por AJAX con el parametro de data
        enviar_datos_AJAX_historico_aplicaciones_creadas(data);
        console.log(data)
      }


   }
  }

  //primero vamos a hacer la variable que siempre guardara la peticion HTTP que se envia y que se recibe por AJAX
  var peticionHTTP_busqueda_historico_aplicaciones_creadas;

  //aqui vamos a obtener el pedazo de la tabla el cual reemplazaremos cuando se traigan todos los historicos requeridos segun las fechas
  var tbody_a_actualizar_historico_aplicaciones_creadas = document.getElementById('tbody_historico_aplicaciones_creadas');

  //aqui vamos a obtener el formulario el cual contendra la fecha de inicio y la fecha fin, las cuales seran el parametro de busqqueda de los registros
  var form_historico_creacion_aplicaciones = document.getElementById('fechas_inicio_fin_historico_aplicaciones_creadas');

  //aqui vamos a comenzar a crear con la variable peticionHTTP_busqueda_historico_aplicaciones_creadas, vamos a crear todo lo necesario para el envio y la recepcion de la informacion por AJAX

  //con este condicional lo que estamos haciendo es evaluando de que tipo de navegador es, si es de internet explorer o otro
  if (window.XMLHttpRequest){
    peticionHTTP_busqueda_historico_aplicaciones_creadas = new XMLHttpRequest();
  }else{
    peticionHTTP_busqueda_historico_aplicaciones_creadas = new ActiveXObject("Microsoft.XMLHTTP")
  }

  //luego aqui vamos a hacer la funcion la cual se ejecutara cada vez que el estado de la peticion cambie, si pudo obtener los datos o si no etcetera
  peticionHTTP_busqueda_historico_aplicaciones_creadas.onreadystatechange = function() {
    //aqui haremos una condicional, la cual nos evaluara si la peticion esta en estado 200 y esta lista que seria el 4, quiere decir que pudo obtener los datos
    //entonces haremos el pegado de la informacion obtenida en el tbody que habiamos guardado en una variable anteriormente
    if (peticionHTTP_busqueda_historico_aplicaciones_creadas.readyState === 4 && peticionHTTP_busqueda_historico_aplicaciones_creadas.status === 200) {
      //aqui lo que vamos a hacer es insertar la informacion obtenida en el tbody
      tbody_a_actualizar_historico_aplicaciones_creadas.innerHTML = peticionHTTP_busqueda_historico_aplicaciones_creadas.response;

    }
  }


  //aqui vamos a hacer la funcion, que abrira la peticion y la enviara a Django por medio de ajax
  // le pasaremos por parametro los datos obtenidos de las fechas que serian los parametros para buscar en Django los registros
  function enviar_datos_AJAX_historico_aplicaciones_creadas(data) {
    //esta primera apertura, aqui abrimos la peticion que recibira 3 parametros, el primero es que metodo utilizaremos, el segundo es la url con los datos en la misma
    //por que los estamos enviando a por GET, y el tercer parametro siempre va a hacer true, ya que le estamos indicando que si queremos que la peticion sea asincronica
    peticionHTTP_busqueda_historico_aplicaciones_creadas.open('GET', 'busqueda_historico_aplicaciones_creadas/?' + data, true);
    // y con este tercer comando, le estamos diciendo que envie la peticion
    peticionHTTP_busqueda_historico_aplicaciones_creadas.send()
  }




  //aqui vamos a poner a la escucha el formulario, para que en el momento en que se envie, se ejecute una funcion, la cual va a prevenenir el envio de la informacion
  // y hara el envio de la informacion por AJAX y la traera por el mismo metodo
  form_historico_creacion_aplicaciones.addEventListener('submit', inicializar_ajax_busqueda_historico_aplicaciones_creadas, false);

  function inicializar_ajax_busqueda_historico_aplicaciones_creadas(e){
    //con esto prevenimos el envio del formulario y despues lo manipularemos por aca por AJAX
    e.preventDefault()

    //aqui vamos a obtener los datos de la fecha inicio
    //lo completamos con unos ceros reemplazando la hora minutos y segundos de inicio del dia, ya que estso datos los pide Django para hacer la busqeuda
    fecha_inicio_historico_creacion_aplicaciones = document.getElementById('fecha_inicio').value +" "+ "0" +":"+ "00" +":"+ "00";

    //aqui vamos a obtener los datos de la fecha fin
    //lo completamos al final con un 23 y 59 indicando la hora minutos y segundos finales del dia, ya que estos datos los pide Django para hacer la busqueda
    fecha_fin_historico_creacion_aplicaciones = document.getElementById('fecha_fin').value +" "+ "23" +":"+ "59" +":"+ "59";

    var data = `fecha_inicio=${fecha_inicio_historico_creacion_aplicaciones}&fecha_fin=${fecha_fin_historico_creacion_aplicaciones}`;
    console.log(data)

    //aqui vamos a llamar la funcion que hicimos hace un momento sobre el envio de la informacion por AJAX a Django
    enviar_datos_AJAX_historico_aplicaciones_creadas(data);

  }

}

window.addEventListener('load', iniciar_ajax_historico_aplicaciones_creadas, false)
