const GHPATH = '/Pomodoro-App';
const APP_PREFIX = 'PomoApp_';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('fetch', function(event) {
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
    console.log("cache request: " + event.request.url);
    var fetchPromise = fetch(event.request).then(function(networkResponse) {
    console.log("fetch completed: " + event.request.url, networkResponse);
    if (networkResponse) {
        console.debug("updated cached page: " + event.request.url, networkResponse);
          cache.put(event.request, networkResponse.clone());}
          return networkResponse;
              }, function (event) {
              console.log("Error in fetch()", event);
              event.waitUntil(
              caches.open('cache').then(function(cache) {
              return cache.addAll
              ([
                `/`,
                `/index.html`,
                `/style.css`,
                `/app.js`,
                `/assets/Bell.mp3`,
                `/assets/pomodori.png`,
                `/assets/pomodoriblue.png`,
                `/assets/pomodorigreen.png`,
                `/assets/pomodorigrey.png`,
                `/assets/fonts/teko-semibold.woff`,
                `/assets/fonts/teko-semibold.woff2`,
              ]);
            })
            );
            });
          return response || fetchPromise;
    }).catch(() => caches.match('/fallback'));
    }));
  });

  self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log("Latest version installed!");
});
