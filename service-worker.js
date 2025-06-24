const CACHE_NAME = 'physics-cache-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/script.js',
  '/senior1.html',
  '/senior2.html',
  '/senior3.html',
  '/senior4.html',
  '/favicon.png',
  '/favi.png',
  '/fav.png',
  '/images/share.png',
  '/images/about.png',
  '/images/tool.png',
  '/images/theme.png',
  '/images/more.png',
  '/images/menu.png',
  '/images/email.png',
  '/images/android-launchericon-72-72.png',
  '/images/android-launchericon-144-144.png',
  '/images/android-launchericon-192-192.png',
  '/images/android-launchericon-512-512.png',
  '/notes/style.css',
  '/notes/script.js',
  '/notes/introduction.html',
  '/notes/measurements.html',
  '/notes/statesofmatter.html',
  '/notes/effectsofforces.html',
  '/notes/temperaturemeasurements.html',
  '/notes/heattransfer.html',
  '/notes/expansion.html',
  '/notes/light.html',
  '/notes/workemergyandpower.html',
  '/notes/centreofgravity.html',
  '/notes/pressure.html',
  '/notes/mechanicalproperties.html',
  '/notes/lightatcurvedsurface.html',
  '/notes/magnetism.html',
  '/notes/electrostatics.html',
  '/notes/solarsystem.html',
  '/notes/linearandnonlinearmotion.html',
  '/notes/refraction.html',
  '/notes/optics.html',
  '/notes/generalwaves.html',
  '/notes/heatquantity.html',
  '/notes/stars.html',
  '/notes/satellites.html',
  '/notes/current.html',
  '/notes/electricity.html',
  '/notes/emeffects.html',
  '/notes/electricenergy.html',
  '/notes/atomicmodels.html',
  '/notes/nuclearprocesses.html',
  '/notes/electronics.html',
  // Add other core assets here
];

// Install & Pre-cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// Activate & Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network with Cache Fallback + Offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Cache strategy: Network First, then Cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response for cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Background Sync (for failed POST requests)
self.addEventListener('sync', event => {
  if (event.tag === 'submit-form') {
    event.waitUntil(processPendingForms());
  }
});