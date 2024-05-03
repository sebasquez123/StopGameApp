
          
    
           // se obtienen datos de inicio de sesion guardadas en el sessionStorage de forma temporal, mientras
                // la partida se desarrolla. se cambia el fondo y se muestra el nombre y la dificultad del jugador
                const nombretext= document.getElementById("nombre");
                const FondoDelCuerpo = document.querySelector("body");
                var identidad =sessionStorage.getItem("id");
                var nombre = sessionStorage.getItem("nick");
                var dificultad = sessionStorage.getItem("dificultad");
                var urlf = sessionStorage.getItem("urlf");
                
                if(urlf == "f1"){urlf = "../../../static/images/fondo0.jpg"; }
                else if(urlf == "f2"){urlf = "../../../static/images/fondo1.jpg";}
                else if (urlf == "f3"){urlf = "../../../static/images/fondo2.jpg";}
                else if(urlf == "f4"){urlf = "../../../static/images/fondo3.jpg";}
                else if (urlf == "f5"){urlf = "../../../static/images/fondo4.jpg";}
                else{urlf = "../../../static/images/fondo5.jpg";}

                FondoDelCuerpo.style.backgroundImage = "url("+urlf+")";
                nombretext.innerHTML = nombre.toUpperCase() + " - " + dificultad.toUpperCase();



          //se controla el evento del boton de jugar añadiendo estilos intuitivos
            const stoptext = document.getElementById("stopplay");
            const stopbtn= document.getElementById("stop");
            const contenedor = document.getElementById("contenedorprincipal");
            const celdas = document.querySelectorAll(".celdas td");
            var play = false;

            
            stoptext.innerHTML="PLAY";
            stopbtn.addEventListener("click", function(){
            stoptext.innerHTML = stoptext.innerHTML === "PLAY" ? "STOP" : "PLAY";
            play =!play;
            Empezar_A_Jugar(play);  
            });
            // se da estilo a las celdas, se alterna la variable que determina el comienzo y el final de la partida
            // y se ingresa a la funcion de cronometrar, realiza una solicitud fetch para el envio del estado
            //de la partida
            function Empezar_A_Jugar(condicion)
            {
                if (condicion)
                {
                    console.log("el juego comenzo");
                    stopbtn.classList.add("active");
                    contenedor.classList.add("active");
                    sessionStorage.setItem("play",play);
                    cronometrar(sessionStorage.getItem("play"));
                    celdas.forEach(function(celda){
                    celda.classList.add("active"); 
                    });
                }
                else
                {
                    console.log("el juego se termino");
                    stopbtn.classList.remove("active");
                    contenedor.classList.remove("active");
                    sessionStorage.setItem("play",play);
                    cronometrar(sessionStorage.getItem("play"));
                    celdas.forEach(function(celda){
                    celda.classList.remove("active"); 
                     });
                }
            }

            
            // se controla el evento del boton de salida, para cerrar la sesion y ademas borrar los datos almacenados
            // en el sessionStorage
             const salida = document.getElementById("salir");
             salida.addEventListener("click",function(){
             sessionStorage.clear();
             });
