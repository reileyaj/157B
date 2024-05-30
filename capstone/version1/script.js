//console.log('readingjs')

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

//load compressed draco models from blender
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader(dracoLoader);


  //find #canvas to put model into
  const canvas = document.querySelector('#canvas');
  canvas.classList.add('threejs');

  //make the scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(143, 195, 223);

  //render 
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  }); // turn on antialias
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio
  renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
  renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
  renderer.toneMapping = THREE.LinearToneMapping; // set the toneMapping
  canvas.appendChild(renderer.domElement); // append the renderer to canvas div element

  //make camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth*.75 / window.innerHeight, 1, 100);
  scene.add(camera);
  camera.position.set(0, 3, 9);

  //on the first day, god said let there be light
  const light = new THREE.PointLight(0xffff00, 1, 100);
  light.position.set(-15, 0, 15);
  scene.add(light);

  //orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2.2, 0);
  controls.enableZoom = false;
  // controls.autoRotate = true;
  controls.enableDamping = true;

  //load glb file
  let obj = null;
  loader.load('assets/TodayUSA2.glb', function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
  });



  //render loop function
  function rendeLoop() {
    controls.update(); // update orbit controls
    renderer.render(scene, camera); //render the scene without the composer
    requestAnimationFrame(rendeLoop); //loop the render function
  }

  rendeLoop(); //start rendering
  
  //make fullscreen when screen resize
  window.addEventListener('resize', () => {
  const width = window.innerWidth*.75;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener('wheel', onMouseWheel);
  function onMouseWheel(event) {

    gltf.scene.rotation.y += event.deltaY * 0.01;
  
    rendeLoop();
  
  }
});






