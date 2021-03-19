export default (obj = earth) => {
  let radius = (EARTH_RADIUS + 400) * zoomFactor
  let segment = 40
  let rings = 30
  let geometry = new THREE.SphereGeometry(radius, segment, rings)
  var material  = new THREE.MeshPhongMaterial({
    map     : new THREE.TextureLoader().load('src/assets/img/earthcloudmap.jpg'),
    side        : THREE.DoubleSide,
    opacity     : 0.8,
    transparent : true,
    depthWrite  : false,
  })
  var cloudMesh = new THREE.Mesh(geometry, material)
  obj.add(cloudMesh)
}