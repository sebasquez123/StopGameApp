from django.shortcuts import render
from .models import gamer, nombre, apellido, ciudad, color, fruta, cosa, animal
from datetime import datetime

# Create your views here.

def login(request):
    
    gamers= gamer.objects.all()
    
    for jugadores in gamers:
        
        tiempo_inicial= jugadores.initial_time.replace(tzinfo= None)
        tiempo_final = jugadores.final_time.replace(tzinfo= None)        
        diferencia = tiempo_final - tiempo_inicial
        segundos = diferencia.total_seconds()
        
        totalminutos = int(segundos/60)
        jugadores.total_minutos = totalminutos
        jugadores.save()
        
    context = {'gamers': gamers}
    return render(request, 'JustGame/login.html', context)



def juego(request):
    
    return render(request, 'JustGame/juego.html')