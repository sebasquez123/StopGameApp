from django.shortcuts import render , redirect
from .models import gamer, nombre, apellido, ciudad, color, fruta, cosa, animal , esparcimiento
from django.http import JsonResponse #importo la libreria para poder enviar datos en formato json si es necesario
from .forms import Filtrar_datos # importo el formulario que cree con la clase de registro
from django.contrib.auth.models import User #importo el modelo de usuario autenticado de django
import json
from datetime import datetime
from unidecode import unidecode


tiempo_inicial = 0
tiempo_final = 0   
tiempo_1=0
tiempo_2=0
tiempo_3=0
score_1=0
score_2=0
score_3=0
puntos_por_item = [0,0,0,0,0,0,0]

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
    
    codigo_existe = False
    espacioEnServidor= False
    codigo_de_host = 0
    codigo_de_partida = 0
    
    
    #se llaman las clases de los objetos gamer y usuario para poder consultar en ellos
    gamers= gamer.objects.all()
    usuarios = User.objects.all()
    servidores = esparcimiento.objects.all()
    
    # si se recibe un metodo post...
    if request.method == 'POST':
        
      
        usuario_existente = False   
        data = json.loads(request.body)
        
        #se crea una instancia de la clase que limpia los datos, esta clase esta ubicada en forms.py
        user_name = data.get ('nickname')
        dificultad = data.get ('dificultad_seleccionada')
        codigo_de_host = data.get ('codigo_host')
        codigo_de_partida = data.get ('codigo_sesion')
        limpieza_de_datos = Filtrar_datos()

        
        
        # se procede a llamar los metodos de la clase dentro de un try-except para manejar los errores
        try:
            nick =  str(limpieza_de_datos.nickname(user_name))
            dificult =  limpieza_de_datos.dificultad(dificultad)
            print (nick, dificult,'datos proporcionados correctamente')
            
            #asignamos el codigo de host a la tabla de servidor e ingresamos los usuarios que vienen con codigo 
            
            espacioEnServidor = asignar_codigo_a_servidor(codigo_de_host,codigo_de_partida,nick,dificult,espacioEnServidor)
            codigo_existe = buscar_registrar_partida(codigo_de_host,codigo_de_partida,nick,codigo_existe)
            
            # son alternativos, si uno es 0, el otro es diferente de 0
            print('codigo de anfitrion: ',codigo_de_host) 
            print('codigo de invitado: ',codigo_de_partida)
            
            print('todo el servidor: ',servidores) #visualizacion del servidor total
            print('hay espacio para un nuevo host?',espacioEnServidor) #hay espacio en el servidor? si y solo si se hostea la partida
            print('codigo existe? ',codigo_existe) #si existe el codigo en el servidor? si y solo si se une a una partida 
            
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
            if usuario_existente:

                print('usuario ya existe')
                print(codigo_de_host)
                print(codigo_de_partida)
                gamer.objects.filter(nickname__username=nick).update(dificult=dificult)
                if  codigo_existe:dificult=visitante(codigo_de_partida,nick)
                else:pass
                mensaje = {'redireccion':'/jugar','dificultad':dificult,'nick':nick,'espacio_host':espacioEnServidor,'codigo_host':codigo_de_host,'espacio_sesion':codigo_existe,'codigo_sesion':codigo_de_partida}
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
                if  codigo_existe: dificult=visitante(codigo_de_partida,nick)
                else:pass    
                print(codigo_de_host)
                print(codigo_de_partida)
                mensaje = {'redireccion':'/jugar','dificultad':dificult,'nick':nick,'espacio_host':espacioEnServidor,'codigo_host':codigo_de_host,'espacio_sesion':codigo_existe,'codigo_sesion':codigo_de_partida}                
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


    
    
def visitante(codigo_de_partida,nick):
    codigos = esparcimiento.objects.all()
    for partida in codigos:
        if partida.codigo == int(codigo_de_partida):
            gamer.objects.filter(nickname__username=nick).update(dificult=partida.dificultad)
            print("SE CAMBIO LA DIFICULTAD CON EXITO") 
            return partida.dificultad
        else:
            dif = ''
    
        
    
def asignar_codigo_a_servidor(codigo_de_host,codigo_de_partida,nick,dificult,espacioEnServidor):
    servidores = esparcimiento.objects.all()
    if codigo_de_host != 0 and codigo_de_partida == 0: 
        for servidor in servidores:
            if servidor.codigo == 0:
                servidor.codigo = codigo_de_host
                servidor.nick1 = nick
                servidor.dificultad = dificult
                servidor.save()
                espacioEnServidor = True
                print ('Espacio en el servidor disponible:',espacioEnServidor)
                break 
            else:
                print ('Espacio en el servidor no disponible',espacioEnServidor)
                espacioEnServidor = False         
    else:
        espacioEnServidor = False 
        print(" no esta recibiendo codigo de host")
    
    return espacioEnServidor

    
#cada vez que haya un codigo de partida, se revisara la cantidad de nicks que hay en el atributo de la clase con codigo
#xxxxxx, si hay un espacio disponible, en ese espacio se almacena el nick y se prioriza la dificultad del host.
def buscar_registrar_partida(codigo_de_host,codigo_de_partida,nick,codigo_existe):
    servidores = esparcimiento.objects.all()

    
    codigo_de_partida = int(codigo_de_partida)
    if codigo_de_partida != 0 and codigo_de_host == 0: 
        for servidor in servidores:
            if servidor.codigo == codigo_de_partida:
                codigo_existe = True
                print ('codigo existe dentro del servidor')
                break
            else:
                codigo_existe = False
                print ("codigo no existe dentro del servidor")
    else:
        codigo_existe = False
        print(" no esta recibiendo codigo de partida")
        
    if codigo_existe:   
        for i in range(1,6):
            empty_space = getattr(servidor,f'nick{i}')
            if empty_space == '':
                setattr(servidor,f'nick{i}',nick)
                servidor.save() 
                print('fnickn:',f'nick{i}', 'nick:',nick)
                codigo_existe = True
                print ("Si hay espacio en el servidor")
                break
            else:
                codigo_existe = False
                print ("No hay espacio en el servidor",empty_space)
                
                
    return codigo_existe
        





#logica para el modulo del juego
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
    
    
    
def get_data(request):
    jugadores = esparcimiento.objects.all()
    lista_de_jugadores = []
    lista_de_estados = []
    #buscar el codigo en el servidor, y sustraer solo sus jugadores en una lista para mostrarlos
    #al mismo tiempo, consulta el estado de cada jugador en la misma tabla y envia otra lista con los estados
    nick = request.GET.get('nombre')
    codigo_asociado = request.GET.get('codigo_asociado')
    estado_de_inicio = request.GET.get('estado_de_inicio')
    play = request.GET.get('play')
    quitarModalDeInicio = request.GET.get('quitarModalDeInicio')
    espacio_host = request.GET.get('espacio_host')
    
    play = True if play == 'true' else False
    quitarModalDeInicio = True if quitarModalDeInicio == 'true' else False
    estado_de_inicio = True if estado_de_inicio == 'true' else False
    
    for jugador in jugadores:
        if jugador.codigo == int(codigo_asociado):
            print('obteniendo jugadores registrados')
            if espacio_host == 'true':subir_datos_de_control(play,quitarModalDeInicio,jugador)
            else:pass
            objeto_de_control = {'newplay':getattr(jugador,'play'),'inicio':getattr(jugador,'inicio')}
            for i in range (1,6):   
                if getattr(jugador,f'nick{i}') != '':
                    if(getattr(jugador,f'nick{i}')==nick):
                       setattr(jugador,f'nickstate{i}',estado_de_inicio)
                       jugador.save() 
                    lista_de_estados.append(getattr(jugador,f'nickstate{i}'))
                    lista_de_jugadores.append(getattr(jugador,f'nick{i}'))
                    print('nick:'f'nick{i}')
                
        else:
            pass
        
    
    # print('jugadores:',lista_de_jugadores)  
    # print('estado:',lista_de_estados)         
    # print('nick:',nick,'codigo:',codigo_asociado,'estado:',estado_de_inicio,'objetodecontrol:',objeto_de_control)
    print('objetodecontrol:',objeto_de_control)
    mensaje = {'jugadores_list':lista_de_jugadores,'estados_list':lista_de_estados,'newplay':objeto_de_control['newplay'],'inicio':objeto_de_control['inicio']}

    return JsonResponse(mensaje, safe=False)
        
  
def subir_datos_de_control(play,quitarModalDeInicio,jugador):
    
    setattr(jugador,'play',play)
    setattr(jugador,'inicio',quitarModalDeInicio)
    jugador.save()
