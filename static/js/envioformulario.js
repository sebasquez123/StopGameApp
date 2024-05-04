// aqui se colocara todo lo relacionado con la promesa de la solicitud http para enviar los datos anteriormente
// asignados al objeto login,  para que sean evaluados por el servidor, dependiendo de lo que el servidor 
//determine, se redireccionara a la pagina del juego o se le avisara al usuario


function enviarDatos()
{
    console.log('Enviando datos:');
    console.log(login);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/entrar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        
        body: JSON.stringify(login),
    })
    .then(response => {
        if(response.ok){
            console.log('recibiendo datos:');
            return response.json();
        }
        else{
            throw 'Error en la solicitud HTTP';
        }
    })
    .then (data=>{console.log(data);
        
       //si se recibe una respuesta con codigo entre 200 y 299, se evalua si los datos recibidos son los esperados

        if(data.redireccion && data.dificultad && data.nick)
        {
            //de ser los esperados,  se guardan temporalmente en el sessionStorage
            // para terminar el ciclo de la vista del login y redirigir a la vista del juego

            console.log('recibiendo datos completos:'+' '+ data.dificultad +' '+ data.nick);
            location.href = data.redireccion;

            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('dificultad', data.dificultad);
            sessionStorage.setItem('nick', data.nick);
            sessionStorage.setItem('urlf', fondo_seleccionado);
        }
        else
        {
            console.log('no es el comando esperado');

        }
    })
    .catch(error => {
        console.log('Error en la solicitud:', error);
    });

}


