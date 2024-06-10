import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

(function(){

//====SWITCH====//
const button = document.querySelector('button');
let version = 'today';
let asset = 'assets/TodayUSA2.glb';
const h1 = document.querySelector('h1');
const sec1 = document.querySelector('#sec1')
const sec2 = document.querySelector('#sec2')
const sec3 = document.querySelector('#sec3')
const sec4 = document.querySelector('#sec4')

button.addEventListener('click', function(){
  if (version === 'today') {
    h1.innerHTML = 'Tomorrow, USA';
    sec1.innerhtml = '<h3>Tomorrow Section 1</h3><p>Text goes here</p>'
    asset = 'assets/TodayUSA3.glb';
    version = 'tomorrow';
  } else {
    h1.innerHTML = 'Today, USA';
    asset = 'assets/todayUSA2.glb'
    version = 'today';
  }

      // Re-load the model with the new asset path
      const dracoLoader = new DRACOLoader();
      const loader = new GLTFLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      dracoLoader.setDecoderConfig({ type: 'js' });
      loader.setDRACOLoader(dracoLoader);
  
      loader.load(asset, function(gltf) {
        // Remove the existing model from the scene
        if (model) {
          scene.remove(model);
        }
  
        model = gltf.scene; // Assign the loaded model to the global model variable
        model.scale.set(.45,.45,.45); // Resize the model to half its original size
        model.position.y += 2; // Move the model up to be fully visible
        scene.add(model); // Add the loaded model to the scene
  
        camera.position.z = 5; // Adjust camera position after changing models
      });

})


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
const light = new THREE.PointLight(0xffffff, 2, 100);
const light2 = new THREE.PointLight(0xffffff, .5, 100);
const light3 = new THREE.PointLight(0xffffff, 1, 100);
const light4 = new THREE.PointLight(0xffffff, .5, 100);
light.position.set(2, 15, 8);
light2.position.set(-2,-15,8)
light3.position.set(2,-15,8)
light4.position.set(-2,15,8)
scene.add(light);
scene.add(light2); scene.add(light4); scene.add(light3);

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dracoLoader);

let model; // Declare model here to make it accessible globally

loader.load(`${asset}`, function(gltf) {
  model = gltf.scene; // Correctly assign the loaded model to the global model variable
  model.scale.set(.45,.45,.45); // Resize the model to half its original size
  model.position.y += 2; // Move the model up to be fully visible
  scene.add(model); // Add the loaded model to the scene
});

camera.position.z = 5;

// Renders
function rendeLoop() {
  renderer.render(scene, camera); // Render the scene without the composer

  const currentTimeLine = window.pageYOffset/2000;
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


})();
