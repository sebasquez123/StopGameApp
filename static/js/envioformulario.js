// aqui se colocara todo lo relacionado con la promesa de la solicitud http para enviar los datos anteriormente
// asignados al objeto login,  para que sean evaluados por el servidor, dependiendo de lo que el servidor 
//determine, se redireccionara a la pagina del juego o se le avisara al usuario


function enviarDatos()
{
    console.log('Enviando datos:');
    
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

            console.log('recibiendo datos completos');
            
            //variables de servidor
            sessionStorage.setItem('espacio_host', data.espacio_host);
            sessionStorage.setItem('codigo_host', data.codigo_host);
            sessionStorage.setItem('espacio_sesion', data.espacio_sesion);
            sessionStorage.setItem('codigo_sesion', data.codigo_sesion);
            //variables de visualizacion
            sessionStorage.setItem('dificultad', data.dificultad);
            sessionStorage.setItem('nick', data.nick);
            sessionStorage.setItem('urlf', fondo_seleccionado);
            excepciones(data.redireccion,data.espacio_host,data.espacio_sesion,data.codigo_host,data.codigo_sesion);
            
        }
        else if (data.mensaje) {
            //si no son los esperados, se muestra un mensaje de error
            warning.classList.add('active');
            advertencia.innerHTML = "Tu nombre no puede contener mas de 10 caracteres y menos de 3 caracteres...";
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


function excepciones(url,espacio_host,espacio_sesion,codigo_host,codigo_sesion)
{
    if (codigo_host == 0 && codigo_sesion != 0 &&espacio_sesion == false) //ingresando por codigo de sesion
    {
        warning.classList.add('active');
        advertencia.innerHTML = 'No existe este codigo o no hay espacio dentro de la sesion... intenta con otro!';
    }
    else if (codigo_sesion == 0 && codigo_host!= 0 && espacio_host == false) // hosteando el juego
    {
        warning.classList.add('active');
        advertencia.innerHTML = 'Todos los servidores estan ocupados... intenta mas tarde...';
    }
    else
    {
      location.href = url;  
    }
    
}
