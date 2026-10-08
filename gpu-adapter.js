import { MeshBasicNodeMaterial, LineBasicNodeMaterial } from './three.webgpu.js?v=4.0.0';
import { reference, texture, sRGBTransferOETF } from './three.tsl.js?v=4.0.0';
import { materials } from './gpu-materials.js?v=4.1.0';
const converted = new WeakMap();
const properties=['side','transparent','opacity','blending','blendSrc','blendDst','blendEquation','blendSrcAlpha','blendDstAlpha','blendEquationAlpha','depthTest','depthWrite','depthFunc','colorWrite','polygonOffset','polygonOffsetFactor','polygonOffsetUnits','visible','alphaToCoverage','premultipliedAlpha','forceSinglePass'];
export function shaderKey(material){const source=material.vertexShader+'\n'+material.fragmentShader;let h=2166136261;for(let i=0;i<source.length;i++)h=Math.imul(h^source.charCodeAt(i),16777619);return(h>>>0).toString(16);}
function convertible(m){return m&&!m.isNodeMaterial&&(m.isShaderMaterial||m.isMeshBasicMaterial||m.isLineBasicMaterial);}
export function nodeMaterial(source){
 let target=converted.get(source);
 if(!target){
  const textures=[];
  if(!source.isShaderMaterial){
   target=source.isLineBasicMaterial?new LineBasicNodeMaterial():new MeshBasicNodeMaterial();
   // These few built-in materials (gizmo / beam spot / outline) originally
   // converted their linear colour before blending into the display buffer.
   target.colorNode=sRGBTransferOETF(reference('color','color',source));
  }else{
  const key=shaderKey(source),factory=materials[key];
  if(!factory)throw new Error('Shader WebGPU sin migración: '+key);
  const bind=(name,type,count)=>{const value=source.uniforms[name];if(!value)throw new Error('Uniform ausente: '+name);if(type==='sampler2D'){const node=texture(value.value);node.setUpdateMatrix(false);textures.push({node,uniform:value});return node;}return reference('value',type,value);};
  const {vertex,fragment}=factory(bind);
  target=new MeshBasicNodeMaterial();target.vertexNode=vertex;target.fragmentNode=fragment;
  // The legacy shaders already emit display RGB (including their own gamma).
  // fragmentNode bypasses built-in lighting. The renderer also uses a direct
  // display buffer: enabling its default final sRGB pass would apply gamma twice.
  target.name='Sky WebGPU '+key;
  }
  target.toneMapped=false;target.fog=false;
  target.userData.source=source;target.userData.textures=textures;converted.set(source,target);
  source.addEventListener('dispose',()=>{target.dispose();converted.delete(source);});
 }
 // TextureNode's automatic update scheduling does not track replaced uniform objects.
 // Synchronize before submission, especially after rebuilding the shadow BVH.
 for(const {node,uniform} of target.userData.textures)if(node.value!==uniform.value)node.value=uniform.value;
 for(const p of properties)target[p]=source[p];
 return target;
}
export function installMaterials(renderer){
 const compile=renderer.compileAsync.bind(renderer);
 renderer.compileAsync=async(scene,camera,...args)=>{const swapped=[];scene.traverse(o=>{if(convertible(o.material)){swapped.push([o,o.material]);o.material=nodeMaterial(o.material);}});try{return await compile(scene,camera,...args);}finally{for(const [o,m]of swapped)o.material=m;}};
 renderer.setRenderObjectFunction(function(object,scene,camera,geometry,material,group,lights,clipping,passId){
  this.renderObject(object,scene,camera,geometry,convertible(material)?nodeMaterial(material):material,group,lights,clipping,passId);
 });
}
