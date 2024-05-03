
            function cronometrar(estadodejuego)
            {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                console.log("el estado de juego es: ",estadodejuego)


                  fetch('/jugar/',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    },
                    body:JSON.stringify({'estado': estadodejuego,'nick': nombre})
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
                      if(data.mensaje == 'empezar')
                      {
                        console.log("empezando a cronometrar...")  
                        iniciarCronometro();
                      }
                      else if(data.mensaje == 'terminar'){
                        console.log("terminando de cronometrar...")
                        detenerCronometro();
                      }
                      else{
                        console.log("no se pudo empezar a cronometrar, revisa el servidor")
                      }
                  })

                  .catch(error=>{
                    console.log("error en la solicitud",error);
                  })

            }
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