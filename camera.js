if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registrado com sucesso:', registration);

      registration.update();
    }).catch((error) => {
      console.log('Falha ao registrar o ServiceWorker:', error);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const openCameraBtn = document.getElementById('open-camera-btn');
  const closeCameraBtn = document.getElementById('close-camera-btn');
  const captureBtn = document.getElementById('capture-btn');
  let stream;

  openCameraBtn.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();
      })
      .catch((err) => {
        console.error("Erro ao acessar a câmera: ", err);
      });
  });

  closeCameraBtn.addEventListener('click', () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      video.style.display = 'none';
    }
  });

  captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    localStorage.setItem('capturedImage', imageData);
    alert('Foto capturada e armazenada no LocalStorage!');
  });
});
