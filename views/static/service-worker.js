// service-worker.js
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'INSTALL_PROMPT_TRIGGERED') {
        console.log(event.data.data);
    }

    if (event.data && event.data.action === 'scheduleNotification') {
        scheduleNotification(event.data.hour, event.data.minute, event.data.content);
        onListen();
    }
});

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            console.log(`Opened cache ${CACHE_NAME}`);

            try {
                // Fetch sitemap.xml and extract URLs
                //const response = await fetch('sitemap.xml');
                //const text = await response.text();
                
                const response = await httpMethods('get', 'sitemap.xml');
                const urls = [...response.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

                //const parser = new DOMParser();
                //const xmlDoc = parser.parseFromString(text, "text/xml");
                //const urls = [...xmlDoc.querySelectorAll("url loc")].map(el => el.textContent);

                console.log("Caching URLs from sitemap:", urls);
                await cache.addAll(urls);
            } catch (error) {
                console.error("Failed to fetch sitemap:", error);
            }
        })()
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
    icon: 'public/icons/icon.png'
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
