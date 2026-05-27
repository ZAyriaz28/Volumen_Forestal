const CACHE_NAME = 'forestal-v2';
const assets = [
  'index.html',
  'css/bootstrap.min.css',
  'js/calculadora.js',
  'js/pwa-setup.js',
  'manifest.json',
  'logo.svg'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responder desde la caché cuando no haya internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});