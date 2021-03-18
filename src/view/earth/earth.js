import material, {atmosphere} from './earthmaterial.js'

function atmosphereAct () {
  let radius = (EARTH_RADIUS + 0) * zoomFactor
  let segment = 40
  let rings = 30
  let geometry = new THREE.SphereGeometry(radius, segment, rings)
  let sphere = new THREE.Mesh(geometry, atmosphere)
  const scaleVal = 1.1
  sphere.scale.set(scaleVal, scaleVal, scaleVal)
  threedObj.add(sphere)
}

export function BuildEarth() { // 球
  // atmosphereAct()

  let radius = EARTH_RADIUS * zoomFactor
  let segment = 40
  let rings = 30
  let geometry = new THREE.SphereGeometry(radius, segment, rings)

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
