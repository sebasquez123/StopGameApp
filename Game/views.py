from django.shortcuts import render , redirect
from .models import gamer, nombre, apellido, ciudad, color, fruta, cosa, animal 
from django.http import JsonResponse #importo la libreria para poder enviar datos en formato json si es necesario
from .forms import Filtrar_datos # importo el formulario que cree con la clase de registro
from django.contrib.auth.models import User #importo el modelo de usuario autenticado de django
import json

# Create your views here.
def juego(request):
    
            
    context={}
    
    return render(request, 'JustGame/juego.html')


def login(request):
    
    banderin = 0;
    gamers= gamer.objects.all()
    usuarios = User.objects.all()
    
      #una vez se carga el login
    #cogemos la clase gamer y hacemos una conversion de tiempo siempre y cuando exista el jugador y ya se haya
    #creado, ademas se haya terminado el juego
    
    for jugadores in gamers:
        
        if jugadores.initial_time != None and jugadores.final_time != None:
            
            tiempo_inicial= jugadores.initial_time.replace(tzinfo= None)
            tiempo_final = jugadores.final_time.replace(tzinfo= None)        
            diferencia = tiempo_final - tiempo_inicial
            segundos = diferencia.total_seconds()
            
            totalminutos = int(segundos/60)
            jugadores.total_minutos = totalminutos
            jugadores.save()
        else:
            jugadores.total_minutos = 0
    
    
    
    
    
    if request.method == 'POST':
        
        # data = request.POST # para obtener datos de un formulario
        usuario_existente = False 
        redireccion = False
        data = json.loads(request.body)
        
        user_name = data.get ('nickname')
        dificultad = data.get ('dificultad_seleccionada')
        limpieza_de_datos = Filtrar_datos()
        
        try:
            nick =  str(limpieza_de_datos.nickname(user_name))
            dificult =  limpieza_de_datos.dificultad(dificultad)
            print (nick, dificult,' datos proporcionados correctamente')
            
            for existentes in usuarios:
                jugadores_existentes = str(existentes.username)
                print ('nuevo:',nick,'viejo:', jugadores_existentes)
                if nick == jugadores_existentes and nick != '':
                    usuario_existente = True
                    break
                else: 
                    pass

            if usuario_existente == True:
                mensaje = {'mensaje':'Usuario ya existe'}
                print('usuario ya existe')
                return JsonResponse(mensaje)
            else:
                #creo un nuevo usuario autenticado solo con el user name y un password por defecto  
                mensaje = {'redireccion':'/jugar'}
                user = User.objects.create_user(username=nick, password='Default1234')
                user.save()
                print('usuario creado exitosamente')
                return JsonResponse(mensaje)
                
              
        except  ValueError as e:
            nick =''
            dificult = ''
            print(f'error: {e}')
            mensaje = {'mensaje':f'error: {e}'}
            return JsonResponse(mensaje)
    
    else:
        pass
    
    
    context = {'gamers': gamers}
    return render(request, 'JustGame/login.html', context)



