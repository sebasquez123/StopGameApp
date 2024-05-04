
// cuando el DOM esta completamente cargado, se autoinicia el modal de informacion inicial del juego

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('infibtn').click();
   
});
//la funcion desplegarPuntaje, se encarga de desplegar el modal de final de la partida y de llamar las variables
//guardadas en el sessionStorage.
function desplegarPuntaje()
{
    // se abre el modal de finalizacion de manera forzada
    boton= document.getElementById('inffbtn').click();


    // calcularPuntaje();




    //cuando se preciona el boton de salir, se redirige a la pagina de inicio
    document.getElementById('leftbtn').addEventListener('click', function(){
        window.location.href = "/entrar";
    });

    // se despliega la informacion de la partida en el modal.

    document.getElementById('dificult_board').innerHTML = sessionStorage.getItem("dificultad").toUpperCase();
    document.getElementById('time_board').innerHTML = sessionStorage.getItem("tiempo_total");
    console.log("tiempo"+sessionStorage.getItem("tiempo_total")+ "dificultad"+sessionStorage.getItem("dificultad"));
    // document.getElementById('score_board').innerHTML = sessionStorage.getItem("score");
}




// const box = document.querySelectorAll('.box');
// box.forEach(box => {


//     function getRandomColor() 
//     {
//     const arreglo = ["ff","00"]
//     colorrandom = (Math.floor(Math.random() * (99 - 10 + 1)) + 10).toString();
//     arreglo.push(colorrandom);
//     for (let i = arreglo.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1)); // Generar un índice aleatorio entre 0 e i
//         [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]; // Intercambiar los elementos en las posiciones i y j
//     }
//     color = arreglo.join('');
//     return color;
//     }
//     function updateGradient() {
//         const color1 = '#' + getRandomColor();
//         const color2 = '#' + getRandomColor();
//         box.style.setProperty('--color1', color1); // Actualizar el valor de la variable CSS
//         box.style.setProperty('--color2', color2); // Actualizar el valor de la variable CSS
//     }
//     setInterval(updateGradient, 1000); // Actualizar el gradiente cada segundo
// });