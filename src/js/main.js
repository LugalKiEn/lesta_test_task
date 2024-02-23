
import { init } from './init.js';
import * as TWEEN from '@tweenjs/tween.js'
import '../styles/style.css';

const [renderer, scene, camera, labelRenderer] = init();

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();
  renderer.render(scene, camera);
  if (labelRenderer) labelRenderer.render( scene, camera );
}

animate();



