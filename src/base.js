let viewAngle = 30
let aspect = w / h
let near = 0.1
let far = 10000

export function baseBuild () { // 基础
  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setClearColor( 0xffffff, 0)
  renderer.setSize(w, h)

  camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far)
  camera.position.z = 50

  scene = new THREE.Scene()
  scene.add(camera)

  document.body.appendChild(renderer.domElement)

  threedObj = new THREE.Object3D() // 图形对象的基类。
  scene.add(threedObj)
}

export function controls () { // 引用OrbitControls的控制
  cameraControls = new THREE.OrbitControls(camera)
  cameraControls.maxDistance = 200
  cameraControls.minDistance = 30
}
