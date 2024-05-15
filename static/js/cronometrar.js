
            
            //la funcion cronometrar es una solicitud http realizada por otro fetch para enviar 
            //el estado actual del juego al servidor, el mismo comparara el tiempo de inicio con el tiempo final
            //dependiendo del estado de la variable. dicha diferencia se actualizara en la base de datos 
            // y se regresara por medio de un response, el cual se almacenara en el sessionStorage y se llamara cuando
            // se necesite mostrar al cliente.
            function cronometrar(estadodejuego)
            {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              
                  console.log(fila_letra);

                  fetch('/jugar/',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body: JSON.stringify({ 'estado': estadodejuego, 'nick': nombre , 'contador': contador, 'trama': trama_de_palabras,'letra': fila_letra})
                    //tengo que enviarle, cada trama de palabras y ademas el contador 
                  })
                  .then(response => {
                    if(response.ok){
                        console.log("se recibio algo del servidor:");
                        return response.json();
                    }
                    else{
                        throw 'Error en la solicitud HTTP';
                    }
                  })
                  .then (data => {
                      console.log(data);
                      // cuando el mensaje del servidor es "empezar", se ingresa a la funcion de iniciarCronometro
                      if(data.mensaje == 'empezar')
                      {
                        console.log("empezando a cronometrar...")  
                        iniciarCronometro();
                      }
                      // cuando el mensaje del servidor es "terminar", se detiene el cronometro
                      // y se ingresa a la funcion desplegarPuntaje
                      else if(data.mensaje == 'terminar'){
                        console.log("terminando de cronometrar...")
                        sessionStorage.setItem("tiempo_total", data.tiempo);
                        sessionStorage.setItem("score", data.score);
                        sessionStorage.setItem("fila_puntaje", data.puntaje_item);
                        sessionStorage.setItem("score_final", data.score_final);
                        detenerCronometro();
                        desplegarPuntaje();
                      }
                      else{
                        console.log("no se pudo empezar a cronometrar, revisa el servidor")
                      }
                  })

                  .catch(error=>{
                    console.log("error en la solicitud",error);
                  })

            }


            //la funcion iniciar cronometro, solo es una representacion visual del tiempo que esta pasando en el juego
            // es una ayuda al usuario, mas no determina el tiempo total de la partida

            function iniciarCronometro()
            {
              document.getElementById("tiempo").innerHTML = "00:00:00";
              h = 0;m = 0;s = 0;
              escribir();
              id = setInterval(escribir,1000);
            }
            function escribir()
            {
              var hAux, mAux, sAux;
              s++;
              if (s>59){m++;s=0;}
              if (m>59){h++;m=0;}
              if (h>24){h=0;}
          
              if (s<10){sAux="0"+s;}else{sAux=s;}
              if (m<10){mAux="0"+m;}else{mAux=m;}
              if (h<10){hAux="0"+h;}else{hAux=h;}
          
              document.getElementById("tiempo").innerHTML = hAux + ":" + mAux + ":" + sAux;
            }
            function detenerCronometro()
            {
                clearInterval(id);
                document.getElementById("tiempo").innerHTML = "00:00:00";
                h = 0;m = 0;s = 0;
            }