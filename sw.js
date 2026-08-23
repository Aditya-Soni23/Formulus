const CACHE = 'formulus-shell-v1';
const APP_SHELL = ['./', './index.html', './styles.css', './login.css', './app.js', './manifest.json', './firebase/config.js', './assets/logo.png', './assets/icon-192.png', './assets/icon-512.png', 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    caches.open(CACHE).then(cache => cache.put(event.request, response.clone())); return response;
  }).catch(() => caches.match('./index.html'))));
});
