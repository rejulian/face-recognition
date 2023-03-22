# Reconocimiento Facial usando Face-API.

## Como utilizarlo?

Descarga o clona el repositorio.
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