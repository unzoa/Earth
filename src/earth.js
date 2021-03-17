let radius = EARTH_RADIUS * zoomFactor
let segment = 40
let rings = 30

export function BuildEarth () { // 球
  let spherMaterial = new THREE.MeshLambertMaterial({color: 0x31569C}) // 0x31569C
  let geometry = new THREE.SphereGeometry(radius, segment, rings)

  // let texture = new THREE.TextureLoader().load('src/assets/img/earth.jpeg')
  // spherMaterial.map = texture

  let sphere = new THREE.Mesh(geometry, spherMaterial)
  sphere.scale.set(1.1, 1.1, 1.1)

  sphere.geometry.verticesNeedUpdate = true;
  sphere.geometry.normalsNeedUpdate = true;

  earth = sphere
  threedObj.add(sphere)
}
