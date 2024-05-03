from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# tabla para identificar los usuarios
class gamer(models.Model):
    id= models.AutoField(primary_key=True)
    nickname = models.OneToOneField(User, on_delete=models.CASCADE)
    dificult = models.CharField(max_length=10)
    initial_time = models.DateTimeField(default= None, null=True)
    final_time = models.DateTimeField(default= None, null=True)
    total_segundos = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['dificult', 'total_segundos']
    
    def __str__(self):
        return self.nickname.username
    
#tabla para definir todos los posibles nombres
class nombre(models.Model):
    id= models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    
    def __str__(self):
        return  self.nombre
    
    
#tabla para definir todos los posibles apellidos
class apellido(models.Model):
    id= models.AutoField(primary_key=True)
    apellido = models.CharField(max_length=30)
    
    def __str__(self):
        return  self.apellido
    
#tabla para definir todas las posibles ciudades
class ciudad(models.Model):
    id= models.AutoField(primary_key=True)
    ciudad = models.CharField(max_length=20)
    
    def __str__(self):
        return  self.ciudad
    
#tabla para definir todos los posibles colores
class color(models.Model):
    id= models.AutoField(primary_key=True)
    color = models.CharField(max_length=20)
    
    def __str__(self):
        return  self.color
#tabla para definir todas las posibles frutas
class fruta(models.Model):
    id= models.AutoField(primary_key=True)
    fruta = models.CharField(max_length=20)
    
    def __str__(self):
        return  self.fruta
#tabla para definir todas las posibles cosas
class cosa(models.Model):
    id= models.AutoField(primary_key=True)
    cosa = models.CharField(max_length=20)
    
    def __str__(self):
        return  self.cosa
#tabla para definir todos los posibles animales
class animal(models.Model):
    id= models.AutoField(primary_key=True)
    animal = models.CharField(max_length=20)
    
    def __str__(self):
        return  self.animal
