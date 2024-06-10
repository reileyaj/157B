import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

(function(){

//====SWITCH====//
const button = document.querySelector('button');
let version = 'today';
let asset = 'assets/TodayUSA2.glb';
const h1 = document.querySelector('h1'); const h1p = document.querySelector('#h1');
const sec1h = document.querySelector('#sec1').querySelector('h2'); const sec1p = document.querySelector('#sec1').querySelector('p');
const sec2h = document.querySelector('#sec2').querySelector('h2'); const sec2p = document.querySelector('#sec2').querySelector('p');
const sec3h = document.querySelector('#sec3').querySelector('h2'); const sec3p = document.querySelector('#sec3').querySelector('p');
const sec4h = document.querySelector('#sec4').querySelector('h2'); const sec4p = document.querySelector('#sec4').querySelector('p');

button.addEventListener('click', function(){
  if (version === 'today') {
    h1.innerHTML = 'Tomorrow, USA'; h1p.innerHTML = 'How could our cities and suburbs look different in the future?'
    sec1h.innerHTML = "Mixed Use Buildings"; sec1p.innerHTML = "Mixed use zoning allows multiple types of buildings, like residential and commercial, to exist in the same space. This allows residents to live near where they shop, meaning they can walk or bike rather than drive! Plus, who doesn't want to live above a pretzel shop?"
    sec2h.innerHTML = "Underground Transportation"; sec2p.innerHTML = "Underground public transportation allows large amounts of people to travel around a city without taking up space aboveground for routes or stations. Having separate lines from above-ground streets also give riders the benefit of skipping traffic!"
    sec3h.innerHTML = "More Third Spaces"; sec3p.innerHTML = "What would you do with an empty parking lot? Maybe you'd want to build a library, maybe a playground, or maybe a community garden! These are all 'third spaces', places people can spend time aside from home or work. Public third spaces are especially valuable, as they allow people to exist there without needing to spend money."
    sec4h.innerHTML = "Overground Public Transit"; sec4p.innerHTML = "A bus is much more economical with both fuel and space when full than a car. Over 70% of workers drive to work alone; most cars can seat 5 people! Public transit with frequent stops can provide a much more eco-friendly and convenient trip to your day job."
    button.innerHTML = 'Today, USA'

    asset = 'assets/TodayUSA3.glb';
    version = 'tomorrow';
  } else {
    h1.innerHTML = 'Today, USA'; h1p.innerHTML = 'Are we using the full potential of our space today? Cars and the space we reserve for them take up a lot of space.'
    sec1h.innerHTML = 'Smaller Cars'; sec1p.innerHTML = 'Something like this red sedan is probably what you think of when you think of a car, and it is one! Safer than larger cars, in a collision this car would push a pedestrian onto the hood of the car. Personal cars like this can be wasteful of space and resources, especially when only transporting one person'
    sec2h.innerHTML = "Space Dedicated to Cars"; sec2p.innerHTML = "How many parking lots are in your city? An average of 22% of space is given to parking in American cities with a population over 1 million. With housing and third place shortages in many cities, maybe this space could be better utilized!"
    sec3h.innerHTML = "Large Cars"; sec3p.innerHTML = "Personal vehicles like this blue truck have been getting larger and larger in the U.S. A subset of these vehicles, classified as light trucks (pickup trucks and SUVs), have different safety regulations under U.S. law. These vehicles tend to be getting larger, which reduces driver visibility, and taller, which, in a collision with a pedestrian, is more likely to push them under the vehicle rather than onto the hood of the vehicle. This is much more dangerous for the pedestrian."
    sec4h.innerHTML = "Pedestrian Travel"; sec4p.innerHTML = "Have you ever tried to get around without a car? Depending on where you were, it might have been a piece of cake or an arduous journey. Although the vast majority of Americans have a driver's license, not everyone has a car, and not everyone wants one! Unfortunately, public transit and infrastructure, such as sidewalks and bikelanes, are severely lacking in most areas."
    button.innerHTML = 'Tomorrow, USA'

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
