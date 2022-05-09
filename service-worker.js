console.log('Service worker script loaded!');

/**
 * The cache name should change every time you want to "cache bust"
 * i.e. if you want to change these files
 * in a real-world app this would be handled by your build system
 * e.g. Vite or Next.js would hash the files so the name is unique based on content
 * (style-XYZ123.css etc)
 */
const CACHE_NAME = 'pwa-grupo-8-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'global.css',
  'icon.svg',
  'logo.png',
  'favicon.png',
  'apple-touch-icon-180x180.png',
];

self.addEventListener('install', async (event) => {
  console.log('installing!');
  const cache = await self.caches.open(CACHE_NAME);
  await cache.addAll(urlsToCache);
  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  console.log('activating!');
  const keys = await caches.keys();
  keys
    .filter((key) => key !== CACHE_NAME)
    .map((key) => event.waitUntil(caches.delete(key)));
});

async function networkFirst(request) {
  const cache = await self.caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    console.log('Network: ', request.url);
    return response;
  } catch {
    console.log('Cache: ', request.url);
    return cache.match(request);
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method != 'GET') return;
  event.respondWith(networkFirst(event.request));
});
