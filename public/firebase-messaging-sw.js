import { url } from 'inspector';

importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase.js');

firebase.initializeApp({
  messagingSenderId: '103865215407'
});

// Name will be changed on updates to make sure caches are current.
const CACHE_NAME = 'v1';

// Set up cache when service worker installs.
self.addEventListener('install', function() {
  // Prevent sw from going into waiting mode until cache is populated.
  event.waitUntil(
    // Open cache, or create if not present
    caches.open(CACHE_NAME).then(cache => {
      fetch('asset-manifest.json').then(response => {
        if (response.ok) {
          // Add URLs to cache
          response.json().then(manifest => {
            const urls = Object.keys(manifest).map(key => manifest[key]);
            urls.push('/');
            urls.push('/assets/icon.png');
            cache.addAll(urls);
          });
        }
      });
    })
  );
});

// Intercept network request and use cache instead, if possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Cache clean-up; get rid of expired cache
self.addEventListener('activate', event => {
  event.waitUntil(
    cache.keys().then(keyList => {
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
