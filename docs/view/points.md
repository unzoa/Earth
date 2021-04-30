# 创建点阵

> 根据经纬度，换算成三维坐标；
> 创建三维坐标上物体

### 单元几何体


#### 认识立方体

```html
BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
width — X轴上面的宽度，默认值为1。
height — Y轴上面的高度，默认值为1。
depth — Z轴上面的深度，默认值为1。
widthSegments — （可选）宽度的分段数，默认值是1。
heightSegments — （可选）宽度的分段数，默认值是1。
depthSegments — （可选）宽度的分段数，默认值是1。
```

#### 创建几何体

```js
const createPointUnit = () => {
  const geometry = new THREE.BoxGeometry(100 * zoomFactor, 100 * zoomFactor, 1);

  // .applyMatrix4 ( matrix : Matrix4 ) : null
  // 用给定矩阵转换几何体的顶点坐标。

  // .makeTranslation ( x : Float, y : Float, z : Float ) : this
  // x - 在X轴上的平移量。
  // y - 在Y轴上的平移量。
  // z - 在Z轴上的平移量。
  // 设置该矩阵为平移变换：
  geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

  const mesh = new THREE.Mesh(geometry);
  return mesh;
};
```

### 使用几何体


#### 组装几何体

```js
let = point = createPointUnit()
let pointGeo = new THREE.Geometry();

// 遍历点的数据来使用point单元几何体
const addPoint = (lat, lng, size, color) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((180 - lng) * Math.PI) / 180;

  // 距离地心的高度
  const distance = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor;

  // 设置单元体的位置
  point.position.x = distance * Math.sin(phi) * Math.cos(theta);
  point.position.y = distance * Math.cos(phi);
  point.position.z = distance * Math.sin(phi) * Math.sin(theta);

  point.lookAt(earth.position);

  point.scale.z = Math.max(size * zoomFactor * 5, zoomFactor);
  point.updateMatrix();

  // 设置几何体各个面的颜色
  point.geometry.faces.forEach((each, i) => {
    point.geometry.faces[i].color = color;
  });

  // .merge ( bufferGeometry : BufferGeometry, offset : Integer ) : null
  // 同参数指定的 BufferGeometry 进行合并。
  // 可以通过可选参数指定，从哪个偏移位置开始进行 merge。
  pointGeo.merge(point.geometry, point.matrix);
};
```

#### 加入主场景

```js
const drawPoint = () => {
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
    morphTargets: false,
    transparent: true,
    opacity: 0.7
  });
  const points = new THREE.Mesh(pointGeo, mat);

  const angle = Math.PI
  points.rotation.y = angle

  threedObj.add(points);
};
```



