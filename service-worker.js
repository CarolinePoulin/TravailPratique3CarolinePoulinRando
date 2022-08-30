// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v5';

const FILES_TO_CACHE = [
    'index.html',
    'offline.html',
    'asavoir.html',
    'confirmation.html',
    'endroits.html',
    'enregistrer.html',
    'hebergement.html',
    'img/endroits/7chutes.jpg',
    'img/endroits/DomaineHeritage.JPG',
    'img/endroits/DomaineStElzear.jpg',
    'img/endroits/DomaineTaschereau.jpg',
    'img/endroits/LacCaribou.jpg',
    'img/endroits/MontAdstock2.jpg',
    'img/endroits/MontGosford2.jpg',
    'img/endroits/MontGrandMorne.jpg',
    'img/endroits/MontGrandMorne2.jpg',
    'img/endroits/MontHam2.jpg',
    'img/endroits/ParcAppalaches2.jpg',
    'img/endroits/ParcMassifSud2.jpg',
    'img/endroits/RapideDuDiable.jpg',
    'img/endroits/SentierCampions.jpg',
    'img/endroits/SentierMineurs.jpg',
    'img/endroits/SentierMontBelanger.jpg',
    'img/endroits/SentierMontBelanger2.jpg',
    'img/endroits/TroisMontColeraine2.jpg',
    'img/AjusterSacADos.jpg',
    'img/alltrails(1).jpg',
    'img/AllumerFeu.jpg',
    'img/applications.jpg',
    'img/applications0.jpg',
    'img/background.jpg',
    'img/backpack.jpg',
    'img/baliseqc.jpg',
    'img/Cairn.jpg',
    'img/camping-tent.jpg'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker]Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker]Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker]Activate');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker]Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        }));
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker]Fetch', evt.request.url);
    if(evt.request.mode !== 'navigate') {
        return;
    }
    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match('offline.html');
            });
        }));
});