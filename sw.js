const CACHE_NAME = 'forestal-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/bootstrap.min.css',
  './js/calculadora.js',
  './js/pwa-setup.js',
  './manifest.json',
  './icono-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});