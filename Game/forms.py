# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User


#la clase Filtrar_datos se encarga de limpiar los datos que se reciben del front-end, aunque este archivo
#esta creado para menejar formularios, se esta utilizando para verificar datos aunque no sean de un formulario
#se esta definiendo el metodo como estatico
class Filtrar_datos:
   @staticmethod
   def nickname(user_name):
        cleaned_data = user_name.replace(' ','').strip()
        if len(cleaned_data) > 10 or len(cleaned_data) < 3:
            raise ValueError('El nombre de usuario debe tener al menos 3 caracteres y no más de 10 caracteres')
        else:    
            return cleaned_data 
   @staticmethod
   def dificultad(dificultad):
       cleaned_data = dificultad.lower().strip() 
       if cleaned_data != 'd1' and cleaned_data != 'd2' and cleaned_data != 'd3':
           raise ValueError('No existe esa dificultad')
       else:
            if cleaned_data == 'd1':
               cleaned_data = 'facil'
            elif cleaned_data == 'd2':
               cleaned_data = 'medio'
            elif cleaned_data == 'd3':
               cleaned_data = 'avanzado'  
            return cleaned_data
   
   #en el apartado anterior, el algoritmo verifica si los datos ingresados son validos, los transforma y devuelve un dato limpio
   #en caso de que no sea valido, se lanza una excepcion con un mensaje de error
   
    

