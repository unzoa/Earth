export default () => {
  let spherMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
  let texture = new THREE.TextureLoader().load('src/assets/img/moon.png')
  spherMaterial.map = texture

  let ballGeo = new THREE.SphereGeometry(1, 32, 32)

  let ball = new THREE.Mesh(ballGeo, spherMaterial)

  const distance = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor * 1.2
  ball.position.set(distance, distance, distance)

  scene.add(ball)

  return ball
}
