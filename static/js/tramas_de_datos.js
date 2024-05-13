

var trama_de_palabras = [];

function obtener_palabras(){
   
    let fase = sessionStorage.getItem("contador")

    for (let i = 1; i < 4; i++) {

        if (fase == i) {
            document.querySelectorAll('#fila'+i+' input').forEach(element => {
            trama_de_palabras.push(element.value);
            });
        } 
    }
}