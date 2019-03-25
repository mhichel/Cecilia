function iniciar_ajax_eliminar_persona(){
  /*NOTIFICACIONES*/
    //primero vamos a obtener el div que guardara la notificacion
    var div_notificacion_eliminar_persona = document.getElementById('notificacion_1');
    //obtenemos la imagen del div de notificaciones
    var imagen_notificacion_eliminar_persona = document.getElementById('imagen_notificacion');
    //obtenemos el texto del div de notificaciones
    var texto_notificacion_eliminar_persona = document.getElementById('texto_notificacion');
  /*NOTIFICACIONES*/




  //esta es la variable que traera la respuesta del AJAX, por medio de Javascript
  var peticionHTTP_eliminar_persona;

  //aqui vamos ha declarar la variable que guardara todos los botones de eliminar, la cual vamos despues a iterar con un for, para ponerlas a al escucha del click
  var botones_de_eliminar_persona = document.getElementsByClassName('boton_accion_eliminar');

  //aqui vamos ha hacer el for, el cual iterara todos los botones de clase boton_accion_eliminar, y los pondra a la escucha del evento click y cuando suseda que se ejecute la funcion de enviar_peticion_AJAX_eliminar_persona
  for (var i=0; i < botones_de_eliminar_persona.length; i++){
    botones_de_eliminar_persona[i].addEventListener('click', enviar_peticion_AJAX_eliminar_persona, false);
  }

  //aqui vamos a guardar en una variable, el div de la ventana modal de eliminar una persona
  var div_formulario_eliminar_persona = document.getElementById('div_formulario_eliminar_persona');

  //aqui hacemos la funcion que se ejecutara por cada boton de eliminar, la cual va a enviar la peticion de eliminar la persona con los datos del id del boton, el cual tiene el id de la persona a eliminar
  function enviar_peticion_AJAX_eliminar_persona(e) {
    //aqui vamos a obtener el valor del nombre de la persona a eliminar
    var nombre_completo = e.target.name;

    //aqui vamos a obtener de la tr que vamos a quitar de la lista, para que paresca que se ha eliminado en tiempo real de la tabla
    tr_a_eliminar = document.getElementById(`tres${e.target.id}`);

    //primero vamos ha hacer que en el momento de que presionamos en el boton de eliminar de alguna persona, que en el formulario o la ventana de eliminar PERSONA
    // aparesca una notificacion que si desea eliminar la persona o no y esto lo hacemos por medio de un innerHTML al formulario
    div_formulario_eliminar_persona.innerHTML = `<h5>Esta seguro que desea eliminar a ${nombre_completo} de la plataforma?</h5><input type="submit" value="Si" id="si_deseo_eliminar_la_persona" class="btn btn-warning btn-block"><button type="button" name="button" class="btn btn-success btn-block" data-dismiss="modal">No</button>`;

    //ahora vamos a poner a la escucha de un evento al boton de si y de no de los botones que acabamos de insertar en el formulario de eliminacion de la persona
    var boton_si_eliminar_persona = document.getElementById('si_deseo_eliminar_la_persona');
    boton_si_eliminar_persona.addEventListener('click', enviar_peticion_AJAX_eliminar_persona_2, false)


    function enviar_peticion_AJAX_eliminar_persona_2(){
      //aqui lo que hace es evaluar, que tipo de navegador es y asi mismo hace la peticion XML
      if (window.XMLHttpRequest) {
        peticionHTTP_eliminar_persona =  new XMLHttpRequest();
      }else{
        peticionHTTP_eliminar_persona = new ActiveXObject("Microsoft.XMLHTTP");
      }

      //aqui hacemos la funcion a la peticionHTTP, que indicara que en que momento cambiara de estado, para que se ejecute una funcion anonima
      peticionHTTP_eliminar_persona.onreadystatechange = function() {
        //aqui colocamos lo que quieremos que aparesca, cuando la peticion esta cargando o salio algo mas y no se pudo obtener

        //aqui ponemos la condicion de que si la peticion esta en un estado de 200 y esta lista que es 4, entonces que se ejecute el codigo que se encuentra dentro de la condicional
        if (peticionHTTP_eliminar_persona.readyState === 4 && peticionHTTP_eliminar_persona.status === 200) {
          //aqui lo que haremos sera quitar el tr de la tabla, si se elimino de Django correctamente, entonces tambien lo queitaremos de el HTML, para dar un aspecto de en tiempo real
          tr_a_eliminar.remove();
          // y el siguite comando es para poder salir de la ventana modal y volver a la lista de las personas
          //con esto llamamos una funcion con jquery la cual nos cerrara la ventana de edicion de la persona para que despues de hacer los cambios pues que se cierre ya que no necesitamos mas esta ventana
          $('#div_eliminar_persona').modal('hide')



          /*NOTIFICACIONES*/
            //aqui vamos a cambiarle la imagen al div el cual lleva la notificacion y pondremos una carita masomenos feliz
            imagen_notificacion_eliminar_persona.setAttribute('src', '/static/img/botones/notificaciones/carita_triste.gif');
            //aqui estamos removiento la clase notificacion para poder colocar otra, y esto lo hacemos con el fin de que la otra clase tiene propiedades de css diferentes a esta
            div_notificacion_eliminar_persona.classList.remove('notificacion');
            //aqui estamos colocando la otra clase, la cual tiene propiedades de css difirentes a la primera
            div_notificacion_eliminar_persona.classList.add('notificacion_eliminar_persona_correcto');

            //aqui estamos removiendo la clase generica de la imagen, esto con el fin de poer otra ya que queremos que las propiedades de css cambien
            imagen_notificacion_eliminar_persona.classList.remove('imagen_notificacion');
            //aqui estamos colocando la otra clase la cual tiene propiedades diferentes de css
            imagen_notificacion_eliminar_persona.classList.add('img_notificacion_correcto_eliminar_persona');


            //aqui estamos insertando en el em del HTML el texto el cual lleva la informacion de la persona creada
            texto_notificacion_eliminar_persona.innerHTML = "  " + "Se elimina correctamente la persona " + peticionHTTP_eliminar_persona.responseText;

            //aqui con esta funcion lo que estamos haciendo es que despues de 10 segundos se vuelven y se coloquen todas las clases que venian por defecto para que todo vuelva a la normalidad y por ende se desaparesca
            setTimeout(function() {
              div_notificacion_eliminar_persona.classList.remove('notificacion_eliminar_persona_correcto');
              div_notificacion_eliminar_persona.classList.add('notificacion');
              imagen_notificacion_eliminar_persona.classList.remove('img_notificacion_correcto_eliminar_persona');
              imagen_notificacion_eliminar_persona.classList.add('imagen_notificacion');
            }, 10000)
          /*NOTIFICACIONES*/




          //luego vamos a eliminar el formulario de eliminacion de persona, para que no genere conflicto con los de mas formularios
          div_formulario_eliminar_persona.innerHTML ="";

        }
      }

      //ahora vamos ha obtener el dato del id de la persona ha eliminar, para poder enviarla por AJAX.
      var id_persona_a_eliminar = e.target.id;
      console.log(id_persona_a_eliminar);

      //aqui vamos ha hacer la funcion de enviar de informacion por AJAX.
      //lo que vamos ha hacer aqui es abrir la peticion y le pasamos tres parametros, el primero ele metodo de enviar que va a ser GET, el segundo la URL con los datos y el tercero es que si es verdadero quiere decir que va a ser una peticion asincronica
      function enviar_datos_AJAX_eliminar_persona(data) {
        peticionHTTP_eliminar_persona.open('GET', `eliminar_persona/?id=${data}`, true);
        peticionHTTP_eliminar_persona.send();
      }

      //y aqui vamos a ejecutarla y le pasamos por parametro el dato del id que obtuvimos hace un momento de la persona que queremos eliminar
      enviar_datos_AJAX_eliminar_persona(id_persona_a_eliminar)
    }

  }


}


window.addEventListener('load', iniciar_ajax_eliminar_persona, false);
