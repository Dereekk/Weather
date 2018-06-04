self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'index.js',
        'index.css',
        'sw.js',
        'sw-link.js',
        'manifest.json'
      ]);
    })
  );
});
addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open('v1')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open('v1')
                .then(function(cache) {
                  return cache.match('index.html');
                });
            });
        }
      })
  );
}); 