export function baseBuild () { // 基础
  let w = window.innerWidth
  let h = window.innerHeight

  let viewAngle = 30
  let aspect = w / h
  let near = 0.1
  let far = 10000

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setClearColor( 0xffffff, 0)
  renderer.setSize(w, h)

  document.body.appendChild(renderer.domElement)

  threedObj = new THREE.Object3D() // 图形对象的基类。
  // threedObj.position.set(-10, 0, 0)

  scene.add(threedObj)
}

export function controls () { // 引用OrbitControls的控制
  cameraControls = new THREE.OrbitControls(camera)
  // cameraControls.maxDistance = 200
  // cameraControls.minDistance = 30

  cameraControls.enableDamping = true
  cameraControls.dampingFactor = 0.35
}
