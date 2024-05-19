
// cuando el DOM esta completamente cargado, se autoinicia el modal de informacion inicial del juego

document.addEventListener('DOMContentLoaded', function(){
    
    for (let i = 1; i < 4; i++) {
        document.querySelectorAll('#fila'+i+' input').forEach(element => { element.autocomplete = "off"; });
    }
    //cuando se preciona el boton de salir, se redirige a la pagina de inicio
    document.getElementById('leftbtn').addEventListener('click', function(){
        window.location.href = "/entrar";
        sessionStorage.clear();
    });
    //cuando se preciona el boton de volver a jugar, se recarga la pagina
    document.getElementById('againbtn').addEventListener('click', function () {
        location.reload();
    });
});
//la funcion desplegarPuntaje, se encarga de desplegar el modal de final de la partida y de llamar las variables
//guardadas en el sessionStorage.
function desplegarPuntaje() {
    let fase = sessionStorage.getItem("contador");
    let score = sessionStorage.getItem("score");
    let tiempo = sessionStorage.getItem("tiempo_total");
    let puntaje_item = sessionStorage.getItem("fila_puntaje").split(',');
    
    for (let i = 1; i < 4; i++) {

        if (fase == i) {
            document.querySelectorAll('#fila' + i + ' input').forEach(element => { element.disabled = true; });
            document.querySelector('#fila' + i + ' .puntaje').innerHTML = score + 'p/' + tiempo + 's';
            document.querySelectorAll('#fila' + i + ' td').forEach(function (element, index) {
                if (index > 0 && index < 8) {
                    if (puntaje_item[index - 1] == "10") {
                        element.classList.add('correct');
                        console.log(puntaje_item[index - 1]);
                    }
                    else {
                        element.classList.add('wrong');
                    }
                }
                
            });

            if (fase == 3) abrir_resultados();
        }
    }
       
}

abrir_resultados = () => {
    let stops = document.getElementById('stop');
    let score_final = sessionStorage.getItem("score_final").split(',');
    stops.disabled = true;

    setTimeout(function () {
            // se abre el modal de finalizacion de manera forzada
            document.getElementById('inffbtn').click();
            // se añade la informacion del juego al modal
            document.getElementById('dificult_board').innerHTML = sessionStorage.getItem("dificultad").toUpperCase();
            document.getElementById('time_board').innerHTML = score_final[1] + 's';
            document.getElementById('score_board').innerHTML = score_final[0] + 'p';
       
        
    }, 2000); 
    }
    
        

 


