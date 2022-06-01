const GHPATH = '/Pomodoro-App';
const APP_PREFIX = 'PomoApp_';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION

// // Respond with cached resources
// self.addEventListener('fetch', function (e) {
//   console.log('fetch request : ' + e.request.url)
//   e.respondWith(
//     caches.match(e.request).then(function (request) {
//       if (request) { // if cache is available, respond with cache
//         console.log('responding with cache : ' + e.request.url)
//         return request
//       } else {       // if there are no cache, try fetching request
//         console.log('file is not cached, fetching : ' + e.request.url)
//         return fetch(e.request)
//       }
//       // You can omit if/else for console.log & put one line below like this too.
//       // return request || fetch(e.request)
//     })
//   )
// })

// // Cache resources
// self.addEventListener('install', function (e) {
//   e.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log('installing cache : ' + CACHE_NAME)
//       return cache.addAll([
//         `/`,
//         `/index.html`,
//         `/style.css`,
//         `/app.js`,
//         `/assets/Bell.mp3`,
//         `/assets/pomodori.png`,
//         `/assets/pomodoriblue.png`,
//         `/assets/pomodorigreen.png`,
//         `/assets/pomodorigrey.png`,
//         `/assets/fonts/teko-semibold.woff`,
//         `/assets/fonts/teko-semibold.woff2`,
//       ])
//     })
//   )
// })

// // Delete outdated caches
// self.addEventListener('activate', function (e) {
//   e.waitUntil(
//     caches.keys().then(function (keyList) {
//       // `keyList` contains all cache names under your username.github.io
//       // filter out ones that has this app prefix to create white list
//       var cacheWhitelist = keyList.filter(function (key) {
//         return key.indexOf(APP_PREFIX)
//       })
//       // add current cache name to white list
//       cacheWhitelist.push(CACHE_NAME)

//       return Promise.all(keyList.map(function (key, i) {
//         if (cacheWhitelist.indexOf(key) === -1) {
//           console.log('deleting cache : ' + keyList[i] )
//           return caches.delete(keyList[i])
//         }
//       }))
//     })
//   )
// })


self.addEventListener('fetch', function(event) {
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
    });
    }));
  });

  self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log("Latest version installed!");
});
