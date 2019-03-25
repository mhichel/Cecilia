function iniciar_ajax_crear_aplicacion() {
  /*NOTIFICACIONES*/
    //primero vamos a obtener el div que guardara la notificacion
    var div_notificacion_crear_aplicacion_persona = document.getElementById('notificacion_1');
    //obtenemos la imagen del div de notificaciones
    var imagen_notificacion_crear_aplicacion_persona = document.getElementById('imagen_notificacion');
    //obtenemos el texto del div de notificaciones
    var texto_notificacion_crear_aplicacion_persona = document.getElementById('texto_notificacion');
  /*NOTIFICACIONES*/





  //ESTA ES LA VARIABLE QUE GUARDA EL DIV DONDE METEMOS EL FORMULARIO DE creacion
  var div_formulario_de_creacion_aplicacion = document.getElementById('div_formulario_crear_aplicacion');
  //ESTA ES LA VARIABLE QUE VA ACONTENER TODOS LOS BONTONES QUE TENGAN ALA CLASE boton_accion_crear_aplicacion
  var boton_crear_aplicacion = document.getElementsByClassName('boton_accion_crear_aplicacion');
  //ESTA VARIABEL ES LA QUE UTILIZAREMOS PARA ENVIAR LA PETICION GET
  var peticionHTTP_crear_aplicacion_GET;
  //ESTA ES LA VARIABLE QUE UTILIZAREMOS PARA ENVIAR LA PETICION POST
  var peticionHTTP_crear_aplicacion_POST;

  //CON ESTE FOR YO COJO TODOS LOS BOTONES DE CREAR Y LOS COLOCO A LAS ESCUCHA PARA QUE CADA VEZ QUE PRESIONE UNO, SE VAYA HASTA LA FUNCION INICIALIZAR AJAX DE CREAR PERSONA
  for (var i = 0; i < boton_crear_aplicacion.length; i++) {
    boton_crear_aplicacion[i].addEventListener('click', inicializar_ajax_crear_aplicacion_GET, false)
  }




  //ESTA ES LA FUNCION DE INICIALIZAR EL AJAX DE CREAR PERSONA, ESTE ES EL QUE NOS VA  ATRAER EL FORMULARIO DE CREACION
  function inicializar_ajax_crear_aplicacion_GET(e) {
    //AQUI EVALUAMOS SI EL NAVEGADOR ES DE INTERNET EXPLORER O DE GOOGLE CHROME, POR MEDIO DE ACTIVEX SE HACE EL ENVIO DE DATOS POR AJAX POR INTERNET EXPLORER
    if (window.XMLHttpRequest) {
      peticionHTTP_crear_aplicacion_GET =  new XMLHttpRequest();
    }else{
      peticionHTTP_crear_aplicacion_GET = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //ESTA ES LA FUNCION QUE SE EJECUTARA CUANDO EL ESTADO DE LA PETICION AJAX CAMBIE DE ESTADO
    peticionHTTP_crear_aplicacion_GET.onreadystatechange = function(){
      //console.log("hay algun problema..") lo que colocamos aqui va a aparecer, cuando haya algun problema

      //SI LA PETICION ESTA EN UN ESTADO DE LISTO DE 4 Y DE ESTADO 200, QUIERE DECIR QUE LA PETICION FUE RECIBIDA Y ESTA CORRECTA
      //POR LO TANTO HAREMOS LO QUE ESTA DENTRO DE LA CONDICIONAL
      if (peticionHTTP_crear_aplicacion_GET.readyState === 4 && peticionHTTP_crear_aplicacion_GET.status === 200) {
        //AQUI HACEMOS CON LA VARIABLE DE FORMULARIO COGEMOS LO QUE OBTENEMOS DE LA PETICION AJAX Y LO COLOCAMOS EN EL DIV, Y ESTO SE VERA COMO UN FORMULARIO
        div_formulario_de_creacion_aplicacion.innerHTML = peticionHTTP_crear_aplicacion_GET.responseText;
        //LUEGO INICIAMOS LA PETICION AJAX POST, QUE ES LA QUE HARA EL ENVIO DE LAS ACTUALIZACIONES HECHAS
        inicializar_ajax_crear_aplicacion_POST(e);
      }
    }
    //ESTO LO QUE HARA ES LA APERTURA DE LA PETICION AJAX, Y LOS PARAMETROS QUE LE PASAREMOS CON PRIMERO EL METODO DE ENVIO DE DATOS QUE SERA GET
    //LUEGO LE PASAMOS LA URL QUE QUEREMOS ACCEDER EN DJANGO Y LE PASAMOS COMO PAREMOTRO ALA URL EL ID DE LA PERSONA QUE QUEREMOS EDIAR, YA QUE EN DJANGO LO NECESITAREMOS
    // Y COMO TERCER PARAMETRO, LO QUE PONEMOS ES UN TRUE, INDICANDO QUE LA PETICION EN ASINCRONA
    peticionHTTP_crear_aplicacion_GET.open('GET', `crear_aplicacion_persona/?id=${e.target.id}`, true);
    //LUEGO AQUI ENVIAMOS LA PETICION AJAX, HACIA DJANGO
    peticionHTTP_crear_aplicacion_GET.send();
  }



  //ESTA ES LA FUNCION QUE ME PERMITIRA, DESPUES DE RELLENAR EL FORMULARIO DE CREAR LA PERSONA, ENVIARLO POR METODO POST
  function inicializar_ajax_crear_aplicacion_POST(e) {
    //AQUI HACEMOS LA LLAMADA DEL FORMULARIO DE ADICIONAR UNA APLICACION, LO LLAMAMOS POR MEDIO DE SU ID Y LO GUARDAMOS EN UNA VARIABLE
    var form_crear_persona_aplicacion = document.getElementById('formulario_de_crear_persona_aplicacion');

    //AQUI LO QUE HACEMOS ES GUARDAR EN UNA VARIABLE TODOS LOS INPUT QUE TIENE EL FORMULARIO DE APLICACIONES, PARA GUARDARLOS EN UN ARRAY
    var lista_de_aplicaciones = document.getElementsByClassName('checkbox_aplicaciones');

    //CON ESTE FOR LO QUE HACEMOS ES ITERAR TODOS LOS UNPUT DE EL FORMULARIO DE APLICACIONES Y LOS QUE ESTEN YA EN CHECKED PUES QUE LOS DEHABILITE, YA QUE LO QUE QUEREMOS ES ADICIONAR MAS APLICACIONES NO QUITARLAS
    for (var i = 0; i < lista_de_aplicaciones.length; i++) {
      if (lista_de_aplicaciones[i].checked) {
        lista_de_aplicaciones[i].disabled = "true";
      }
    }

    //CON EL SIGUIENTE FOR, LO QUE HACEMOS ES PONERLOS A  LA ESCUHA DEL EVENTO DE QUE SE PONGAN EN ESTADO checked
    // Y CUANDO EL USUARIO LOS SELECCIONE PUES QUE SE HABRA UN CAMPO NUEVO (INPUT), EN EL CUAL VAN A TENER QUE ESCRIBIR EL NUMERO DEL TICKET, POR EL CUAL SE PIDIO LA CREACION DEL USUARIO
    for (var i = 0; i < lista_de_aplicaciones.length; i++) {
      if (lista_de_aplicaciones[i].type == "checkbox"){
        lista_de_aplicaciones[i].addEventListener('click', funcion_verificar_si_esta_checked, false)
      }
    }

    //AQUI DECLARMOS LAS VARIABLES QUE UTILIZAREMOS MAS ADELANTE PARA CREAR LOS NODOS QUE NOS PERMITIRAN HACER LOS INPUTS Y LOS ESPACIOS, PARA QUE SE VEA ESTETICO
    var input_ticket;
    var input_usuario;
    var espacio_1;
    var espacio_2;

    //CON ESTA FUNCION LO QUE HACEMOS ES QUE CUANDO EL CAMPO ESTE EN CHECKED, PUES QUE PONGA LOS DOS CAMPOS MAS LOS DOS ESPACIOS
    //LOS DOS ESPACIOS SON UNO DEL TICKET Y EL OTRO DEL NOMBRE DE USUARIO DE LA APLICACION A ADICIONAR, LUEGO LE PONEMOS LOS ATRIBUTOS NECESARIOS Y LOS MOSTRAMOS EN PANTALLA
    function funcion_verificar_si_esta_checked(elemento) {
      if (elemento.target.checked) {
        if (input_ticket) {
        }else{
          espacio_1 = document.createElement('br');
          input_ticket = document.createElement('input');
          input_ticket.placeholder = "N°.Ticket";
          input_ticket.id = "input_ticket";
          espacio_2 = document.createElement('br');
          input_usuario = document.createElement('input');
          input_usuario.placeholder = "Nombre usuario";
          input_usuario.id = "input_usuario";
          elemento.target.parentNode.appendChild(espacio_1);
          elemento.target.parentNode.appendChild(input_ticket);
          elemento.target.parentNode.appendChild(espacio_2);
          elemento.target.parentNode.appendChild(input_usuario);
        }
      // DE LO CONTRARIO SI CUANDO LE DAMOS CLIC PARA DESCHEKEARLO ENTONCES QUE QUITE LOS INPUTS Y BORRE LAS VARIABLES, PARA QUE CUANDO SE VAYAN A PONER DE NUEVO NO GENERE CONFLICTO
      }else if (elemento.target.checked != "true"){
        elemento.target.parentNode.removeChild(espacio_1);
        elemento.target.parentNode.removeChild(input_ticket);
        elemento.target.parentNode.removeChild(espacio_2);
        elemento.target.parentNode.removeChild(input_usuario);
        input_ticket = "";
        input_usuario = "";
        espacio_1 = "";
        espacio_2 = "";
      }
      aplicacion_a_adicionar = elemento.target.value;
      /*NOTIFICACIONES*/
      //aqui vamos a hacer una variable global la cual vamos amanipular en el codigo de notificacion de la aplicacion adicionada
      nombre_aplicacion_adicionada_para_notificacion_crear_aplicacion_persona = elemento.target.value;
      /*NOTIFICACIONES*/


    }


    //AQUI PONEMOS A LA ESCUCHA DEL EVENTO ENVIAR, AL FORMULARIO QUE ESTAMOS LLENANDO, PARA QUE CUANDO LO ENVIEMOS PRIMERO HAGAMOS ALGUNAS COSAS COMO ORDENAR LOS DATOS Y COSAS ASI Y LUEGO AHI SI LO ENVIAMOS
    form_crear_persona_aplicacion.addEventListener('submit', inicializar_ajax_crear_aplicacion_POST_2, false);

    //ESTA ES LA FUNCION QUE HARA EL ENVIADO DE LA INFORMACION POR AJAX, PERO PRIMERO ORDENARA LOS DATOS Y LUEGO LOS ENVIARA POR LA TECNOLOGIA MENCIONADA
    function inicializar_ajax_crear_aplicacion_POST_2(a) {
      //AQUI EVALUA COMO ENVIAR LOS DATOS POR AJAX SEGUN EL NAVEGADOR, SI ES INTERNET EXPLORER, LO HATA POR MEDIO DE ACTIVEX
      if (window.XMLHttpRequest) {
        peticionHTTP_crear_aplicacion_POST =  new XMLHttpRequest();
      }else{
        peticionHTTP_crear_aplicacion_POST = new ActiveXObject("Microsoft.XMLHTTP");
      }

      //ESTA ES LA FUNCION QUE SE EJECUTARA CUANDO LA PETICION AJAX CAMBIE DE ESTADO
      peticionHTTP_crear_aplicacion_POST.onreadystatechange = function(a) {
        //EN ESTA PARTE, LO QUE HAREMOS ES PONER EL CODIGO QUE SE EJECUTARA CUANDO LA PETIICION NO ESTE LISTA, O HAYA OCURRIDO ALGUN ERROR
        console.log('hay algun problema');
        //AQUI CONDICIONAMOS QUE SI LA PETICION ESTA LISTA 4 Y EL ESTADO ES DE 200, ENTONCES QUE COGA EN LA VARIABLE tr_a_modificar, LA CUAL TIENE EL TR QUE ESTAMOS EDITANDO
        // Y LO QUE HARA ES REEMPLAZARLO CON LA INFORMACIONACION QUE HEMOS ACTUALIZADO
        if (peticionHTTP_crear_aplicacion_POST.readyState === 4 && peticionHTTP_crear_aplicacion_POST.status === 200) {
          tr_a_modificar.innerHTML = peticionHTTP_crear_aplicacion_POST.responseText;
          //LUEGO AQUI COMO EL FORMULARIO ESTA EN UNA VENTANA MODAL, ENTONCES QUE NOS LLEVE A LA PANTALLA PRINCIPAL
          //con esto llamamos una funcion con jquery la cual nos cerrara la ventana de edicion de la persona para que despues de hacer los cambios pues que se cierre ya que no necesitamos mas esta ventana
          $('#div_crear_persona').modal('hide')

          //aqui lo que vamos ha hacer es borrar todo el fomulario de edicion, para que no haya ningun tipo de troques entre datos de creacion y de edicion
          div_formulario_de_creacion_aplicacion.innerHTML = "";



          //ahora vamos a hacer la insercion de la notificacion de que se edito la persona correctamente
          /*NOTIFICACIONES*/
            //aqui vamos a cambiarle la imagen al div el cual lleva la notificacion y pondremos una carita masomenos feliz
            imagen_notificacion_crear_aplicacion_persona.setAttribute('src', '/static/img/botones/notificaciones/bien_crear_aplicacion_persona.gif');
            //aqui estamos removiento la clase notificacion para poder colocar otra, y esto lo hacemos con el fin de que la otra clase tiene propiedades de css diferentes a esta
            div_notificacion_crear_aplicacion_persona.classList.remove('notificacion');
            //aqui estamos colocando la otra clase, la cual tiene propiedades de css difirentes a la primera
            div_notificacion_crear_aplicacion_persona.classList.add('notificacion_crear_apliacion_persona_correcto');

            //aqui estamos removiendo la clase generica de la imagen, esto con el fin de poer otra ya que queremos que las propiedades de css cambien
            imagen_notificacion_crear_aplicacion_persona.classList.remove('imagen_notificacion');
            //aqui estamos colocando la otra clase la cual tiene propiedades diferentes de css
            imagen_notificacion_crear_aplicacion_persona.classList.add('img_notificacion_correcto_crear_aplicacion_persona');


            //aqui estamos insertando en el em del HTML el texto el cual lleva la informacion de la persona creada
            texto_notificacion_crear_aplicacion_persona.innerHTML = "  " + "Se adiciona correctamente la aplicacion " + nombre_aplicacion_adicionada_para_notificacion_crear_aplicacion_persona + " a la persona " +  nombre_completo_para_notificacion_crear_aplicacion_persona + ". Ya puedes ver las modificaciones hechas.";

            //aqui con esta funcion lo que estamos haciendo es que despues de 10 segundos se vuelven y se coloquen todas las clases que venian por defecto para que todo vuelva a la normalidad y por ende se desaparesca
            setTimeout(function() {
              div_notificacion_crear_aplicacion_persona.classList.remove('notificacion_crear_apliacion_persona_correcto');
              div_notificacion_crear_aplicacion_persona.classList.add('notificacion');
              imagen_notificacion_crear_aplicacion_persona.classList.remove('img_notificacion_correcto_crear_aplicacion_persona');
              imagen_notificacion_crear_aplicacion_persona.classList.add('imagen_notificacion');
            }, 10000)
          /*NOTIFICACIONES*/




          //LUEGO QUE INICIE LAS FUNCIONE QUE HEMOS HECHO HASTA AHORA, PARA QUE LA NUEVA ADICION QUE HEMOS INSERTADO EN LA TABLA, TAMBIEN TENGA LAS ESCUCHAS(ADDEVETLISTENER)
          iniciar_ajax_busquedas();
          iniciar_ajax_crear_aplicacion();
          iniciar_ajax_crear_persona();
          iniciar_ajax_eliminar_persona();
          iniciar_ajax_editar_persona();
          iniciar_ajax_eliminar_persona_aplicacion();
        }
      }

      //ESTA ES LA FUNCION QUE ENVIARA LOS DATOS POR MEDIO DE EL METODO POST, ESTA RECIBE UN PARAMETRO EL CUAL SERAN LOS DATOS OBTENIDOS CON JAVASCRIPT
      function enviar_datos_ajax_crear_persona_aplicacion(data) {
        console.log("envia datos por ajax POST");
        //AQUI ABRIMOS LA PETICION POST, Y LE PASAMOS TRES PARAMETROS COMO EN LA GET, CON LA DIFERENCIA QUE EN LA URL, SOLAMENTE LE PASAMOS LA URL SIN LOS DATOS, YA QUE LOS DATOS LOS VAMOS A ENVIAR POR MEDIO DE OTRO COMANDO MAS ADELANTE
        peticionHTTP_crear_aplicacion_POST.open('POST', 'crear_aplicacion_persona/', true);
        //AQUI INDICAMOS CON ESTE COMANDO QUE EL CONTENIDO QUE ENVIAREMOS VA A ESTAR DE ALGUNO FORMA ASEGURADO O CIFRADO
        peticionHTTP_crear_aplicacion_POST.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //Y AQUI ENVIAMOS LA PETICION POST Y POR PARAMETO, LE PASAMOS LOS DATOS
        peticionHTTP_crear_aplicacion_POST.send(data);
      }

      //CON ESTE COMANDO PREVENIMOS QUE EL BOTON SUBMIT FUNCIONE Y ENVIE LOS DATOS, YA QUE PRIMERO TENEMOS QUE ORDENARLOS Y DESPUES ENVIARLOS POR AJAX
      a.preventDefault();

      //aqui vamos a crear una variable la cual guardara el id de la tr en la tabla, para que cuando modifiquemos la persona, pues que sea reemplazado
      var tr_a_modificar = document.getElementById(`tres${e.target.id}`);

      //AQUI OBTENEMOS LA INFORMACION DE EL FORMULARIO PARA DESPUES ORDENARLA Y ENVIARLA POR AJAX
      var url="";
      var token = `csrfmiddlewaretoken=${form_crear_persona_aplicacion[0].value}&`;
      var id = `id=${e.target.id}&`;
      var ticket = `ticket_creacion=${document.getElementById('input_ticket').value}&`;
      var aplicacion = `aplicacion_a_adicionar=${aplicacion_a_adicionar}&`;


      //aqui vamos a hacver un for para sacar todos las aplicaciones que estan en modo checked, para poder enviarlas a la edicion de la persona
      //y tambien hacemos un STRING para pasarlo a el valor de la varable aplicaciones, que enviaremos por el ajax.
      var aplicaciones = "&aplicaciones=";
      for (var i = 0; i < lista_de_aplicaciones.length; i++) {
        if (lista_de_aplicaciones[i].checked) {
          aplicaciones+=lista_de_aplicaciones[i].value;
        }
      }

      //ahora vamos a hacer la obtencion de el nombre de la persona a editar
      var nombre_completo = `nombre_completo=${document.getElementById('id_nombre_completo').value}`;

      //vamos a sacar el valor de el cargo de la persona
      var cargo = `&cargo=${document.getElementById('id_cargo').value}&`;

      //vamos a sacar el valor de la ubicacion actual de la persona
      var ubicacion = `ubicacion=${document.getElementById('id_ubicacion').value}&`

      //vamos a obtener el valor de el nombre de usuario de la aplicacion nueva adicionada
      var usuario = `usuario=${document.getElementById('input_usuario').value}`

      /*NOTIFICACIONES*/
      //aqui vamos a hacer una variable global la cual vamos amanipular en el codigo de notificacion de la aplicacion adicionada
      nombre_completo_para_notificacion_crear_aplicacion_persona = document.getElementById('id_nombre_completo').value;
      //y tambien obtenemos el nombre de la persona que queremos agregarle la aplicacion
      /*NOTIFICACIONES*/

      url += token + id + nombre_completo + aplicaciones + cargo + ubicacion + ticket + aplicacion + usuario;
      console.log(url)

      //AQUI LLAMAMOS LA FUNCION QUE ENVIARA LOS DATOS DE FORMA SEGURA POR AJAX A DJANGO.
      enviar_datos_ajax_crear_persona_aplicacion(url);
    }


  }
  //ESTA ES LA FUNCION QUE ME PERMITIRA, DESPUES DE RELLENAR EL FORMULARIO DE CREAR LA PERSONA, ENVIARLO POR METODO POST


}


window.addEventListener('load', iniciar_ajax_crear_aplicacion, false)
