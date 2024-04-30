var  login ={
    dificultad_seleccionada: '',
    nickname: '',
}

var fondo_seleccionado = '';

//  setInterval(function(){
//     location.reload();
// }, 120000); 

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


        if (fondo_seleccionado == 'f1') {
            titulo.innerHTML = 'Perros';
            titulo.style.color = 'black';
            select.style.background = 'url(../../../static/images/fondo0.jpg)';
            select.style.backgroundSize = 'cover';} 

        else if (fondo_seleccionado == 'f2') {
            titulo.innerHTML = 'Gatos';
            titulo.style.color = 'black';
            select.style.background = 'url(../../../static/images/fondo1.jpg)';
            select.style.backgroundSize = 'cover';}
        else if (fondo_seleccionado == 'f3') {
            titulo.innerHTML = 'Mas Gatos';
            titulo.style.color = 'black';
            select.style.background = 'url(../../../static/images/fondo2.jpg)';
            select.style.backgroundSize = 'cover';
            }
        else if (fondo_seleccionado == 'f4') {
            titulo.innerHTML = 'Noche';
            titulo.style.color = 'white';
            select.style.background = 'url(../../../static/images/fondo3.jpg)';
            select.style.backgroundSize = 'cover';
            select.style.backgroundPosition = 'center center';}
        else if (fondo_seleccionado == 'f5') {
            titulo.innerHTML = 'Aurora boreal';
            titulo.style.color = 'white';
            select.style.background = 'url(../../../static/images/fondo5.jpg)';
            select.style.backgroundSize = 'cover';
            select.style.backgroundPosition = 'center center';}
        else if (fondo_seleccionado == 'f6') {
            titulo.innerHTML = 'Tarde noche';
            titulo.style.color = 'white';
            select.style.background = 'url(../../../static/images/fondo6.jpg)';
            select.style.backgroundSize = 'cover';
            select.style.backgroundPosition = 'center center';}
        else{

        }
        //  console.log(fondo_seleccionado);
  
            
        
    });
});


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
                // console.log(login.dificultad_seleccionada);
            }
        });
    });
});



const boton_jugar = document.getElementById('playbtn');
const nickname = document.getElementById('nickname');

boton_jugar.addEventListener('click', (event) => {

event.preventDefault();

if (nickname.value == '') {
    window.alert('Por favor ingrese un nombre');
}
else if (login.dificultad_seleccionada == '') {
    window.alert('Por favor seleccione una dificultad');
}
else if (login.fondo_seleccionado == '') {
    window.alert('Por favor seleccione un fondo');
}
else{
login.nickname = nickname.value;
enviarDatos();
}
});