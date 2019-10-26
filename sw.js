var cacheName = 'bowling-pwa';
var filesToCache = [
'/Bowling/',
'/Bowling/index.html',
'/Bowling/js/default.js',
'/Bowling/css/default.css',
'/Bowling/images/icons/icon-128x128.png',
'/Bowling/images/icons/icon-144x144.png',
'/Bowling/images/icons/icon-152x152.png',
'/Bowling/images/icons/icon-192x192.png',
'/Bowling/images/icons/icon-384x384.png',
'/Bowling/images/icons/icon-512x512.png',
'/Bowling/images/icons/icon-72x72.png',
'/Bowling/images/icons/icon-96x96.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
