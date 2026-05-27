if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito');
      })
      .catch(error => {
        console.log('Fallo al registrar el ServiceWorker', error);
      });
  });
}