const CACHE_VERSION = 'version-2'; // Increment the version for cache updates

const CACHE_NAME = `${CACHE_VERSION}-static`;
const urlsToCache = ['funcionario.html', 'funcionario.html'];

self.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'scheduleNotification') {
        scheduleNotification(event.data.hour, event.data.minute, event.data.content);
		onListen();
    }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`Opened cache ${CACHE_NAME}`);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Cache hit, return cached response
      }
      // Cache miss, fetch from the network
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse; // Don't cache unsuccessful responses
        }
        // Clone the network response and cache it
        const clonedResponse = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return networkResponse;
      });
    }).catch(() => caches.match('funcionario.html'))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the latest version of the cache
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('push', function(event) {
  listenerEvent();
  const options = {
    body: event.data.text(),
    icon: 'icons/icon.png'
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
