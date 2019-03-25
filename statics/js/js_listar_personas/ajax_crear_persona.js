function iniciar_ajax_crear_persona(){
/*NOTIFICACIONES*/
  //primero vamos a obtener el div que guardara la notificacion de la persona que estamos creamos, para que nos muestre en pantalla
  var div_notificacion_crear_persona = document.getElementById('notificacion_1');
  //obtenemos la imagen del div de notificaciones
  var imagen_notificacion = document.getElementById('imagen_notificacion');
  //obtenemos el texto del div de notificaciones
  var texto_notificacion = document.getElementById('texto_notificacion');
/*NOTIFICACIONES*/


  //aqui guardamos en una variabel, el boton de guardar persona
  var boton_de_crear_persona = document.getElementById('boton_de_crear_persona');

  //aqui vamos  a hacer la variable que utilizaremos para poder enviar y traer los datos de la peticion AJAX.
  var peticionHTTP_crear_persona_GET;

  //aqui declaramos la variable que contendra el div, que a su vez contendra el formulario de creacion de la nueva persona
  var div_form_crear_persona = document.getElementById('div_formulario_crear_persona');

  //aqui vamos a poner a la escucha el boton de guardar persona, para que a la hora de que le demos click, el nos envie la peticion ajax
  // de que queremos crear una nueva persona y nos traiga el formulario de creacion desde django
  boton_de_crear_persona.addEventListener('click', enviar_peticion_crear_persona_GET, false)

  //esta es la funcion que traera por medio de ajax el formulario de creacion de una nueva persona
  function enviar_peticion_crear_persona_GET(e) {
    //aqui lo que estamos evaluando es que si el navegador es internet epxlorer o google chrome o cualquier otro, asi mismo hara que la peticion sea compatible con el navegador
    if (window.XMLHttpRequest) {
      peticionHTTP_crear_persona_GET =  new XMLHttpRequest();
    }else{
      peticionHTTP_crear_persona_GET = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //aqui hacemos que la variable de peticion de ajax, cuando cambie de estado, se ejecute la funcion anonima que le pasamos como =
    peticionHTTP_crear_persona_GET.onreadystatechange = function(){
      //aqui fuera del condicional podemos colocar lo que queramos que aparesca cuando la peticion tuvo algun problema o esta en proceso

      //aqui vamos a hacer una condicional, la cual dice que si el estado listo de la peticion es 4 y el estado de la peticion esta en 200, o sea que se obtuvo correctamente
      //entonces que se ejecute el codigo que este dentro de la condicional
      if (peticionHTTP_crear_persona_GET.readyState === 4 && peticionHTTP_crear_persona_GET.status === 200) {
        //aqui lo que hacemos es insertar dentro de el div de la ventana modal de crear personas, insertamos el formulario de creacion de una nueva persona, el cual traemos con AJAX
        div_form_crear_persona.innerHTML = peticionHTTP_crear_persona_GET.responseText;
        //luego llamamos la funcion de enviar_peticion_ajax_POST la cual hara la validacion de los datos y el envio de los mismos a django por medio de AJAX
        enviar_peticion_ajax_POST();
      }
    }

    //ahora lo que vamos a hacer es abrir la peticion AJAX con tres parametros, el primero es el metodo de envio de la peticion que sera GET por el momento
    // ya que estamos es obteniendo los campos del formulario solamente, el segundo parametro es la URL a la cual enviaremos los DATOS
    // y el tercer parametro es true indicando que la peticion va a ser de un metodo asincronico
    peticionHTTP_crear_persona_GET.open('GET', 'crear_persona', true);
    //aqui le estamos enviando la peticion a AJAX para que la envie a Django, por el momento no le enviamos ningun parametro, ya que solamente queremos traer el formulario de creacion
    peticionHTTP_crear_persona_GET.send();

  }


  function enviar_peticion_ajax_POST() {
    //aqui crearemos la variable que guardara los datos de la peticion AJAX, que se enviaran y se recibiran
    var peticionHTTP_crear_persona_POST;

    //esta es la variable que obtendra el formulario que creamos o trajimos de Django por medio de AJAX
    var form_de_crear_persona_nueva = document.getElementById('form_de_crear_persona_nueva');

    //aqui vamos a declarar una variable, la cual obtendra toda la tabla donde estan las persona, esto lo hacemos con el fin de que cuando tengamos el nuevo registro de la neuva persona_a_crear
    //entonces que sea insertado al final de este elemento o esta variable con el comando InteradjacentHTML
    var tabla_entera = document.getElementById('cuerpo_del_listado');


    //aqui hacemos el mismo proceso de validacion del navegador y en base en esto se creara o no la peticionHTTP por activex si es por internet explorer o una peticion XML si es po otro navegador
    if (window.XMLHttpRequest) {
      peticionHTTP_crear_persona_POST =  new XMLHttpRequest();
    }else{
      peticionHTTP_crear_persona_POST = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //aqui vamos a hacer la funcion que se ejecutara, al momento de que el estado de la peticion cambie
    peticionHTTP_crear_persona_POST.onreadystatechange = function () {
      //aqui en esta parte podemos colocar el codigo que queremos que se ejecute cuando la peticion esta en proceso o hubo algun proceso

      //aqui vamos a crear una condicional, la cual dice que si la peticion esta lista en estado 4 y el estado es 200, quiere decir que se pudo obetner correctamente la INFORMACION
      //por lo tanto que se ejecute el codigo que esta dentro de la condicion, que lo que sera es la adicion de la persona creada a la tabla por medio de un insertadjacent
      if (peticionHTTP_crear_persona_POST.readyState === 4 && peticionHTTP_crear_persona_POST.status === 200) {
        //aqui lo que vamos a hacer es insertar el nuevo registro al final de la tabla, para que tenga un efecto de sincronizacion sin recarga de pagina
        //insertamos la peticion en forma de response y no de responseText, ya que lo que necesitamos es que se creen algunas etiquetas HTML para que tenga estetica
        tabla_entera.insertAdjacentHTML('beforeend' , peticionHTTP_crear_persona_POST.response);
        //con este comando vamos a borrar todos los datos que hayan quedado a la deriva y con esto evitaremos que cuando cremos una nueva persona, pues que no se troquen los datos
        div_formulario_crear_persona.innerHTML = "";

        //ahora vamos a hacer la insercion de la notificacion de que se creo la persona correctamente
        /*NOTIFICACIONES*/
          //aqui vamos a cambiarle la imagen al div el cual lleva la notificacion y pondremos una carita feliz
          imagen_notificacion.setAttribute('src', '/static/img/botones/notificaciones/carita_feliz.gif');
          //aqui estamos removiento la clase notificacion para poder colocar otra, y esto lo hacemos con el fin de que la otra clase tiene propiedades de css diferentes a esta
          div_notificacion_crear_persona.classList.remove('notificacion');
          //aqui estamos colocando la otra clase, la cual tiene propiedades de css difirentes a la primera
          div_notificacion_crear_persona.classList.add('notificacion_crear_persona_correcto');

          //aqui estamos removiendo la clase generica de la imagen, esto con el fin de poer otra ya que queremos que las propiedades de css cambien
          imagen_notificacion.classList.remove('imagen_notificacion');
          //aqui estamos colocando la otra clase la cual tiene propiedades diferentes de css
          imagen_notificacion.classList.add('img_notificacion_correcto_crear_persona');

          //aqui estamos insertando en el em del HTML el texto el cual lleva la informacion de la persona creada
          texto_notificacion.innerHTML = "  " + "Se crea correctamente a " + nombre_completo_para_notificacion_crear_persona + "." + " Podras encontrar a " + nombre_completo_para_notificacion_crear_persona + " como el ultimo registro insertado en la tabla.";

          //aqui con esta funcion lo que estamos haciendo es que despues de 10 segundos se vuelven y se coloquen todas las clases que venian por defecto para que todo vuelva a la normalidad y por ende se desaparesca
          setTimeout(function() {
            div_notificacion_crear_persona.classList.remove('notificacion_crear_persona_correcto');
            div_notificacion_crear_persona.classList.add('notificacion');
            imagen_notificacion.classList.remove('img_notificacion_correcto_crear_persona');
            imagen_notificacion.classList.add('imagen_notificacion');
          }, 10000)
        /*NOTIFICACIONES*/


        //ahora vamos ha hacer que se salga del formulario y vuelve a la parte principal que es la tabla
        //con esto llamamos una funcion con jquery la cual nos cerrara la ventana de edicion de la persona para que despues de hacer los cambios pues que se cierre ya que no necesitamos mas esta ventana
        $('#div_crear_persona_nueva').modal('hide')

        //ahora vamos a poner las escuhas de las funciones que hemos hecho hasta ahora
        iniciar_ajax_busquedas();
        iniciar_ajax_crear_aplicacion();
        iniciar_ajax_crear_persona();
        iniciar_ajax_eliminar_persona();
        iniciar_ajax_editar_persona();
        iniciar_ajax_eliminar_persona_aplicacion();

        //luego aqui vamos a limpiar el form, para que no guarde ninguna variable y no se troque con el segundo registro de una personas creada
        form_de_crear_persona_nueva.innerHTML = "";

      }
    }
    //primero lo que haremos, sera que como en este formulario que pueden agregar varias aplicaciones a la vez, pues que cuando presione es un checkbox de alguna aplicacion
    //aparescan dos inputs, para que se escriba el numero del ticket de la creacion y el otro para el nombre de usuario de la aplicacion a adicionar
    //y asi para todos los checkbox que se encuentren en esta parte
    //primero vamos a guardar en una varible todos los inputs de checkbox que tienen la clase indicada en el parametro
    var checkbox_aplicaciones_crear_persona_nueva = document.getElementsByClassName('checkbox_aplicaciones_crear_persona_nueva');

    //ahora vamos  ahacer un for el cual iterara todos los inputs y les va a poner una escucha de un evento el click sera el click
    for (var i = 0; i < checkbox_aplicaciones_crear_persona_nueva.length; i++) {
      //aqui hacemos la condicion de que si la variable checkbox_aplicaciones_crear_persona_nueva tiene la propiedad de que es de typo checkbox, entonces que la ponga ala escucha del click}
      // esto lo hacemos ya que en esta variable tambien entrar los labels y si le damos la escucha a todos, entonces va a ejecutarse dos veces la funcion de la escucha del evento
      if (checkbox_aplicaciones_crear_persona_nueva[i].type == "checkbox") {
        checkbox_aplicaciones_crear_persona_nueva[i].addEventListener('click', verifica_si_esta_checked, false);
      }
    }
    //esta es la funcion que verifica si esta checked, y lo que hace es que si le pones el checked, van a parecer dos inputs y si lo quitamos, se quitaran los dos inputs

    //primero decaramos las variables que necesitamos para hacer que aparescan los inputs de forma correctamente
    //variable que guardara el 1 espacio br
    var espacio_01;
    //variable que guarsara el elemento input del ticket de creacion
    var input_ticket_01;
    //variable que guardara el segundo espacio dbr para separar los inputs
    var espacio_02;
    //variable que guardara el elemento input segundo, el cual sera para el usuario de la aplicacion
    var input_usuario_01;

    //aqui hacemos una funcion la cual es la que se va a ejecutar cuando le demos clic a los checkbox
    // y lo que hara esta funcion es que, si el elemento objetivo escha chequeado pues pondra los inputs y si esta deschqueado los quitara
    function verifica_si_esta_checked(elemento_1) {
      //si el elemento esta chequeado, hara la correspondiente creacion de los elementos para despues anadirlos al formulario
      //cada elemento tendra un id especifica, segun el checkbox que hayamos presionado, esto con el fin de que cuando se envie la informacion por AJAX, podamos seleccionarla correctamente
      if (elemento_1.target.checked) {
        espacio_01 = document.createElement('br');
        espacio_01.id = `espacio_01_${elemento_1.target.value}`;
        input_ticket_01 = document.createElement('input');
        input_ticket_01.placeholder = "N°.Ticket";
        input_ticket_01.id = `input_ticket${elemento_1.target.value}`;
        input_ticket_01.classList = "ticket_creacion_aplicacion_nueva_persona";
        espacio_02 = document.createElement('br');
        espacio_02.id = `espacio_02_${elemento_1.target.value}`;
        input_usuario_01 = document.createElement('input');
        input_usuario_01.placeholder = "Nombre de usuario";
        input_usuario_01.id = `input_usuario${elemento_1.target.value}`;
        input_usuario_01.classList = "usuario_creacion_aplicacion_nueva_persona";
        elemento_1.target.parentNode.appendChild(espacio_01);
        elemento_1.target.parentNode.appendChild(input_ticket_01);
        elemento_1.target.parentNode.appendChild(espacio_02);
        elemento_1.target.parentNode.appendChild(input_usuario_01);
        //de lo contrario si el elemento arroja un false en el checked, osea que no esta chequeado, entonces lo que hara sera primero buscarlos los inputs y espacios segun el id que le habiamos puesto}
        // y luego los removera del formulario
      }else if (elemento_1.target.checked != "true"){
        espacio_01 = document.getElementById(`espacio_01_${elemento_1.target.value}`);
        input_ticket_01 = document.getElementById(`input_ticket${elemento_1.target.value}`);
        espacio_02 = document.getElementById(`espacio_02_${elemento_1.target.value}`);
        input_usuario_01 = document.getElementById(`input_usuario${elemento_1.target.value}`);

        elemento_1.target.parentNode.removeChild(espacio_01);
        elemento_1.target.parentNode.removeChild(input_ticket_01);
        elemento_1.target.parentNode.removeChild(espacio_02);
        elemento_1.target.parentNode.removeChild(input_usuario_01);
        }
      }


    //aqui vamos a hacer una escucha del evento submit para el formulario, ya que no queremos qeu los datos se envien por si solor a Django, si no que queremos obetner los datos por medio de Javascript u luego enviarlos por AJAX a Django
    form_de_crear_persona_nueva.addEventListener('submit', obtencion_de_datos_y_envio_por_AJAX, false);

    //aqui hacemos la funcion que hara la obtencion de los datos y el envio de los mismos por AJAX
    // y le pasamos el parametro a, y en esa variable se guardara la informacion del evento y entre esos datos el objetivo del evento, osea el formulario
    function obtencion_de_datos_y_envio_por_AJAX(a){
      //aqui lo primero que hacemos el prevenir el evento de envio del ofrmulario, por que primero queremos obtener los datos y enviarlos por AJAX, y esto lo hacemos con el siguiente comando
      //ponemos el evento y lo prevenimos con esta funcion
      a.preventDefault();

      //luego aqui vamos a hacer la funcion la cual le pasaremos como parametro los datos obtenidos del formulario y enviaremos por AJAX a Django
      function enviar_datos_AJAX_crear_persona_POST(data) {
        //primero lo que hacemos es abrir la peticion, la cual le pasaremos 3 parametros.
        //el primero es el metodo de envio el cual escribiremos POST
        //el segundo es la URL a la cual le enviaremos los datos a Django
        //y el tercer parametro es el de si la peticion_1 la queremos de una forma asincronica o sea le colocaremos que si
        peticionHTTP_crear_persona_POST.open('POST', 'crear_persona', true);

        //luego aqui con esta linea de codigo le especificamos a el AJAX que vamos a enviar los datos de una forma segura o de una forma cifrada
        //esto ya que los datos no los pasamos por la URL
        peticionHTTP_crear_persona_POST.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //y aqui lo que hacemos es enviar la peticion y como parametro de pasamos los datos que le pasamos a la funcion principal como parametro
        peticionHTTP_crear_persona_POST.send(data);

      }

      //luego aqui si vamos a obtener los datos del formulario y luego los enviaremos por AJAX de forma POST
      //primero vamos a comenzar con el nombre

      //despues vamos a obtener las aplicaciones que se van a agregar a la persona nueva
      //primero creamos una variable, la cual contendra todas las aplicaciones que estan checked
      var aplicacion_a_adicionar_persona_nueva = "&aplicaciones=";
      //aqui vamos a obtener los checkbox que estan chuleados, vamos  ahacer un for para iterar de nuevo todos los elementos que sea de tipo checkbox dentro de la variable de los checkbox_aplicaciones_crear_persona_nueva
      //este for nos va hacer la obtencion de los valores de las aplicaciones, los cuales despues enviados mediante AJAX a Django se van aconvertir en una lista.
      for (var i = 0; i < checkbox_aplicaciones_crear_persona_nueva.length; i++) {
        if (checkbox_aplicaciones_crear_persona_nueva[i].type == "checkbox") {
          if (checkbox_aplicaciones_crear_persona_nueva[i].checked) {
            aplicacion_a_adicionar_persona_nueva+=checkbox_aplicaciones_crear_persona_nueva[i].value;
          }
        }
      }


      //para que los datos se puedan validar en Django, tenemos que hacer 4 listas diferentes y cada una obteniendo los datos de cada campo del formulario de creacion de usuario nuevo
      // esto lo hacemos ya que en django se vana iterar todos a la vez y luego en una lista parte todos se van a gregar en una lista aparte y se van a guardar en el formulario
      //primero crearemos la lista con los usuarios que se encuentren, para eso vamos a hacer un for,llamandolos por medio de una clase que le pusimos al momento de la creacion de los inputs
      //creamos la variable y de una vez los agregamos buscandolos por medio de la clase
      var usuarios = document.getElementsByClassName("usuario_creacion_aplicacion_nueva_persona");
      //aqui creamos el array que los contendra
      var array_de_usuarios = [];
      //y con este for, lo que haremos sera agregar cada valor que este en los inputs y los agregara al array
      for (var i = 0; i < usuarios.length; i++) {
        array_de_usuarios.push(usuarios[i].value);
      }

      //ahora vamos a obtener los numeros de ticket de las aplicaciones a adicionar, hacemos similar el proceso que como lo hicimos en los nombres de usuario
      //aqui hacemos la variable que contiene los inputs
      var tickets = document.getElementsByClassName("ticket_creacion_aplicacion_nueva_persona");
      //aqui hacemos el array que contendra lso valores de los inputs
      var array_de_tickets = [];
      //aqui hacemos el for que iterara la variable de los inputs y sacara los valores y los metera en el array
      for (var i = 0; i < tickets.length; i++) {
        array_de_tickets.push(tickets[i].value);
      }

      //ya tenemos la mayor parte de las cosas para hacer el formulario de creacion de usuario, el cual nos pide numeros de ticket, nombres de usuario, persona relacionada y aplicacion relacionada
      //ahora vamos a sacar el csrf_token
      var token = `csrfmiddlewaretoken=${form_de_crear_persona_nueva[0].value}`;

      //ahora vamos a obtener el nombre_completo de la persona
      var nombre_completo = `nombre_completo=${document.getElementById('id_nombre_completo_persona_nueva').value}`;

      //ahora vamos a obtener el valor del cargo asignado a la persona nueva
      var cargo = `cargo=${document.getElementById("id_cargo_persona_nueva").value}`;

      //ahora vamos a obtener el valor de la bodega asignada
      var bodega = `bodega=${document.getElementById("id_ubicacion_persona_nueva").value}`;

      /*NOTIFICACIONES*/
      //aqui vamos a hacer algo completamente diferente a lo que estamos haciendo, vamos a declarar una variable, la cual nos servira para el momento de la notificacion en pantala del nombre completo
      nombre_completo_para_notificacion_crear_persona = document.getElementById('id_nombre_completo_persona_nueva').value;
      /*NOTIFICACIONES*/

      //por ultimo falta el id de la persona relacionada con el usuario dy el ticket para agregar el nuevo usuario, pero como es una persona NUEVA
      // no podemos obtener el id, asi que el id lo podriamos obtener en Django y no aqui

      //por ultimo haremos la variable URL. la cual obtendra el valos de todas las demas variables y las ordenara
      var url = `${token}&${nombre_completo}${aplicacion_a_adicionar_persona_nueva}&${cargo}&${bodega}&array_de_usuarios=${array_de_usuarios}&array_de_tickets=${array_de_tickets}`;
      console.log(url);
      //ahora llamamos la funcion para enviar la peticion AJAX y le pasamos como parametro la URL que creamos, la cual tiene todos los datos
      enviar_datos_AJAX_crear_persona_POST(url);


    }

  }

}
window.addEventListener('load', iniciar_ajax_crear_persona, false)
