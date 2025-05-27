const scene = new THREE.Scene();

const width = 640;
const height = 480;
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);
