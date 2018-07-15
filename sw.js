importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "index.css",
    "revision": "8843be3437ef1b0af31c6450914476d2"
  },
  {
    "url": "images/144.png",
    "revision": "74eaa2a87dd1a30ab965b4b500aaf922"
  },
  {
    "url": "index.html",
    "revision": "206e1dc4ffce7189e5d17fc1dc5ca9dd"
  },
  {
    "url": "index.js",
    "revision": "f03f06fd7324d3da7f8e3e99147a5fff"
  },
  {
    "url": "manifest.json",
    "revision": "0ee02b8c5fa214c61ce692073c693e63"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);

workbox.routing.registerRoute(
    'https://api.openweathermap.org/data/2.5/*',
    workbox.strategies.cacheFirst({
        cacheName: 'stories',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 minutes
          }),
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
        ],
    }),
);
