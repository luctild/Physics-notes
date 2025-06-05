const CACHE_NAME = 'o-level-notes-v2';
const OFFLINE_URL = '/offline.html';
const ASSETS = [
    '/index.html',
    '/',
    '/style.css',
    '/dark.css',
    '/script.js',
    '/favicon.png',
    '/images/share.png',
    '/images/about.png',
    '/images/tool.png',
    '/images/theme.png',
    '/images/more.png',
    '/images/menu.png',
    '/images/email.png',
    '/images/home.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_URL))
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => response || fetch(event.request))
        );
    }
});