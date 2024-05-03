# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User


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
   
   
   
    

