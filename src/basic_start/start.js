let camera, scene, renderer; // 主要
let geometry, material, cube; // 目标

init();
animate();

function init() {

  scene = new THREE.Scene();

  // 透视摄像机
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);


  // 立方体
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  // 材质，设置属性color绿色
  material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  // 网格，包含（几何体，材质）
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  // 默认下，scene.add() ，物体会添加在(0,0,0)坐标，
  // 这将使得camera和cube在一起
  // 为了防止这样，将camera向外移动一些
  camera.position.z = 1;

  document.body.appendChild(renderer.domElement);
}

// 我们需要使用一个被叫做
// “渲染循环”（render loop）或者“动画循环”（animate loop）的东西。
function animate() {

  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);

}