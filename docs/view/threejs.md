# Threejs 基本使用


### 基本使用

- Step 1 首先创建主要元素：
  + camera：相机
  + scene：场景
  + renderer：WEBGL渲染实例

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

- Step 2 创建目标

```js
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

- Step 3 开始渲染

```js
const animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
```


### 基础内容

> THREE.Mesh(几何个体, 材料)

- 个体包含：
  + 立方体：BoxGeometry
  + 球：SphereGeometry
  + 线: BufferGeometry

- 材料包含：
  + MeshBasicMaterial
  + MeshNormalMaterial
  + MeshLambertMaterial
  + LineBasicMaterial

### 鼠标控制

> 应用了threejs的相机控件 orbitControls.js
> 可以对三维场景进行缩放、平移、旋转操作，本质上改变的并不是场景，而是相机的参数
```js
export function controls () { // 引用OrbitControls的控制
  cameraControls = new THREE.OrbitControls(camera)
  // cameraControls.maxDistance = 200
  // cameraControls.minDistance = 30

  // 其他属性待扩展使用
}
```

### 窗口变化

> 浏览器窗口大小变化，响应整个图形的变化

```js
const handleWindowResize = () => {
  let ww = window.innerWidth
  let hh = window.innerHeight
  camera.aspect = ww / hh
  camera.updateProjectionMatrix()
  renderer.setSize(ww, hh)
}

export const bindResizeEventListener = () => {
  window.addEventListener('resize', handleWindowResize, false)
}
```
