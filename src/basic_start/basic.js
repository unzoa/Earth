// 基本环境
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45, // 视野角度
  window.innerWidth / window.innerHeight, // 长宽比
  1, // 近截面
  500 // 远截面
)
camera.position.set(0,0,100)
camera.lookAt(0,0,0)
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({
  antialias: true // 抗锯齿
})
renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

document.body.appendChild(renderer.domElement)
