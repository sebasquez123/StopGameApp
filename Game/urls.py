from django.urls import path
from . import views



urlpatterns = [
    path('entrar/', views.login, name="login"),
    path('jugar/', views.juego, name="juego"),
    path('get-data/', views.get_data, name="get_data"),
]
