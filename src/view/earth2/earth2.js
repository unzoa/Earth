export default () => {
  let radius = EARTH_RADIUS * zoomFactor
  let segment = 40
  let rings = 30
  let geometry = new THREE.SphereGeometry(radius, segment, rings)
  var material  = new THREE.MeshPhongMaterial()
  var earthMesh = new THREE.Mesh(geometry, material)

  material.map = new THREE.TextureLoader().load('src/assets/img/earthmap1k.jpg')
  material.bumpMap = new THREE.TextureLoader().load('src/assets/img/earthbump1k.jpg')
  material.bumpScale = 0.05
  material.specularMap = new THREE.TextureLoader().load('src/assets/img/earthspec1k.jpg')
  material.specular  = new THREE.Color('grey')

  earthMesh.name = 'earth2'
  threedObj.add(earthMesh)
}