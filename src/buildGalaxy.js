const GALAXY_DISTANCE = 99999 + 10000 // km

export const createGalaxy = () => {
  const geometry = new THREE.SphereGeometry(GALAXY_DISTANCE * zoomFactor, 40, 30);
  const texture = new THREE.TextureLoader().load('src/assets/img/starfield.png')
  const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
  });
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}
