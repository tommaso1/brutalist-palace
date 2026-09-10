import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function createTower(host, onPause) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduceMotion.matches;
  onPause(paused);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x09090d, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x09090d, .015);
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  const cameraHome = new THREE.Vector3(17, 9.2, 25);
  camera.position.copy(cameraHome);
  const target = new THREE.Vector3(0, 6.25, 0);
  camera.lookAt(target);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), .55, .45, .9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const building = new THREE.Group();
  building.rotation.y = -.26;
  scene.add(building);
  const textures = [];
  const loader = new THREE.TextureLoader();
  const texture = (file, color = false) => {
    const map = loader.load('/textures/concrete/' + file, () => schedule());
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    if (color) map.colorSpace = THREE.SRGBColorSpace;
    textures.push(map);
    return map;
  };
  const colorMap = texture('color.jpg', true);
  const normalMap = texture('normal.jpg');
  const armMap = texture('arm.jpg');
  // Photographed concrete with physical UV scale, normal detail and packed AO/roughness.
  const concrete = new THREE.MeshStandardMaterial({
    color: 0xcecdcf, map: colorMap, normalMap, normalScale: new THREE.Vector2(.8, .8),
    roughnessMap: armMap, roughness: 1, aoMap: armMap, aoMapIntensity: 1.25, metalness: 0,
  });
  concrete.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vConcrete;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvConcrete = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vConcrete;').replace('#include <alphatest_fragment>', `#include <alphatest_fragment>
      // End the poured structure at a floor joint; the remaining floors are linework.
      if (vConcrete.y > 5.72) discard;
    `);
  };
  const darkConcrete = new THREE.MeshStandardMaterial({ color: 0x25232a, map: colorMap, normalMap, roughness: 1 });
  const lineMaterial = new THREE.LineBasicMaterial({ color: new THREE.Color(.42, .22, .9), transparent: true, opacity: .54, toneMapped: false });
  lineMaterial.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying float vHeight;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvHeight = (modelMatrix * vec4(transformed, 1.0)).y;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vHeight;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= mix(0.10, 1.0, smoothstep(2.5, 7.0, vHeight));');
  };
  const neonMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.65, .68, 3.6), toneMapped: false });
  const coolNeon = new THREE.MeshBasicMaterial({ color: new THREE.Color(.55, 1.65, 1.9), toneMapped: false });
  const sharedBox = new THREE.BoxGeometry(1, 1, 1);
  const sharedEdges = new THREE.EdgesGeometry(sharedBox);
  const box = (w,h,d,x,y,z,material=concrete,outline=true) => {
    const textured = material === concrete || material === darkConcrete;
    const geometry = textured ? new THREE.BoxGeometry(w, h, d) : sharedBox;
    if (textured) {
      const uv = geometry.attributes.uv;
      // Keep the photographed pores and casting seams the same size on every face.
      const faces = [[d,h], [d,h], [w,d], [w,d], [w,h], [w,h]];
      for (let i=0;i<uv.count;i++) {
        const [u,v] = faces[Math.floor(i/4)];
        uv.setXY(i, uv.getX(i)*u/3.2, uv.getY(i)*v/3.2);
      }
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    if (!textured) mesh.scale.set(w,h,d);
    mesh.castShadow = textured && y + h/2 < 4.5;
    mesh.receiveShadow = textured;
    building.add(mesh);
    if (outline) { const edges = new THREE.LineSegments(sharedEdges, lineMaterial); edges.position.copy(mesh.position); edges.scale.set(w,h,d); building.add(edges); }
    return mesh;
  };
  const neon = (w,h,d,x,y,z,material=neonMaterial) => box(w,h,d,x,y,z,material,false);

  // A sculptural tower: exposed service core, pilotis, deep slabs and asymmetric cantilevers.
  box(5.2,.48,3.9,0,-.12,0);
  box(4.2,.42,3.2,0,.33,0);
  [-1.35,1.35].forEach(x => [-.9,.9].forEach(z => box(.29,1.7,.29,x,1.14,z)));
  box(1.05,12.3,1.15,-1.53,6.3,-.43);
  box(.3,12.7,1.5,-2.03,6.5,-.43);
  box(1.1,.4,1.85,-1.67,12.73,-.4);
  box(2.4,2.35,1.85,.34,2.62,-.1,darkConcrete,false);
  for(let i=0;i<13;i++) {
    const y=1.92+i*.76;
    const extended=i>=3&&i<7 ? .42 : i>9 ? -.24 : 0;
    const w=3.4+extended;
    const offset=i>=7&&i<10 ? .2 : 0;
    box(w,.19,2.65,.25+offset,y,0);
    box(w,.18,2.65,.25+offset,y+.52,0);
    box(.15,.35,2.65,w/2+.18+offset,y+.33,0);
    box(.15,.35,2.65,-w/2+.32+offset,y+.33,0);
    for(let j=0;j<4;j++) box(.085,.4,.075,-.82+j*.7+offset,y+.29,1.28);
    box(2.8,.33,.1,.3+offset,y+.27,-1.24);
    if(i%3===0 || i===12) neon(w,.024,.024,.25+offset,y+.625,1.338);
    if(i===3||i===6||i===10) neon(.025,.027,2.65,w/2+.25+offset,y+.625,0);
  }
  box(3.5,.26,2.85,.17,12.04,0);
  box(1.65,.63,1.7,-.34,12.48,-.3);
  box(.6,1.05,.6,-.65,13.15,-.28);
  neon(.023,8.4,.023,-2.187,8.4,.325);
  neon(.022,8.4,.024,-1.873,8.4,.333);
  neon(.025,6.3,.025,1.954,8.28,1.327);
  neon(3.5,.029,.028,.17,12.185,1.436);
  neon(.025,.027,2.85,1.924,12.185,0);
  neon(.03,1.02,.03,-.334,13.15,.035,coolNeon);
  neon(1.4,.021,.021,-.6,1.84,1.35,coolNeon);

  scene.add(new THREE.HemisphereLight(0xd1d3e0, 0x242029, 1.15));
  const key = new THREE.DirectionalLight(0xfff0dc, 3.5); key.position.set(5,8,6);
  key.castShadow = true; key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera, { left:-7, right:7, top:8, bottom:-7, near:.1, far:30 });
  key.shadow.normalBias = .035; scene.add(key);
  const fill = new THREE.DirectionalLight(0x90a4bd, 1.8); fill.position.set(-6,5,-5); scene.add(fill);
  const purple = new THREE.PointLight(0x9c52ff, 14, 15, 2); purple.position.set(2,7,3); scene.add(purple);

  const grid = new THREE.GridHelper(46, 46, 0x574465, 0x302839);
  grid.position.y=-.38; grid.material.transparent=true;grid.material.opacity=.13;scene.add(grid);

  // Staggered layers wrap the tower in drifting mist, with most density behind the concrete.
  const fogUniforms = { time:{value:0} };
  const fogMaterial = new THREE.ShaderMaterial({
    uniforms:fogUniforms, transparent:true,depthWrite:false,side:THREE.DoubleSide,
    vertexShader:'varying vec2 vUv; varying float vLayer; void main(){vUv=uv;vLayer=modelMatrix[3].x+modelMatrix[3].y*2.17;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:`varying vec2 vUv; varying float vLayer; uniform float time;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 p=vUv*vec2(5.,3.)+vec2(vLayer*.71,vLayer*.23);
        p.x+=time*.09;
        p+=vec2(noise(p*.7+time*.025),noise(p*.8-time*.018))*.65;
        float n=noise(p)*.55+noise(p*2.1-time*.035)*.3+noise(p*4.1)*.15;
        float edge=pow(max(0.,1.-length((vUv-.5)*2.)),1.35);
        float a=smoothstep(.22,.72,n)*edge*.38;
        gl_FragColor=vec4(.34,.28,.43,a);
      }`
  });
  const fogGeometry = new THREE.PlaneGeometry(23,7);
  const fogLayers = [[-2,.65,-4], [2,2.1,-1], [-3,3.6,1], [2,1.15,4], [3,5,-4], [-2,6.2,-2]];
  for(const position of fogLayers){const mist=new THREE.Mesh(fogGeometry,fogMaterial);mist.position.set(...position);mist.rotation.y=Math.atan2(cameraHome.x,cameraHome.z);scene.add(mist);}

  let frame=0, elapsed=0,previous=0,lastRender=0,visible=true, destroyed=false;
  let pointerX=0,pointerY=0;
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);composer.setSize(w,h);camera.aspect=w/h;camera.fov=w/h<.9?40:34;camera.updateProjectionMatrix();composer.render();}
  const observer = new ResizeObserver(resize);observer.observe(host);resize();
  function schedule(){if(!destroyed&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function tick(now){frame=0;if(!paused&&now-lastRender<32){schedule();return;}lastRender=now;const dt=Math.min((now-previous)/1000||0,.05);previous=now;
    if(!paused){elapsed+=dt;building.rotation.y+=dt*.065;fogUniforms.time.value=elapsed;
      camera.position.x+=(cameraHome.x+pointerX*.65-camera.position.x)*.025;camera.position.y+=(cameraHome.y+pointerY*.3-camera.position.y)*.025;camera.lookAt(target);}
    composer.render();if(!paused)schedule();
  }
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){previous=performance.now();schedule();}else{cancelAnimationFrame(frame);frame=0;}});intersection.observe(host);
  const pointer=(e)=>{pointerX=e.clientX/window.innerWidth-.5;pointerY=e.clientY/window.innerHeight-.5;};
  const visibility=()=>{if(!document.hidden){previous=performance.now();schedule();}else{cancelAnimationFrame(frame);frame=0;}};
  const preference=()=>{paused=reduceMotion.matches;onPause(paused);schedule();};
  window.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('visibilitychange',visibility);reduceMotion.addEventListener('change',preference);
  schedule();
  return {
    toggle(){paused=!paused;onPause(paused);previous=performance.now();schedule();},
    dispose(){destroyed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',visibility);reduceMotion.removeEventListener('change',preference);
      const geometries=new Set(),materials=new Set();scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material)materials.add(object.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());key.shadow.dispose();composer.passes.forEach(p=>p.dispose?.());composer.dispose();renderer.dispose();renderer.domElement.remove();}
  };
}
