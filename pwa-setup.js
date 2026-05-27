// 1. Registrar el Service Worker (Lo que ya tenías)
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

// 2. Lógica para el Botón de Instalación
let eventoInstalacion;
const btnInstalar = document.getElementById('btnInstalar');

// El navegador detecta que la app se puede instalar
window.addEventListener('beforeinstallprompt', (e) => {
  // Previene que aparezca el mini-cartel automático de Chrome
  e.preventDefault();
  
  // Guardamos el evento para usarlo cuando el usuario toque el botón
  eventoInstalacion = e;
  
  // Hacemos visible nuestro botón de "Instalar"
  btnInstalar.style.display = 'block';
});

// Cuando el usuario toca nuestro botón de instalar
btnInstalar.addEventListener('click', async () => {
  if (eventoInstalacion) {
    // Muestra la ventana nativa de instalación del celular
    eventoInstalacion.prompt();
    
    // Esperamos a ver qué elige el usuario (Instalar o Cancelar)
    const resultado = await eventoInstalacion.userChoice;
    
    if (resultado.outcome === 'accepted') {
      console.log('El usuario aceptó instalar la app');
      // Ocultamos el botón porque ya se instaló
      btnInstalar.style.display = 'none';
    }
    
    // Limpiamos la variable
    eventoInstalacion = null;
  }
});

// Si la app ya fue instalada, nos aseguramos de ocultar el botón
window.addEventListener('appinstalled', (evt) => {
  console.log('La aplicación ya está instalada');
  btnInstalar.style.display = 'none';
});
