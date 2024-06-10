
                const nombretext= document.getElementById("nombre");
                const FondoDelCuerpo = document.querySelector("body");
                var identidad =sessionStorage.getItem("id");
                var nombre = sessionStorage.getItem("nick");
                var dificultad = sessionStorage.getItem("dificultad");
                var urlf = sessionStorage.getItem("urlf");
                

                //LOGICA PARA ESTABLECER EL FONDO DE LA PANTALLA Y BLOQUEAR LAS CELDAS
                if(urlf == "f1"){urlf = "../../../static/images/fondo0.jpg"; }
                else if(urlf == "f2"){urlf = "../../../static/images/fondo1.jpg";}
                else if (urlf == "f3"){urlf = "../../../static/images/fondo2.jpg";}
                else if(urlf == "f4"){urlf = "../../../static/images/fondo3.jpg";}
                else if (urlf == "f5"){urlf = "../../../static/images/fondo4.jpg";}
                else{urlf = "../../../static/images/fondo5.jpg";}

                FondoDelCuerpo.style.backgroundImage = "url("+urlf+")";
                nombretext.innerHTML = nombre.toUpperCase() + " - " + dificultad.toUpperCase();

                for (let j = 1; j < 4; j++) {
                document.querySelectorAll('#fila'+j+' td').forEach(element => { element.classList.add('locked'); });
                 document.querySelectorAll('#fila'+j+' input').forEach(element => { element.disabled = true; });
                }
