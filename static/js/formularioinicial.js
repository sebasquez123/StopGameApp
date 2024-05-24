var  login ={
    dificultad_seleccionada: '',
    nickname: '',
    codigo_host:0 ,
    codigo_sesion : 0,
}
var fondo_seleccionado = '';


initparty.disabled = true;

//de aqui en adelante, se realiza la manipulacion del DOM para desplegar elementos del formulario inicial
//por medio de clases css
const select = document.getElementById('templs');
const opciones = document.getElementById('opciones');
const contenedor = document.querySelector('.contenedor');
const body = document.querySelector('body');
const seccionDestino = document.getElementById('pie');

select.addEventListener('click', () => {
    
    select.classList.toggle('active');
    opciones.classList.toggle('active');
    contenedor.classList.toggle('active');
    body.classList.toggle('active');

    setTimeout(() => {
        seccionDestino.scrollIntoView({ behavior: 'smooth' });
    }, 200);
});

//se revisan todos los elementos de la clase fonts, para asignarles un evento de click
//y se asigna el id del elemento a la variable encargaad
const titulo = document.querySelector('.titulo');
fondos = document.querySelectorAll('.fonts');
fondos.forEach(fondo => {
    fondo.addEventListener('click', function() {
        fondo_seleccionado = fondo.id;
        select.classList.toggle('active');
        opciones.classList.toggle('active');
        contenedor.classList.toggle('active');
        body.classList.toggle('active');
        titulo.classList.add('active');
        titulo.style.color = 'black';
        
        if (fondo_seleccionado == 'f1') {
            titulo.innerHTML = 'Bachichas';
            select.style.background = 'url(../../../static/images/fondo0.jpg)';
            select.style.backgroundSize = 'cover';
            } 
        else if (fondo_seleccionado == 'f2') {
            titulo.innerHTML = 'Gatos';
            select.style.background = 'url(../../../static/images/fondo1.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else if (fondo_seleccionado == 'f3') {
            titulo.innerHTML = 'tucanes';
            select.style.background = 'url(../../../static/images/fondo2.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else if (fondo_seleccionado == 'f4') {
            titulo.innerHTML = 'Capis';
            select.style.background = 'url(../../../static/images/fondo3.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else if (fondo_seleccionado == 'f5') {
            titulo.innerHTML = 'Nutrias';
            select.style.background = 'url(../../../static/images/fondo4.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else if (fondo_seleccionado == 'f6') {
            titulo.innerHTML = 'Camas';
            titulo.style.color = 'white';
            select.style.background = 'url(../../../static/images/fondo5.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else{
            
        }
        
            
        
    });
});

//lo mismo sucede cuando se selecciona una dificultad, se asigna el id del elemento seleccionado a la variable
//encargada, y se realiza un algoritmo simple para desactivar los elementos alternativos
const checks = document.querySelectorAll('input[type="radio"]');

checks.forEach(items => {
    items.addEventListener('click', function() {
        // Desactivar los otros elementos de radio
        checks.forEach(otro => {
            if (otro !== items) {
                otro.checked=false;
            }
            else{
                login.dificultad_seleccionada = items.id;
            }
        });
    });
});


//se evalua el boton jugar, y se verifica que los campos esten llenos, de lo contrario se despliega un mensaje 
//de advertencia, un elemento de la clase warning, que se encuentra oculto en el html
const boton_jugar = document.getElementById('playbtn');
const nickname = document.getElementById('nickname');


document.querySelector('.delete').addEventListener('click', () => {
    document.getElementById('warning').classList.remove('active');
});


boton_jugar.addEventListener('click', (event) => {

event.preventDefault();

if (nickname.value == '') {
    warning.classList.add('active');
    document.getElementById('advertencia').innerHTML = 'Ingresa tu mejor <strong style="color:white;">apodo</strong> para continuar...';
}
else if (login.dificultad_seleccionada == '') {
    console.log('si sirve')
    warning.classList.add('active');
    document.getElementById('advertencia').innerHTML = 'Selecciona una <strong style="color:white;">dificultad</strong> para continuar...';
}
else if (fondo_seleccionado == '') {
    warning.classList.add('active');
    advertencia.innerHTML = 'Selecciona un estilo de <strong style="color:white;">fondo</strong> para continuar...';
    
}
else{
//cuando todo es correcto, se envia el objeto con el nombre, la dificultad y el fondo seleccionado por medio 
//de una solicitud http
    login.nickname = nickname.value;
    gamemode.click();
}
});


    
// si el usuario decide jugar solo, no se asigna ningun codigo de juego y se redirige a la pagina de juego
    alonegame.addEventListener('click', () => {

        login.codigo_host = 0;
        login.codigo_sesion = 0;
        enviarDatos();
        
    });

    
// si se preciona el boton de host, se genera un codigo automaticamente y se asigna a la variable codigo_host
// despues de generarse, si se preciona fuera del contenedor, se reinicia la generacion de codigo
    hotingbtn.addEventListener('click', function(event){
    login.codigo_host = Math.floor(Math.random() * 1000000);
    setTimeout(() => {
      textloader.style.display = 'none';
      sessioncode.innerHTML = login.codigo_host;
      initparty.disabled = false;
    }, 4000);
    if(!hostingcode.contains(event.target)){
      textloader.style.display = 'block';
      sessioncode.innerHTML = '';
      initparty.disabled = true;
    }
    });
// si ya se tiene el codigo de host, se envia el objeto con el codigo y se redirige a la pagina del juego
    initparty.addEventListener('click', () => {
      login.codigo_sesion = 0;
         enviarDatos();
    });

// si en ves de jugar como host, se decide unir a la partida proporcionando un codigo , se verifica 
// que el codigo coincida con el servidor. si es correcto, se redirige a la pagina de juego
    searchpartybtn.addEventListener('click', () => {
        if(Areacode.value){            
            login.codigo_host = 0;
            login.codigo_sesion = Areacode.value;
              enviarDatos();    
        }else{
            warning.classList.add('active');
            advertencia.innerHTML = 'Ingresa un codigo para continuar...';
        }
    }); 
    

window.addEventListener('load', function () {
    sessionStorage.clear();
});