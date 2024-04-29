async function addResourcesToCache(resources) {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  }
  
  self.addEventListener("install", async function (event) {
    event.waitUntil(
      addResourcesToCache([
        "/", 
      ])
    );
  });
  
  self.addEventListener("fetch", function (event) {
    console.log("Handling fetch event for", event.request.url);
    
    if (event.request.method !== "GET") return;
  
    event.respondWith(
      (async function () {
        const cache = await caches.open("v1");
        const cachedResponse = await cache.match(event.request);
  
        if (cachedResponse) {
          return cachedResponse;
        }
  
        const response = await fetch(event.request);
        
        cache.put(event.request, response.clone());
        
        return response;
      })()
    );
  });
