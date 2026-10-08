/* Sky Explorer: complete, verified releases; no player storage is touched. */
const RELEASE="1e0f1b0027d9b7c8";
const ASSETS=[{"path":"CAMBIOS-WEBGPU-PWA.txt","bytes":5757,"sha256":"0672458d1c142f0a7efecb2037b7377056f6e24bd40e33b2c407a8aa110a4fd3"},{"path":"CREDITOS.txt","bytes":5749,"sha256":"05c64b398aae003a3ae33b89fcc98ab1c1652e10e9e1bbf95bcd35a20716acea"},{"path":"DIAGNOSTICO-RENDIMIENTO.txt","bytes":5290,"sha256":"0e360548a495a72d936a7bb44494bf6a8f71c0c071354923dac3c6d3ea712ee6"},{"path":"HISTORIAL-3.2.txt","bytes":16120,"sha256":"fa901488128fcd1d27c356848eac508d987945705807cab79d1d0db9d1d13392"},{"path":"LEEME.txt","bytes":1958,"sha256":"1c7eeeb61000b118544f19d80f78bab7b969f09b21405120ef31ae7162858536"},{"path":"ORIGEN-REPOSITORIO.json","bytes":10937,"sha256":"3098e32835aacb0b8dd00c12512dc94aca15030c8241e15fde1ea5a458a7783e"},{"path":"PASOS-PARA-ISAI.txt","bytes":5263,"sha256":"c36a8408e8d1c1582476ec6fef90aca9fb72917df7a443d708a3ddad40b3941c"},{"path":"STARS-LICENSE.txt","bytes":1480,"sha256":"a8c79239001ad4bea243d1796b85084e1fc39309c5c5a663930a1b46320254c6"},{"path":"THREE-LICENSE.txt","bytes":1081,"sha256":"8b378ebe60e2fe500158cb0ac71cb5e8b7d92953c2abcc63a0eb90499653b5bc"},{"path":"VERIFICACION.txt","bytes":4803,"sha256":"fa923d87771324ec255a404aecf085ca0d3d5c2ae5e7755b65018a7e198c8a18"},{"path":"app.js","bytes":41298,"sha256":"8d3b7e63bb4120d89b392c0f22fe442b38a6a5d9b5178dc2914c55b4b2dce60c"},{"path":"apple-touch-icon.png","bytes":4278,"sha256":"f3e155449e6ecb263f74a048dedb9d8db25ce94b5f094f0647f3387656b0af28"},{"path":"build-acceleration.js","bytes":4864,"sha256":"0be77f0c60d1a20e059e661a29cdc3d9068dd5ffb87056c9e76cd63711adbf8f"},{"path":"build-gizmo.js","bytes":4825,"sha256":"775a70faecca59b494370a6461711373fd2c95d50d767c8cbf037694f4fbade4"},{"path":"build-placement.js","bytes":13603,"sha256":"d18e874eb4bb0ffec47ee5ae01ab913c97d24df21cd3ab4df9ca34548deac8d4"},{"path":"build-world.js","bytes":21323,"sha256":"014e2df8d9e9f0634a51470c769ad5c21451ef718c530aa473a18c435978bf36"},{"path":"celestial.js","bytes":12085,"sha256":"46bfff8c70c368213c0487cfaf72470ab0f18a78144286f44c1a0d7709e311d3"},{"path":"controls.js","bytes":11253,"sha256":"c968f7b200e661d38b21424aad39a8e1407516031ff6067aedc4b0d844aab8a1"},{"path":"earth.jpg","bytes":1006115,"sha256":"06e57b39510242c50cfe458e3f5562c08ed82ad0c42954a40fa6bd6aeaf5e4b2"},{"path":"expedition.js","bytes":39467,"sha256":"20af68bbb7851afecea2e43448373893ab2f422c2b261dff529bd065a19d739b"},{"path":"field-effects.js","bytes":6974,"sha256":"e107b0611bbfca672c0315c8d42a771bc493c6c7af1df50d39d7eaeaa39c3183"},{"path":"field-guide.js","bytes":10263,"sha256":"a5268c802ef41c4fb09510853b630922f47c3a81e48e9f3a06a1fa38bfe54173"},{"path":"flashlight.js","bytes":4700,"sha256":"7a80decab63788740a5a4df566b77c6eefc47bf1cba3c07f76402e968f3a5e08"},{"path":"gpu-adapter.js","bytes":3431,"sha256":"7c74e4568f602c57e75a51f99875bd15a85d9ef333829071a1a6daa4d2073884"},{"path":"gpu-materials.js","bytes":182425,"sha256":"dff7289043bab86a5e7925ae6727e7e3adfff39fe0af6b9d71dd0ec667d0b50d"},{"path":"icon-192.png","bytes":4589,"sha256":"48abce43a464dea945a38a239cad74e26b6bab71032ed94f27f3d507584146f8"},{"path":"icon-512.png","bytes":11981,"sha256":"62228ffb2468f5b1b225b9e2d67922fc2cba67c88d0547d1e9a234f445835e33"},{"path":"index.html","bytes":17697,"sha256":"7bce46c8729de064e51f96e12a9f8240ffb4b7e1d0e7bc3b1ee8eb110c3a5393"},{"path":"inventory.js","bytes":15405,"sha256":"9eff3f198f4d3cccb66f43ef246f73a2b6475851baf284a3a0a2ad3f3eb54234"},{"path":"items.js","bytes":6346,"sha256":"a396fe621614c446c1b4905052b7c557fa3e2ca6eb0fd503f73301496d3cf050"},{"path":"lunar-height.png","bytes":1403337,"sha256":"bfd9db1c36dc73544002f7ee9ee35faf854122cb42afbe5835db93467e69aa63"},{"path":"lunar-light-cache.js","bytes":4465,"sha256":"5c03794cd09eaebaad57b86b5c924ea80aeff82993588847197c2eec0223c6ab"},{"path":"lunar-sky.js","bytes":10296,"sha256":"471e60aad6f4cf9ba3b8b125f5163f35571b36ff91782cb688c7319cbadb69f8"},{"path":"lunar-sound.js","bytes":2203,"sha256":"e5bc7c2e00f048b255a567e18eaeb770e87ecef9390d6d3c841cc32fe9cf6c9b"},{"path":"lunar-terrain.js","bytes":9034,"sha256":"45f876284ee7a01030f97615e2f5fb2161d41d2986d60ab2dda0f3f24eeb19de"},{"path":"manifest.webmanifest","bytes":554,"sha256":"f0a4dad9d888ec80e37e5eaa567e19ee97248be892ef3e411d2cfe447c86d2b7"},{"path":"moon.jpg","bytes":457942,"sha256":"f7130a1822681fa7512d7dcfd40db8c10b9ba4f06777910348698260ed7a2170"},{"path":"performance-settings.js","bytes":6297,"sha256":"09cc87bf1075bfc583cba4298c4bc272ad2b77ef733bcf92b98eca44d40fd1fe"},{"path":"props.js","bytes":17088,"sha256":"6a6f122b2b2fd624342c98d6c38fca897e05d6fbcb457188fadac6ef26df6f28"},{"path":"pwa.css","bytes":1685,"sha256":"b76a11f74812033ed86dcc95d845d82515fa89ff6f05d4d8516a50e480538f61"},{"path":"pwa.js","bytes":7471,"sha256":"4aaf32dda0367239d70b4ef0e72b37f9fa2ffa16a9b32c0faa0aec7408576cfb"},{"path":"regolith.jpg","bytes":509041,"sha256":"58bb965c886ab9c0c59b9dede1bf6a5d8675e680a1e8fcab48b7c9572c87f549"},{"path":"renderer-factory.js","bytes":3896,"sha256":"0a9b111975a4284968ebe8175514f03a611f1a34c75b0d19058502e0ccdca640"},{"path":"science.js","bytes":16501,"sha256":"b7c757868a16c079fcadb6453314a0c4a667ff0147bcbd7713f0aac21f4e447d"},{"path":"shadow-atlas.js","bytes":9842,"sha256":"5d9da756a8a2d88b4d3a0ab399eb16fe30d83c3f8e5cd99fa82595d3250ea5bc"},{"path":"sky.js","bytes":16037,"sha256":"0f5181f305888e94563037776104d41be466ec22a2555e5b9c1b53b0fcab1563"},{"path":"sound.js","bytes":7801,"sha256":"b77adf4abf3cd320725d2d03a30fd64f9fd1ddcb8531bd14d3480b78d962a794"},{"path":"spatial.js","bytes":2107,"sha256":"9f7e9ecbcee9868e53f690b6c481581f7d496f9294e5f8b9b8a86828e1ac4107"},{"path":"star-catalog.js","bytes":1113345,"sha256":"8306a89d3d34d6ecaab5ce69101eeaa0d0cb116e4dda48ae9c0121ee6acecae2"},{"path":"star-field.js","bytes":1226,"sha256":"5ebc5264d6c0b74fb247c5acbadebc765b2c1e76e593b3d53cc4c1b274eaae3e"},{"path":"styles.css","bytes":71114,"sha256":"2018eca5976d736ed343a922853a32f3ea390f01c875f9ffa7314c5f7b3866eb"},{"path":"terrain.js","bytes":9561,"sha256":"fd9e7aa6e4fff08c787161a34c47c0d9f1276540fed9dcc7cd6f0c05a6e4c87a"},{"path":"three.core.js","bytes":1458113,"sha256":"9edde002b066a9a05676a6127f67735b62baf399bdea529f2f7e31657da769e6"},{"path":"three.module.js","bytes":662788,"sha256":"c54a02bb73b2d74a0630c0b05fe0a2c3689c5d8556e87de464379f50cea42a65"},{"path":"three.tsl.js","bytes":36867,"sha256":"7efe799d44b98c8a6242a0e8df4bd73c21206438cd5123783c45ed98f9f3290b"},{"path":"three.webgpu.js","bytes":2284866,"sha256":"674c4e0ad6eb49c222ded318bad047c21b0fe1753770eadff85ce0b25ef59b8e"},{"path":"vehicle-models.js","bytes":15847,"sha256":"defac8c839c62713d4387ec8eee42f8da039a546252cc3abb22c8a6c55f006da"},{"path":"vehicle-sound.js","bytes":4508,"sha256":"b7e1793f630042b15788853f66b0a509a74089424554f7082f884cdd285fb59a"},{"path":"vehicles.js","bytes":12050,"sha256":"3f78070ea8b74615b477d76d4c529fdb55d38095628130e9d8bbe92fbe77f99d"},{"path":"world-lighting.js","bytes":12791,"sha256":"110d34bbdcbeb7623e4db8d1d53e76ac1247791f7892121c36a097033afa6b84"}];
const ROOT=new URL('./',self.location.href).href;
const scopeKey=new URL(ROOT).pathname.replace(/[^a-z0-9]/gi,'_');
const PREFIX='sky-explorer-'+scopeKey+'-v4-';
const VERSION=PREFIX+RELEASE;
const META='sky-explorer-'+scopeKey+'-clients-v1';
const READY=ROOT+'__offline_complete__';
const CLIENT=ROOT+'__client__/';
const pinned=new Map();
const paths=new Set(ASSETS.map(a=>new URL(a.path,ROOT).href));
async function announce(message){for(const c of await self.clients.matchAll({type:'window',includeUncontrolled:true}))if(c.url.startsWith(ROOT))c.postMessage(message);}
async function pin(id,version){if(!id)return;pinned.set(id,version);const meta=await caches.open(META);await meta.put(CLIENT+id,new Response(version));}
async function clientVersion(id){
 if(!id)return VERSION;
 if(pinned.has(id))return pinned.get(id);
 const saved=await(await caches.open(META)).match(CLIENT+id),version=saved?await saved.text():VERSION;
 // A client keeps its entire previous release until navigation, even when
 // another tab accepts an update. Never mix old HTML with new JS/modules.
 const found=await caches.has(version)?version:VERSION;await pin(id,found);return found;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(VERSION);if(await cache.match(READY))return;
 let next=0,done=0,failed=null;
 try{
  await Promise.all(Array.from({length:3},async()=>{
   while(next<ASSETS.length&&!failed){const entry=ASSETS[next++];
    try{
     const response=await fetch(new URL(entry.path,ROOT),{cache:'no-store',credentials:'same-origin'});
     if(!response.ok||response.type==='opaque')throw Error(entry.path+': HTTP '+response.status);
     const bytes=await response.arrayBuffer(),digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
     if(digest!==entry.sha256)throw Error('Publicación todavía incompleta: '+entry.path);
     const headers=new Headers(response.headers);headers.delete('Content-Encoding');headers.delete('Content-Length');
     await cache.put(new URL(entry.path,ROOT),new Response(bytes,{status:200,headers}));
     done++;await announce({type:'SKY_CACHE_PROGRESS',done,total:ASSETS.length});
    }catch(error){failed=error;}
   }
  }));
  if(failed)throw failed;
  await cache.put(READY,new Response(JSON.stringify({version:VERSION,files:done,bytes:ASSETS.reduce((s,a)=>s+a.bytes,0)}),{headers:{'Content-Type':'application/json'}}));
  await announce({type:'SKY_CACHE_READY',version:VERSION});
 }catch(error){await caches.delete(VERSION);await announce({type:'SKY_CACHE_ERROR',message:error.message});throw error;}
 // The first worker activates automatically. Updates wait for consent or for
 // all older windows to close. No skipWaiting during installation.
})()));
async function cleanup(){
 const live=await self.clients.matchAll({type:'window',includeUncontrolled:true}),ids=new Set(live.filter(c=>c.url.startsWith(ROOT)).map(c=>c.id));
 const keep=new Set([VERSION]),meta=await caches.open(META);
 for(const request of await meta.keys()){
  const id=request.url.slice(CLIENT.length);
  if(ids.has(id)){const entry=await meta.match(request);keep.add(await entry.text());}
  else await meta.delete(request);
 }
 for(const name of await caches.keys())if(name.startsWith(PREFIX)&&!keep.has(name))await caches.delete(name);
}
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();await cleanup();await announce({type:'SKY_WORKER_ACTIVE',version:VERSION});})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==new URL(ROOT).origin||!url.href.startsWith(ROOT))return;
 // The browser updates the worker from the network, never from the game cache.
 if(url.pathname===new URL('service-worker.js',ROOT).pathname)return;
 event.respondWith((async()=>{
  const navigation=event.request.mode==='navigate';
  let version;
  if(navigation){version=VERSION;await pin(event.resultingClientId,version);}
  else version=await clientVersion(event.clientId);
  const cache=await caches.open(version);url.search='';url.hash='';
  const key=navigation?new URL('index.html',ROOT).href:url.href;
  const response=await cache.match(key);if(response)return response;
  // A missing release resource is an error, not permission to fetch a file
  // belonging to a different deployment. Ordinary non-game URLs stay online.
  if(navigation||paths.has(key)||/\.(?:js|css|jpg|png|svg|json|webmanifest|woff2?|mp3|ogg|wav)$/i.test(url.pathname))return new Response('El archivo local falta. Conéctate y busca actualizaciones desde ?diagnostico=1.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  return fetch(event.request);
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='SKY_APPLY_UPDATE')event.waitUntil(self.skipWaiting());
 if(event.data?.type==='SKY_STATUS')event.waitUntil((async()=>{
  const version=await clientVersion(event.source?.id),cache=await caches.open(version),ready=await cache.match(READY);
  event.ports[0]?.postMessage({version,activeVersion:VERSION,ready:Boolean(ready),...(ready?await ready.json():{})});
 })());
});
