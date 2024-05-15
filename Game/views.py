from django.shortcuts import render , redirect
from .models import gamer, nombre, apellido, ciudad, color, fruta, cosa, animal 
from django.http import JsonResponse #importo la libreria para poder enviar datos en formato json si es necesario
from .forms import Filtrar_datos # importo el formulario que cree con la clase de registro
from django.contrib.auth.models import User #importo el modelo de usuario autenticado de django
import json
from datetime import datetime
from unidecode import unidecode




def juego(request):
    
    if request.method == 'POST':
        data= json.loads(request.body)
        estado = data.get('estado')
        nick = data.get('nick')
        fase = data.get('contador')
        trama = data.get('trama')
        letra = data.get('letra')
        mensaje= calculo_de_tiempos(estado,nick,fase,trama,letra)           
        return JsonResponse(mensaje)
    else:
        pass
    context={'gamers':gamer.objects.all()}
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


tiempo_inicial = 0
tiempo_final = 0   
tiempo_1=0
tiempo_2=0
tiempo_3=0
score_1=0
score_2=0
score_3=0
puntos_por_item = [0,0,0,0,0,0,0]

def calculo_de_tiempos(estado,nick,fase,trama,letra):
    global tiempo_inicial
    global tiempo_final
    
    if estado == 'true':
        print("el juego comenzo:",estado)
        tiempo_inicial = datetime.now()
        mensaje = {'mensaje':'empezar'}
        return mensaje
        
    elif estado == 'false':
        print("el juego termino:",estado)
        tiempo_final = datetime.now()
        print('tiempo final:',tiempo_final)
        mensaje = actualizar_ranking(tiempo_inicial,tiempo_final,nick,fase,trama,letra)
        print('mensaje:',mensaje)
        return mensaje   
    else:
        mensaje = {'mensaje':'error'}
        return mensaje
    
    
def actualizar_ranking(tiempo_inicial,tiempo_final,nick,fase,trama,letra):
    gamers= gamer.objects 
    print('actualizando')
    global puntos_por_item
    global score_1
    global score_2
    global score_3
    if tiempo_inicial and tiempo_final:
    
        diferencia = tiempo_final - tiempo_inicial
        diferencia = int(diferencia.total_seconds())
        fase = str(fase)
        print ('fase:',fase)
        tiempo = asignacion_de_tiempos(fase,diferencia)
        print ('tiempo:',tiempo)
        score = Calculo_de_score(fase,trama,letra)
        print('score:',score)
        
        if(fase == '1' or fase == '2'):
            gamers.filter(nickname__username = nick).update(total_segundos=0,score=0)
            mensaje = {'mensaje':'terminar','tiempo':tiempo,'score':score,'puntaje_item':puntos_por_item}
            return mensaje
        elif(fase == '3'):
            vector_ganador = definir_juego()
            gamers.filter(nickname__username = nick).update(total_segundos=vector_ganador[1],score=vector_ganador[0])
            mensaje = {'mensaje':'terminar','score_final':vector_ganador,'puntaje_item':puntos_por_item,'tiempo':tiempo,'score':score}
            score_1=0
            score_2=0
            score_3=0
            return mensaje
        else:
            pass
    else:
        gamers.filter(nickname__username = nick).update(total_segundos=0,score=0)
    
        
def asignacion_de_tiempos(fase,total):
    global tiempo_1
    global tiempo_2
    global tiempo_3
    
    if fase == '1':
        tiempo_1 = total
        return tiempo_1
    elif fase == '2':
        tiempo_2 = total
        return tiempo_2
    elif fase == '3':
        tiempo_3 = total    
        return tiempo_3    
    else:
        pass
    
def Calculo_de_score(fase,trama,letra):

    global puntos_por_item
    global score_1
    global score_2
    global score_3

    arreglo_de_clases =['nombre','apellido','ciudad','color','fruta','cosa','animal']
    
    
    print(letra)
    letra = letra.lower()
    arreglo_estacionario = [cadena.lower() for cadena in trama]
    arreglo_sin_diacriticos = [unidecode(cadena) for cadena in arreglo_estacionario]
    print('trama:',arreglo_sin_diacriticos)
    for numero in range(0,7):
        comparacion(arreglo_sin_diacriticos,puntos_por_item,arreglo_de_clases[numero],arreglo_de_clases[numero],letra,numero)
    print('puntos:',puntos_por_item)
            
    #aqui guardo el puntaje dependiendo de en que fase este el juego
    if fase == '1':
        for numero in range(0,7):
            score_1 =  score_1 + puntos_por_item[numero]
        return score_1
    elif fase == '2':
        for numero in range(0,7):
            score_2 =  score_2 + puntos_por_item[numero]
        return score_2
    elif fase == '3':
        for numero in range(0,7):
            score_3 =  score_3 + puntos_por_item[numero]
        return score_3 
    else:
        pass
    
    
def comparacion(arreglo_de_entrada,arreglo_de_puntos,clase_name,atributo,letra,posicion):
    clase = globals()[clase_name] #espacio de variables globales
    modelo = clase.objects.all()
    
    for item in modelo:
        item = getattr(item,atributo) #adquiere el valor del atributo de la clase rapidamente
        item = str(item)
        if item.startswith(letra):
            if arreglo_de_entrada[posicion] == item:
                print('si existe la palabra:',item)
                arreglo_de_puntos[posicion] = 10
                break
            else:
                print('no existe la palabra:',arreglo_de_entrada[posicion],'en:',item)
                arreglo_de_puntos[posicion] = 0
        else:
            pass
            
            
def definir_juego ():
    global tiempo_1
    global tiempo_2
    global tiempo_3
    global score_1
    global score_2
    global score_3
    print('score_1:',score_1,',score_2:',score_2,',score_3:',score_3)
    matriz = [[score_1,tiempo_1],[score_2,tiempo_2],[score_3,tiempo_3]]
    matriz.sort(key= lambda x: x[0],reverse=True)
    print('matriz:',matriz)

    if matriz[0][0]==matriz[1][0]:
        if matriz[0][1]>matriz[1][1]:
            return matriz[1]
        else:
            return matriz[0]
    else:
        return matriz[0]
    
