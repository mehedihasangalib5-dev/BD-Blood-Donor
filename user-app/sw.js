const V='bdbd-v3',TILES='bdbd-tiles';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const tile=u.hostname.endsWith('tile.openstreetmap.org'),lib=['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com','www.gstatic.com'].includes(u.hostname),own=u.origin===location.origin;
 if(!(tile||lib||own))return;
 e.respondWith((async()=>{const c=await caches.open(tile?TILES:V),hit=await c.match(r);
  if(hit&&(tile||lib))return hit;
  try{const res=await fetch(r);if(res.ok||res.type==='opaque'){c.put(r,res.clone());if(tile)c.keys().then(k=>k.length>800&&c.delete(k[0]))}return res}catch(x){if(hit)return hit;throw x}})())});
