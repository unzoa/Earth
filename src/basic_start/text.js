const loader = new THREE.FontLoader()

loader.load('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json', font => {
  const textGeometry = new THREE.TextGeometry(
    'helloooooooo',
    {
      font,
      weight: 'regular',
      size: 5,
      height: 2,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5
    }
  )

  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  })
  const textMesh = new THREE.Mesh(textGeometry, textMaterial)

  scene.add(textMesh)
  // renderer.render(scene, camera)

  animate(textMesh)
})
