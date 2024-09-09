<div style="align: justify;">
<strong>Un aplicativo de entretenimiento diseñado para revivir el tradicional juego que conocemos como "STOP". Este modulo tiene como finalidad registrar un jugador que se guardara
en base de datos SQlite3 y se calculara un puntaje de habilidad al terminar el juego. ESTE DESARROLLO POSEE MODELO RANDOM FOREST PARA RESOLVER LA VALIDACION DE PALABRAS POR CLASIFICACIÓN.

![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-inicio.png)

Existen 2 modos de juego, el primero es una batalla online, donde se puede ingresar un codigo de conexión al servidor para todo aquel que desea ser guest y/o compartir un 
codigo cuando se desea ser host. el segundo modo de juego es cuando se desea jugar en solitario sin conexión al servidor, es util cuando los integrantes estan en la misma
habitación.
  
![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-solitario.png)
![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-EnterCode.png)
![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-HostCode.png)

Al iniciar el juego, se añade una información inicial para instruir al jugador; alli se introduce a las funcionalidades básicas y al modelo de puntuación. Cuando el modo de
juego es Online, se espera a que los participantes entren a la sesión y activen el boton de " ESTOY LISTO ".
Solamente el HOST debera activar la sesion de juego, cuando todos los jugadores esten listos.

![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-instructivo.png)

El juego se desarrolla completando 3 ciclos con la misma dificultad, habiendo 3 puntuaciones, el servidor calcula y alimenta la base de datos.

![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-Juego.png)

El jugador con el mejor puntajede acuerdo a la estrategia de calificación, sera mostrado como ganador de la partida una vez se preciona el boton
de STOP.

![](https://github.com/sebasquez123/StopGameApp/blob/main/figures/Figura-finalizacionJuego.png)

Al finalizar, se propone revivir la experiencia nuevamente con el mismo equipo, o salir del juego. Cabe resaltar que las posibles palabras correctas dentro del juego se evaluan
segun las palabras existentes en la base de datos. de esta manera, si falta una de alguna categoria, puede añadirse facilmente con un INSERT.<strong>

<div>
