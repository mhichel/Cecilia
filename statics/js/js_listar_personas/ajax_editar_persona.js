function iniciar_ajax_editar_persona(){
  /*NOTIFICACIONES*/
    //primero vamos a obtener el div que guardara la notificacion
    var div_notificacion_editar_persona = document.getElementById('notificacion_1');
    //obtenemos la imagen del div de notificaciones
    var imagen_notificacion_editar_persona = document.getElementById('imagen_notificacion');
    //obtenemos el texto del div de notificaciones
    var texto_notificacion_editar_persona = document.getElementById('texto_notificacion');
  /*NOTIFICACIONES*/



  //primero vamos ha obtener todos los botones, que tiene cada persona, de editar la misma, por medio de la clase, para despues ponerlos a la escucha de el evento click y poder iniciar el envio de informacion AJAX
  var botones_editar_persona = document.getElementsByClassName('boton_accion_editar');

  //aqui vamos ha hacer un for, para iterar todos los botones y ponerlos a la escucha de el evento click y asi poder inicar el envio de la informacion por AJAX
  for (var a=0; a < botones_editar_persona.length; a++){
    botones_editar_persona[a].addEventListener('click', inicializar_ajax_editar_persona_GET, false);
  }


  //aqui vamos ha hacer la variable que guardara en el transcurso de todo el codigo, la informacion obtenida por eldio de AJAX en Django
  var peticionHTTP_editar_persona_GET;

  //aqui vamos a obtener el div, de la ventana modal donde podremos poner el formulario de edicion traido desde Django por emdio de AJAX
  var div_formulario_editar_persona = document.getElementById('div_formulario_edicion_persona');

  //esta es la funcion que comenzara a enviar y recibir los datos por medio de AJAX
  function inicializar_ajax_editar_persona_GET(e){
    //ahora vamos a obtener el id de la persona que queremos editar, para poder traerlo por AJAX en Django
    var id_persona_a_editar = e.target.id;

    //aqui evaluaremos segun el tipo de navegador, asi vamos a hacer que la peticion sea compatible con el mismo
    if (window.XMLHttpRequest) {
      //si es chrome
      peticionHTTP_editar_persona_GET =  new XMLHttpRequest();
    }else{
      //si es internet explorer
      peticionHTTP_editar_persona_GET = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //aqui vamos ha hacer la funcion que se ejecutara cada vez que la peticionHTTP_editar_persona_GET, cambie de estado
    peticionHTTP_editar_persona_GET.onreadystatechange = function() {
      //aqui podemos poner lo que queramos que salga cuando, la peticion esta en proceso o tuvo algun problema de recepcion o envio de la peticion

      //aqui vamos ha hacer una condicion que dira si la peticion esta en estado 200 y esta lista 4, entonces quiere decir que se obtuvieron los datos correctamente, asi que se ejecutara el codigo que tenemos dentro del condicional
      if (peticionHTTP_editar_persona_GET.readyState === 4 && peticionHTTP_editar_persona_GET.status === 200) {
        console.log("la peticion se obtuvo correctamente");
        //si la peticion es correcta vamos a meter el formulario de edicion traido desde Django al div de la ventana modal de edicion de persona
        div_formulario_editar_persona.innerHTML = peticionHTTP_editar_persona_GET.responseText;
        //despues iniciamos el inicializar_ajax_editar_persona_POST, el cual va a enviar los datos que modifiquemos en este formulario por metodo POST
        inicializar_ajax_editar_persona_POST(id_persona_a_editar);
      }
    }


    //ahora vamos ha hacer la funcion que enviara los datos o sea el id de la persona que vamos a editar, para asi traer el formulario intanciado desde esta persona
    //le pasamos como parametro a la funcion la data que es la informacion del id de la persona a editar
    function enviar_datos_ajax_editar_persona_GET(data) {
      //aqui abrimos la peticion y le pasamos 3 parametros, el primero es el metodo de envio de la informacion en este caso sera GET, el segundo parametro es la URL con la iformacion con el id de la persona a editar y el tercer parametro es true indicando que la peticion en asincronica
      peticionHTTP_editar_persona_GET.open('GET', `editar_persona/?id_persona_a_editar=${data}`, true);
      //y aqui enviamos la peticion
      peticionHTTP_editar_persona_GET.send();
    }

    //aqui vamos ha llamar la funcion y le pasamos como parametro el id de la persona a editar
    enviar_datos_ajax_editar_persona_GET(id_persona_a_editar);


  }

  //en esta funcion, lo que vamos ha hacer es obtener los datos obtenidos omodificados por nosostros y los vamos a mandar por AJAX para que en Django sean modificados en la BBDD
  function inicializar_ajax_editar_persona_POST(id_persona_a_editar){
    //vamos a obtener en una variable, el formulario creado por Django con los datos de la persona a editar, el cual despues le vamos aponer una escucha
    var form_edicion_persona = document.getElementById('formulario_de_edicion_de_persona');

    //aqui vamos a poner a la escucha el formulario del evento de submit, para que en el momentod e que le demos en enviar, no la mande de una vez si no que primero vamos a iniciar una funcion la cual nos ayudara a aobtener los datos y a enviarlos por AJAX, para que se vea asincronico
    form_edicion_persona.addEventListener('submit', inicializar_ajax_editar_persona_POST_2, false);

    //aqui vamos a hacer la funcion de inicializar_ajax_editar_persona_POST_2, la cual obtendra los datos y los enviara por AJAX a Django
    // le pasamos por parametro el evento, en el cual mas adelante vamos a obtener el objetivo del mismo
    function inicializar_ajax_editar_persona_POST_2(e){
      //primero vamos a hacer la variable que tendra la peticionHTTP_editar_persona_POST
      var peticionHTTP_editar_persona_POST;

      //vamos a obtener la TR que tenemos que modicficar, segun el id de la persona
      var tr_a_modificar_edicion_persona = document.getElementById(`tres${id_persona_a_editar}`);

      //luego segun el tipo de navegador que estemos usando, asi mismo se va a crear la peticion XML
      if (window.XMLHttpRequest) {
        //si es chrome
        peticionHTTP_editar_persona_POST =  new XMLHttpRequest();
      }else{
        //si es internet explorer
        peticionHTTP_editar_persona_POST = new ActiveXObject("Microsoft.XMLHTTP");
      }


      //luego vamos a hacer la funcion quese ejecutara en el momento o cada vez que el estado de la peticion cambie
      peticionHTTP_editar_persona_POST.onreadystatechange = function(){
        //aqui podremos colocar lo que queremos que aparesca en el momento de que la peticion este en proceso o que haya habido algun problema con la misma

        //aqui vamos ha hacer una condicion, la cual va a evaluar si la peticion esta en un estado de lista 4 y en un estado 200, quiere decir que se pudo obtener correctamente
        // entonces se va a ejecutar lo que tengamos dentro de la condicional
        if (peticionHTTP_editar_persona_POST.readyState === 4 && peticionHTTP_editar_persona_POST.status === 200) {
          //vamos a modificar la TR que tiene la informacion antigua
          tr_a_modificar_edicion_persona.innerHTML = peticionHTTP_editar_persona_POST.responseText;
          console.log(tr_a_modificar_edicion_persona)

          //ahora vamos a hacer la eliminacion del formulario para que no genere conflicto con los demas formularios de eliminacion o creaciones
          div_formulario_editar_persona.innerHTML = "";


          //con esto llamamos una funcion con jquery la cual nos cerrara la ventana de edicion de la persona para que despues de hacer los cambios pues que se cierre ya que no necesitamos mas esta ventana
          $('#div_editar_persona').modal('hide')

          //ahora vamos a hacer la insercion de la notificacion de que se edito la persona correctamente
          /*NOTIFICACIONES*/
            //aqui vamos a cambiarle la imagen al div el cual lleva la notificacion y pondremos una carita masomenos feliz
            imagen_notificacion_editar_persona.setAttribute('src', '/static/img/botones/notificaciones/bien_editado.gif');
            //aqui estamos removiento la clase notificacion para poder colocar otra, y esto lo hacemos con el fin de que la otra clase tiene propiedades de css diferentes a esta
            div_notificacion_editar_persona.classList.remove('notificacion');
            //aqui estamos colocando la otra clase, la cual tiene propiedades de css difirentes a la primera
            div_notificacion_editar_persona.classList.add('notificacion_editar_persona_correcto');

            //aqui estamos removiendo la clase generica de la imagen, esto con el fin de poer otra ya que queremos que las propiedades de css cambien
            imagen_notificacion_editar_persona.classList.remove('imagen_notificacion');
            //aqui estamos colocando la otra clase la cual tiene propiedades diferentes de css
            imagen_notificacion_editar_persona.classList.add('img_notificacion_correcto_editar_persona');

            //aqui estamos insertando en el em del HTML el texto el cual lleva la informacion de la persona creada
            texto_notificacion_editar_persona.innerHTML = "  " + "Se edita correctamente a " + nombre_completo_para_notificacion_editar_persona + "." + " Ya puedes ver el registro de " + nombre_completo_para_notificacion_editar_persona + " con las modificaciones hechas.";

            //aqui con esta funcion lo que estamos haciendo es que despues de 10 segundos se vuelven y se coloquen todas las clases que venian por defecto para que todo vuelva a la normalidad y por ende se desaparesca
            setTimeout(function() {
              div_notificacion_editar_persona.classList.remove('notificacion_editar_persona_correcto');
              div_notificacion_editar_persona.classList.add('notificacion');
              imagen_notificacion_editar_persona.classList.remove('img_notificacion_correcto_editar_persona');
              imagen_notificacion_editar_persona.classList.add('imagen_notificacion');
            }, 10000)
          /*NOTIFICACIONES*/




          //luego iniciamos todas las funciones que hemos hecho hasta ahora para que el nuevo registro que insertamos tambien tenga las mismas escuchas de eventos
          iniciar_ajax_crear_aplicacion();
          iniciar_ajax_crear_persona();
          iniciar_ajax_eliminar_persona();
          iniciar_ajax_editar_persona();
          iniciar_ajax_eliminar_persona_aplicacion();
        }
      }

      //aqui vamos a hacer la funcion de enviar de informacion ajax post 2, la cual llevara por parametro la url o los datos a enviar
      function enviar_datos_ajax_editar_persona_POST_2(data) {
        //aqui vamos a hacer 3 cosas con la peticionHTTP, la primero es que vamos a abrirla y este metodo llevara 3 parametros, el primero es el metodo de envio de la informacion el cual sera POST, el segundo es la url sin datos, ya que no se pueden mandar asi por que es POST
        // y el tercer paramtro es true, ya que la peticion es de metodo asincronico
        peticionHTTP_editar_persona_POST.open('POST', 'editar_persona', true);
        //luego aqui con este metodo indicamos que los datos vana a estar de alguna manera cifrados con un protocolo para que no se puedan leer
        peticionHTTP_editar_persona_POST.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //y aqui vamos a enviar la informacion por medio de este metodo y no como simepre lo haciamos por GET
        peticionHTTP_editar_persona_POST.send(data);
      }

      //vamos a evitar que el formulario se envie verdaderamente por medio de la siguiente funcion
      e.preventDefault();
      //vamos a empezar a obtener los datos, vamos a empezar por el token
      var token = `csrfmiddlewaretoken=${form_edicion_persona[0].value}&`;

      //vamos a obtener el id de la persona a editar
      var id = `id=${id_persona_a_editar}`;

      //ahora vamos a obtener el nombre completo de la persona
      var nombre_completo = `&nombre_completo=${document.getElementById('id_nombre_completo').value}`;

      /*NOTIFICACIONES*/
      //aqui vamos  ahacer una variable global, la cual vamos a manejar en el codigo de la notificacion de la persona editada
      var nombre_completo_para_notificacion_editar_persona = document.getElementById('id_nombre_completo').value
      /*NOTIFICACIONES*/

      //ahora el id del cargo que le asignamos
      var cargo = `&cargo=${document.getElementById('id_cargo').value}`;

      //vamos a obtener los datos de la ubicacion de la persona
      var ubicacion = `&ubicacion=${document.getElementById('id_ubicacion').value}`;

      //vamos a obtener los datos de la ubicacion del centro de la persona
      var centro = `&centro=${document.getElementById('id_centro').value}`;

      //ahora vamos a hacer la URL completa con la informacion obtenida anteriormente
      var url = token + id + nombre_completo + cargo + ubicacion + centro;
      console.log(url)

      //luego vamos a hacer el envio de la informacion a la funcion de enviar peticion ajax post 2
      enviar_datos_ajax_editar_persona_POST_2(url);

    }
  }





}


window.addEventListener('load', iniciar_ajax_editar_persona, false);
