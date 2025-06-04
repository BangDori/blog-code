// 컨테이너
const container = document.getElementById("container");
const width = container.clientWidth;
const height = container.clientHeight;

const radius = width / 2;
const cylinderHeight = (2 * radius) / (16 / 9); // 16:9 비율

// 1-1. Scene 생성
const scene = new THREE.Scene();

// 1-2. Camera 생성
const camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000);
camera.position.set(300, cylinderHeight / 2, 0);
camera.lookAt(new THREE.Vector3(-radius, cylinderHeight / 2, 0));

// 1-3. WebGL Renderer 생성
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

container.appendChild(renderer.domElement);

// 2-1 비디오 객체 생성
const video = document.createElement("video");
video.crossOrigin = "anonymous";
video.playsInline = true;
video.volume = 1.0;
video.muted = true;

// 2-2. HLS 비디오 스트리밍 재생
const videoUrl =
  "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(videoUrl);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = videoUrl;
  video.play();
}

// 3-1. 원통 생성
const cylinderGeometry = new THREE.CylinderGeometry(
  radius,
  radius,
  cylinderHeight,
  60,
  1,
  true,
  Math.PI,
  Math.PI
);

// 3-2. 비디오 텍스처 생성
const texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

// 3-3. 비디오 텍스처를 입힐 재질 생성
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide,
});

// 3-4. 3D 메시 생성 및 위치 지정
const mesh = new THREE.Mesh(cylinderGeometry, material);
mesh.position.set(0, cylinderHeight / 2, 0);
scene.add(mesh);

// 4. 3D 장면을 실시간으로 그리는 애니메이션 루프
renderer.setAnimationLoop(() => renderer.render(scene, camera));

// ================== 애니메이션 코드 ==================

// 카메라 줌 인/아웃 (휠 이벤트)
const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
renderer.domElement.addEventListener("wheel", (e) => {
  camera.fov = clamp(camera.fov + e.deltaY / 10, 10, 120);
  camera.updateProjectionMatrix();
});

// 마우스 드래그로 카메라 회전
let mouseDown = false;
renderer.domElement.addEventListener("mousedown", (e) => {
  if (e.button === 0) mouseDown = true;
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (!mouseDown) return;

  const { movementX, movementY } = e;

  const rotateX = movementY / 100;
  const rotateY = movementX / 100;

  camera.rotateX(rotateX);
  camera.rotateY(rotateY);
});
