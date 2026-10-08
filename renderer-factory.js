import * as THREE from './three.module.js?v=4.0.0';

export const RELEASE='4.1.0-performance';
const recoveryKey='sky-renderer-recovery-'+RELEASE;
export const graphicsInfo={version:RELEASE,three:THREE.REVISION,renderer:'Iniciando',reason:'',ready:false,world:'earth',pixelRatio:1,averageFrameMs:null,drawCalls:null};
window.SkyDiagnostics=graphicsInfo;
let reportFatal=null,reported=false,lastGPUError=null;
function report(error){
 const cause=error instanceof Error?error:new Error(error?.message||String(error));
 console.error('[Sky Explorer] Error gráfico:',cause);lastGPUError=cause;
 if(reportFatal&&!reported){reported=true;queueMicrotask(()=>reportFatal(cause));}
}
export function onGraphicsFailure(handler){reportFatal=handler;}
export async function createRenderer(){
 let reason='';
 try{reason=sessionStorage.getItem(recoveryKey)||'';}catch{}
 if(new URL(location.href).searchParams.has('recuperarWebGL'))reason=reason||'Recuperación de una sesión WebGPU';
 if(!reason&&navigator.gpu&&isSecureContext){
  let candidate;
  try{
   const [{WebGPURenderer},{installMaterials}]=await Promise.all([import('./three.webgpu.js?v=4.0.0'),import('./gpu-adapter.js?v=4.1.0')]);
   candidate=new WebGPURenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
   await candidate.init();
   if(!candidate.backend.isWebGPUBackend)throw new Error('WebGPU no obtuvo un dispositivo compatible');
   installMaterials(candidate);
   candidate.onDeviceLost=info=>report(new Error('Dispositivo WebGPU perdido: '+info.message));
   candidate.onError=info=>report(new Error('WebGPU: '+info.message));
   // Three can report a failed node build without throwing. Never silently
   // accept an empty shader: expose the reason and recover the complete scene.
   const previous=THREE.getConsoleFunction();
   THREE.setConsoleFunction((level,message,...args)=>{
    if(previous)previous(level,message,...args);else console[level](message,...args);
    if(level==='error')report(new Error([message,...args.map(String)].join(' ')));
   });
   candidate.capabilities={getMaxAnisotropy:()=>candidate.getMaxAnisotropy()};
   globalThis.__skyWebGPU=true;graphicsInfo.renderer='WebGPU';
   console.info('[Sky Explorer] Renderer: WebGPU · Three r'+THREE.REVISION);
   return candidate;
  }catch(error){
   try{candidate?.dispose();}catch(disposeError){console.warn('[Sky Explorer] Cierre del dispositivo incompleto:',disposeError);}
   reason=error.message;console.warn('[Sky Explorer] WebGPU no pudo iniciar; se conserva la escena mediante WebGL.',error);
  }
 }
 if(!reason)reason=navigator.gpu?'El contexto no permite WebGPU':'WebGPU no disponible en este navegador';
 globalThis.__skyWebGPU=false;graphicsInfo.renderer='WebGL fallback';graphicsInfo.reason=reason;
 console.info('[Sky Explorer] Renderer: WebGL fallback · '+reason);
 return new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
}
export async function compileScene(renderer,scene,camera){
 if(renderer.isWebGPURenderer){
  const device=renderer.backend.device;device.pushErrorScope('validation');
  let error;
  try{await renderer.compileAsync(scene,camera);}catch(e){error=e;}
  const validation=await device.popErrorScope();
  if(error||validation||lastGPUError)throw error||lastGPUError||new Error(validation.message);
 }else if(renderer.compileAsync)await renderer.compileAsync(scene,camera);
 else renderer.compile(scene,camera);
}
export function recoverGraphics(error){
 if(!globalThis.__skyWebGPU)return false;
 graphicsInfo.reason=error?.message||String(error);graphicsInfo.ready=false;
 // Only the renderer decision is stored for this tab. Player keys are untouched.
 try{sessionStorage.setItem(recoveryKey,graphicsInfo.reason);location.reload();}
 catch{const url=new URL(location.href);url.searchParams.set('recuperarWebGL','1');location.replace(url.href);}
 return true;
}
