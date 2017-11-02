let CACHE_NAME = "service-worker-death-square-1";
let urlsToCache = [
	'index.html',
	'/assets/images/tie-fighter.png',
	'/assets/images/turret.png'
];


self.addEventListener('install', function(event) {
  event.waitUnitl(
  	caches.open(CACHE_NAME)
  	.then(function(cache){
  		console.log('opened cache!');
  		return cache.addAll(urlsToCache);
  	})
  );
});

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response) return response;
			return fetch(event.request);
		})
	);
});