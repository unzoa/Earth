# 创建球体

```js
export function BuildEarth() { // 球
  ...

  // 几何体
  let geometry = new THREE.SphereGeometry(radius, segment, rings)

  // 材料
  let material = new THREE.MeshLambertMaterial({color: 0xffffff})
  // 给材料中添加图片纹理
  let texture = new THREE.TextureLoader().load('src/assets/img/earth.jpeg')
  material.map = texture

  // 网格
  let sphere = new THREE.Mesh(geometry, material)
  ...

  // threedObj添加在scene中，作为图像基类
  // 将球添加在基类里面，方便之后的运动和控制操作
  threedObj.add(sphere)
}
```
