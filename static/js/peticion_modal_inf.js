
 
infibtn.click();
var espacio_host = sessionStorage.getItem("espacio_host");
var codigo_host = sessionStorage.getItem("codigo_host");
var espacio_sesion = sessionStorage.getItem("espacio_sesion"); 
var codigo_sesion = sessionStorage.getItem("codigo_sesion");
var Estado_De_Juego_Inicial = false;
var codigo_asociado = '';
var quitarModalDeInicio = false;


codigo_asociado = codigo_sesion !== '0' ? codigo_sesion : codigo_host;
      
// LOGICA PARA MOSTRAR EL MODAL DE INFORMACION SEGUN EL TIPO DE USUARIO
      if (espacio_host == 'false' && espacio_sesion == 'false'){
          onlinemode.style.display = "none";
          listobtn.style.display = "none";
      }
      else if (espacio_host == 'true' && espacio_sesion == 'false')
      {
          onlinemode.style.display = "block";
          document.querySelector('#onlinemode h3').innerHTML = "CODIGO: " + codigo_host;
      }
      else if (espacio_host == 'false' && espacio_sesion == 'true')
      {
          onlinemode.style.display = "block";
          comenzarbtn.style.display = "none";
          document.querySelector('#onlinemode h3').innerHTML = "CODIGO: " + codigo_sesion;
      }
      else 
      {
          print("error al procesar los codigos...")
      }
      

// LOGICA PARA GUARDAR EL ESTADO INICIAL DEL JUGADOR.
      
$('#listobtn').click(function(event){
  listobtn.textContent === "Estoy listo" ? listobtn.textContent = "Ya no estoy listo" : listobtn.textContent = "Estoy listo";
  $('#listobtn').toggleClass('active');
  $('.modal-footer').toggleClass('active');
  Estado_De_Juego_Inicial = !Estado_De_Juego_Inicial;
})




//LOGICA QUE AÑADE LOS JUGADORES A LA PARTIDA
function mostrarDatos(jugadores_list,estados_list){
var listo = '';
$('#players_list').empty();

  for (var i = 0; i < jugadores_list.length; i++){

    estados_list[i] === true ? listo = '#73ff00' : listo = 'white';

    const newItem = `<li><i class="fa fa-check-circle" style="color:${listo}"></i>${jugadores_list[i]}</li>`;

    $('#players_list').append(newItem);
  }
}
//LOGICA PARA HABILITAR O DESHABILITAR EL BOTON DE COMENZAR PARTIDA
function starthost(estados_list){
  if(estados_list.every(function(bool){return bool === true})){
    // console.log('Todos los jugadores estan listos');
    comenzarbtn.disabled = false;
  }
  else
  {
    // console.log('Aun hay jugadores que no estan listos');
    comenzarbtn.disabled = true;
  }
  
}
//LOGICA PARA ENVIAR EL INICIO DE LA PARTIDA SOLO POR EL ANFITRION
$('#comenzarbtn').click(function () {
  if (espacio_host == 'true') { quitarModalDeInicio = true; }
});

//LOGICA PARA ESCONDER EL MODAL DE INFORMACION CUANDO SE INICIE LA PARTIDA POR EL ANFITRION
function exitModal(quitarModalDeInicio) {
  // console.log(quitarModalDeInicio);
  if(quitarModalDeInicio === true){
    $('#informacion').modal('hide');
  }
}
      
// PETICION HTTP AJAX PARA TRANSFERIR TODOS LOS ESTADOS DE JUEGO CADA 200ms
function SendAndGetStates() {

  // console.log('play= '+ play + ' '+' quitarmodal = :' + quitarModalDeInicio);
          $.ajax({
            url:'/get-data/',
            type: 'GET',
            data: {
              'nombre': sessionStorage.getItem('nick'),
              'estado_de_inicio': Estado_De_Juego_Inicial,
              'codigo_asociado': codigo_asociado,
              'play': play,
              'quitarModalDeInicio': quitarModalDeInicio,
              'espacio_host': espacio_host,
            },     
            success: function (response) {
              mostrarDatos(response.jugadores_list,response.estados_list);
              starthost(response.estados_list);
              exitModal(response.inicio);
              sessionStorage.setItem('newplay',response.newplay);
              console.log(sessionStorage.getItem('newplay'));
            },
            error: function(error){
              console.log('error al obtener los datos',error);
            }
          });
        }
if ($('#informacion').is(':visible')) {
  setInterval(function () {
    SendAndGetStates();
  }, 200)
}