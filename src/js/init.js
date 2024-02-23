import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import getData from './requests.js';
import renderPropTable from './renderPropTable.js';

import armor from '../img/armor.svg';
import canon from '../img/canon.svg'
import rally from '../img/rally.svg'
let selectedObject = null,
blockRotation = false,
mouseX = 0,
mouseY = 0

export const init = () => {
    document.addEventListener('mousemove', onDocumentMouseMove );
    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'click', spriteClickHandler );

    let labelRenderer;
    const loadingBanner = document.querySelector(".loading-banner");
    const progressStatus = document.getElementById("progressStatus")
    const canvas = document.querySelector('.model-canvas')
    const pointer = new THREE.Vector2()
    const defaultCameraXPosition = 0;
    const defaultCameraYPosition = 0;
    const defaultCameraZPosition = 7;
    const minRotationX = THREE.MathUtils.degToRad(5);
    const minRotationY = THREE.MathUtils.degToRad(-30);

    const renderer = new THREE.WebGLRenderer({antialias: true, canvas:canvas});
    const raycaster = new THREE.Raycaster();

    const tankModelURL = new URL('../models/T-34.glb', import.meta.url);
    const terrainModelURL = new URL('../models/terrain.glb', import.meta.url);
    const terrainSize = 93949952;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(window.devicePixelRatio);


    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.rotation.x = minRotationX;
    scene.rotation.y = minRotationY;

    const group = [];
    const groupArr = []

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(defaultCameraXPosition, defaultCameraYPosition, defaultCameraZPosition);
    camera.lookAt(new THREE.Vector3(scene.position.x, scene.position.y, scene.position.z));

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2,2,2);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(terrainModelURL.href, (gltf) => {
    const terrain = gltf.scene;
    terrain.position.x =-2
    terrain.position.y = -2.4
    terrain.position.z = -2
    terrain.rotation.x = 0
    terrain.rotation.y = -2
    terrain.scale.set(.7,.7,.7)
    scene.add(terrain);
    const data = getData("default");
    renderPropTable("", data)
    loadingBanner.classList.add('closed');
    },
    ( xhr ) => {
        progressStatus.style.width = Math.max(xhr.loaded / terrainSize, 1) *100 + '%';
    });
    loader.load(tankModelURL.href, (gltf) => {
    const mesh = gltf.scene;
    const textureLoader = new THREE.TextureLoader();
    mesh.traverse((child) => {
        if (child.isMesh) {
        if (child.name == "Plane016_low_Body_0") {
            const texture = textureLoader.load(canon);
            const material = new THREE.SpriteMaterial( { map: texture} );

            const sprite = new THREE.Sprite( material );

            const boundingBox = new  THREE.Box3();
            boundingBox.setFromObject(child);
    
            const low = boundingBox.min;
            const high = boundingBox.max;
    
            const corner1 = new THREE.Vector3(low.x,    low.y,  low.z);
            const corner2 = new THREE.Vector3(high.x,   low.y,  low.z);
            const corner3 = new THREE.Vector3(low.x,    high.y, low.z);
            const corner4 = new THREE.Vector3(low.x,    low.y,  high.z);
    
            const corner5 = new THREE.Vector3(high.x,   high.y, low.z);
            const corner6 = new THREE.Vector3(high.x,   low.y,  high.z);
            const corner7 = new THREE.Vector3(low.x,    high.y, high.z);
            const corner8 = new THREE.Vector3(high.x,   high.y, high.z);

            
            sprite.position.set(corner7.x, corner7.y, corner7.z );
            sprite.center = new THREE.Vector2(0.5, 0.2);
            sprite.name = "canon";
            group.push(sprite.name);
            groupArr.push(sprite);
            child.add( sprite );
        }
        if ( child.name == "Cylinder024_low_Others_0") {
            const texture = textureLoader.load(rally);
            const material = new THREE.SpriteMaterial( { map: texture} );

            const sprite = new THREE.Sprite( material );

            const boundingBox = new  THREE.Box3();
            boundingBox.setFromObject(child);
        
            const low = boundingBox.min;
            const high = boundingBox.max;
        
            const corner1 = new THREE.Vector3(low.x,    low.y,  low.z);
            const corner2 = new THREE.Vector3(high.x,   low.y,  low.z);
            const corner3 = new THREE.Vector3(low.x,    high.y, low.z);
            const corner4 = new THREE.Vector3(low.x,    low.y,  high.z);
        
            const corner5 = new THREE.Vector3(high.x,   high.y, low.z);
            const corner6 = new THREE.Vector3(high.x,   low.y,  high.z);
            const corner7 = new THREE.Vector3(low.x,    high.y, high.z);
            const corner8 = new THREE.Vector3(high.x,   high.y, high.z);

            
            sprite.position.set(corner8.x, corner8.y, corner8.z + .5 );
            sprite.name = "rally";
            group.push(sprite.name);
            groupArr.push(sprite);
            child.add( sprite );
        }
        if (child.name == "Tower_Bubble01_0") {

            const texture = textureLoader.load(armor);
            const material = new THREE.SpriteMaterial( { map: texture} );

            const sprite = new THREE.Sprite( material );

            const boundingBox = new  THREE.Box3();
            boundingBox.setFromObject(child);
    
            const low = boundingBox.min;
            const high = boundingBox.max;
    
            const corner1 = new THREE.Vector3(low.x,    low.y,  low.z);
            const corner2 = new THREE.Vector3(high.x,   low.y,  low.z);
            const corner3 = new THREE.Vector3(low.x,    high.y, low.z);
            const corner4 = new THREE.Vector3(low.x,    low.y,  high.z);
    
            const corner5 = new THREE.Vector3(high.x,   high.y, low.z);
            const corner6 = new THREE.Vector3(high.x,   low.y,  high.z);
            const corner7 = new THREE.Vector3(low.x,    high.y, high.z);
            const corner8 = new THREE.Vector3(high.x,   high.y, high.z);

            
            sprite.position.set(corner2.x, corner2.y, corner2.z +.4 );
            sprite.name = "armor";
            group.push(sprite.name);
            groupArr.push(sprite);
            child.add( sprite );
        }
        }
        
    });

    const box = new THREE.Box3().setFromObject( mesh );
    const center = box.getCenter( new THREE.Vector3() );

    gltf.scene.position.x += ( gltf.scene.position.x - center.x );
    gltf.scene.position.y += ( gltf.scene.position.y - center.y );
    gltf.scene.position.z += ( gltf.scene.position.z - center.z );
    scene.add(mesh);


    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.zIndex = '-1';
    document.body.appendChild( labelRenderer.domElement );

    // document.getElementById('progress-container').style.display = 'none';
    }, ( xhr ) => {
    // document.getElementById('progress').innerHTML = `LOADING ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
    },);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)


    if (labelRenderer) labelRenderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  event.preventDefault();

    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
    rotateScene(deltaX, deltaY);
}

function rotateScene(deltaX, deltaY) {
  if (!blockRotation) {
    if (scene.rotation.y + deltaX / 2000 > minRotationY) scene.rotation.y = minRotationY;
    else scene.rotation.y += deltaX / 2000;
    if (scene.rotation.x + deltaY / 2000 < minRotationX) scene.rotation.x = minRotationX;
    else scene.rotation.x += deltaY / 2000;
  }
}

async function spriteClickHandler (event) {
  if ( selectedObject ) {
    selectedObject = null;
  }
  console.log(camera)
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene.children[1].children[0].children[0].children[0].children );

  if ( intersects.length > 0 ) {
    const objectIntersected = intersects[0].object
    console.log(intersects[0].object.name, intersects[0].object)
      switch (objectIntersected.name) {
        case "canon": {
          const newSceneX = THREE.MathUtils.degToRad(5);
          const newSceneY = THREE.MathUtils.degToRad(30);
          const newCameraZ = 5;
          new TWEEN.Tween( scene.rotation ).to( {  x:  newSceneX, y:  newSceneY}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          new TWEEN.Tween( camera.position ).to( { z:  newCameraZ}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          camera.lookAt(scene.position)
          const data = getData(objectIntersected.name);
          renderPropTable(objectIntersected.name, data)
          blockRotation = true;
          break;
        }
        case "rally": {
          const newSceneX = THREE.MathUtils.degToRad(-5);
          const newSceneY = THREE.MathUtils.degToRad(-110);
          const newCameraZ = 5;

          new TWEEN.Tween( scene.rotation ).to( {  x:  newSceneX, y:  newSceneY}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          new TWEEN.Tween( camera.position ).to( { z:  newCameraZ}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          camera.lookAt(scene.position)
          const data = getData(objectIntersected.name);
          renderPropTable(objectIntersected.name, data)
          blockRotation = true;
          break;
        }
        case "armor": {
          const newSceneX = THREE.MathUtils.degToRad(5);
          const newSceneY = THREE.MathUtils.degToRad(-30);
          const newCameraZ = 3;
          new TWEEN.Tween( scene.rotation ).to( {  x:  newSceneX, y:  newSceneY}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          new TWEEN.Tween( camera.position ).to( { z:  newCameraZ}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          camera.lookAt(scene.position);
          const data = getData(objectIntersected.name);
          renderPropTable(objectIntersected.name, data)
          blockRotation = true;
          break;
        }
        default: {
          new TWEEN.Tween( scene.rotation ).to( {  x:  minRotationX, y:  minRotationY}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          new TWEEN.Tween( camera.position ).to( {x: defaultCameraXPosition, y: defaultCameraYPosition + 0, z: defaultCameraZPosition}, 1000 ).easing( TWEEN.Easing.Quadratic.EaseOut).start();
          camera.lookAt(scene.position);
          const data = getData("default");
          renderPropTable(objectIntersected.name, data)
          blockRotation = false;
        }
          break;
      }

  }

}


    return [renderer, scene, camera, labelRenderer];
} 