# Reconocimiento Facial usando Face-API.

## Como utilizarlo?

Descarga o clona el repositorio.
Crea una base de datos llamada facerecognition y dentro una tabla llamada empleado.
Cada empleado debe tener id, nombre y foto. (En foto hay que guardar un enlace de la foto)
Ejecuta una terminal y sigue estos pasos:

```sh
cd server/
npm i
nodemon index.js
```

Instalar Live server en VSCODE y abre index.html con Live Server.

## Que hace la funcion: getLabeledFaceDescriptions?

- Crea una matriz vacía llamada labels y otra matriz vacía llamada images.
- Recorre un arreglo llamado data que contiene objetos con información sobre cada imagen, y agrega el nombre de cada imagen a la matriz labels y la ruta de la imagen a la matriz images.
- Muestra en la consola la matriz labels.
- Crea un arreglo de promesas utilizando Promise.all(). Esta función toma una matriz de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas de la matriz se han resuelto.
- Usa labels.map() para iterar a través de cada etiqueta en la matriz labels. Para cada etiqueta:

> Crea una matriz vacía llamada descriptions.

>  Filtra la matriz data para encontrar todas las imágenes con la etiqueta actual y elige una imagen al azar.

>  Descarga la imagen utilizando la función faceapi.fetchImage() y espera a que se complete la descarga.

>  Detecta un solo rostro en la imagen descargada utilizando faceapi.detectSingleFace(), que devuelve una promesa que se resuelve en un objeto de detección de rostro.

> Luego, utiliza el objeto de detección para extraer los puntos de referencia faciales y la descripción del rostro utilizando los métodos .withFaceLandmarks() y .withFaceDescriptor().

>  Agrega la descripción del rostro a la matriz descriptions.

>  Devuelve un nuevo objeto LabeledFaceDescriptors de face-api.js que contiene la etiqueta actual y la matriz de descripciones de rostros para esa etiqueta.

En resumen, la función getLabeledFaceDescriptions() genera descripciones de rostros etiquetadas para cada imagen en la matriz data. Las descripciones de los rostros se calculan utilizando la biblioteca face-api.js y se devuelven como una promesa que se resuelve en una matriz de objetos LabeledFaceDescriptors.

## Que hace la funcion: faceRecognition?

- Llama a la función getLabeledFaceDescriptions() para obtener una lista de descripciones etiquetadas de rostros. Esta función devuelve una promesa que se resuelve en una matriz de objetos LabeledFaceDescriptors.
- Utiliza la lista de descripciones de rostros para crear un objeto FaceMatcher de face-api.js. Este objeto se utiliza para comparar los rostros detectados con los rostros etiquetados en la lista de descripciones de rostros.
- Agrega un evento de escucha para que se recargue la página si el video comienza a reproducirse.
- Crea un nuevo elemento canvas a partir del video y lo agrega al cuerpo del documento.
- Define el tamaño de visualización del canvas y ajusta las dimensiones del canvas a los mismos valores que el tamaño del video utilizando la función faceapi.matchDimensions().
- Cada 3.5 segundos, utiliza faceapi.detectAllFaces() para detectar los rostros en el video. Para cada detección de rostro:

> Usa los métodos .withFaceLandmarks() y .withFaceDescriptors() para extraer los puntos de referencia faciales y la descripción del rostro.

> Usa el objeto FaceMatcher para encontrar la mejor coincidencia de rostro en la lista de descripciones de rostros. Si la mejor coincidencia no es "unknown", se muestra un mensaje en la consola indicando que el rostro detectado puede ingresar.

> Dibuja un cuadro alrededor del rostro detectado en el canvas utilizando la función faceapi.draw.DrawBox().

En resumen, la función faceRecognition() utiliza la biblioteca face-api.js para detectar y comparar los rostros en tiempo real a partir de un video de entrada. Se utiliza una lista de descripciones etiquetadas de rostros para realizar la comparación y se dibujan cuadros alrededor de los rostros detectados en el canvas. Además, se muestra un mensaje en la consola si se detecta un rostro que coincide con uno de los rostros etiquetados.
