const video = document.getElementById("video");
let data;

async function getData(){
  await fetch('http://localhost:4000/')
  .then(res=>res.json())
  .then(res=>{
    data = res;
  })
}
getData()

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
])
  .then(startWebcam)
  .then(faceRecognition);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLabeledFaceDescriptions() {
  const labels = [];
  const images = []
  data.forEach(d=>{
    labels.push(d.nombre)
    images.push(d.foto)
  })
  console.log(labels);
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      const imagesForLabel = data.filter((d) => d.nombre === label);
      const randomIndex = Math.floor(Math.random() * imagesForLabel.length);
      const img = await faceapi.fetchImage(`${imagesForLabel[randomIndex].foto}`);
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );

}

async function faceRecognition() {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  
    video.addEventListener("playing", () => {
    location.reload();
  });

    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const results = resizedDetections.map((d) => {
        let nombre = faceMatcher.findBestMatch(d.descriptor)._label;
        if(nombre !== 'unknown'){
          console.log(`${nombre} puede ingresar`);
        }
        return faceMatcher.findBestMatch(d.descriptor);
      });
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result._label,
        });
        drawBox.draw(canvas);
      });
    }, 3500);
}