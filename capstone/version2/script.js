import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const canvas = document.querySelector('#canvas');
canvas.classList.add('threejs');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
scene.add(camera);
camera.position.set(0, 3, 9);

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// on the first day, god said... sets light.
const light = new THREE.PointLight(0xffff00, 2, 100);
light.position.set(-3, 0, 8);
scene.add(light);

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dracoLoader);

let model; // Declare model here to make it accessible globally

loader.load('assets/TodayUSA2.glb', function(gltf) {
  model = gltf.scene; // Correctly assign the loaded model to the global model variable
  model.scale.set(.45,.45,.45); // Resize the model to half its original size
  model.position.y += 2; // Move the model up to be fully visible
  scene.add(model); // Add the loaded model to the scene
});

camera.position.z = 5;

// Renders
function rendeLoop() {
  renderer.render(scene, camera); // Render the scene without the composer

  const currentTimeLine = window.pageYOffset/3000;
  const rx = currentTimeLine * -.2 + .3;
  const ry = (currentTimeLine * .95) * Math.PI * 2;

  if (model) { // Check if model is loaded
    model.rotation.set(rx, ry, 0); // rotate model
    // model.rotation.x += 0.01;
    // model.rotation.y += 0.01;  
  }
  requestAnimationFrame(rendeLoop); // Loop the render function
}

rendeLoop(); // Start rendering

// Make it full screen & update when screen size is changed
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
