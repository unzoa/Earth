# threejs

### 1. 基本使用

> 案例start.js

- Step 1 首先创建主要元素：
  + camera：相机
  + scene：场景
  + renderer：WEBGL渲染实例

- Step 2 创建目标

- Step 3 开始渲染


### 2. 基础内容

- 网孔Mesh
  > THREE.Mesh(几何个体, 材料)

- 个体包含：
  + 立方体：BoxGeometry
  + 球：SphereGeometry
  + 线: BufferGeometry

- 材料包含：
  + MeshBasicMaterial
  + MeshNormalMaterial
  + MeshLambertMaterial
  + LineBasicMaterial

### 地球的创建

- [v] 基本创建
- [v] cube
- [v] line
- [x] text

- Flights
- 自转
- 放大，偏移
- 旋转背景

- 1. 创建基本
  + WebGLRenderer
  + camera
  + scene
  + Object3D 图形对象的基类，为了使场景内的球和线一起旋转，需要将目标个体add进入这里

- 2. 创建个体
  + 球：Mesh(SphereGeometry, )
  + 线：Line(BufferGeometry, )

- 3. 操作元素
  + Object3D.add(球)
  + Object3D.add(线)

- 4. 创建辅助
  + 绘制曲线
  + 光源
    * PointLight 点光源，坐标既是光的原点
    * HemisphereLight 半球光源，类似太阳，原点存在场景之上

- 5. 场景部署
  + scene.add(Object3D)
  + scene.add(PointLight)

- 6. 启动
```js
function dong () {
  requestAnimationFrame(() => {
    dong()
  });
  Object3D.rotation.y += 0.006
  WebGLRenderer.render(scene, camera);
}
dong()
```

