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
        
       
        if(data.redireccion && data.dificultad && data.nick)
        {
            console.log('recibiendo datos completos:'+' '+ data.dificultad +' '+ data.nick);
            location.href = data.redireccion;

            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('dificultad', data.dificultad);
            sessionStorage.setItem('nick', data.nick);
            sessionStorage.setItem('urlf', fondo_seleccionado);
            //almacenar estos datos en el sessionStorage para usarlos en la siguiente pagina y devolver otro fetch 
            //con el objeto completo de la partida
        }
        else
        {
            console.log('el usuario ya existe');
            document.getElementById('warning').classList.add('active');
            document.getElementById('advertencia').innerHTML = 'El usuario ya existe, escoge <strong style="color:white;">Otro</strong> para continuar...';
    
        }
    })
    .catch(error => {
        console.log('Error en la solicitud:', error);
    });

}


