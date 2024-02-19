import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

let mouseX = 0,
mouseY = 0,
mouseXPrevState = 0,
mouseYPrevState = 0,
modifX = 0,
modifY = 0,
windowHalfX =window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
turnDown,
turnRight,
labelRenderer,
selectedObject = null

document.addEventListener('mousemove', onDocumentMouseMove );
window.addEventListener( 'resize', onWindowResize );
document.addEventListener( 'click', spriteClickHandler );

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

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

const group = [];
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
      if (child.name == "Plane016_low_Body_0") {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("/src/img/canon.svg");
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
        child.add( sprite );
      }
      if ( child.name == "Cylinder024_low_Others_0") {
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load("/src/img/rally.svg");
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

          
          sprite.position.set(corner4.x, corner4.y, corner4.z );
          sprite.center = new THREE.Vector2(0, 0);
          sprite.name = "rally";
          group.push(sprite.name);
          child.add( sprite );
      //   const gunDiv = document.createElement( 'div' );
      //   gunDiv.className = 'marker';
      //   gunDiv.addEventListener("click", () => console.log('jopa'))
      //   gunDiv.style.backgroundColor = 'transparent';
      //   const gunImg = document.createElement('img');
      //   gunImg.setAttribute("src", "rally.svg");
      //   gunDiv.appendChild( gunImg );
  
        
      //   // gunLabel.layers.set( 0 );
  
      //   const boundingBox = new  THREE.Box3();
      //   boundingBox.setFromObject(child);
      //   console.log(boundingBox)
  
      //   const low = boundingBox.min;
      //   const high = boundingBox.max;
  
      //   const corner1 = new THREE.Vector3(low.x,    low.y,  low.z);
      //   const corner2 = new THREE.Vector3(high.x,   low.y,  low.z);
      //   const corner3 = new THREE.Vector3(low.x,    high.y, low.z);
      //   const corner4 = new THREE.Vector3(low.x,    low.y,  high.z);
  
      //   const corner5 = new THREE.Vector3(high.x,   high.y, low.z);
      //   const corner6 = new THREE.Vector3(high.x,   low.y,  high.z);
      //   const corner7 = new THREE.Vector3(low.x,    high.y, high.z);
      //   const corner8 = new THREE.Vector3(high.x,   high.y, high.z);
  
      //   console.log(corner1, corner2, corner3, corner4, corner5, corner6, corner7, corner8)

      //   const gunLabel = new CSS2DObject( gunDiv );
      //   gunLabel.position.set( corner4.x, corner4.y, corner4.z);
      //   // gunLabel.matrix.copy(child.matrix)
      //   gunLabel.center.set( 0, 1 );
      //   child.add( gunLabel );
      }
      if (child.name == "Cube039_low_Body_0") {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("/src/img/armor.svg");
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

        
        sprite.position.set(corner4.x, corner4.y, corner4.z );
        sprite.center = new THREE.Vector2(-.5, .2);
        sprite.name = "armor";
        group.push(sprite.name);
        child.add( sprite );
      //   const gunDiv = document.createElement( 'div' );
      //   gunDiv.className = 'marker';
      //   gunDiv.addEventListener("click", () => console.log('jopa'))
      //   gunDiv.style.backgroundColor = 'transparent';
      //   const gunImg = document.createElement('img');
      //   gunImg.setAttribute("src", "armor.svg");
      //   gunDiv.appendChild( gunImg );
  
        
      //   // gunLabel.layers.set( 0 );
  
      //   const boundingBox = new  THREE.Box3();
      //   boundingBox.setFromObject(child);
      //   console.log(boundingBox)
  
      //   const low = boundingBox.min;
      //   const high = boundingBox.max;
  
      //   const corner1 = new THREE.Vector3(low.x,    low.y,  low.z);
      //   const corner2 = new THREE.Vector3(high.x,   low.y,  low.z);
      //   const corner3 = new THREE.Vector3(low.x,    high.y, low.z);
      //   const corner4 = new THREE.Vector3(low.x,    low.y,  high.z);
  
      //   const corner5 = new THREE.Vector3(high.x,   high.y, low.z);
      //   const corner6 = new THREE.Vector3(high.x,   low.y,  high.z);
      //   const corner7 = new THREE.Vector3(low.x,    high.y, high.z);
      //   const corner8 = new THREE.Vector3(high.x,   high.y, high.z);
  
      //   console.log("test", corner1, corner2, corner3, corner4, corner5, corner6, corner7, corner8)

      //   const gunLabel = new CSS2DObject( gunDiv );
      //   gunLabel.position.set( corner4.x, corner4.y, corner4.z);
      //   // gunLabel.matrix.copy(child.matrix)
      //   gunLabel.center.set( 0, 1 );
      //   child.add( gunLabel );
      }
    }
    
  });

  mesh.position.set(0, 0, -1.3);
  // mesh.add( group );
  scene.add(mesh);


  labelRenderer = new CSS2DRenderer();
	labelRenderer.setSize( window.innerWidth, window.innerHeight );
	labelRenderer.domElement.style.position = 'absolute';
	labelRenderer.domElement.style.top = '0px';
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

function animate() {
  requestAnimationFrame(animate);
  

  // controls.update();
  renderer.render(scene, camera);
  if (labelRenderer) labelRenderer.render( scene, camera );
}

animate();

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    if (labelRenderer) labelRenderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  let cameraPositionX = camera.position.x;
  let cameraPositionY = camera.position.y;
  let minPosX = 2;
  let minPosY = 2;
  let maxPosX = 7;
  let maxPosY = 7;
    mouseX = ( event.clientX - windowHalfX ) / 100;
    mouseY = ( event.clientY - windowHalfY ) / 100;

    modifX = (mouseXPrevState - mouseX) * 0.5;
    modifY = (mouseYPrevState - mouseY) * 0.5;
    turnRight = mouseX > mouseXPrevState ? true : false;
    turnDown = mouseY > mouseYPrevState ? true : false;

    // console.log("camera.position.x ", camera.position.x,"mouseX", mouseX, "mouseXPrevState", mouseXPrevState, "turnRight", turnRight);
    // console.log("camera.position.y", camera.position.y, "mouseY", mouseY, "mouseYPrevState", mouseYPrevState, "turnDown", turnDown);
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

    // console.log(camera.position.x, camera.position.y)
    camera.lookAt( scene.position );

}

function spriteClickHandler (event) {
  if ( selectedObject ) {
    selectedObject = null;
  }
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene.children[1].children[0].children[0].children[0].children );

  if ( intersects.length > 0 ) {
    const objectIntersected = intersects[0].object
    console.log(intersects[0].object.name)

    if(group.indexOf(objectIntersected.name) > -1) {
      console.log("jopa");
//       camera.position.set(-2, 2, 3);
// camera.lookAt(new THREE.Vector3(objectIntersected.position.x, objectIntersected.position.y, objectIntersected.position.z));
    }

    // const res = intersects.filter( function ( res ) {

    //   return res && res.object;

    // } )[ 0 ];

    // if ( res && res.object ) {

    //   selectedObject = res.object;
    //   // selectedObject.material.color.set( '#f00' );

    // }

  }

}

