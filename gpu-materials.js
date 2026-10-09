// Generated from the project's exact GLSL equations with Three.js r186 GLSLDecoder/TSLEncoder.
// Build-time only: no shader transpiler is downloaded or executed on iPhone.
import {vec4,float,mat3,Fn,max,pow,vec3,mix,length,dot,clamp,exp,mul,add,sub,smoothstep,cross,atan,fwidth,If,normalize,vec2,fract,varying,floor,sin,select,time,attribute,Discard,sqrt,asin,cos,min,step,sign,abs,mod,div,bool,Continue,Loop,uv,int,color,Break,mat2,modelViewMatrix,distance,dFdx,dFdy,screenUV,cameraProjectionMatrix,cameraViewMatrix,modelWorldMatrix,modelViewMatrix as modelViewMatrixNode,viewportSize,screenCoordinate} from './three.tsl.js?v=4.0.0';
// 0: earth Mesh
export function material_52462404(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const sunDirection=bind("sunDirection","vec3",0);
const moonDirection=bind("moonDirection","vec3",0);
const day=bind("day","float",0);
const twilight=bind("twilight","float",0);
const night=bind("night","float",0);
const moonlight=bind("moonlight","float",0);
const sunset=bind("sunset","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
sunDirection.toStack();
moonDirection.toStack();
day.toStack();
twilight.toStack();
moonlight.toStack();
sunset.toStack();
return (()=>{// Three.js Transpiler r186



const atmosphereColor = /*@__PURE__*/ Fn( ( [ d ] ) => {

	const h = max( d.y, 0. ).toVar();
	const sh = sunDirection.y.toVar();
	const height = pow( h, .43 ).toVar();
	const dayZenith = vec3( .09, .40, .69 ).toVar();
	const dayHorizon = vec3( .68, .81, .88 ).toVar();
	const nightZenith = vec3( .035, .049, .078 ).toVar();
	const nightHorizon = vec3( .07, .082, .10 ).toVar();
	const zenith = mix( nightZenith, dayZenith, day ).toVar();
	const horizon = mix( nightHorizon, dayHorizon, day ).toVar();
	const sky = mix( horizon, zenith, height ).toVar();
	const az = sunDirection.xz.div( max( length( sunDirection.xz ), .001 ) ).toVar();
	const toward = clamp( dot( d.xz, az ).mul( .5 ).add( .5 ), 0., 1. ).toVar();
	const band = exp( pow( d.y.sub( .025 ).mul( 4.1 ), 2. ).negate() ).toVar();
	const amber = mix( vec3( .90, .60, .37 ), vec3( .91, .45, .22 ), sunset ).toVar();
	const peach = mix( vec3( .65, .48, .52 ), vec3( .60, .34, .41 ), sunset ).toVar();
	const glow = twilight.mul( pow( toward, 5. ) ).mul( band ).toVar();
	sky.assign( mix( sky, amber, glow.mul( .92 ) ) );
	const rose = twilight.mul( exp( pow( d.y.sub( .17 ).mul( 3.5 ), 2. ).negate() ) ).mul( .30 ).toVar();
	sky.assign( mix( sky, peach, rose.mul( add( .3, mul( .7, toward ) ) ) ) );
	const away = pow( sub( 1., toward ), 3. ).toVar();
	sky.assign( mix( sky, vec3( .085, .095, .17 ), twilight.mul( away ).mul( sub( 1., smoothstep( .03, .25, d.y ) ) ).mul( .55 ) ) );
	sky.assign( mix( sky, vec3( .42, .31, .40 ), twilight.mul( away ).mul( exp( pow( d.y.sub( .13 ).mul( 11. ), 2. ).negate() ) ).mul( .22 ) ) );
	const sunAngular = atan( length( cross( d, sunDirection ) ), dot( d, sunDirection ) ).toVar();
	const solarAA = max( fwidth( sunAngular ), .000025 ).toVar();
	const disk = sub( 1., smoothstep( sub( .026, solarAA ), add( .026, solarAA ), sunAngular ) ).toVar();
	const solarUp = smoothstep( - .055, .015, sh ).toVar();
	const sunColor = mix( vec3( 1., .38, .10 ), vec3( 1., .96, .78 ), smoothstep( - .01, .23, sh ) ).toVar();
	const halo = exp( sunAngular.negate().mul( 20. ) ).mul( .16 ).add( exp( sunAngular.negate().mul( 160. ) ).mul( .19 ) ).toVar();
	sky.addAssign( sunColor.mul( halo.add( disk.mul( 1.75 ) ) ).mul( solarUp ) );
	const moonAngle = atan( length( cross( d, moonDirection ) ), dot( d, moonDirection ) ).toVar();
	sky.addAssign( vec3( .19, .23, .29 ).mul( moonlight ).mul( exp( moonAngle.negate().mul( 12. ) ).mul( .11 ).add( exp( moonAngle.negate().mul( 80. ) ).mul( .12 ) ) ) );
	sky.addAssign( moonlight.mul( vec3( .008, .011, .018 ) ).mul( sub( 1., height.mul( .6 ) ) ) );

	If( d.y.lessThan( 0. ), () => {

		sky.assign( mix( horizon, sky, smoothstep( - .08, 0., d.y ) ) );

	} );

	return sky;

}, { d: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const sky = atmosphereColor( normalize( vRay ) ).toVar();
	const dither = fract( mul( 52.9829189, fract( dot( skyPixel.xy, vec2( .06711056, .00583715 ) ) ) ) ).sub( .5 ).toVar();
	skyColor.assign( vec4( sky.add( dither.div( 255. ) ), 1. ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 1: earth Mesh
export function material_cf34c1a(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const galacticNormal=bind("galacticNormal","vec3",0);
const galacticCenter=bind("galacticCenter","vec3",0);
const galacticTangent=bind("galacticTangent","vec3",0);
const night=bind("night","float",0);
const moonlight=bind("moonlight","float",0);
const milkyOn=bind("milkyOn","float",0);
const skyDetail=bind("skyDetail","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
galacticNormal.toStack();
galacticCenter.toStack();
galacticTangent.toStack();
night.toStack();
moonlight.toStack();
milkyOn.toStack();
skyDetail.toStack();
return (()=>{// Three.js Transpiler r186



const hash = /*@__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = p_immutable.toVar();
	p.assign( fract( p.mul( .3183099 ).add( vec3( .11, .37, .71 ) ) ) );
	p.mulAssign( 17. );

	return fract( p.x.mul( p.y ).mul( p.z ).mul( p.x.add( p.y ).add( p.z ) ) );

}, { p: 'vec3', return: 'float' } );

const noise3 = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const i = floor( p ).toVar();
	const f = fract( p ).toVar();
	f.assign( f.mul( f ).mul( sub( 3., mul( 2., f ) ) ) );

	return mix( mix( mix( hash( i ), hash( i.add( vec3( 1, 0, 0 ) ) ), f.x ), mix( hash( i.add( vec3( 0, 1, 0 ) ) ), hash( i.add( vec3( 1, 1, 0 ) ) ), f.x ), f.y ), mix( mix( hash( i.add( vec3( 0, 0, 1 ) ) ), hash( i.add( vec3( 1, 0, 1 ) ) ), f.x ), mix( hash( i.add( vec3( 0, 1, 1 ) ) ), hash( i.add( vec3( 1, 1, 1 ) ) ), f.x ), f.y ), f.z );

}, { p: 'vec3', return: 'float' } );

const fbm = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const clouds = mul( .52, noise3( p ) ).add( mul( .27, noise3( p.mul( 2.07 ).add( 4.3 ) ) ) ).toVar();

	If( skyDetail.greaterThan( .5 ), () => {

		clouds.addAssign( mul( .14, noise3( p.mul( 4.13 ).add( 12.7 ) ) ).add( mul( .07, noise3( p.mul( 8.19 ) ) ) ) );

	} );

	return clouds;

}, { p: 'vec3', return: 'float' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const d = normalize( vRay ).toVar();
	const lat = dot( d, galacticNormal ).toVar();
	const g = vec3( dot( d, galacticCenter ), lat, dot( d, galacticTangent ) ).toVar();
	const clouds = fbm( g.mul( vec3( 8., 17., 10. ) ).add( vec3( 3.1, 7.4, 1.2 ) ) ).toVar();
	const knots = float( .5 ).toVar();
	const fine = float( .5 ).toVar();

	If( skyDetail.greaterThan( .5 ), () => {

		knots.assign( noise3( g.mul( 32. ).add( vec3( 9.2, 1.8, 4. ) ) ) );
		fine.assign( noise3( g.mul( 83. ).add( vec3( 4.7, 12., 6. ) ) ) );

	} );

	const central = pow( max( 0., g.x ), 6. ).toVar();
	const arm = add( .40, mul( .36, noise3( vec3( g.x.mul( 4. ), g.z.mul( 4. ), 2.8 ) ) ) ).add( mul( .38, central ) ).toVar();
	const bend = mul( .022, sin( g.z.mul( 5. ).add( g.x.mul( 2. ) ) ) ).add( clouds.sub( .5 ).mul( .065 ) ).toVar();
	const width = add( .052, mul( .040, clouds ) ).add( mul( .083, central ) ).toVar();
	const band = exp( pow( lat.add( bend ).div( width ), 2. ).negate() ).toVar();
	const bulge = exp( pow( lat.add( .025 ).div( add( .12, mul( .055, central ) ) ), 2. ).negate() ).mul( central ).toVar();
	const ridge = add( .021, mul( .033, sin( g.z.mul( 4. ).sub( g.x.mul( 2. ) ) ) ) ).add( clouds.sub( .5 ).mul( .05 ) ).toVar();
	const rift = exp( pow( lat.add( ridge ).div( add( .011, mul( .023, knots ) ) ), 2. ).negate() ).toVar();
	const riftMask = smoothstep( - .5, .6, g.x ).mul( add( .35, mul( .65, knots ) ) ).toVar();
	const branch = exp( pow( lat.sub( .055 ).add( g.z.mul( .047 ) ).add( knots.sub( .5 ).mul( .027 ) ).div( .018 ), 2. ).negate() ).mul( central ).toVar();
	const texture = add( .22, mul( .95, smoothstep( .24, .79, clouds ) ) ).add( mul( .16, knots ) ).add( mul( .07, fine ) ).toVar();
	const dust = band.mul( arm ).mul( texture ).add( bulge.mul( .30 ) ).mul( sub( 1., rift.mul( riftMask ).mul( .89 ) ) ).mul( sub( 1., branch.mul( .60 ) ) ).toVar();
	const veil = night.mul( milkyOn ).mul( sub( 1., moonlight.mul( .82 ) ) ).mul( smoothstep( .0, .23, d.y ) ).toVar();
	const color = mix( vec3( .053, .065, .078 ), vec3( .104, .089, .069 ), central.mul( .82 ) ).toVar();
	skyColor.assign( vec4( color.mul( dust ).mul( veil ), 1. ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 2: earth Points
export function material_f6d6f2f5(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(uv.x,uv.y.oneMinus()),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const field=bind("field","mat4",0);
const sunDirection=bind("sunDirection","vec3",0);
const night=bind("night","float",0);
const moonlight=bind("moonlight","float",0);
const starLimit=bind("starLimit","float",0);
const pixelRatio=bind("pixelRatio","float",0);
const time=bind("time","float",0);
const zoomReveal=bind("zoomReveal","float",0);
const vColor=varying(vec3(),"sky_vColor");
const vAlpha=varying(float(),"sky_vAlpha");
const magnitude=attribute("magnitude","float");
const seed=attribute("seed","float");
const starColor=attribute("starColor","vec3");
const vertex=Fn(()=>{
field.toStack();
sunDirection.toStack();
moonlight.toStack();
starLimit.toStack();
pixelRatio.toStack();
time.toStack();
zoomReveal.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const dir = mat3( field ).mul( position ).toVar();
	const vd = mat3( viewMatrix ).mul( dir ).toVar();
	const projected = projectionMatrix.mul( vec4( vd, 1. ) ).toVar();
	skyPosition.assign( select( projected.w.greaterThan( 0. ), vec4( projected.xy, projected.w, projected.w ), vec4( 2., 2., 2., 1. ) ) );
	const visible = sub( 1., smoothstep( starLimit.sub( .5 ), starLimit.add( .22 ), magnitude ) ).toVar();
	const strength = pow( 10., float(-.17).mul( magnitude.sub( 1. ) ) ).toVar();
	const twilightVis = sub( 1., smoothstep( - .24, .04, sunDirection.y ) ).toVar();
	const brightness = clamp( strength, .065, 1.2 ).toVar();
	const faint = smoothstep( 4.8, 8., magnitude ).toVar();
	brightness.addAssign( faint.mul( zoomReveal ).mul( add( .23, mul( .07, zoomReveal ) ) ) );
	const duskLimit = mix( 1.5, starLimit, twilightVis ).toVar();
	visible.mulAssign( sub( 1., smoothstep( duskLimit.sub( .4 ), duskLimit.add( .6 ), magnitude ) ) );
	skyPointSize.assign( add( 1.2, clamp( sub( 5.4, magnitude ), 0., 6. ).mul( .47 ) ).add( zoomReveal.mul( add( .75, faint.mul( .35 ) ) ) ).mul( pixelRatio ) );
	const scintillation = add( 1., mul( .035, sin( time.mul( 1.4 ).add( seed.mul( 3. ) ) ) ).mul( sin( time.mul( .51 ).add( seed ) ) ) ).toVar();
	vAlpha.assign( visible.mul( brightness ).mul( smoothstep( - .008, .11, dir.y ) ).mul( twilightVis ).mul( sub( 1., moonlight.mul( .3 ) ) ).mul( scintillation ) );
	vColor.assign( starColor );
	skyPosition.xy.addAssign( quadCorner.mul( skyPointSize ).div( skyViewport ).mul( skyPosition.w ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ vColor, vAlpha, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const q = skyPointUV.mul( 2. ).sub( 1. ).toVar();
	const r = dot( q, q ).toVar();
	const core = exp( float(-4.5).mul( r ) ).mul( sub( 1., smoothstep( .52, 1., r ) ) ).toVar();
	skyColor.assign( vec4( vColor.mul( vAlpha ).mul( core ).mul( 1.3 ), 1. ) );

	return skyColor;

}, { vColor: 'vec3', vAlpha: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vColor,vAlpha,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 3: earth Mesh
export function material_5f7f167(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const moonMap=bind("moonMap","sampler2D",0);
const phase=bind("phase","float",0);
const moonNatural=bind("moonNatural","float",0);
const sunDirection=bind("sunDirection","vec3",0);
const moonDirection=bind("moonDirection","vec3",0);
const day=bind("day","float",0);
const twilight=bind("twilight","float",0);
const night=bind("night","float",0);
const moonlight=bind("moonlight","float",0);
const sunset=bind("sunset","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
moonMap.sample( vec2(0) ).toStack();
phase.toStack();
moonNatural.toStack();
sunDirection.toStack();
moonDirection.toStack();
day.toStack();
twilight.toStack();
moonlight.toStack();
sunset.toStack();
return (()=>{// Three.js Transpiler r186



const atmosphereColor = /*@__PURE__*/ Fn( ( [ d ] ) => {

	const h = max( d.y, 0. ).toVar();
	const sh = sunDirection.y.toVar();
	const height = pow( h, .43 ).toVar();
	const dayZenith = vec3( .09, .40, .69 ).toVar();
	const dayHorizon = vec3( .68, .81, .88 ).toVar();
	const nightZenith = vec3( .035, .049, .078 ).toVar();
	const nightHorizon = vec3( .07, .082, .10 ).toVar();
	const zenith = mix( nightZenith, dayZenith, day ).toVar();
	const horizon = mix( nightHorizon, dayHorizon, day ).toVar();
	const sky = mix( horizon, zenith, height ).toVar();
	const az = sunDirection.xz.div( max( length( sunDirection.xz ), .001 ) ).toVar();
	const toward = clamp( dot( d.xz, az ).mul( .5 ).add( .5 ), 0., 1. ).toVar();
	const band = exp( pow( d.y.sub( .025 ).mul( 4.1 ), 2. ).negate() ).toVar();
	const amber = mix( vec3( .90, .60, .37 ), vec3( .91, .45, .22 ), sunset ).toVar();
	const peach = mix( vec3( .65, .48, .52 ), vec3( .60, .34, .41 ), sunset ).toVar();
	const glow = twilight.mul( pow( toward, 5. ) ).mul( band ).toVar();
	sky.assign( mix( sky, amber, glow.mul( .92 ) ) );
	const rose = twilight.mul( exp( pow( d.y.sub( .17 ).mul( 3.5 ), 2. ).negate() ) ).mul( .30 ).toVar();
	sky.assign( mix( sky, peach, rose.mul( add( .3, mul( .7, toward ) ) ) ) );
	const away = pow( sub( 1., toward ), 3. ).toVar();
	sky.assign( mix( sky, vec3( .085, .095, .17 ), twilight.mul( away ).mul( sub( 1., smoothstep( .03, .25, d.y ) ) ).mul( .55 ) ) );
	sky.assign( mix( sky, vec3( .42, .31, .40 ), twilight.mul( away ).mul( exp( pow( d.y.sub( .13 ).mul( 11. ), 2. ).negate() ) ).mul( .22 ) ) );
	const sunAngular = atan( length( cross( d, sunDirection ) ), dot( d, sunDirection ) ).toVar();
	const solarAA = max( fwidth( sunAngular ), .000025 ).toVar();
	const disk = sub( 1., smoothstep( sub( .026, solarAA ), add( .026, solarAA ), sunAngular ) ).toVar();
	const solarUp = smoothstep( - .055, .015, sh ).toVar();
	const sunColor = mix( vec3( 1., .38, .10 ), vec3( 1., .96, .78 ), smoothstep( - .01, .23, sh ) ).toVar();
	const halo = exp( sunAngular.negate().mul( 20. ) ).mul( .16 ).add( exp( sunAngular.negate().mul( 160. ) ).mul( .19 ) ).toVar();
	sky.addAssign( sunColor.mul( halo.add( disk.mul( 1.75 ) ) ).mul( solarUp ) );
	const moonAngle = atan( length( cross( d, moonDirection ) ), dot( d, moonDirection ) ).toVar();
	sky.addAssign( vec3( .19, .23, .29 ).mul( moonlight ).mul( exp( moonAngle.negate().mul( 12. ) ).mul( .11 ).add( exp( moonAngle.negate().mul( 80. ) ).mul( .12 ) ) ) );
	sky.addAssign( moonlight.mul( vec3( .008, .011, .018 ) ).mul( sub( 1., height.mul( .6 ) ) ) );

	If( d.y.lessThan( 0. ), () => {

		sky.assign( mix( horizon, sky, smoothstep( - .08, 0., d.y ) ) );

	} );

	return sky;

}, { d: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const d = normalize( vRay ).toVar();
	const forward = dot( d, moonDirection ).toVar();

	If( forward.lessThan( .9995 ), () => {

		Discard();

	} );

	const right = normalize( cross( moonDirection, vec3( 0., 1., 0. ) ) ).toVar();
	const up = normalize( cross( right, moonDirection ) ).toVar();
	const p = vec2( dot( d, right ), dot( d, up ) ).div( max( forward, .001 ) ).div( .0255 ).toVar();
	const radius = length( p ).toVar();
	const aa = max( fwidth( radius ), .0005 ).toVar();

	If( radius.greaterThan( add( 1., aa ) ), () => {

		Discard();

	} );

	const z = sqrt( max( 0., sub( 1., dot( p, p ) ) ) ).toVar();
	const normal = vec3( p.x, p.y, z ).toVar();
	const uv = vec2( add( .5, atan( normal.x, normal.z ).div( 6.283185307 ) ), add( .5, asin( clamp( normal.y, - 1., 1. ) ).div( 3.141592654 ) ) ).toVar();
	const tex = moonMap.sample( uv ).rgb.toVar();
	const luminance = dot( tex, vec3( .299, .587, .114 ) ).toVar();
	const light = vec3( sin( phase.mul( 6.283185307 ) ), .025, cos( phase.mul( 6.283185307 ) ).negate() ).toVar();
	const lambert = dot( normal, normalize( light ) ).toVar();
	const terminator = smoothstep( - .055, .070, lambert ).toVar();
	const lightness = add( .18, mul( .82, sqrt( max( lambert, 0. ) ) ) ).mul( terminator ).toVar();
	const lit = vec3( .94, .94, .90 ).mul( pow( luminance, .80 ) ).mul( lightness.mul( 1.45 ) ).toVar();
	const earthshine = mul( .018, sub( 1., moonlight ) ).toVar();
	lit.addAssign( tex.mul( earthshine ).mul( sub( 1., terminator ) ) );
	const aerial = vec3( .31, .46, .60 ).mul( day ).toVar();
	lit.assign( mix( lit, aerial.add( lit.mul( .48 ) ), day.mul( .78 ) ) );

	If( moonNatural.greaterThan( .5 ), () => {

		const sunlit = dot( normal, vec3( sin( phase.mul( 6.283185307 ) ), 0., cos( phase.mul( 6.283185307 ) ).negate() ) ).toVar();

		If( sunlit.lessThanEqual( 0. ), () => {

			Discard();

		} );

		const alpha = smoothstep( 0., .075, sunlit ).mul( sub( 1., smoothstep( sub( 1., aa ), add( 1., aa ), radius ) ) ).toVar();
		const surface = vec3( .94, .94, .90 ).mul( pow( luminance, .80 ) ).mul( add( .18, mul( .82, sqrt( sunlit ) ) ) ).mul( 1.45 ).toVar();
		skyColor.assign( vec4( atmosphereColor( d ).add( surface.mul( sub( 1., day.mul( .62 ) ) ) ), alpha ) );

		return skyColor;

	} );

	skyColor.assign( vec4( lit, sub( 1., smoothstep( sub( 1., aa ), add( 1., aa ), radius ) ) ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 4: earth Mesh
export function material_54d1c0f(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const daylight=bind("daylight","float",0);
const twilight=bind("twilight","float",0);
const moonlight=bind("moonlight","float",0);
const clockTime=bind("clockTime","float",0);
const torch=bind("torch","float",0);
const sunDirection=bind("sunDirection","vec3",0);
const eye=bind("eye","vec3",0);
const forward=bind("forward","vec3",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const vWorld=varying(vec3(),"sky_vWorld");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	vWorld.assign( modelMatrix.mul( vec4( position, 1. ) ).xyz );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( vWorld, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
daylight.toStack();
twilight.toStack();
moonlight.toStack();
torch.toStack();
sunDirection.toStack();
eye.toStack();
forward.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const hash = /*@__PURE__*/ Fn( ( [ p ] ) => {

	return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ).mul( 43758.5453 ) );

}, { p: 'vec2', return: 'float' } );

const noise = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const i = floor( p ).toVar();
	const f = fract( p ).toVar();
	f.assign( f.mul( f ).mul( sub( 3., mul( 2., f ) ) ) );

	return mix( mix( hash( i ), hash( i.add( vec2( 1, 0 ) ) ), f.x ), mix( hash( i.add( vec2( 0, 1 ) ) ), hash( i.add( vec2( 1, 1 ) ) ), f.x ), f.y );

}, { p: 'vec2', return: 'float' } );

const illumination = /*@__PURE__*/ Fn( ( [ base, occlusion ] ) => {

	const sunUp = smoothstep( - .08, .3, sunDirection.y ).toVar();
	const warmth = mix( vec3( 1. ), vec3( 1.14, .76, .53 ), twilight.mul( .7 ) ).toVar();
	const lit = base.mul( warmth ).mul( add( .18, mul( .82, daylight ) ) ).mul( occlusion ).toVar();
	const nightTint = vec3( .019, .027, .027 ).mul( add( 0.62, base.g.mul( 2. ) ) ).toVar();
	lit.assign( mix( nightTint, lit, daylight ) );
	lit.addAssign( base.mul( vec3( .19, .23, .31 ) ).mul( moonlight ).mul( .47 ) );

	return lit;

}, { base: 'vec3', occlusion: 'float', return: 'vec3' } );

const torchLight = /*@__PURE__*/ Fn( ( [ lit_immutable, base, pos, occlusion ] ) => {

	const lit = lit_immutable.toVar();

	If( daylight.greaterThan( .001 ).and( sunDirection.y.greaterThan( - .02 ) ), () => {

		lit.mulAssign( mix( 1., vehicleOcclusion( pos.add( vec3( 0., .004, 0. ) ), sunDirection ).mul( baseDirectionalVisibility( pos.add( vec3( 0., .03, 0. ) ), sunDirection, 0. ) ), daylight.mul( .82 ) ) );

	} );

	const beam = float( 0. ).toVar();

	If( torch.greaterThan( .001 ), () => {

		const b = flashlightBeam( pos.sub( eye ), forward ).mul( torch ).toVar();

		If( b.greaterThan( .001 ), () => {

			beam.assign( b.mul( add( .12, mul( .88, max( normalize( eye.sub( pos ) ).y, 0. ) ) ) ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const l = headlightBeam( pos.sub( lampLeft ) ).toVar();
		const r = headlightBeam( pos.sub( lampRight ) ).toVar();

		If( l.greaterThan( .001 ), () => {

			beam.addAssign( l.mul( add( .13, mul( .87, max( normalize( lampLeft.sub( pos ) ).y, 0. ) ) ) ).mul( basePointVisibility( pos, vec3( 0., 1., 0. ), lampLeft, 29 ) ) );

		} );

		If( r.greaterThan( .001 ), () => {

			beam.addAssign( r.mul( add( .13, mul( .87, max( normalize( lampRight.sub( pos ) ).y, 0. ) ) ) ).mul( basePointVisibility( pos, vec3( 0., 1., 0. ), lampRight, 30 ) ) );

		} );

	} );

	const rear = rearBeam( pos ).toVar();

	If( rear.greaterThan( .001 ), () => {

		rear.mulAssign( basePointVisibility( pos, vec3( 0., 1., 0. ), rearLamp, 31 ) );

	} );

	return sqrt( lit.mul( lit ).add( base.mul( vec3( .92, .96, 1. ).mul( beam ).add( vec3( 1., .009, .002 ).mul( rear ) ).add( baseLighting( pos, vec3( 0., 1., 0. ) ) ) ).mul( occlusion ).mul( .48 ) ) );

}, { lit: 'vec3', base: 'vec3', pos: 'vec3', occlusion: 'float', return: 'vec3' } );

const groundHaze = /*@__PURE__*/ Fn( ( [ c, pos ] ) => {

	const d = length( pos.xz.sub( eye.xz ) ).toVar();
	const haze = sub( 1., exp( d.negate().mul( .0019 ) ) ).toVar();
	const toward = dot( normalize( pos.xz.sub( eye.xz ) ), normalize( sunDirection.xz.add( vec2( .0001 ) ) ) ).mul( .5 ).add( .5 ).toVar();
	const fog = mix( vec3( .031, .041, .053 ), vec3( .57, .67, .64 ), daylight ).toVar();
	fog.assign( mix( fog, vec3( .76, .43, .26 ), twilight.mul( pow( toward, 4. ) ).mul( .72 ) ) );

	return mix( c, fog, haze.mul( .92 ) );

}, { c: 'vec3', pos: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const p = vWorld.xz.toVar();
	const broad = noise( p.mul( .032 ) ).toVar();
	const mottled = noise( p.mul( .29 ) ).toVar();
	const distance = length( p.sub( eye.xz ) ).toVar();
	const close = sub( 1., smoothstep( 10., 90., distance ) ).toVar();
	const low = vec3( .23, .35, .13 ).toVar();
	const high = vec3( .37, .47, .22 ).toVar();
	const base = mix( low, high, broad.mul( .65 ).add( mottled.mul( .35 ) ) ).toVar();
	base.mulAssign( .79 );

	If( close.greaterThan( 0. ), () => {

		base.mulAssign( add( 1., noise( p.mul( 7.1 ) ).mul( .33 ).add( noise( p.mul( 69. ) ).mul( .18 ) ).mul( close ).div( .79 ) ) );

	} );

	const earth = noise( p.mul( .7 ) ).mul( noise( p.mul( .12 ) ) ).toVar();
	base.assign( mix( base, vec3( .28, .24, .14 ), smoothstep( .51, .81, earth ).mul( .27 ) ) );
	const col = illumination( base, .92 ).toVar();
	col.assign( torchLight( col, base, vWorld, .92 ) );
	col.assign( groundHaze( col, vWorld ) );
	const grain = hash( skyPixel.xy ).sub( .5 ).div( 255. ).toVar();
	skyColor.assign( vec4( col.add( grain ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 5: earth Mesh
export function material_a2199d51(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const buildMask=bind("buildMask","sampler2D",0);
const buildMaskOrigin=bind("buildMaskOrigin","vec2",0);
const eye=bind("eye","vec3",0);
const clockTime=bind("clockTime","float",0);
const grassRange=bind("grassRange","float",0);
const daylight=bind("daylight","float",0);
const twilight=bind("twilight","float",0);
const moonlight=bind("moonlight","float",0);
const torch=bind("torch","float",0);
const sunDirection=bind("sunDirection","vec3",0);
const forward=bind("forward","vec3",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const vWorld=varying(vec3(),"sky_vWorld");
const vHeight=varying(float(),"sky_vHeight");
const vSeed=varying(float(),"sky_vSeed");
const offset=attribute("offset","vec2");
const shape=attribute("shape","vec4");
const vertex=Fn(()=>{
buildMask.sample( vec2(0) ).toStack();
buildMaskOrigin.toStack();
eye.toStack();
clockTime.toStack();
grassRange.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const xz = modelMatrix.mul( vec4( offset.x, 0., offset.y, 1. ) ).xz.toVar();
	const distance = length( xz.sub( eye.xz ) ).toVar();
	const fade = sub( 1., smoothstep( grassRange.mul( 2. ).div( 3. ), grassRange, distance ) ).toVar();
	const buildUV = xz.sub( buildMaskOrigin ).div( 64. ).toVar();

	If( min( min( buildUV.x, buildUV.y ), min( sub( 1., buildUV.x ), sub( 1., buildUV.y ) ) ).greaterThan( 0. ), () => {

		fade.mulAssign( sub( 1., buildMask.sample( buildUV ).r ) );

	} );

	const p = position.toVar();
	const h = p.y.toVar();
	const sway = sin( clockTime.mul( .75 ).add( xz.x.mul( .13 ) ).add( xz.y.mul( .21 ) ) ).mul( .045 ).add( sin( clockTime.mul( 1.8 ).add( xz.y.mul( .39 ) ) ).mul( .012 ) ).toVar();
	p.x.mulAssign( shape.x );
	p.y.mulAssign( shape.y.mul( fade ) );
	p.z.assign( h.mul( h ).mul( add( .06, sway ) ).mul( fade ) );
	const c = cos( shape.z ).toVar();
	const s = sin( shape.z ).toVar();
	p.xz.assign( mat2( c, s.negate(), s, c ).mul( p.xz ) );
	p.x.addAssign( xz.x );
	p.z.addAssign( xz.y );
	vWorld.assign( p );
	vHeight.assign( h );
	vSeed.assign( shape.w );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( p, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
eye.toStack();
daylight.toStack();
twilight.toStack();
moonlight.toStack();
torch.toStack();
sunDirection.toStack();
forward.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const hash = /*@__PURE__*/ Fn( ( [ p ] ) => {

	return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ).mul( 43758.5453 ) );

}, { p: 'vec2', return: 'float' } );

const noise = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const i = floor( p ).toVar();
	const f = fract( p ).toVar();
	f.assign( f.mul( f ).mul( sub( 3., mul( 2., f ) ) ) );

	return mix( mix( hash( i ), hash( i.add( vec2( 1, 0 ) ) ), f.x ), mix( hash( i.add( vec2( 0, 1 ) ) ), hash( i.add( vec2( 1, 1 ) ) ), f.x ), f.y );

}, { p: 'vec2', return: 'float' } );

const illumination = /*@__PURE__*/ Fn( ( [ base, occlusion ] ) => {

	const sunUp = smoothstep( - .08, .3, sunDirection.y ).toVar();
	const warmth = mix( vec3( 1. ), vec3( 1.14, .76, .53 ), twilight.mul( .7 ) ).toVar();
	const lit = base.mul( warmth ).mul( add( .18, mul( .82, daylight ) ) ).mul( occlusion ).toVar();
	const nightTint = vec3( .019, .027, .027 ).mul( add( 0.62, base.g.mul( 2. ) ) ).toVar();
	lit.assign( mix( nightTint, lit, daylight ) );
	lit.addAssign( base.mul( vec3( .19, .23, .31 ) ).mul( moonlight ).mul( .47 ) );

	return lit;

}, { base: 'vec3', occlusion: 'float', return: 'vec3' } );

const torchLight = /*@__PURE__*/ Fn( ( [ lit_immutable, base, pos, occlusion ] ) => {

	const lit = lit_immutable.toVar();

	If( daylight.greaterThan( .001 ).and( sunDirection.y.greaterThan( - .02 ) ), () => {

		lit.mulAssign( mix( 1., vehicleOcclusion( pos.add( vec3( 0., .004, 0. ) ), sunDirection ).mul( baseDirectionalVisibility( pos.add( vec3( 0., .03, 0. ) ), sunDirection, 0. ) ), daylight.mul( .82 ) ) );

	} );

	const beam = float( 0. ).toVar();

	If( torch.greaterThan( .001 ), () => {

		const b = flashlightBeam( pos.sub( eye ), forward ).mul( torch ).toVar();

		If( b.greaterThan( .001 ), () => {

			beam.assign( b.mul( add( .12, mul( .88, max( normalize( eye.sub( pos ) ).y, 0. ) ) ) ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const l = headlightBeam( pos.sub( lampLeft ) ).toVar();
		const r = headlightBeam( pos.sub( lampRight ) ).toVar();

		If( l.greaterThan( .001 ), () => {

			beam.addAssign( l.mul( add( .13, mul( .87, max( normalize( lampLeft.sub( pos ) ).y, 0. ) ) ) ).mul( basePointVisibility( pos, vec3( 0., 1., 0. ), lampLeft, 29 ) ) );

		} );

		If( r.greaterThan( .001 ), () => {

			beam.addAssign( r.mul( add( .13, mul( .87, max( normalize( lampRight.sub( pos ) ).y, 0. ) ) ) ).mul( basePointVisibility( pos, vec3( 0., 1., 0. ), lampRight, 30 ) ) );

		} );

	} );

	const rear = rearBeam( pos ).toVar();

	If( rear.greaterThan( .001 ), () => {

		rear.mulAssign( basePointVisibility( pos, vec3( 0., 1., 0. ), rearLamp, 31 ) );

	} );

	return sqrt( lit.mul( lit ).add( base.mul( vec3( .92, .96, 1. ).mul( beam ).add( vec3( 1., .009, .002 ).mul( rear ) ).add( baseLighting( pos, vec3( 0., 1., 0. ) ) ) ).mul( occlusion ).mul( .48 ) ) );

}, { lit: 'vec3', base: 'vec3', pos: 'vec3', occlusion: 'float', return: 'vec3' } );

const groundHaze = /*@__PURE__*/ Fn( ( [ c, pos ] ) => {

	const d = length( pos.xz.sub( eye.xz ) ).toVar();
	const haze = sub( 1., exp( d.negate().mul( .0019 ) ) ).toVar();
	const toward = dot( normalize( pos.xz.sub( eye.xz ) ), normalize( sunDirection.xz.add( vec2( .0001 ) ) ) ).mul( .5 ).add( .5 ).toVar();
	const fog = mix( vec3( .031, .041, .053 ), vec3( .57, .67, .64 ), daylight ).toVar();
	fog.assign( mix( fog, vec3( .76, .43, .26 ), twilight.mul( pow( toward, 4. ) ).mul( .72 ) ) );

	return mix( c, fog, haze.mul( .92 ) );

}, { c: 'vec3', pos: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, vHeight, vSeed, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const base = mix( vec3( .23, .34, .09 ), vec3( .33, .46, .17 ), vSeed ).toVar();
	base.assign( mix( base, vec3( .44, .42, .20 ), pow( vSeed, 10. ).mul( .7 ) ) );
	const col = illumination( base, add( .63, mul( .37, vHeight ) ) ).toVar();
	col.assign( torchLight( col, base, vWorld, add( .42, mul( .58, vHeight ) ) ) );
	const backLight = max( 0., dot( normalize( vWorld.sub( eye ) ), sunDirection ) ).toVar();
	col.addAssign( base.mul( twilight ).mul( pow( backLight, 5. ) ).mul( vHeight ).mul( .17 ) );
	skyColor.assign( vec4( groundHaze( col, vWorld ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', vHeight: 'float', vSeed: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,vHeight,vSeed,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 6: moon Mesh
export function material_fa8a7b69(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const sun=bind("sun","vec3",0);
const earth=bind("earth","vec3",0);
const eye=bind("eye","vec3",0);
const forward=bind("forward","vec3",0);
const earthPower=bind("earthPower","float",0);
const day=bind("day","float",0);
const lunar=bind("lunar","float",0);
const torch=bind("torch","float",0);
const sunVisibility=bind("sunVisibility","float",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const vWorld=varying(vec3(),"sky_vWorld");
const vNormal=varying(vec3(),"sky_vNormal");
const vPaint=varying(vec3(),"sky_vPaint");
const vEmission=varying(float(),"sky_vEmission");
const paintColor=attribute("paintColor","vec3");
const emission=attribute("emission","float");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	vWorld.assign( modelMatrix.mul( vec4( position, 1. ) ).xyz );
	vNormal.assign( normalize( mat3( modelMatrix ).mul( normal ) ) );
	vPaint.assign( paintColor );
	vEmission.assign( emission );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( vWorld, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
sun.toStack();
earth.toStack();
eye.toStack();
forward.toStack();
earthPower.toStack();
day.toStack();
lunar.toStack();
torch.toStack();
sunVisibility.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, vNormal, vPaint, vEmission, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const n = normalize( vNormal ).toVar();
	const view = normalize( eye.sub( vWorld ) ).toVar();
	const ndl = float( 0. ).toVar();

	If( sun.y.greaterThan( 0. ), () => {

		ndl.assign( max( 0., dot( n, sun ) ) );

	} );

	const ambient = mix( vec3( .009, .014, .021 ).add( vec3( .17 ).mul( day ) ), vec3( .00004 ), lunar ).toVar();
	const light = ambient.toVar();

	If( ndl.greaterThan( .001 ).and( sunVisibility.greaterThan( .001 ) ), () => {

		light.addAssign( vec3( 1., .96, .86 ).mul( ndl ).mul( sunVisibility ).mul( mix( day.mul( .8 ), 1.35, lunar ) ).mul( baseDirectionalVisibility( vWorld.add( n.mul( .03 ) ), sun, 0. ) ) );

	} );

	const earthLit = max( 0., dot( n, earth ) ).toVar();

	If( earthPower.greaterThan( .0001 ).and( earthLit.greaterThan( .001 ) ), () => {

		light.addAssign( vec3( .46, .63, 1. ).mul( earthLit ).mul( earthPower ).mul( baseDirectionalVisibility( vWorld.add( n.mul( .02 ) ), earth, 1. ) ) );

	} );

	If( torch.greaterThan( .001 ), () => {

		const d = eye.sub( vWorld ).toVar();
		const beam = flashlightBeam( d.negate(), forward ).mul( torch ).toVar();

		If( beam.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( beam ).mul( add( .10, mul( .90, max( 0., dot( n, normalize( d ) ) ) ) ) ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const l = headlightBeam( vWorld.sub( lampLeft ) ).toVar();
		const r = headlightBeam( vWorld.sub( lampRight ) ).toVar();

		If( l.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( l ).mul( basePointVisibility( vWorld, n, lampLeft, 29 ) ).mul( .15 ) );

		} );

		If( r.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( r ).mul( basePointVisibility( vWorld, n, lampRight, 30 ) ).mul( .15 ) );

		} );

	} );

	const spec = pow( max( 0., dot( n, normalize( sun.add( view ) ) ) ), 40. ).mul( ndl ).mul( sunVisibility ).mul( mix( day, 1., lunar ) ).toVar();
	light.addAssign( baseLighting( vWorld, n ) );
	const color = vPaint.mul( light ).add( vec3( spec.mul( .07 ) ) ).toVar();

	If( vEmission.greaterThan( 0. ), () => {

		color.addAssign( vPaint.mul( vEmission ).mul( min( lampMode, 1. ) ).mul( 2.4 ) );

	} );

	If( vEmission.lessThan( 0. ), () => {

		color.addAssign( vec3( 1., .012, .003 ).mul( vEmission.negate() ).mul( reverseLight ).mul( 2.8 ) );

	} );

	skyColor.assign( vec4( pow( max( color, vec3( 0. ) ), vec3( 1. / 2.2 ) ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', vNormal: 'vec3', vPaint: 'vec3', vEmission: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,vNormal,vPaint,vEmission,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 7: moon Points
export function material_fb142299(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(uv.x,uv.y.oneMinus()),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const pixelRatio=bind("pixelRatio","float",0);
const resolved=bind("resolved","float",0);
const colors=bind("colors","vec3",7);
const visibility=bind("visibility","float",0);
const vIndex=varying(float(),"sky_vIndex");
const planetIndex=attribute("planetIndex","float");
const vertex=Fn(()=>{
pixelRatio.toStack();
resolved.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const v = mat3( viewMatrix ).mul( position ).toVar();
	const p = projectionMatrix.mul( vec4( v, 1. ) ).toVar();
	skyPosition.assign( select( p.w.greaterThan( 0. ), vec4( p.xy, p.w, p.w ), vec4( 2., 2., 2., 1. ) ) );
	vIndex.assign( planetIndex );
	const naked = select( planetIndex.lessThan( 2. ), 4.2, select( planetIndex.lessThan( 5. ), 3.3, 2.0 ) ).toVar();
	skyPointSize.assign( mix( naked, select( planetIndex.equal( 4. ), 56., 34. ), resolved ).mul( pixelRatio ) );
	skyPosition.xy.addAssign( quadCorner.mul( skyPointSize ).div( skyViewport ).mul( skyPosition.w ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
resolved.toStack();
colors.element(0).toStack();
visibility.toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ vIndex, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const q = skyPointUV.mul( 2. ).sub( 1. ).toVar();
	const r = length( q ).toVar();
	const col = vec3( 1. ).toVar();

	Loop( 7, ( { i } ) => {

		If( abs( vIndex.sub( float( i ) ) ).lessThan( .1 ), () => {

			col.assign( colors.element( i ) );

		} );

	} );

	If( resolved.lessThan( .05 ), () => {

		const glow = exp( r.negate().mul( r ).mul( 5. ) ).mul( sub( 1., smoothstep( .65, 1., r ) ) ).toVar();
		skyColor.assign( vec4( col.mul( glow ).mul( visibility ), 1. ) );

		return skyColor;

	} );

	const radius = select( vIndex.greaterThan( 3.5 ).and( vIndex.lessThan( 4.5 ) ), .5, .85 ).toVar();
	const disc = sub( 1., smoothstep( radius.sub( .018 ), radius, r ) ).toVar();
	const n = sqrt( max( 0., sub( 1., r.mul( r ).div( radius.mul( radius ) ) ) ) ).toVar();
	const shade = add( .22, mul( .78, n ) ).toVar();
	const bands = float( 1. ).toVar();

	If( vIndex.greaterThan( 2.5 ).and( vIndex.lessThan( 4.5 ) ), () => {

		bands.assign( add( .87, mul( .13, sin( q.y.mul( 33. ).add( sin( q.x.mul( 6. ) ).mul( .55 ) ) ) ) ) );

	} );

	If( vIndex.greaterThan( 1.5 ).and( vIndex.lessThan( 2.5 ) ), () => {

		bands.assign( sub( 1., mul( .18, sin( q.y.mul( 8. ).add( sin( q.x.mul( 11. ) ) ) ) ) ) );

	} );

	const outColor = col.mul( shade ).mul( bands ).mul( disc ).toVar();

	If( vIndex.greaterThan( 3.5 ).and( vIndex.lessThan( 4.5 ) ), () => {

		const ring = length( vec2( q.x, q.y.mul( 2.4 ) ) ).toVar();
		const alpha = smoothstep( .61, .65, ring ).mul( sub( 1., smoothstep( .91, .98, ring ) ) ).mul( add( .75, mul( .18, sin( ring.mul( 110. ) ) ) ) ).toVar();

		If( q.y.greaterThan( 0. ).or( disc.lessThan( .1 ) ), () => {

			outColor.addAssign( vec3( .65, .60, .47 ).mul( alpha ) );

		} );

	} );

	skyColor.assign( vec4( outColor.mul( max( .4, visibility ) ), 1. ) );

	return skyColor;

}, { vIndex: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vIndex,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 8: moon Mesh
export function material_9cc412d2(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const s=varying(float(),"sky_s");
const d=varying(float(),"sky_d");
const beamSide=attribute("beamSide","float");
const beamDistance=attribute("beamDistance","float");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	s.assign( beamSide );
	d.assign( beamDistance );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( position, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ s, d, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const edge = pow( max( 0., sub( 1., abs( s ) ) ), 1.7 ).toVar();
	const fade = sub( 1., smoothstep( 8., 55., d ) ).toVar();
	skyColor.assign( vec4( .25, 1., .65, edge.mul( fade ).mul( .58 ) ) );

	return skyColor;

}, { s: 'float', d: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(s,d,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 9: moon shadow atlas
export function material_82498b0f(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const shadowOrigin=bind("shadowOrigin","vec3",0);
const shadowForward=bind("shadowForward","vec3",0);
const shadowRange=bind("shadowRange","float",0);
const shadowRadial=bind("shadowRadial","float",0);
const casterWorld=varying(vec3(),"sky_casterWorld");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	casterWorld.assign( modelMatrix.mul( vec4( position, 1. ) ).xyz );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( casterWorld, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
shadowOrigin.toStack();
shadowForward.toStack();
shadowRange.toStack();
shadowRadial.toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ casterWorld, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const delta = casterWorld.sub( shadowOrigin ).toVar();
	const d = mix( dot( delta, shadowForward ), length( delta ), shadowRadial ).div( shadowRange ).toVar();
	d.assign( clamp( d, 0., .999999 ) );
	const enc = fract( d.mul( vec3( 1., 255., 65025. ) ) ).toVar();
	enc.subAssign( enc.yzz.mul( vec3( 1. / 255., 1. / 255., 0. ) ) );
	skyColor.assign( vec4( enc, 1. ) );

	return skyColor;

}, { casterWorld: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(casterWorld,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 10: moon atlas clear
export function material_c56b0306(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);

const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	skyColor.assign( vec4( 1. ) );

	return skyColor;

}, { skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 11: moon ghost
export function material_fa8df9b1(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const sun=bind("sun","vec3",0);
const earth=bind("earth","vec3",0);
const eye=bind("eye","vec3",0);
const forward=bind("forward","vec3",0);
const lampColor=bind("lampColor","vec3",0);
const day=bind("day","float",0);
const earthPower=bind("earthPower","float",0);
const lunar=bind("lunar","float",0);
const torch=bind("torch","float",0);
const ghost=bind("ghost","float",0);
const valid=bind("valid","float",0);
const lampOn=bind("lampOn","float",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const vWorld=varying(vec3(),"sky_vWorld");
const vNormal=varying(vec3(),"sky_vNormal");
const vPaint=varying(vec3(),"sky_vPaint");
const vEmission=varying(float(),"sky_vEmission");
const paint=attribute("paint","vec3");
const emission=attribute("emission","float");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	vWorld.assign( modelMatrix.mul( vec4( position, 1. ) ).xyz );
	vNormal.assign( normalize( mat3( modelMatrix ).mul( normal ) ) );
	vPaint.assign( paint );
	vEmission.assign( emission );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( vWorld, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
sun.toStack();
earth.toStack();
eye.toStack();
forward.toStack();
lampColor.toStack();
day.toStack();
earthPower.toStack();
lunar.toStack();
torch.toStack();
ghost.toStack();
valid.toStack();
lampOn.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, vNormal, vPaint, vEmission, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();

	If( ghost.greaterThan( .5 ), () => {

		const tint = mix( vec3( .95, .38, .28 ), vec3( .51, .89, .82 ), valid ).toVar();
		const edge = pow( sub( 1., abs( dot( normalize( vNormal ), normalize( eye.sub( vWorld ) ) ) ) ), 2. ).toVar();
		skyColor.assign( vec4( tint, add( .22, edge.mul( .30 ) ) ) );

		return skyColor;

	} );

	const n = normalize( vNormal ).toVar();
	const p = vWorld.add( n.mul( .025 ) ).toVar();
	const solar = float( 0. ).toVar();

	If( sun.y.greaterThan( 0. ), () => {

		solar.assign( max( 0., dot( n, sun ) ) );

	} );

	const light = mix( vec3( .013, .018, .025 ).add( vec3( .17 ).mul( day ) ), vec3( .00004 ), lunar ).toVar();

	If( solar.greaterThan( .001 ), () => {

		light.addAssign( vec3( 1., .96, .88 ).mul( solar ).mul( mix( day.mul( .8 ), 1.35, lunar ) ).mul( baseDirectionalVisibility( p, sun, 0. ) ).mul( vehicleOcclusion( p, sun ) ) );

	} );

	const earthLit = max( 0., dot( n, earth ) ).toVar();

	If( earthPower.greaterThan( .0001 ).and( earthLit.greaterThan( .001 ) ), () => {

		light.addAssign( vec3( .46, .63, 1. ).mul( earthLit ).mul( earthPower ).mul( baseDirectionalVisibility( p, earth, 1. ) ) );

	} );

	If( torch.greaterThan( .001 ), () => {

		const beam = flashlightBeam( vWorld.sub( eye ), forward ).mul( torch ).toVar();

		If( beam.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( beam ).mul( add( .1, mul( .9, max( dot( n, normalize( eye.sub( vWorld ) ) ), 0. ) ) ) ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const l = headlightBeam( vWorld.sub( lampLeft ) ).toVar();
		const r = headlightBeam( vWorld.sub( lampRight ) ).toVar();

		If( l.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( l ).mul( max( .15, dot( n, normalize( lampLeft.sub( vWorld ) ) ) ) ).mul( basePointVisibility( vWorld, n, lampLeft, 29 ) ) );

		} );

		If( r.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( r ).mul( max( .15, dot( n, normalize( lampRight.sub( vWorld ) ) ) ) ).mul( basePointVisibility( vWorld, n, lampRight, 30 ) ) );

		} );

	} );

	const rear = rearBeam( vWorld ).toVar();

	If( rear.greaterThan( .001 ), () => {

		light.addAssign( vec3( 1., .009, .002 ).mul( rear ).mul( basePointVisibility( vWorld, n, rearLamp, 31 ) ) );

	} );

	light.addAssign( baseLighting( vWorld, n ) );
	const color = vPaint.mul( light ).toVar();

	If( vEmission.greaterThan( 0. ), () => {

		color.addAssign( lampColor.mul( vEmission ).mul( lampOn ) );

	} );

	If( vEmission.lessThan( 0. ), () => {

		color.addAssign( vPaint.mul( vEmission.negate() ).mul( .32 ) );

	} );

	skyColor.assign( vec4( pow( max( color, vec3( 0. ) ), vec3( 1. / 2.2 ) ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', vNormal: 'vec3', vPaint: 'vec3', vEmission: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,vNormal,vPaint,vEmission,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 12: moon batched props
export function material_33aeca19(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const sun=bind("sun","vec3",0);
const earth=bind("earth","vec3",0);
const eye=bind("eye","vec3",0);
const forward=bind("forward","vec3",0);
const lampColor=bind("lampColor","vec3",0);
const day=bind("day","float",0);
const earthPower=bind("earthPower","float",0);
const lunar=bind("lunar","float",0);
const torch=bind("torch","float",0);
const ghost=bind("ghost","float",0);
const valid=bind("valid","float",0);
const lampOn=bind("lampOn","float",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const vWorld=varying(vec3(),"sky_vWorld");
const vNormal=varying(vec3(),"sky_vNormal");
const vPaint=varying(vec3(),"sky_vPaint");
const vEmission=varying(float(),"sky_vEmission");
const paint=attribute("paint","vec3");
const emission=attribute("emission","float");
const batch0=attribute("batch0","vec4");
const batch1=attribute("batch1","vec4");
const batch2=attribute("batch2","vec4");
const batch3=attribute("batch3","vec4");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	vWorld.assign( batch0.xyz.mul( position.x ).add( batch1.xyz.mul( position.y ) ).add( batch2.xyz.mul( position.z ) ).add( batch3.xyz ) );
	vNormal.assign( normalize( batch0.xyz.mul( normal.x ).add( batch1.xyz.mul( normal.y ) ).add( batch2.xyz.mul( normal.z ) ) ) );
	vPaint.assign( paint );
	vEmission.assign( emission );
	skyPosition.assign( projectionMatrix.mul( viewMatrix ).mul( vec4( vWorld, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
sun.toStack();
earth.toStack();
eye.toStack();
forward.toStack();
lampColor.toStack();
day.toStack();
earthPower.toStack();
lunar.toStack();
torch.toStack();
ghost.toStack();
valid.toStack();
lampOn.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, vNormal, vPaint, vEmission, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();

	If( ghost.greaterThan( .5 ), () => {

		const tint = mix( vec3( .95, .38, .28 ), vec3( .51, .89, .82 ), valid ).toVar();
		const edge = pow( sub( 1., abs( dot( normalize( vNormal ), normalize( eye.sub( vWorld ) ) ) ) ), 2. ).toVar();
		skyColor.assign( vec4( tint, add( .22, edge.mul( .30 ) ) ) );

		return skyColor;

	} );

	const n = normalize( vNormal ).toVar();
	const p = vWorld.add( n.mul( .025 ) ).toVar();
	const solar = float( 0. ).toVar();

	If( sun.y.greaterThan( 0. ), () => {

		solar.assign( max( 0., dot( n, sun ) ) );

	} );

	const light = mix( vec3( .013, .018, .025 ).add( vec3( .17 ).mul( day ) ), vec3( .00004 ), lunar ).toVar();

	If( solar.greaterThan( .001 ), () => {

		light.addAssign( vec3( 1., .96, .88 ).mul( solar ).mul( mix( day.mul( .8 ), 1.35, lunar ) ).mul( baseDirectionalVisibility( p, sun, 0. ) ).mul( vehicleOcclusion( p, sun ) ) );

	} );

	const earthLit = max( 0., dot( n, earth ) ).toVar();

	If( earthPower.greaterThan( .0001 ).and( earthLit.greaterThan( .001 ) ), () => {

		light.addAssign( vec3( .46, .63, 1. ).mul( earthLit ).mul( earthPower ).mul( baseDirectionalVisibility( p, earth, 1. ) ) );

	} );

	If( torch.greaterThan( .001 ), () => {

		const beam = flashlightBeam( vWorld.sub( eye ), forward ).mul( torch ).toVar();

		If( beam.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( beam ).mul( add( .1, mul( .9, max( dot( n, normalize( eye.sub( vWorld ) ) ), 0. ) ) ) ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const l = headlightBeam( vWorld.sub( lampLeft ) ).toVar();
		const r = headlightBeam( vWorld.sub( lampRight ) ).toVar();

		If( l.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( l ).mul( max( .15, dot( n, normalize( lampLeft.sub( vWorld ) ) ) ) ).mul( basePointVisibility( vWorld, n, lampLeft, 29 ) ) );

		} );

		If( r.greaterThan( .001 ), () => {

			light.addAssign( vec3( .92, .96, 1. ).mul( r ).mul( max( .15, dot( n, normalize( lampRight.sub( vWorld ) ) ) ) ).mul( basePointVisibility( vWorld, n, lampRight, 30 ) ) );

		} );

	} );

	const rear = rearBeam( vWorld ).toVar();

	If( rear.greaterThan( .001 ), () => {

		light.addAssign( vec3( 1., .009, .002 ).mul( rear ).mul( basePointVisibility( vWorld, n, rearLamp, 31 ) ) );

	} );

	light.addAssign( baseLighting( vWorld, n ) );
	const color = vPaint.mul( light ).toVar();

	If( vEmission.greaterThan( 0. ), () => {

		color.addAssign( lampColor.mul( vEmission ).mul( lampOn ) );

	} );

	If( vEmission.lessThan( 0. ), () => {

		color.addAssign( vPaint.mul( vEmission.negate() ).mul( .32 ) );

	} );

	skyColor.assign( vec4( pow( max( color, vec3( 0. ) ), vec3( 1. / 2.2 ) ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', vNormal: 'vec3', vPaint: 'vec3', vEmission: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,vNormal,vPaint,vEmission,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 13: moon Mesh
export function material_2071ba81(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const sunDirection=bind("sunDirection","vec3",0);
const solarVisible=bind("solarVisible","float",0);
const solarGlare=bind("solarGlare","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
sunDirection.toStack();
solarGlare.toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const d = normalize( vRay ).toVar();
	const a = atan( length( cross( d, sunDirection ) ), dot( d, sunDirection ) ).toVar();
	const aa = max( fwidth( a ), .000018 ).toVar();
	const disk = sub( 1., smoothstep( sub( .0285, aa ), add( .035, aa ), a ) ).toVar();
	const glow = float( 0. ).toVar();

	If( solarGlare.greaterThan( .000001 ), () => {

		glow.assign( exp( pow( a.div( .19 ), 1.65 ).negate() ).mul( .20 ).add( exp( a.negate().mul( 20. ) ).mul( .55 ) ).add( exp( a.negate().mul( 65. ) ).mul( .45 ) ) );

	} );

	const color = vec3( 1., .985, .95 ).mul( disk.mul( 2.2 ).add( glow.mul( solarGlare ) ) ).toVar();
	skyColor.assign( vec4( color, 1. ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 14: moon Mesh
export function material_3b1f22dc(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const galacticNormal=bind("galacticNormal","vec3",0);
const galacticCenter=bind("galacticCenter","vec3",0);
const galacticTangent=bind("galacticTangent","vec3",0);
const night=bind("night","float",0);
const moonlight=bind("moonlight","float",0);
const milkyOn=bind("milkyOn","float",0);
const skyDetail=bind("skyDetail","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
galacticNormal.toStack();
galacticCenter.toStack();
galacticTangent.toStack();
night.toStack();
milkyOn.toStack();
skyDetail.toStack();
return (()=>{// Three.js Transpiler r186



const hash = /*@__PURE__*/ Fn( ( [ p_immutable ] ) => {

	const p = p_immutable.toVar();
	p.assign( fract( p.mul( .3183099 ).add( vec3( .11, .37, .71 ) ) ) );
	p.mulAssign( 17. );

	return fract( p.x.mul( p.y ).mul( p.z ).mul( p.x.add( p.y ).add( p.z ) ) );

}, { p: 'vec3', return: 'float' } );

const noise3 = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const i = floor( p ).toVar();
	const f = fract( p ).toVar();
	f.assign( f.mul( f ).mul( sub( 3., mul( 2., f ) ) ) );

	return mix( mix( mix( hash( i ), hash( i.add( vec3( 1, 0, 0 ) ) ), f.x ), mix( hash( i.add( vec3( 0, 1, 0 ) ) ), hash( i.add( vec3( 1, 1, 0 ) ) ), f.x ), f.y ), mix( mix( hash( i.add( vec3( 0, 0, 1 ) ) ), hash( i.add( vec3( 1, 0, 1 ) ) ), f.x ), mix( hash( i.add( vec3( 0, 1, 1 ) ) ), hash( i.add( vec3( 1, 1, 1 ) ) ), f.x ), f.y ), f.z );

}, { p: 'vec3', return: 'float' } );

const fbm = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const clouds = mul( .52, noise3( p ) ).add( mul( .27, noise3( p.mul( 2.07 ).add( 4.3 ) ) ) ).toVar();

	If( skyDetail.greaterThan( .5 ), () => {

		clouds.addAssign( mul( .14, noise3( p.mul( 4.13 ).add( 12.7 ) ) ).add( mul( .07, noise3( p.mul( 8.19 ) ) ) ) );

	} );

	return clouds;

}, { p: 'vec3', return: 'float' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const d = normalize( vRay ).toVar();
	const lat = dot( d, galacticNormal ).toVar();
	const g = vec3( dot( d, galacticCenter ), lat, dot( d, galacticTangent ) ).toVar();
	const clouds = fbm( g.mul( vec3( 8., 17., 10. ) ).add( vec3( 3.1, 7.4, 1.2 ) ) ).toVar();
	const knots = float( .5 ).toVar();
	const fine = float( .5 ).toVar();

	If( skyDetail.greaterThan( .5 ), () => {

		knots.assign( noise3( g.mul( 32. ).add( vec3( 9.2, 1.8, 4. ) ) ) );
		fine.assign( noise3( g.mul( 83. ).add( vec3( 4.7, 12., 6. ) ) ) );

	} );

	const central = pow( max( 0., g.x ), 6. ).toVar();
	const arm = add( .40, mul( .36, noise3( vec3( g.x.mul( 4. ), g.z.mul( 4. ), 2.8 ) ) ) ).add( mul( .38, central ) ).toVar();
	const bend = mul( .022, sin( g.z.mul( 5. ).add( g.x.mul( 2. ) ) ) ).add( clouds.sub( .5 ).mul( .065 ) ).toVar();
	const width = add( .052, mul( .040, clouds ) ).add( mul( .083, central ) ).toVar();
	const band = exp( pow( lat.add( bend ).div( width ), 2. ).negate() ).toVar();
	const bulge = exp( pow( lat.add( .025 ).div( add( .12, mul( .055, central ) ) ), 2. ).negate() ).mul( central ).toVar();
	const ridge = add( .021, mul( .033, sin( g.z.mul( 4. ).sub( g.x.mul( 2. ) ) ) ) ).add( clouds.sub( .5 ).mul( .05 ) ).toVar();
	const rift = exp( pow( lat.add( ridge ).div( add( .011, mul( .023, knots ) ) ), 2. ).negate() ).toVar();
	const riftMask = smoothstep( - .5, .6, g.x ).mul( add( .35, mul( .65, knots ) ) ).toVar();
	const branch = exp( pow( lat.sub( .055 ).add( g.z.mul( .047 ) ).add( knots.sub( .5 ).mul( .027 ) ).div( .018 ), 2. ).negate() ).mul( central ).toVar();
	const texture = add( .22, mul( .95, smoothstep( .24, .79, clouds ) ) ).add( mul( .16, knots ) ).add( mul( .07, fine ) ).toVar();
	const dust = band.mul( arm ).mul( texture ).add( bulge.mul( .30 ) ).mul( sub( 1., rift.mul( riftMask ).mul( .89 ) ) ).mul( sub( 1., branch.mul( .60 ) ) ).toVar();
	const veil = night.mul( milkyOn ).toVar();
	const color = mix( vec3( .053, .065, .078 ), vec3( .104, .089, .069 ), central.mul( .82 ) ).toVar();
	skyColor.assign( vec4( color.mul( dust ).mul( veil ).mul( 3.35 ), 1. ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 15: moon Points
export function material_c958ec57(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(uv.x,uv.y.oneMinus()),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const field=bind("field","mat4",0);
const moonDirection=bind("moonDirection","vec3",0);
const night=bind("night","float",0);
const starLimit=bind("starLimit","float",0);
const pixelRatio=bind("pixelRatio","float",0);
const zoomReveal=bind("zoomReveal","float",0);
const earthIllumination=bind("earthIllumination","float",0);
const vColor=varying(vec3(),"sky_vColor");
const vAlpha=varying(float(),"sky_vAlpha");
const magnitude=attribute("magnitude","float");
const seed=attribute("seed","float");
const starColor=attribute("starColor","vec3");
const vertex=Fn(()=>{
field.toStack();
moonDirection.toStack();
night.toStack();
starLimit.toStack();
pixelRatio.toStack();
zoomReveal.toStack();
earthIllumination.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const dir = mat3( field ).mul( position ).toVar();
	const vd = mat3( viewMatrix ).mul( dir ).toVar();
	const p = projectionMatrix.mul( vec4( vd, 1. ) ).toVar();
	skyPosition.assign( select( p.w.greaterThan( 0. ), vec4( p.xy, p.w, p.w ), vec4( 2., 2., 2., 1. ) ) );
	const visible = sub( 1., smoothstep( starLimit.sub( .5 ), starLimit.add( .22 ), magnitude ) ).toVar();

	If( visible.mul( night ).lessThan( .0001 ).or( p.w.lessThanEqual( 0. ) ), () => {

		skyPosition.assign( vec4( 2., 2., 2., 1. ) );
		skyPointSize.assign( 1. );
		vAlpha.assign( 0. );
		vColor.assign( vec3( 0. ) );

	} ).Else( () => {

		const faint = smoothstep( 4.8, 8., magnitude ).toVar();
		const strength = clamp( pow( 10., float(-.145).mul( magnitude.sub( 1. ) ) ), .14, 1.55 ).mul( 1.22 ).add( faint.mul( zoomReveal ).mul( .62 ) ).toVar();
		const angle = length( dir.sub( moonDirection ) ).toVar();
		const localGlare = sub( 1., exp( angle.negate().mul( 6. ) ).mul( earthIllumination ).mul( .9 ) ).toVar();
		skyPointSize.assign( add( 1.95, clamp( sub( 5.4, magnitude ), 0., 6. ).mul( .47 ) ).add( zoomReveal.mul( add( .8, faint.mul( .4 ) ) ) ).mul( pixelRatio ) );
		vAlpha.assign( visible.mul( strength ).mul( night ).mul( localGlare ) );
		vColor.assign( starColor );

	} );

	skyPosition.xy.addAssign( quadCorner.mul( skyPointSize ).div( skyViewport ).mul( skyPosition.w ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ vColor, vAlpha, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const q = skyPointUV.mul( 2. ).sub( 1. ).toVar();
	const r = dot( q, q ).toVar();
	const core = exp( float(-4.5).mul( r ) ).mul( sub( 1., smoothstep( .52, 1., r ) ) ).toVar();
	skyColor.assign( vec4( vColor.mul( vAlpha ).mul( core ).mul( 1.3 ), 1. ) );

	return skyColor;

}, { vColor: 'vec3', vAlpha: 'float', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vColor,vAlpha,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 16: moon Mesh
export function material_f4599137(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const inverseProjection=bind("inverseProjection","mat4",0);
const cameraWorld=bind("cameraWorld","mat4",0);
const moonDirection=bind("moonDirection","vec3",0);
const earthLight=bind("earthLight","vec3",0);
const moonMap=bind("moonMap","sampler2D",0);
const earthSpin=bind("earthSpin","float",0);
const vRay=varying(vec3(),"sky_vRay");
const vertex=Fn(()=>{
inverseProjection.toStack();
cameraWorld.toStack();
return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	const r = inverseProjection.mul( vec4( position.xy, 1., 1. ) ).toVar();
	vRay.assign( mat3( cameraWorld ).mul( r.xyz ) );
	skyPosition.assign( vec4( position.xy, 1., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
moonDirection.toStack();
earthLight.toStack();
moonMap.sample( vec2(0) ).toStack();
earthSpin.toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ vRay, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const d = normalize( vRay ).toVar();
	const forward = dot( d, moonDirection ).toVar();

	If( forward.lessThan( .994 ), () => {

		Discard();

	} );

	const right = normalize( cross( moonDirection, vec3( 0., 1., 0. ) ) ).toVar();
	const up = normalize( cross( right, moonDirection ) ).toVar();
	const p = vec2( dot( d, right ), dot( d, up ) ).div( max( forward, .001 ) ).div( .078 ).toVar();
	const r = length( p ).toVar();
	const aa = max( fwidth( r ), .00025 ).toVar();

	If( r.greaterThan( add( 1., aa ) ), () => {

		Discard();

	} );

	const z = sqrt( max( 0., sub( 1., dot( p, p ) ) ) ).toVar();
	const n = vec3( p, z ).toVar();
	const tilt = float( .4091 ).toVar();
	const mapped = vec3( n.x.mul( cos( tilt ) ).sub( n.y.mul( sin( tilt ) ) ), n.x.mul( sin( tilt ) ).add( n.y.mul( cos( tilt ) ) ), n.z ).toVar();
	const uv = vec2( fract( add( .51, earthSpin ).add( atan( mapped.x, mapped.z ).div( 6.2831853 ) ) ), add( .5, asin( clamp( mapped.y, - 1., 1. ) ).div( 3.14159265 ) ) ).toVar();
	const tex = moonMap.sample( uv ).rgb.toVar();
	const lambert = dot( n, earthLight ).toVar();
	const terminator = smoothstep( - .07, .09, lambert ).toVar();
	const lit = tex.mul( add( .18, mul( .82, sqrt( max( lambert, 0. ) ) ) ) ).mul( terminator ).mul( 1.45 ).toVar();
	const limb = pow( sub( 1., z ), 3.5 ).mul( smoothstep( - .12, .3, lambert ) ).toVar();
	lit.addAssign( vec3( .055, .17, .37 ).mul( limb ) );
	skyColor.assign( vec4( lit, sub( 1., smoothstep( sub( 1., aa ), add( 1., aa ), r ) ) ) );

	return skyColor;

}, { vRay: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vRay,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 17: moon Mesh
export function material_c44d9ce3(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const grain=bind("grain","sampler2D",0);
const sun=bind("sun","vec3",0);
const earth=bind("earth","vec3",0);
const eye=bind("eye","vec3",0);
const forward=bind("forward","vec3",0);
const earthPower=bind("earthPower","float",0);
const torch=bind("torch","float",0);
const quality=bind("quality","float",0);
const lampLeft=bind("lampLeft","vec3",0);
const lampRight=bind("lampRight","vec3",0);
const lampDirection=bind("lampDirection","vec3",0);
const vehicleCenter=bind("vehicleCenter","vec3",0);
const vehicleSize=bind("vehicleSize","vec3",0);
const lampMode=bind("lampMode","float",0);
const vehicleHeading=bind("vehicleHeading","float",0);
const reverseLight=bind("reverseLight","float",0);
const shadowDetail=bind("shadowDetail","float",0);
const rearLamp=bind("rearLamp","vec3",0);
const rearDirection=bind("rearDirection","vec3",0);
const vehicleInverse=bind("vehicleInverse","mat4",0);
const wheelShape=bind("wheelShape","vec4",0);
const wheelOffsets=bind("wheelOffsets","vec4",0);
const baseLights=bind("baseLights","vec4",4);
const baseColors=bind("baseColors","vec4",4);
const baseLightCount=bind("baseLightCount","int",0);
const baseNodeCount=bind("baseNodeCount","int",0);
const baseTree=bind("baseTree","sampler2D",0);
const baseTreeSize=bind("baseTreeSize","vec2",0);
const baseLightGrid=bind("baseLightGrid","sampler2D",0);
const baseLightData=bind("baseLightData","sampler2D",0);
const baseLightDataSize=bind("baseLightDataSize","vec2",0);
const baseShadowAtlas=bind("baseShadowAtlas","sampler2D",0);
const baseShadowReady=bind("baseShadowReady","float",0);
const baseShadowMatrices=bind("baseShadowMatrices","mat4",32);
const baseShadowRects=bind("baseShadowRects","vec4",32);
const baseShadowOrigins=bind("baseShadowOrigins","vec4",32);
const baseShadowDirections=bind("baseShadowDirections","vec3",4);
const baseShadowValid=bind("baseShadowValid","float",32);
const heightMap=bind("heightMap","sampler2D",0);
const terrainShadowDetail=bind("terrainShadowDetail","float",0);
const terrainLightCache=bind("terrainLightCache","sampler2D",0);
const lightCacheOrigin=bind("lightCacheOrigin","vec2",0);
const lightCacheReady=bind("lightCacheReady","float",0);
const vWorld=varying(vec3(),"sky_vWorld");
const vNormal=varying(vec3(),"sky_vNormal");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	vWorld.assign( position );
	vNormal.assign( normal );
	skyPosition.assign( projectionMatrix.mul( modelViewMatrix ).mul( vec4( position, 1. ) ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
grain.sample( vec2(0) ).toStack();
sun.toStack();
earth.toStack();
eye.toStack();
forward.toStack();
earthPower.toStack();
torch.toStack();
quality.toStack();
lampLeft.toStack();
lampRight.toStack();
lampDirection.toStack();
vehicleCenter.toStack();
vehicleSize.toStack();
lampMode.toStack();
reverseLight.toStack();
shadowDetail.toStack();
rearLamp.toStack();
rearDirection.toStack();
vehicleInverse.toStack();
wheelShape.toStack();
wheelOffsets.toStack();
baseLights.element(0).toStack();
baseColors.element(0).toStack();
baseLightCount.toStack();
baseNodeCount.toStack();
baseTree.sample( vec2(0) ).toStack();
baseTreeSize.toStack();
baseLightGrid.sample( vec2(0) ).toStack();
baseLightData.sample( vec2(0) ).toStack();
baseLightDataSize.toStack();
baseShadowAtlas.sample( vec2(0) ).toStack();
baseShadowReady.toStack();
baseShadowMatrices.element(0).toStack();
baseShadowRects.element(0).toStack();
baseShadowOrigins.element(0).toStack();
baseShadowDirections.element(0).toStack();
baseShadowValid.element(0).toStack();
heightMap.sample( vec2(0) ).toStack();
terrainShadowDetail.toStack();
terrainLightCache.sample( vec2(0) ).toStack();
lightCacheOrigin.toStack();
lightCacheReady.toStack();
return (()=>{// Three.js Transpiler r186



const flashlightBeam = /*@__PURE__*/ Fn( ( [ fromLamp, direction ] ) => {

	const len = length( fromLamp ).toVar();
	const aim = dot( fromLamp.div( max( len, .001 ) ), direction ).toVar();

	If( aim.lessThanEqual( 0. ).or( len.greaterThanEqual( 100. ) ), () => {

		return 0.;

	} );

	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).div( 1.08 ).toVar();
	const central = sub( 1., smoothstep( .49, .75, radial ) ).toVar();
	const ring = exp( pow( radial.sub( .82 ).div( .055 ), 2. ).negate() ).mul( .16 ).toVar();
	const spill = sub( 1., smoothstep( .79, 1.03, radial ) ).mul( .15 ).toVar();

	return central.add( ring ).add( spill ).mul( smoothstep( 0., .08, aim ) ).mul( sub( 1., smoothstep( 75., 100., len ) ) ).mul( 2.8 ).div( add( 1., len.mul( len ).div( 170. ) ) );

}, { fromLamp: 'vec3', direction: 'vec3', return: 'float' } );

const headlightBeam = /*@__PURE__*/ Fn( ( [ delta ] ) => {

	If( lampMode.lessThan( .001 ), () => {

		return 0.;

	} );

	const len = length( delta ).toVar();
	const aim = dot( delta.div( max( len, .001 ) ), lampDirection ).toVar();

	If( aim.lessThanEqual( 0. ), () => {

		return 0.;

	} );

	const high = clamp( lampMode.sub( 1. ), 0., 1. ).toVar();
	const range = mix( 65., 125., high ).toVar();
	const radial = sqrt( max( 0., sub( 1., aim.mul( aim ) ) ) ).div( max( aim, .001 ) ).toVar();
	const cone = sub( 1., smoothstep( mix( .32, .20, high ), mix( .68, .40, high ), radial ) ).toVar();
	const spill = sub( 1., smoothstep( .55, .83, radial ) ).mul( .11 ).toVar();

	return cone.add( spill ).mul( sub( 1., smoothstep( range.mul( .72 ), range, len ) ) ).mul( mix( 3.3, 5.8, high ) ).div( add( 1., len.mul( len ).div( mix( 200., 580., high ) ) ) ).mul( min( lampMode, 1. ) );

}, { delta: 'vec3', return: 'float' } );

const rearBeam = /*@__PURE__*/ Fn( ( [ p ] ) => {

	If( reverseLight.lessThan( .001 ), () => {

		return 0.;

	} );

	const delta = p.sub( rearLamp ).toVar();
	const len = length( delta ).toVar();

	If( len.greaterThan( 13. ), () => {

		return 0.;

	} );

	const aim = dot( delta.div( max( len, .001 ) ), rearDirection ).toVar();

	return smoothstep( .30, .83, aim ).mul( sub( 1., smoothstep( 8., 13., len ) ) ).mul( reverseLight ).mul( 2.4 ).div( add( 1., len.mul( len ).mul( .28 ) ) );

}, { p: 'vec3', return: 'float' } );

const boxHit = /*@__PURE__*/ Fn( ( [ o, inv, center, size ] ) => {

	const a = center.sub( size ).sub( o ).mul( inv ).toVar();
	const b = center.add( size ).sub( o ).mul( inv ).toVar();
	const lo = min( a, b ).toVar();
	const hi = max( a, b ).toVar();

	return step( max( max( max( lo.x, lo.y ), lo.z ), .002 ), min( min( hi.x, hi.y ), hi.z ) );

}, { o: 'vec3', inv: 'vec3', center: 'vec3', size: 'vec3', return: 'float' } );

const wheelHit = /*@__PURE__*/ Fn( ( [ o, d, center ] ) => {

	const radii = vec3( wheelShape.w, wheelShape.z, wheelShape.z ).toVar();
	const q = o.sub( center ).div( radii ).toVar();
	const v = d.div( radii ).toVar();
	const a = dot( v, v ).toVar();
	const b = dot( q, v ).toVar();
	const c = dot( q, q ).sub( 1. ).toVar();
	const h = b.mul( b ).sub( a.mul( c ) ).toVar();

	return select( h.greaterThanEqual( 0. ).and( b.negate().add( sqrt( max( 0., h ) ) ).div( a ).greaterThan( .002 ) ), 1., 0. );

}, { o: 'vec3', d: 'vec3', center: 'vec3', return: 'float' } );

const vehicleOcclusion = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( vehicleSize.x.lessThan( .01 ).or( light.y.lessThanEqual( 0. ) ), () => {

		return 1.;

	} );

	const relative = vehicleCenter.sub( p ).toVar();
	const along = max( 0., dot( relative, light ) ).toVar();

	If( dot( relative.sub( light.mul( along ) ), relative.sub( light.mul( along ) ) ).greaterThan( 9. ), () => {

		return 1.;

	} );

	const o = vehicleInverse.mul( vec4( p, 1. ) ).xyz.toVar();
	const d = mat3( vehicleInverse ).mul( light ).toVar();
	const inv = sign( d.add( vec3( .000001 ) ) ).div( max( abs( d ), vec3( .000001 ) ) ).toVar();
	const hit = boxHit( o, inv, vec3( 0., .20, 0. ), vec3( vehicleSize.x, .19, vehicleSize.z ) ).toVar();
	hit.assign( max( hit, boxHit( o, inv, vec3( 0., .73, .20 ), vec3( vehicleSize.x.mul( .82 ), .41, .38 ) ) ) );

	If( shadowDetail.lessThan( .5 ), () => {

		return mix( 1., .06, hit );

	} );

	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.x, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x.negate(), wheelOffsets.y, wheelShape.y ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.z, wheelShape.y.negate() ) ) ) );
	hit.assign( max( hit, wheelHit( o, d, vec3( wheelShape.x, wheelOffsets.w, wheelShape.y ) ) ) );

	return mix( 1., .06, hit );

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const baseNode = /*@__PURE__*/ Fn( ( [ index, component ] ) => {

	const pixel = index.mul( 6. ).add( component ).toVar();

	return baseTree.sample( vec2( mod( pixel, baseTreeSize.x ), floor( pixel.div( baseTreeSize.x ) ) ).add( .5 ).div( baseTreeSize ) );

}, { index: 'float', component: 'float', return: 'vec4' } );

const baseSlab = /*@__PURE__*/ Fn( ( [ p, inverseDir, lo, hi, limit ] ) => {

	const a = lo.sub( p ).mul( inverseDir ).toVar();
	const b = hi.sub( p ).mul( inverseDir ).toVar();
	const n = min( a, b ).toVar();
	const f = max( a, b ).toVar();
	const enter = max( max( n.x, n.y ), n.z ).toVar();
	const leave = min( min( f.x, f.y ), f.z ).toVar();

	return leave.greaterThan( max( enter, .004 ) ).and( enter.lessThan( limit ) );

}, { p: 'vec3', inverseDir: 'vec3', lo: 'vec3', hi: 'vec3', limit: 'float', return: 'bool' } );

const baseInverse = /*@__PURE__*/ Fn( ( [ d ] ) => {

	return div( 1., mix( vec3( - 1. ), vec3( 1. ), step( vec3( 0. ), d ) ).mul( max( abs( d ), vec3( .000001 ) ) ) );

}, { d: 'vec3', return: 'vec3' } );

const dishRoot = /*@__PURE__*/ Fn( ( [ p, d, t, radius, limit ] ) => {

	const q = p.xy.add( d.xy.mul( t ) ).toVar();

	return t.greaterThan( .004 ).and( t.lessThan( limit ) ).and( dot( q, q ).lessThanEqual( radius.mul( radius ) ) );

}, { p: 'vec3', d: 'vec3', t: 'float', radius: 'float', limit: 'float', return: 'bool' } );

const dishSurface = /*@__PURE__*/ Fn( ( [ p, d, radius, curve, depth, limit ] ) => {

	const a = curve.mul( dot( d.xy, d.xy ) ).toVar();
	const b = d.z.add( mul( 2., curve ).mul( dot( p.xy, d.xy ) ) ).toVar();
	const c = p.z.add( curve.mul( dot( p.xy, p.xy ) ) ).sub( depth ).toVar();
	const hit = bool( false ).toVar();

	If( abs( a ).lessThan( .0000001 ), () => {

		If( abs( b ).greaterThanEqual( .0000001 ), () => {

			hit.assign( dishRoot( p, d, c.negate().div( b ), radius, limit ) );

		} );

	} ).Else( () => {

		const h = b.mul( b ).sub( mul( 4., a ).mul( c ) ).toVar();

		If( h.greaterThanEqual( 0. ), () => {

			const root = sqrt( h ).toVar();
			hit.assign( dishRoot( p, d, b.negate().sub( root ).div( mul( 2., a ) ), radius, limit ).or( dishRoot( p, d, b.negate().add( root ).div( mul( 2., a ) ), radius, limit ) ) );

		} );

	} );

	return hit;

}, { p: 'vec3', d: 'vec3', radius: 'float', curve: 'float', depth: 'float', limit: 'float', return: 'bool' } );

const dishHit = /*@__PURE__*/ Fn( ( [ p, d, shape, limit ] ) => {

	return dishSurface( p, d, shape.x, shape.y, 0., limit ).or( dishSurface( p, d, shape.x, shape.y, shape.z, limit ) );

}, { p: 'vec3', d: 'vec3', shape: 'vec3', limit: 'float', return: 'bool' } );

const baseVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit ] ) => {

	If( baseNodeCount.equal( 0 ).or( limit.lessThanEqual( .008 ) ), () => {

		return 1.;

	} );

	const inv = baseInverse( dir ).toVar();
	const index = float( 0. ).toVar();

	Loop( { start: 0, end: 1024, name: 'visit' }, () => {

		If( index.greaterThanEqual( float( baseNodeCount ) ), () => {

			return 1.;

		} );

		const lo = baseNode( index, 0. ).toVar();
		const hi = baseNode( index, 1. ).toVar();

		If( baseSlab( p, inv, lo.xyz, hi.xyz, limit ).not(), () => {

			index.assign( lo.w );
			Continue();

		} );

		If( hi.w.lessThan( .5 ), () => {

			index.addAssign( 1. );
			Continue();

		} );

		If( hi.w.lessThan( 1.5 ), () => {

			return 0.;

		} );

		const center = baseNode( index, 2. ).toVar();
		const x = baseNode( index, 3. ).toVar();
		const y = baseNode( index, 4. ).toVar();
		const z = baseNode( index, 5. ).xyz.toVar();
		const delta = p.sub( center.xyz ).toVar();
		const localP = vec3( dot( delta, x.xyz ), dot( delta, y.xyz ), dot( delta, z ) ).toVar();
		const localD = vec3( dot( dir, x.xyz ), dot( dir, y.xyz ), dot( dir, z ) ).toVar();
		const halfSize = vec3( center.w, x.w, y.w ).toVar();
		const blocked = bool( false ).toVar();

		If( hi.w.greaterThan( 2.5 ), () => {

			blocked.assign( dishHit( localP, localD, halfSize, limit ) );

		} ).Else( () => {

			blocked.assign( baseSlab( localP, baseInverse( localD ), halfSize.negate(), halfSize, limit ) );

		} );

		If( blocked, () => {

			return 0.;

		} );

		index.assign( lo.w );

	} );

	return 0.;

}, { p: 'vec3', dir: 'vec3', limit: 'float', return: 'float' } );

const unpackBaseDepth = /*@__PURE__*/ Fn( ( [ uv ] ) => {

	return dot( baseShadowAtlas.sample( uv.flipY() ).rgb, vec3( 1., 1. / 255., 1. / 65025. ) );

}, { uv: 'vec2', return: 'float' } );

const shadowAtSlot = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( baseShadowReady.lessThan( .5 ).or( baseShadowValid.element( slot ).lessThan( .5 ) ), () => {

		return float( - 1. );

	} );

	const q = baseShadowMatrices.element( slot ).mul( vec4( p, 1. ) ).toVar();
	const uv = q.xy.div( max( q.w, .00001 ) ).mul( .5 ).add( .5 ).toVar();

	If( q.w.lessThanEqual( 0. ).or( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).lessThan( .012 ) ), () => {

		return float( - 1. );

	} );

	const origin = baseShadowOrigins.element( slot ).toVar();
	const delta = p.sub( origin.xyz ).toVar();
	const depth = length( delta ).div( origin.w ).toVar();

	If( slot.lessThan( 4 ), () => {

		depth.assign( dot( delta, baseShadowDirections.element( slot ) ).div( origin.w ) );

	} );

	If( depth.lessThan( 0. ).or( depth.greaterThanEqual( 1. ) ), () => {

		return float( - 1. );

	} );

	const rect = baseShadowRects.element( slot ).toVar();
	const pixel = rect.xy.add( uv.mul( rect.zw ) ).mul( 2048. ).sub( .5 ).toVar();
	const corner = floor( pixel ).add( .5 ).div( 2048. ).toVar();
	const compare = depth.sub( div( .002, origin.w ) ).toVar();
	const a = step( compare, unpackBaseDepth( corner ) ).toVar();
	const b = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048., 0. ) ) ) ).toVar();
	const c = step( compare, unpackBaseDepth( corner.add( vec2( 0., 1. / 2048. ) ) ) ).toVar();
	const d = step( compare, unpackBaseDepth( corner.add( vec2( 1. / 2048. ) ) ) ).toVar();

	If( min( min( a, b ), min( c, d ) ).notEqual( max( max( a, b ), max( c, d ) ) ), () => {

		return baseVisibility( p, dir, limit );

	} );

	return a;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const baseDirectionalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, channel ] ) => {

	const slot = int( channel ).mul( 2 ).toVar();
	const visibility = shadowAtSlot( p, dir, 2000., slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( shadowAtSlot( p, dir, 2000., slot.add( 1 ) ) );

	} );

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, 2000. ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', channel: 'float', return: 'float' } );

const baseCubeFace = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const a = abs( p ).toVar();
	const face = int( 0 ).toVar();

	If( a.x.greaterThanEqual( a.y ).and( a.x.greaterThanEqual( a.z ) ), () => {

		face.assign( select( p.x.greaterThanEqual( 0. ), 0, 1 ) );

	} ).ElseIf( a.y.greaterThanEqual( a.z ), () => {

		face.assign( select( p.y.greaterThanEqual( 0. ), 2, 3 ) );

	} ).Else( () => {

		face.assign( select( p.z.greaterThanEqual( 0. ), 4, 5 ) );

	} );

	return face;

}, { p: 'vec3', return: 'int' } );

const baseLocalVisibility = /*@__PURE__*/ Fn( ( [ p, dir, limit, slot ] ) => {

	If( slot.lessThan( 0 ), () => {

		return baseVisibility( p, dir, limit );

	} );

	const visibility = shadowAtSlot( p, dir, limit, slot ).toVar();

	If( visibility.lessThan( 0. ), () => {

		visibility.assign( baseVisibility( p, dir, limit ) );

	} );

	return visibility;

}, { p: 'vec3', dir: 'vec3', limit: 'float', slot: 'int', return: 'float' } );

const basePointVisibility = /*@__PURE__*/ Fn( ( [ p, normal, emitter, slot ] ) => {

	const delta = emitter.sub( p ).toVar();
	const len = length( delta ).toVar();

	return baseLocalVisibility( p.add( normal.mul( .012 ) ), delta.div( max( len, .001 ) ), len.sub( .055 ), slot );

}, { p: 'vec3', normal: 'vec3', emitter: 'vec3', slot: 'int', return: 'float' } );

const readBaseLight = /*@__PURE__*/ Fn( ( [ index ] ) => {

	return baseLightData.sample( vec2( mod( index, baseLightDataSize.x ), floor( index.div( baseLightDataSize.x ) ) ).add( .5 ).div( baseLightDataSize ) );

}, { index: 'float', return: 'vec4' } );

const oneBaseLight = /*@__PURE__*/ Fn( ( [ p, n, emitter, color, cacheSlot ] ) => {

	const d = emitter.sub( p ).toVar();
	const squared = dot( d, d ).toVar();

	If( squared.greaterThanEqual( 144. ), () => {

		return vec3( 0. );

	} );

	const len = sqrt( squared ).toVar();
	const fall = sub( 1., len.div( 12. ) ).toVar();
	const direction = d.div( max( len, .001 ) ).toVar();
	const slot = select( cacheSlot.lessThan( 0 ), int( - 1 ), add( 4, cacheSlot.mul( 6 ) ).add( baseCubeFace( d.negate() ) ) ).toVar();

	return color.rgb.mul( color.a ).mul( fall ).mul( fall ).mul( add( .18, mul( .82, max( dot( n, direction ), 0. ) ) ) ).mul( baseLocalVisibility( p.add( n.mul( .012 ) ), direction, len.sub( .10 ), slot ) );

}, { p: 'vec3', n: 'vec3', emitter: 'vec3', color: 'vec4', cacheSlot: 'int', return: 'vec3' } );

const baseLighting = /*@__PURE__*/ Fn( ( [ p, n ] ) => {

	const light = vec3( 0. ).toVar();

	If( baseLightCount.equal( 0 ), () => {

		return light;

	} );

	If( baseLightCount.lessThanEqual( 4 ), () => {

		Loop( 4, ( { i } ) => {

			If( i.greaterThanEqual( baseLightCount ), () => {

				Break();

			} );

			light.addAssign( oneBaseLight( p, n, baseLights.element( i ).xyz, baseColors.element( i ), i ) );

		} );

		return light;

	} );

	const cell = floor( p.xz.add( 640. ).div( 8. ) ).toVar();

	If( min( cell.x, cell.y ).lessThan( 0. ).or( max( cell.x, cell.y ).greaterThanEqual( 160. ) ), () => {

		return light;

	} );

	const list = baseLightGrid.sample( cell.add( .5 ).div( 160. ) ).rg.toVar();
	const count = int( list.y ).toVar();

	Loop( { start: 0, end: count, name: 'j' }, ( { j } ) => {

		const index = readBaseLight( list.x.add( float( j ) ) ).x.toVar();
		const emitter = readBaseLight( index.mul( 2. ) ).toVar();
		const delta = emitter.xyz.sub( p ).toVar();

		If( dot( delta, delta ).greaterThanEqual( 144. ), () => {

			Continue();

		} );

		light.addAssign( oneBaseLight( p, n, emitter.xyz, readBaseLight( index.mul( 2. ).add( 1. ) ), int( emitter.w ) ) );

	} );

	return light;

}, { p: 'vec3', n: 'vec3', return: 'vec3' } );

const cornerHeight = /*@__PURE__*/ Fn( ( [ grid ] ) => {

	const c = heightMap.sample( grid.add( .5 ).div( 1025. ) ).rg.toVar();

	return dot( c, vec2( 65280., 255. ) ).div( 65535. ).mul( 256. ).sub( 128. );

}, { grid: 'vec2', return: 'float' } );

const triangleHeight = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const g = p.add( 2048. ).div( 4. ).toVar();
	const i = floor( g ).toVar();
	const f = fract( g ).toVar();
	const b = cornerHeight( i.add( vec2( 1., 0. ) ) ).toVar();
	const c = cornerHeight( i.add( vec2( 0., 1. ) ) ).toVar();

	If( f.x.add( f.y ).lessThanEqual( 1. ), () => {

		const a = cornerHeight( i ).toVar();

		return a.add( b.sub( a ).mul( f.x ) ).add( c.sub( a ).mul( f.y ) );

	} );

	const d = cornerHeight( i.add( vec2( 1. ) ) ).toVar();

	return d.add( c.sub( d ).mul( sub( 1., f.x ) ) ).add( b.sub( d ).mul( sub( 1., f.y ) ) );

}, { p: 'vec2', return: 'float' } );

const terrainShadow = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( light.y.lessThan( - .02 ), () => {

		return 0.;

	} );

	const visible = float( 1. ).toVar();
	const dist = float( 2. ).toVar();

	Loop( 21, ( { i } ) => {

		If( terrainShadowDetail.lessThan( .5 ).and( i.greaterThanEqual( 12 ) ), () => {

			Break();

		} );

		const q = p.add( light.mul( dist ) ).toVar();

		If( max( abs( q.x ), abs( q.z ) ).greaterThan( 2046. ), () => {

			Break();

		} );

		const gap = q.y.sub( triangleHeight( q.xz ) ).toVar();
		visible.assign( min( visible, smoothstep( - .28, add( .32, dist.mul( .003 ) ), gap ) ) );

		If( visible.lessThan( .015 ), () => {

			Break();

		} );

		dist.assign( dist.mul( mix( 1.82, 1.37, terrainShadowDetail ) ).add( 1.8 ) );

	} );

	return visible;

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const cachedTerrainShadow = /*@__PURE__*/ Fn( ( [ p, light, channel ] ) => {

	const uv = p.xz.sub( lightCacheOrigin ).div( 256. ).toVar();

	If( lightCacheReady.greaterThan( .5 ).and( min( min( uv.x, uv.y ), min( sub( 1., uv.x ), sub( 1., uv.y ) ) ).greaterThan( .015 ) ), () => {

		const s = terrainLightCache.sample( uv.flipY() ).rg.toVar();

		return mix( s.r, s.g, channel );

	} );

	return terrainShadow( p, light );

}, { p: 'vec3', light: 'vec3', channel: 'float', return: 'float' } );

const torchShadow = /*@__PURE__*/ Fn( ( [ p, l, len ] ) => {

	const v = float( 1. ).toVar();
	const steps = mix( 7., 13., terrainShadowDetail ).toVar();

	Loop( { start: 1, end: 13 }, ( { i } ) => {

		If( float( i ).greaterThanEqual( steps ), () => {

			Break();

		} );

		const f = float( i ).div( steps ).toVar();
		const q = p.add( l.mul( len ).mul( f ) ).toVar();
		v.assign( min( v, smoothstep( - .08, .12, q.y.sub( triangleHeight( q.xz ) ) ) ) );

		If( v.lessThan( .001 ), () => {

			Break();

		} );

	} );

	return v;

}, { p: 'vec3', l: 'vec3', len: 'float', return: 'float' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ vWorld, vNormal, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const p = vWorld.toVar();
	const n = normalize( vNormal ).toVar();
	const distanceToEye = distance( p, eye ).toVar();
	const grains = grain.sample( p.xz.mul( .19 ) ).r.toVar();
	const mottling = grain.sample( p.xz.mul( .0071 ).add( vec2( .34, .57 ) ) ).r.toVar();
	const dx = dFdx( p ).toVar();
	const dy = dFdy( p ).toVar();
	const dhx = dFdx( grains ).toVar();
	const dhy = dFdy( grains ).toVar();
	const r1 = cross( dy, n ).toVar();
	const r2 = cross( n, dx ).toVar();
	const det = dot( dx, r1 ).toVar();
	const bump = sign( det ).mul( dhx.mul( r1 ).add( dhy.mul( r2 ) ) ).div( max( abs( det ), .00001 ) ).toVar();
	n.assign( normalize( n.sub( bump.mul( .037 ).mul( sub( 1., smoothstep( mul( 25., quality ), mul( 110., quality ), distanceToEye ) ) ) ) ) );
	const safePoint = p.add( normalize( vNormal ).mul( .24 ) ).toVar();
	const solar = max( 0., dot( n, sun ) ).toVar();
	const earthLit = max( 0., dot( n, earth ) ).toVar();
	const s = float( 0. ).toVar();
	const e = float( 0. ).toVar();

	If( solar.greaterThan( .001 ).and( sun.y.greaterThan( - .01 ) ), () => {

		s.assign( solar.mul( cachedTerrainShadow( safePoint, sun, 0. ) ).mul( baseDirectionalVisibility( p.add( normalize( vNormal ).mul( .03 ) ), sun, 0. ) ).mul( vehicleOcclusion( p.add( normalize( vNormal ).mul( .004 ) ), sun ) ) );

	} );

	If( earthPower.greaterThan( .0001 ).and( earthLit.greaterThan( .001 ) ), () => {

		e.assign( earthLit.mul( cachedTerrainShadow( safePoint, earth, 1. ) ).mul( baseDirectionalVisibility( p.add( normalize( vNormal ).mul( .03 ) ), earth, 1. ) ).mul( earthPower ).mul( vehicleOcclusion( p.add( normalize( vNormal ).mul( .004 ) ), earth ) ) );

	} );

	const illumination = vec3( .000025 ).add( vec3( 1., .98, .93 ).mul( s ).mul( 1.38 ) ).add( vec3( .46, .63, 1. ).mul( e ) ).toVar();

	If( torch.greaterThan( .001 ), () => {

		const beam = flashlightBeam( p.sub( eye ), forward ).mul( torch ).toVar();

		If( beam.greaterThan( .001 ), () => {

			const delta = eye.sub( p ).toVar();
			const len = length( delta ).toVar();
			const toLamp = delta.div( max( len, .001 ) ).toVar();
			const occlusion = float( 1. ).toVar();
			illumination.addAssign( vec3( .92, .96, 1. ).mul( add( .12, mul( .88, max( dot( n, toLamp ), 0. ) ) ) ).mul( occlusion ).mul( beam ) );

		} );

	} );

	If( lampMode.greaterThan( .001 ), () => {

		const beamL = headlightBeam( p.sub( lampLeft ) ).toVar();
		const beamR = headlightBeam( p.sub( lampRight ) ).toVar();

		If( max( beamL, beamR ).greaterThan( .001 ), () => {

			const deltaL = lampLeft.sub( p ).toVar();
			const deltaR = lampRight.sub( p ).toVar();
			const lenL = length( deltaL ).toVar();
			const lenR = length( deltaR ).toVar();
			const l = deltaL.div( max( lenL, .001 ) ).toVar();
			const r = deltaR.div( max( lenR, .001 ) ).toVar();
			const shadowL = float( 1. ).toVar();
			const shadowR = float( 1. ).toVar();

			If( min( lenL, lenR ).greaterThan( 18. ), () => {

				const mid = lampLeft.add( lampRight ).mul( .5 ).sub( p ).toVar();
				const len = length( mid ).toVar();
				shadowL.assign( torchShadow( safePoint, mid.div( len ), len ) );
				shadowR.assign( shadowL );

			} ).Else( () => {

				If( beamL.greaterThan( .001 ), () => {

					shadowL.assign( torchShadow( safePoint, l, lenL ) );

				} );

				If( beamR.greaterThan( .001 ), () => {

					shadowR.assign( torchShadow( safePoint, r, lenR ) );

				} );

			} );

			illumination.addAssign( vec3( .92, .96, 1. ).mul( add( .12, mul( .88, max( dot( n, l ), 0. ) ) ).mul( beamL ).mul( shadowL ).mul( basePointVisibility( p, n, lampLeft, 29 ) ).add( add( .12, mul( .88, max( dot( n, r ), 0. ) ) ).mul( beamR ).mul( shadowR ).mul( basePointVisibility( p, n, lampRight, 30 ) ) ) ) );

		} );

	} );

	const red = rearBeam( p ).toVar();

	If( red.greaterThan( .001 ), () => {

		const d = rearLamp.sub( p ).toVar();
		const len = length( d ).toVar();
		const l = d.div( max( len, .001 ) ).toVar();
		illumination.addAssign( vec3( 1., .009, .002 ).mul( red ).mul( add( .15, mul( .85, max( dot( n, l ), 0. ) ) ) ).mul( torchShadow( safePoint, l, len ) ).mul( basePointVisibility( p, n, rearLamp, 31 ) ) );

	} );

	illumination.addAssign( baseLighting( p, n ) );
	const albedo = add( .28, mottling.sub( .5 ).mul( .16 ) ).add( grains.sub( .5 ).mul( .12 ) ).toVar();
	const linear = vec3( albedo.mul( .99 ), albedo, albedo.mul( 1.015 ) ).mul( illumination ).toVar();
	const color = pow( max( linear, vec3( 0. ) ), vec3( 1. / 2.2 ) ).toVar();
	const dither = fract( mul( 52.9829189, fract( dot( skyPixel.xy, vec2( .06711056, .00583715 ) ) ) ) ).sub( .5 ).toVar();
	skyColor.assign( vec4( color.add( dither.div( 510. ) ), 1. ) );

	return skyColor;

}, { vWorld: 'vec3', vNormal: 'vec3', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(vWorld,vNormal,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 18: moon terrain cache
export function material_294d16e0(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const origin=bind("origin","vec2",0);
const sun=bind("sun","vec3",0);
const earth=bind("earth","vec3",0);
const heightMap=bind("heightMap","sampler2D",0);
const terrainShadowDetail=bind("terrainShadowDetail","float",0);
const uvCache=varying(vec2(),"sky_uvCache");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	uvCache.assign( uv );
	skyPosition.assign( vec4( position.xy, 0., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
origin.toStack();
sun.toStack();
earth.toStack();
heightMap.sample( vec2(0) ).toStack();
terrainShadowDetail.toStack();
return (()=>{// Three.js Transpiler r186



const cornerHeight = /*@__PURE__*/ Fn( ( [ grid ] ) => {

	const c = heightMap.sample( grid.add( .5 ).div( 1025. ) ).rg.toVar();

	return dot( c, vec2( 65280., 255. ) ).div( 65535. ).mul( 256. ).sub( 128. );

}, { grid: 'vec2', return: 'float' } );

const triangleHeight = /*@__PURE__*/ Fn( ( [ p ] ) => {

	const g = p.add( 2048. ).div( 4. ).toVar();
	const i = floor( g ).toVar();
	const f = fract( g ).toVar();
	const b = cornerHeight( i.add( vec2( 1., 0. ) ) ).toVar();
	const c = cornerHeight( i.add( vec2( 0., 1. ) ) ).toVar();

	If( f.x.add( f.y ).lessThanEqual( 1. ), () => {

		const a = cornerHeight( i ).toVar();

		return a.add( b.sub( a ).mul( f.x ) ).add( c.sub( a ).mul( f.y ) );

	} );

	const d = cornerHeight( i.add( vec2( 1. ) ) ).toVar();

	return d.add( c.sub( d ).mul( sub( 1., f.x ) ) ).add( b.sub( d ).mul( sub( 1., f.y ) ) );

}, { p: 'vec2', return: 'float' } );

const terrainShadow = /*@__PURE__*/ Fn( ( [ p, light ] ) => {

	If( light.y.lessThan( - .02 ), () => {

		return 0.;

	} );

	const visible = float( 1. ).toVar();
	const dist = float( 2. ).toVar();

	Loop( 21, ( { i } ) => {

		If( terrainShadowDetail.lessThan( .5 ).and( i.greaterThanEqual( 12 ) ), () => {

			Break();

		} );

		const q = p.add( light.mul( dist ) ).toVar();

		If( max( abs( q.x ), abs( q.z ) ).greaterThan( 2046. ), () => {

			Break();

		} );

		const gap = q.y.sub( triangleHeight( q.xz ) ).toVar();
		visible.assign( min( visible, smoothstep( - .28, add( .32, dist.mul( .003 ) ), gap ) ) );

		If( visible.lessThan( .015 ), () => {

			Break();

		} );

		dist.assign( dist.mul( mix( 1.82, 1.37, terrainShadowDetail ) ).add( 1.8 ) );

	} );

	return visible;

}, { p: 'vec3', light: 'vec3', return: 'float' } );

const skyFragment = /*@__PURE__*/ Fn( ( [ uvCache, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	const xz = origin.add( uvCache.mul( 256. ) ).toVar();
	const n = normalize( vec3( triangleHeight( xz.sub( vec2( 2., 0. ) ) ).sub( triangleHeight( xz.add( vec2( 2., 0. ) ) ) ), 4., triangleHeight( xz.sub( vec2( 0., 2. ) ) ).sub( triangleHeight( xz.add( vec2( 0., 2. ) ) ) ) ) ).toVar();
	const p = vec3( xz.x, triangleHeight( xz ), xz.y ).add( n.mul( .24 ) ).toVar();
	skyColor.assign( vec4( terrainShadow( p, sun ), terrainShadow( p, earth ), 0., 1. ) );

	return skyColor;

}, { uvCache: 'vec2', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(uvCache,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 19: landscape sky coverage
export function material_b117a713(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const landscapeColor=bind("landscapeColor","sampler2D",0);
const screenUV=varying(vec2(),"sky_screenUV");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	screenUV.assign( position.xy.mul( .5 ).add( .5 ) );
	skyPosition.assign( vec4( position.xy, 0., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
landscapeColor.sample( vec2(0) ).toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ screenUV, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();

	If( landscapeColor.sample( screenUV.flipY() ).a.lessThan( .99999 ), () => {

		Discard();

	} );

	skyColor.assign( vec4( 0. ) );

	return skyColor;

}, { screenUV: 'vec2', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(screenUV,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
// 20: landscape composite
export function material_3114f17b(bind){
const position=attribute('position','vec3'),normal=attribute('normal','vec3'),uv=attribute('uv','vec2');
const projectionMatrix=cameraProjectionMatrix,viewMatrix=cameraViewMatrix,modelMatrix=modelWorldMatrix,modelViewMatrix=modelViewMatrixNode;
const skyViewport=viewportSize,quadCorner=attribute('quadCorner','vec2'),skyPointUV=vec2(0),skyPixel=vec3(screenCoordinate.x,viewportSize.y.sub(screenCoordinate.y),0);
const landscapeColor=bind("landscapeColor","sampler2D",0);
const screenUV=varying(vec2(),"sky_screenUV");
const vertex=Fn(()=>{

return (()=>{// Three.js Transpiler r186



const skyVertex = /*@__PURE__*/ Fn( () => {

	const skyPosition = vec4( 0. ).toVar();
	const skyPointSize = float( 1. ).toVar();
	screenUV.assign( position.xy.mul( .5 ).add( .5 ) );
	skyPosition.assign( vec4( position.xy, 0., 1. ) );

	return skyPosition;

} );

return skyVertex();})();
})();
const fragment=Fn(()=>{
landscapeColor.sample( vec2(0) ).toStack();
return (()=>{// Three.js Transpiler r186



const skyFragment = /*@__PURE__*/ Fn( ( [ screenUV, skyPixel, skyPointUV ] ) => {

	const skyColor = vec4( 0. ).toVar();
	skyColor.assign( landscapeColor.sample( screenUV.flipY() ) );

	return skyColor;

}, { screenUV: 'vec2', skyPixel: 'vec3', skyPointUV: 'vec2', return: 'vec4' } );

return skyFragment(screenUV,skyPixel,skyPointUV);})();
})();
return {vertex,fragment};
}
export const materials={'52462404':material_52462404,'cf34c1a':material_cf34c1a,'f6d6f2f5':material_f6d6f2f5,'5f7f167':material_5f7f167,'54d1c0f':material_54d1c0f,'a2199d51':material_a2199d51,'fa8a7b69':material_fa8a7b69,'fb142299':material_fb142299,'9cc412d2':material_9cc412d2,'82498b0f':material_82498b0f,'c56b0306':material_c56b0306,'fa8df9b1':material_fa8df9b1,'33aeca19':material_33aeca19,'2071ba81':material_2071ba81,'3b1f22dc':material_3b1f22dc,'c958ec57':material_c958ec57,'f4599137':material_f4599137,'c44d9ce3':material_c44d9ce3,'294d16e0':material_294d16e0,'b117a713':material_b117a713,'3114f17b':material_3114f17b};
