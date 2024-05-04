from django.shortcuts import render , redirect
from .models import gamer, nombre, apellido, ciudad, color, fruta, cosa, animal 
from django.http import JsonResponse #importo la libreria para poder enviar datos en formato json si es necesario
from .forms import Filtrar_datos # importo el formulario que cree con la clase de registro
from django.contrib.auth.models import User #importo el modelo de usuario autenticado de django
import json
from datetime import datetime


def juego(request):
    
    
    if request.method == 'POST':
        data= json.loads(request.body)
        estado = data.get('estado')
        nick = data.get('nick')
        if estado == 'true':
            print("el juego comenzo:",estado)
            tiempo_inicial = datetime.now()
            print('tiempo inicial:',tiempo_inicial, 'usuario:',nick)
            gamer.objects.filter(nickname__username=nick).update(initial_time=tiempo_inicial)
            mensaje = {'mensaje':'empezar'}
            
        elif estado == 'false':
            print("el juego termino:",estado)
            tiempo_final = datetime.now()
            print('tiempo final:',tiempo_final)
            gamer.objects.filter(nickname__username=nick).update(final_time=tiempo_final)
            actualizar_ranking() 
            usuario_jugador = gamer.objects.get(nickname__username=nick)
            tiempo = usuario_jugador.total_segundos
            mensaje = {'mensaje':'terminar','tiempo':tiempo}      
        else:
            mensaje = {'mensaje':'error'}
            
        return JsonResponse(mensaje)
    else:
        pass
    context={}
    return render(request, 'JustGame/juego.html',context)



#Comienza el programa a correr a partir de la vista de login
def login(request):
    
    #se llaman las clases de los objetos gamer y usuario para poder consultar en ellos
    gamers= gamer.objects.all()
    usuarios = User.objects.all()
    
    # si se recibe un metodo post...
    if request.method == 'POST':
        
      
        usuario_existente = False   
        data = json.loads(request.body)
        
        #se crea una instancia de la clase que limpia los datos, esta clase esta ubicada en forms.py
        user_name = data.get ('nickname')
        dificultad = data.get ('dificultad_seleccionada')
        limpieza_de_datos = Filtrar_datos()
        
        # se procede a llamar los metodos de la clase dentro de un try-except para manejar los errores
        try:
            nick =  str(limpieza_de_datos.nickname(user_name))
            dificult =  limpieza_de_datos.dificultad(dificultad)
            print (nick, dificult,' datos proporcionados correctamente')
            
            #una vez se tienen los datos limpios, se procede a verificar si el usuario ya existe por medio de un
            #for loop que recorre los usuarios existentes y retorna un booleano
            for existentes in usuarios:
                jugadores_existentes = str(existentes.username)
                print ('nuevo:',nick,'viejo:', jugadores_existentes)
                if nick == jugadores_existentes and nick != '':
                    usuario_existente = True
                    break
                else: 
                    pass


                #si el usuario existe, se actualiza su informacion en la base de datos
            if usuario_existente == True:

                print('usuario ya existe')
                gamer.objects.filter(nickname__username=nick).update(dificult=dificult) 
                mensaje = {'redireccion':'/jugar','dificultad':dificult,'nick':nick}
                return JsonResponse(mensaje)
            else:
                #si el usuario no existe
                #se crea un nuevo usuario autenticado solo con el user name y un password por defecto  
                #cuando se crea, se redirecciona a la pagina de juego y se envia el nombre de usuario 
                #para gestionar el tiempo de juego y la dificultad seleccionada
                #los datos de redireccion, nombre y dificultad se envian como response al fetch
                update_user = User.objects.create_user(username=nick, password='Default1234')
                update_user.save()   
                update_jugador = gamer(nickname=update_user, dificult=dificult)
                update_jugador.save()
                print(dificult)
                mensaje = {'redireccion':'/jugar','dificultad':dificult,'nick':nick}
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




def actualizar_ranking():
    gamers= gamer.objects.all()
    #una vez se carga el login
    #cogemos la clase gamer y hacemos una conversion de tiempo siempre y cuando exista el jugador y ya se haya
    #creado, ademas se haya terminado el juego
    print('actualizando')
    
    for jugadores in gamers:
        
        if jugadores.initial_time and jugadores.final_time:
            
  
            tiempo_inicial= jugadores.initial_time.replace(tzinfo= None)
            tiempo_final = jugadores.final_time.replace(tzinfo= None)     
            diferencia = tiempo_final - tiempo_inicial
            segundos = diferencia.total_seconds()
            total = int(segundos)
            jugadores.total_segundos = total
            jugadores.save()
            
            
        else:
            jugadores.total_segundos = 0