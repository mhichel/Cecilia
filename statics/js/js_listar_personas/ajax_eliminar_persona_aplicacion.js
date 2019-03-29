function iniciar_ajax_eliminar_persona_aplicacion(){
  /*NOTIFICACIONES*/
    //primero vamos a obtener el div que guardara la notificacion
    var div_notificacion_eliminar_aplicacion_persona = document.getElementById('notificacion_1');
    //obtenemos la imagen del div de notificaciones
    var imagen_notificacion_eliminar_aplicacion_persona = document.getElementById('imagen_notificacion');
    //obtenemos el texto del div de notificaciones
    var texto_notificacion_eliminar_aplicacion_persona = document.getElementById('texto_notificacion');
  /*NOTIFICACIONES*/






  //vamos a crear la variable que guardara los datos del envio de peticion AJAX.
  var peticionHTTP_eliminar_persona_aplicacion_GET;

  //vamos ha guardar en una variable, los botones que son para eliminar aplicaciones de las personas, para despues iterarlos cada un con un for y ponerlos a al escucha de un click
  var botones_eliminar_persona_aplicacion = document.getElementsByClassName('boton_accion_eliminar_aplicacion');

  //ahora vamos a iterarlos por medio de un for para ponerlos a al escucha del evento click, el cual ejecutara despues una funcion que traera los datos de las aplicaciones
  for (a = 0; a < botones_eliminar_persona_aplicacion.length; a++){
    botones_eliminar_persona_aplicacion[a].addEventListener('click', inicializar_ajax_eliminar_persona_aplicacion_GET, false)
  }


  //ahora vamos ha hacer la funcion, que se ejecutara cuando presionemos un boton de eliminar aplicacion de una persona, y lo que hara esta funcion sera, traer los datos de
  //las aplicaciones agregadas hasta el momento en la persona y nos dara la opcion de cual queremos eliminar, para despues mandar este dato a otra funcion de envio POST
  //recibe por parametro el evento, para asi acceder al id de la persona
  function inicializar_ajax_eliminar_persona_aplicacion_GET(e){
    //aqui vamos ha hacer el obtencion del ID de la persona que queremos eliminarle la aplicacion, para que traiga todas las aplicaciones relacionadas a esta persona
    var id_persona_a_eliminar_aplicacion = e.target.id;
    //aqui vamos  ha obtener el div que contendra el formulario de las aplicaciones a eliminar
    var div_formulario_eliminacion_persona_aplicacion = document.getElementById('div_formulario_eliminacion_persona_aplicacion');

    //ahora vamos a comenzar a hacer la peticion XML segun el tipo de navegador vamos a hacer una condicional, ya que los internet explorer, utilizan Activex
    //aqui evaluaremos segun el tipo de navegador, asi vamos a hacer que la peticion sea compatible con el mismo
    if (window.XMLHttpRequest) {
      //si es chrome
      peticionHTTP_eliminar_persona_aplicacion_GET =  new XMLHttpRequest();
    }else{
      //si es internet explorer
      peticionHTTP_eliminar_persona_aplicacion_GET = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //ahora haremos la funcion que se ejecutara cuando el estado de la peticion cambie.
    peticionHTTP_eliminar_persona_aplicacion_GET.onreadystatechange = function() {
      //aqui ponemos lo que uqremos que se ejecute cuando el estado de la peticion este en proceso o no haya podido ejecutarse o obtener correctamente

      //aqui vamos a poner una condicional, la cual nos dira que si el estado de la peticion es 200 y esta lista que es 4, entonces quiere decir que la peticon obtuvo los datos correctamente
      //entonces que se ejecute el codigo que se encuentra dentro de la condicional
      if (peticionHTTP_eliminar_persona_aplicacion_GET.readyState === 4 && peticionHTTP_eliminar_persona_aplicacion_GET.status === 200) {
        //aqui vamos a insertar dentro del div del formulario que guardamos anteriormente en una variable, vamos a gardar el formulario que trajimos poc AJAX desde Django
        div_formulario_eliminacion_persona_aplicacion.innerHTML = peticionHTTP_eliminar_persona_aplicacion_GET.response;

        //y aqui vamos a ejecutar ahora la funcion de el envio de datos de aplicaciones a eliminar por POST, inicializar_ajax_eliminar_persona_aplicacion_POST
        // la cual estara pendiente de cuando le demos al formulario enviar, el validara todos los datos y los enviara por medjio de AJAX a Django por POST
        inicializar_ajax_eliminar_persona_aplicacion_POST(id_persona_a_eliminar_aplicacion);
      }
    }

    //ahora vamos a enviar los datos por medio del metodo GET, por la tecnologia de AJAX, para que lleguen a Django
    function enviar_datos_ajax_eliminar_persona_aplicacion_GET(data) {
      //aqui vamos a abrir la peticion y le pasaremos 3 parametros
      // el primer es el metodo de envio de la peticion por medio de AJAX que en este caso sera GET
      //el segundo es la url con los datos que en este caso sera solamente el ID de la persona a eliminarle aplicaciones, y el tercer parametro es un valor booleano que sera true y significa que la peticion va ha ser asincronica
      peticionHTTP_eliminar_persona_aplicacion_GET.open('GET', `eliminar_aplicacion_persona/?id_persona_a_eliminar_aplicacion=${data}`, true);

      //y aqui lo que hacemos es enviar la peticion por medio del metodo send
      peticionHTTP_eliminar_persona_aplicacion_GET.send();
    }

    //ahora aqui vamos a ejecutar la funcion y le pasamos como parametro el id de la persona a eliminarle las aplicaciones
    enviar_datos_ajax_eliminar_persona_aplicacion_GET(id_persona_a_eliminar_aplicacion);

  }


  //esta es la funcion de inicializar_ajax_eliminar_persona_aplicacion_POST, con la cual enviaremos los datos de manera segura por metodo POST,de las aplicaciones que queremos eliminar
  // y le pasamos como parametro el id de la persona que queremos eliminarle las aplicaciones
  function inicializar_ajax_eliminar_persona_aplicacion_POST(id_persona_a_eliminar_aplicacion){
    //primero haremos la variable que cambiara en el trancurso del envio de datos y recepcion de lso mismos por AJAX
    var peticionHTTP_eliminar_persona_aplicacion_POST;

    //aqui vamos a hacer la variable que contendra el tr que vamos a modificar con la eliminacion de la aplicacion en la persona
    var tr_a_modificar_eliminacion_aplicacion_persona = document.getElementById(`tres${id_persona_a_eliminar_aplicacion}`);

    //luego la vamos a convertir en una peticion XMLHTTP, segun el tipo de navegador que estemos usando
    if (window.XMLHttpRequest) {
      //si es chrome
      peticionHTTP_eliminar_persona_aplicacion_POST =  new XMLHttpRequest();
    }else{
      //si es internet explorer
      peticionHTTP_eliminar_persona_aplicacion_POST = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //luego haremos la funcion que se ejecutara cada vez que el estado de la peticion cambie
    peticionHTTP_eliminar_persona_aplicacion_POST.onreadystatechange = function() {
      //aqui pondremos todo lo uqe queremos que se ejecute cuando la peticion este procesandose o no se haya cumplido la obtencion de los datos

      //aqui vamos ha hacer una condicional, la cual nos evaluara si la peticion esta en estado 200 y esta lista que es 4, entonces quiere decir que los datos se pudieron obtener correctamente, asi que se va a ejecutar todo lo que este dentro de la condicional
      if (peticionHTTP_eliminar_persona_aplicacion_POST.readyState === 4 && peticionHTTP_eliminar_persona_aplicacion_POST.status === 200) {
        //aqui vamos a insertar la nueva informacion al TR que le eliminacion el usuario o la aplicacion, para que se vea en tiempo real las modificaciones
        tr_a_modificar_eliminacion_aplicacion_persona.innerHTML = peticionHTTP_eliminar_persona_aplicacion_POST.responseText;
        //luego vamos a salirno de el formulario con el location
        //con esto llamamos una funcion con jquery la cual nos cerrara la ventana de edicion de la persona para que despues de hacer los cambios pues que se cierre ya que no necesitamos mas esta ventana
        $('#div_eliminar_aplicacion_persona').modal('hide')

        //luego vamos a hacer la eliminacion del formulario, para que no genere conflictos con los demas formularios de eliminacion o creacion
        div_formulario_eliminacion_persona_aplicacion.innerHTML = "";



        //ahora vamos a hacer la insercion de la notificacion de que se edito la persona correctamente
        /*NOTIFICACIONES*/
          //aqui vamos a cambiarle la imagen al div el cual lleva la notificacion y pondremos una carita masomenos feliz
          imagen_notificacion_eliminar_aplicacion_persona.setAttribute('src', '/static/img/botones/notificaciones/x_aplicacion_eliminada.gif');
          //aqui estamos removiento la clase notificacion para poder colocar otra, y esto lo hacemos con el fin de que la otra clase tiene propiedades de css diferentes a esta
          div_notificacion_eliminar_aplicacion_persona.classList.remove('notificacion');
          //aqui estamos colocando la otra clase, la cual tiene propiedades de css difirentes a la primera
          div_notificacion_eliminar_aplicacion_persona.classList.add('notificacion_eliminar_apliacion_persona_correcto');

          //aqui estamos removiendo la clase generica de la imagen, esto con el fin de poer otra ya que queremos que las propiedades de css cambien
          imagen_notificacion_eliminar_aplicacion_persona.classList.remove('imagen_notificacion');
          //aqui estamos colocando la otra clase la cual tiene propiedades diferentes de css
          imagen_notificacion_eliminar_aplicacion_persona.classList.add('img_notificacion_correcto_eliminar_aplicacion_persona');


          //aqui estamos insertando en el em del HTML el texto el cual lleva la informacion de la persona creada
          texto_notificacion_eliminar_aplicacion_persona.innerHTML = "  " + "Se elimina correctamente la aplicacion " + aplicacion_a_eliminar_persona + " a la persona " +  nombre_completo_para_notificacion_eliminar_aplicacion_persona + ". Ya puedes ver las modificaciones hechas.";

          //aqui con esta funcion lo que estamos haciendo es que despues de 10 segundos se vuelven y se coloquen todas las clases que venian por defecto para que todo vuelva a la normalidad y por ende se desaparesca
          setTimeout(function() {
            div_notificacion_eliminar_aplicacion_persona.classList.remove('notificacion_eliminar_apliacion_persona_correcto');
            div_notificacion_eliminar_aplicacion_persona.classList.add('notificacion');
            imagen_notificacion_eliminar_aplicacion_persona.classList.remove('img_notificacion_correcto_eliminar_aplicacion_persona');
            imagen_notificacion_eliminar_aplicacion_persona.classList.add('imagen_notificacion');
          }, 10000)
        /*NOTIFICACIONES*/








        //luego vamos a iniciar nuevamente todas las funciones, de AJAX que hemos creado, para que el nuevo TR tenga tambien las escuchas
        iniciar_ajax_crear_aplicacion();
        iniciar_ajax_crear_persona();
        iniciar_ajax_eliminar_persona();
        iniciar_ajax_editar_persona();
        iniciar_ajax_eliminar_persona_aplicacion();
      }
    }


    //aqui vamos a obtener permanentemente, el formulario que se creo de eliminacion de aplicaciones, el cual tiene todas las aplicaciones relacionadas con la persona a eliminarle una aplicacion
    var form_eliminacion_aplicacion = document.getElementById('formulario_de_eliminar_aplicacion_persona');

    //luego vamos a poner a la escucha del submit al formulario de form_eliminacion_aplicacion, para prevenir que se envie sin antes obtener todos los datos y mandarlos por JAX a Django
    //el cual va a ejecutar una funcion que hara la prevencion, obtencion y envio de datos.
    form_eliminacion_aplicacion.addEventListener('submit', inicializar_ajax_eliminar_persona_aplicacion_POST_2, false)

    //luego vamos obtener o guardar en una variable todos los elementos que tengan la clase checkbox_aplicaciones, la cual son las aplicaciones que en este momento estamos o queremos iterar para ver cuales estan checked y cuales no
    var aplicaciones_a_eliminar_persona = document.getElementsByClassName('checkbox_aplicaciones');

    //luego aqui vamos a iterar entre esta variable de aplicaciones_a_eliminar_persona, y vamos a decir que si no esta checked, lo cual quiere decir que no hace parte de las aplicaciones de la persona, entonces que la deje en disabled
    // de lo contrario, o sea si esta checked entonces que la deje a la espera del evento click el cual ejecutara una funcion, la cual hara la salida de dos inputslos cuales seran del ticket de eliminacion y usuario
    for (a = 0; a < aplicaciones_a_eliminar_persona.length; a++){
      if (aplicaciones_a_eliminar_persona[a].checked) {
        aplicaciones_a_eliminar_persona[a].addEventListener('click', aplicaciones_checked_a_eliminar, false);
        aplicaciones_a_eliminar_persona[a].parentNode.classList.add('bg-warning')
      }else{
        aplicaciones_a_eliminar_persona[a].disabled = "true";

      }
    }

    //aqui vamos a crear las variables, que van a ser modificadas en la funcion de aplicaciones_checked_a_eliminar
    var ticket_eliminacion;
    var espacio;
    //con este span vamos a poner las validacion del formulario mas adelante
    var span_ticket_eliminacion_aplicacion;
    var aplicacion_a_eliminar_persona;

    //aqui en esta funcion, lo que hacemos es primero validar si lo que se hizo con el click fue un checked false o un checked true, o sea que si se deschequeo o se chequeo
    // en base en eso, vamos a hacer el input del ticket de eliminacion o lo vamos a esconder
    //le pasamos por parametro el evento, del cual despues sacaremos el objetivo y asi podremos sacar el valor de la aplicacion a eliminar
    function aplicaciones_checked_a_eliminar(e){
      console.log(`inicia funcion de si la aplicacion esta en checked ${e.target.value}`);
      //pimero haremos una condicional si el elemento que presionamos esta checked o no, haremos la creacion del input o lo borraremos
      //si el elemento no esta checked, que se haga un input, en el que colocaremos el ticket de eliminacion de la aplicacion
      if (!e.target.checked) {
        //pero primero hafremos otra condicional, que nos dira que si el input de ticket ya esta creado, entonces que no haga otro
        if (ticket_eliminacion){
          //no hace ninguna accion, ya que se remontaria otro input, y ya serian dos inputs y eso no lo queremos

          // de lo contrario que si lo haga
        }else{
          //empezamos a crear los elementos o los nodos y los insertamos en el padre del objetivo de la escuche que seria el input
          espacio = document.createElement('br');
          ticket_eliminacion = document.createElement('input');
          span_ticket_eliminacion_aplicacion = document.createElement('span')
          //luego los vamos ha empezar a insertar dentro del formulario
          e.target.parentNode.appendChild(espacio);
          e.target.parentNode.appendChild(ticket_eliminacion);
          e.target.parentNode.appendChild(span_ticket_eliminacion_aplicacion);
          //luego les aplicaremos algunas propiedades, como id y un placeholder
          ticket_eliminacion.id = "input_ticket_eliminacion_usuario";
          ticket_eliminacion.placeholder = "N° ticket de eliminacion";
          //y por ultimo vamos a darle el valor de la aplicacion que queremos eliminar, a la variable de aplicacion_a_eliminar_persona
          aplicacion_a_eliminar_persona = e.target.value;

        }
      //de lo contrario de la primero condicional de que no estaba checked, aqui evaluamos si esta checked, entonces quiere decir que no queremos eliminar esta aplicacion, entonces que nos quite el input de ticket de eliminacion
      }else if(e.target.checked){
        //remueve los elementos que creamos anteriormente
        e.target.parentNode.removeChild(espacio);
        e.target.parentNode.removeChild(ticket_eliminacion);
        e.target.parentNode.removeChild(span_ticket_eliminacion_aplicacion);
        //limpia las variables creadas anteriormente
        espacio = "";
        ticket_eliminacion = "";
        span_ticket_eliminacion_aplicacion = "";
      }

    }

    //aqui hacemos la funcion de inicializar_ajax_eliminar_persona_aplicacion_POST_2, la cual previene el submit y obtiene y envia los datos por AJAX a Django
    function inicializar_ajax_eliminar_persona_aplicacion_POST_2(e){
      //lo primero que hacemos es prevenir el envio de la informacion
      e.preventDefault();
      //luego vamos a hacer la validacion del formulario y lo vamos a poner los errores en el span que crramos anteriormente
      if (ticket_eliminacion.value.length==0) {
        span_ticket_eliminacion_aplicacion.innerHTML="Llena el campo ticket";
        span_ticket_eliminacion_aplicacion.classList.add("span_validacion_formulario")
        return false
      }else if (isNaN(parseInt(ticket_eliminacion.value))) {
        span_ticket_eliminacion_aplicacion.innerHTML="Solo se permiten numeros";
        span_ticket_eliminacion_aplicacion.classList.add("span_validacion_formulario")
        return false
      }else{
        span_ticket_eliminacion_aplicacion.innerHTML=""
        span_ticket_eliminacion_aplicacion.classList.remove("span_validacion_formulario")
      }



      //luego vamos ha hacer la obtencion de los datos
      //comenzamos con el token, lo obtenemos por medio de la variable del forulario y ponemos la pocicion 0 que es la 1 y aqui se ecuentra el token
      var token = `csrfmiddlewaretoken=${form_eliminacion_aplicacion[0].value}&`;

      //luego vamos a obtener el valor de la aplicacion que queremos eliminar, con la variable que creamos en el momento de crear el input para el ticket de eliminacion
      var aplicacion_a_eliminar = `aplicacion_a_eliminar=${aplicacion_a_eliminar_persona}&`;

      //ahora obtener el numero del ticket que escribimos en el input que creamos, para dejar constancia de la eliminacion de la aplicacion
      var ticket_eliminacion_aplicacion_persona = `ticket_eliminacion_aplicacion_persona=${ticket_eliminacion.value}&`;

      //ahora vamos a obtener el id de la persona a la cual queremos eliminarle la aplicacion, lo mas importante!!
      var id_persona_a_eliminar_aplicacion_1 = `id_persona_a_eliminar_aplicacion=${id_persona_a_eliminar_aplicacion}`;


      /*NOTIFICACIONES*/
      //aqui vamos a obtener el nombre completo de la persona a la que le estamos quitando o eliminando la plaicacion, ya que lo necesitamos para la notificacion que hacemos al final
      nombre_completo_para_notificacion_eliminar_aplicacion_persona = document.getElementById('id_nombre_completo').value;
      /*NOTIFICACIONES*/


      //ahora vamos a unificar todo esto en una variable llamadasurl, la cual despues vamos a enviar a la funcion de envio_de_datos_eliminar_aplicacion_persona_AJAX_POST
      var url = token + aplicacion_a_eliminar + ticket_eliminacion_aplicacion_persona + id_persona_a_eliminar_aplicacion_1;

      //ahora aqui vamos ha hacer la funcion de envio_de_datos_eliminar_aplicacion_persona_AJAX_POST, la cual enviara los datos a Django por medio de AJAX
      function envio_de_datos_eliminar_aplicacion_persona_AJAX_POST(data){
        //aqui vamos a enviar los daot spor medio de el metodo POST, lo que se hace mas diferente al envio de datos por metodo GET
        //llamaremos 3 metodos para el envio de datos por medio POST, el primero sera la apertura, e la cual le pasaremos 3 PARAMETROS
        // el primero es el metodo de envio de datos el cual sera POST, el segundo parametro es el URL a la cual enviaremos los datos
        // y el tercer parametro va a ser siempre true, lo cual indica que si queremos que sea de formar asincronica
        peticionHTTP_eliminar_persona_aplicacion_POST.open('POST', 'eliminar_aplicacion_persona/', true);
        //el segundo metodo llamado sera que le estamos especificando que el tipo de envio de los datos va a estar de alguna forma encriptado o protejido
        peticionHTTP_eliminar_persona_aplicacion_POST.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // y aqui vamos aneviar los datos que seria la variable URL
        peticionHTTP_eliminar_persona_aplicacion_POST.send(data);
      }

      //luego aqui ya que todo esta listo para el envio de la informacion, vamos a llamar la funcion y le pasamos como parametro la variable url que creamos anteriormente
      envio_de_datos_eliminar_aplicacion_persona_AJAX_POST(url);

    }
  }

}

window.addEventListener('load', iniciar_ajax_eliminar_persona_aplicacion, false);
