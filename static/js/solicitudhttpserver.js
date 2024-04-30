// aqui se colocara todo lo relacionado con la promesa de la solicitud http para enviar al lado
//  del servidor usando formatos json y fetch de javascript


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
        
        if(data.redireccion)
        {
            location.href = data.redireccion;
        }
        else
        {
            console.log('no se recibio el dato correcto');
        }
    })
    .catch(error => {
        console.log('Error en la solicitud:', error);
    });

}


