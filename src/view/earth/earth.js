import material from './earthmaterial.js'

export function BuildEarth() { // 球
  let radius = EARTH_RADIUS * zoomFactor
  let segment = 40
  let rings = 30
  let geometry = new THREE.SphereGeometry(radius, segment, rings)
  console.log(radius * 2);

  // let material = new THREE.MeshLambertMaterial({color: 0xffffff}) // 0x31569C
  // let texture = new THREE.TextureLoader().load('src/assets/img/earth.jpeg')
  // material.map = texture

  let sphere = new THREE.Mesh(geometry, material)
  sphere.scale.set(1.1, 1.1, 1.1)

  sphere.geometry.verticesNeedUpdate = true
  sphere.geometry.normalsNeedUpdate = true

  earth = sphere
  threedObj.add(sphere)
}
