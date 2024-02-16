import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Create a variable to keep track of mouse position
const mouse = new THREE.Vector2();
let mouseX = 0,
mouseY = 0,
mouseXPrevState = 0,
mouseYPrevState = 0,
modifX = 0,
modifY = 0,
windowHalfX =window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
turnDown,
turnRight;

document.addEventListener('mousemove', onDocumentMouseMove );
window.addEventListener( 'resize', onWindowResize );

const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x4b4b4b);
renderer.setClearAlpha(0);
renderer.setPixelRatio(window.devicePixelRatio);

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.rotation.set(0.2, -0.3, 0.05)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(2, 2, 7);
camera.lookAt(new THREE.Vector3(scene.position.x, scene.position.y, scene.position.z));

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.minDistance = 5;
// controls.maxDistance = 20;
// controls.minPolarAngle = 0.5;
// controls.maxPolarAngle = 1.5;
// controls.autoRotate = false;
// controls.target = new THREE.Vector3(0, 1, 0);
// controls.update();

// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// // groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshStandardMaterial({
//   color: 0x555555,
//   side: THREE.DoubleSide
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// const spotLight = new THREE.SpotLight(0xffffff,  3, 100, 0.22, 1);
// spotLight.position.set(0, 25, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2,2,2);
scene.add(light);

const loader = new GLTFLoader().setPath('src/models/t-34/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      // child.castShadow = true;
      // child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 0, -1.3);
  scene.add(mesh);

  // document.getElementById('progress-container').style.display = 'none';
}, ( xhr ) => {
  // document.getElementById('progress').innerHTML = `LOADING ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
},);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  

  // controls.update();
  renderer.render(scene, camera);
}

animate();

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  let cameraPositionX = camera.position.x;
  let cameraPositionY = camera.position.y;
  let minPosX = 2;
  let minPosY = 2;
  let maxPosX = 5;
  let maxPosY = 5;
    mouseX = ( event.clientX - windowHalfX ) / 100;
    mouseY = ( event.clientY - windowHalfY ) / 100;

    modifX = mouseXPrevState - mouseX;
    modifY = mouseYPrevState - mouseY;
    turnRight = mouseX > mouseXPrevState ? true : false;
    turnDown = mouseY > mouseYPrevState ? true : false;

    console.log("camera.position.x ", camera.position.x,"mouseX", mouseX, "mouseXPrevState", mouseXPrevState, "turnRight", turnRight);
    console.log("camera.position.y", camera.position.y, "mouseY", mouseY, "mouseYPrevState", mouseYPrevState, "turnDown", turnDown);
    // cameraPositionX += ( - mouseX - camera.position.x ) * .05
    if (turnRight) {
      if (cameraPositionX + modifX < minPosX) cameraPositionX = minPosX;
      else cameraPositionX += modifX;
    } else {
      if (cameraPositionX + modifX > maxPosX) cameraPositionX = maxPosX;
      else cameraPositionX += modifX;
    }
    if (turnDown) {
      if (cameraPositionY + modifY < minPosY) cameraPositionY = minPosY;
      else cameraPositionY += modifY;
    } else {
      if (cameraPositionY + modifY > maxPosY) cameraPositionY = maxPosY;
      else cameraPositionY += modifY;
    }
    
    // if (!turnRight) cameraPositionX += ( - mouseX - camera.position.x ) * .05
    camera.position.x = cameraPositionX;
    camera.position.y = cameraPositionY;

    mouseXPrevState = mouseX;
    mouseYPrevState = mouseY;

    console.log(camera.position.x, camera.position.y)
    camera.lookAt( scene.position );

}

