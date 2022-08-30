// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v6';

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
    'img/camping-tent.jpg',
    'img/Chien1.jpg',
    'img/chien2.jpg',
    'img/chien3.jpg',
    'img/chien4.jpg',
    'img/EmprunteEcologique.jpg',
    'img/encas.jpg',
    'img/hamac.jpg',
    'img/hiking-dog.jpg',
    'img/hikster-1.jpg',
    'img/HiverForet.jpg',
    'img/MousseSecheuse.jpg',
    'img/MultiCouche.jpg',
    'img/ondago1.png',
    'img/Paratinder.jpg',
    'img/paw-modified.png',
    'img/paw.png',
    'img/paws-modified.png',
    'img/paws.png',
    'img/paws2-modified.png',
    'img/paws2.png',
    'img/paws3-modified.png',
    'img/paws3.png',
    'img/pile9V.jpg',
    'img/RechaudCompact.jpg',
    'img/refugeChalet.jpg',
    'img/RondelleCombustible.jpg',
    'img/SacADos.jpg',
    'img/SeRechauffer.jpg',
    'img/sommet.jpg',
    'img/Symptome.jpg',
    'img/tente.jpg',
    'img/tente1.jpg',
    'img/Tique.jpg',
    'img/TiqueMoustique.jpg',
    'img/TitanUCO.jpg',
    'img/TraitementEau.jpg',
    'img/Trousse1erSoins.jpg',
    'img/Urgence.jpg',
    'img/virtual-trekking-exercice.jpg',
    'img/woman-endroit.jpg'
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