export function buildLights (tar = scene) { // 光源
  var pointLight = new THREE.PointLight(0XCC0000, 1, 0, 2);
  pointLight.position.set(100, -100, 10)
  pointLight.power = Math.PI * 8

  let hemisphereLight = new THREE.HemisphereLight(0xdddddd, 0x333333, 2)
  hemisphereLight.position.set(-100, 100, -10)

  tar.add(hemisphereLight)
  tar.add(pointLight);

  // const ambientLight = new THREE.AmbientLight(0x888888);
  // scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight(0xcccccc, 1); // color, intensity
  // directionalLight.position.set(5, 5, 5);
  // scene.add(directionalLight);
}
