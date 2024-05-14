//LITERALLY ALL OF THIS IS THREE.JS I HATE THREE.JS I HATE IT I HATE IT I HATE IT I HATE IT
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';

// draco loader
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dracoLoader);

// div #stars to put 3d models inside
const container = document.querySelector('#stars');
//container.classList.add('threejs'); //put the js inside the div

// make scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color('rgb(34, 8, 82)'); //changes background color

// makes renderer
const renderer = new THREE.WebGLRenderer({
  stars,
  antialias: true,
  powerPreference: 'high-performance',
  alpha: true,
}); // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio

renderer.setSize(window.innerWidth*.5, window.innerHeight); // set size of render
renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
renderer.toneMapping = THREE.LinearToneMapping; // set the toneMapping

container.appendChild( renderer.domElement); // append the renderer to container div element

// make camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth*.5 / window.innerHeight, 1, 100);
scene.add(camera);
camera.position.set(0, 3, 9);

// on the first day, god said... sets light.
const light = new THREE.PointLight(0xffff00, 1, 100);
light.position.set(-3, 0, 8);
scene.add(light);

// orbit controls - enables dragging to rotate.
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.2, 0);
controls.autoRotate = true;
controls.enableDamping = true;

// load my gltf file - the file with the 3D render
const star2 = 'star2'
loader.load(`public/${star2}.gltf`, function (gltf) {
  scene.add(gltf.scene);
});

// renders
function rendeLoop() {
  controls.update(); // update orbit controls
  renderer.render(scene, camera); //render the scene without the composer
  requestAnimationFrame(rendeLoop); //loop the render function
}

rendeLoop(); //start rendering

//make it full screen & update when screen size is changed
window.addEventListener('resize', () => {
  const width = window.innerWidth*.5;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//ANIME.JS 

