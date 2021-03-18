export function buildLights (tar = scene) { // 光源
  // 电光源：仿照太阳，可以有投影
  // let pointLight = new THREE.PointLight(0XCC0000, 1, 0, 2);
  // pointLight.position.set(-100, -100, 0)
  // pointLight.power = Math.PI * 8
  // tar.add(pointLight)

  // 半球光：没有投影 （skyColor, groundCcolor, 光照强度）
  // let hemisphereLight = new THREE.HemisphereLight(0x333333, 0x333333, 2)
  // hemisphereLight.position.set(-100, 100, -10)
  // tar.add(hemisphereLight)

  // 环境光: 会均匀的照亮场景中的所有物体
  const ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  // 平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果;
  // 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。
  const directionalLight = new THREE.DirectionalLight(0xf5f5f5, 1) // color, intensity
  directionalLight.position.set(5, 2, 5)
  scene.add(directionalLight)
}
