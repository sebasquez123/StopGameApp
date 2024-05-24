
                document.getElementById('infibtn').click();
                
                var espacio_host = sessionStorage.getItem("espacio_host");
                var codigo_host = sessionStorage.getItem("codigo_host");
                var espacio_sesion = sessionStorage.getItem("espacio_sesion"); 
                var codigo_sesion = sessionStorage.getItem("codigo_sesion");
                
                
                console.log(typeof(espacio_host), codigo_host, espacio_sesion, typeof(codigo_sesion));
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
                    document.querySelector('#onlinemode h3').innerHTML = "CODIGO: " + codigo_sesion;
                }
                else 
                {
                    print("error al procesar los codigos...")
                    }
                
           //se recuperan los datos guardados en el sessionStorage para mostrarlos en la vista del juego
           //se muestra el nombre, la dificultad y el fondo seleccionado
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




            //cuando el usuario preciona el boton de jugar, se realizan un par de efectos visuales y se 
            //alterna la variable que determina el comienzo y el final de la partida para poder determinar cuando 
            //cronometrar
            const stoptext = document.getElementById("stopplay");
            var stopbtn= document.getElementById("stop");
            const contenedor = document.getElementById("contenedorprincipal");
            const celdas = document.querySelectorAll(".celdas td");
            const hamster = document.getElementById('hamster');
            const comenzar = document.getElementById('comenzarbtn');
            var play = false;
            var fila_letra = "";
            var contador = 0;           
            


            for (let j = 1; j < 4; j++) {
                document.querySelectorAll('#fila'+j+' td').forEach(element => { element.classList.add('locked'); });
                 document.querySelectorAll('#fila'+j+' input').forEach(element => { element.disabled = true; });
            }
            
          
            
            stoptext.innerHTML="PLAY";
            stopbtn.style.opacity="1";
            telon.style.display="none";
            loading.style.opacity = "1";
            

            
            stopbtn.addEventListener("click", function(){
                // stoptext.innerHTML = stoptext.innerHTML === "PLAY" ? "STOP" : "PLAY";
                

            play =!play;
            Empezar_A_Jugar(play);  
            });

            function Empezar_A_Jugar(condicion)
            {

                // si la condicion es verdadera, se guarda en el sessionStorage y se redirige a la funcion de cronometrar
                if (condicion) 
                {
                loading.innerHTML = "Generating letter...";
                divlet.classList.remove('active');    
                libro.style.opacity="1";
                telon.style.display="flex";
                telon.classList.add("capa"); // se despliega el telon
                stopbtn.style.opacity="0";  // se oculta el boton de play
                stoptext.innerHTML = "STOP"; //se cambia el texto del boton de play a stop

                setTimeout(function(){
                    libro.style.opacity="0";
                    fila_letra = random();
                    letra1 = sessionStorage.getItem("letra1");
                    letra2 = sessionStorage.getItem("letra2");
                    while (fila_letra == letra1 || fila_letra == letra2) {
                        fila_letra = random();
                        if(fila_letra != letra1 && fila_letra != letra2){break;}
                    }
                    
                    
                    seleccion_de_fila(fila_letra);
                    divlet.innerHTML = fila_letra;            
                    divlet.classList.add('active');
                    loading.style.opacity="0";
                    
                        setTimeout(function(){
                        loading.innerHTML = "GO TO PLAY NOW!";
                        loading.style.opacity="1";
                            setTimeout(function(){ salto();}, 4000);
                    }, 500);
                }, 3000);
                
            
                    
                    
                    function salto(){
                    
                        stopbtn.style.opacity="1";
                        telon.style.display="none";
                        telon.classList.remove("capa");
                        stoptext.classList.add("active");
                        contenedor.classList.add("active");
                        sessionStorage.setItem("play", play);
                        celdas.forEach(function (celda) { celda.classList.add("active");});
                        trama_de_palabras.splice(0, trama_de_palabras.length);
                        cronometrar(sessionStorage.getItem("play"));
                         
                    }

                }
                else
                {   

                    stoptext.innerHTML = "PLAY";
                    console.log("el juego se termino");
                    stopbtn.classList.remove("active");
                    contenedor.classList.remove("active");
                    sessionStorage.setItem("play", play);
                    celdas.forEach(function(celda){celda.classList.remove("active");});
                    obtener_palabras();
                    cronometrar(sessionStorage.getItem("play"));
                    
                }
            }

            
            // se controla el evento del boton de salida, para cerrar la sesion y ademas borrar los datos almacenados
            // en el sessionStorage
            
            salir.addEventListener("click",function(){
            sessionStorage.clear();
            });

            window.addEventListener("beforeunload", function () {
                borrar = ["letra1", "letra2", "letra3", "tiempo_total", "tiempo_de_la_fase1", "tiempo_de_la_fase2", "tiempo_de_la_fase3"];
                for (let i = 0; i < borrar.length; i++) {
                    sessionStorage.removeItem(borrar[i]);
                }
               
            });




            function random() {     
                let dificultad = sessionStorage.getItem("dificultad");
                let VECTOR = [];
                if (dificultad == "facil") { VECTOR.push("S","A","C");}
                if (dificultad == "medio") { VECTOR.push("E","F","G","I","L","O","U","V");}
                if (dificultad == "avanzado") { VECTOR.push("H","K","Q","W","X","Y","Z");}
                ubi = Math.floor(Math.random()*VECTOR.length);
                return VECTOR[ubi];  
             }



            function seleccion_de_fila(letra){
                
                contador = contador + 1;  
                sessionStorage.setItem("contador", contador);
                 
                 
                 for (let k = 1; k < 4; k++) {
                     if (contador == k)
                     {
                        sessionStorage.setItem("letra"+k, letra);
                        document.querySelectorAll('#fila'+k+' td').forEach(element => {element.classList.remove('locked');});
                        document.querySelectorAll('#fila'+k+' input').forEach(element => { element.disabled = false; });
                        
                        document.querySelector('#fila'+k+' .random_num').innerHTML = letra;
                        break;
                        }
                 }
                
             }