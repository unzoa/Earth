import material from './shader2.js'
export default () => {
  let radius = EARTH_RADIUS * zoomFactor

  let sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(radius * 2, 80 ), material)
  const scaleVal = 0.2
  sphere.scale.set(scaleVal, scaleVal, scaleVal)

  sphere.position.set(3, -1, 0)

  sphere.geometry.verticesNeedUpdate = true
  sphere.geometry.normalsNeedUpdate = true

  scene.add(sphere)
}
