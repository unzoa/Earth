// 目标
// 线条材质：LineBasicMaterial; LineDashedMaterial
// 创建一个蓝色的线条材质
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xCC0000
})

// 带有顶点的几何体 geometry
// 点坐标
const points = [
  new THREE.Vector3(50, 0, 0),
  new THREE.Vector3(50, 60, 0),
  new THREE.Vector3(0, 70, 0),
  new THREE.Vector3(0, 50, 0)
]
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
// 注意：线存在与点之间，现在并被闭合

const line = new THREE.Line(lineGeometry, lineMaterial)


// 操作目标
scene.add(line)
// renderer.render(scene, camera)
