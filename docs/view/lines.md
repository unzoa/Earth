# 创建航线

### 实现目标
- 点之间的连接线
  > 根据经纬度，转换成三位体系中的点坐标，并转化成曲线连接

- 连接线上的移动的点
- 不完整线的移动（点之间线作为不完整线的移动路径）


### 创建线

#### 认识曲线

> 样条曲线、贝塞尔曲线（二次贝塞尔曲线，三次贝塞尔曲线）[参考资料](https://blog.csdn.net/u014291990/article/details/103327514)
> 通过调用threejs样条曲线或贝塞尔曲线的API，你可以输入有限个顶点返回更多顶点，然后绘制一条光滑的轮廓曲线。

我们这里使用 三维三次贝塞尔曲线（CubicBezierCurve3），如下图：

![img](https://img-blog.csdnimg.cn/20191130182451257.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQyOTE5OTA=,size_16,color_FFFFFF,t_70)

```js
const curve = new THREE.CubicBezierCurve3(
  new THREE.Vector3( -10, 0, 0 ), // 起点
  new THREE.Vector3( -5, 15, 0 ), // 控制点 1
  new THREE.Vector3( 20, 15, 0 ), // 控制点 2
  new THREE.Vector3( 10, 0, 0 ) // 终点
);

// getPoints 是基类Curve的方法，返回一个vector3对象作为元素组成的数组
const points = curve.getPoints( 50 );

// setFromPoints 方法从points中提取数据改变几何体的顶点属性vertices
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );

```

<!-- #### 创建项目目标 -->


#### 项目使用

>

```js
// 起始点
const vectorSrc = getVector(srcLat, srcLng)

// 结束点
const vectorDes = getVector(desLat, desLng)

···

// 克隆两点
const controlVectorSrc = vectorSrc.clone()
const controlVectorDes = vectorDes.clone()

// 创建中间点
// 创建向量原点 (0,0,0) 到 (x,y,z) 的距离，方向也是从原点
const controlX = 0.5 * (vectorSrc.x + vectorDes.x)
···
const midPoint = new THREE.Vector3(controlX, controlY, controlZ)

// setLength 将以原点到当前向量的线段等比例缩放到参数所指定的长度
// 配置的 smoothDist 曲线支点向量的长度
midPoint.setLength(smoothDist)

// add 本向量 加 参数向量
// 向量相加 平行四边形定则，公共起点（即原点）的两个向量相加，结果为平行四边形的对角线
controlVectorDes.add(midPoint)
controlVectorSrc.add(midPoint)

···
controlVectorDes.setLength(smoothDist)
controlVectorSrc.setLength(smoothDist)

const curve = new THREE.CubicBezierCurve3(
  vectorSrc,
  controlVectorSrc,
  controlVectorDes,
  vectorDes
)
```

#### 经纬度转换

```js
export const getVector = (lat, lng) => {
  const phi = (lat * Math.PI) / 180
  const theta = ((lng + 90) * Math.PI) / 180

  const distance = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor

  const x = distance * Math.cos(phi) * Math.sin(theta)
  const y = distance * Math.sin(phi)
  const z = distance * Math.cos(phi) * Math.cos(theta)
  const vector = new THREE.Vector3(x, y, z)

  return vector
}
```


### 线上移动的点

> 创建航线上的点：创建球的几何网孔数组，遍历赋值线上的点的坐标，
> 定时更新位置来达到球体运动的现象

#### 创建线上点

```js
const createMover = () => {
  const geometry = new THREE.SphereGeometry(100 * zoomFactor, 40, 30)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const mesh = new THREE.Mesh(geometry, material)

  movingPoints.push(mesh)

  threedObj.add(mesh)
}
```

#### 移动的点

```js
export const updatePathMover = () => {
  let pt
  movingPoints.forEach((each, i) => {
    // getPoint(t, optionTarget)
    // t - A position on the curve. Must be in the range [ 0, 1 ]
    pt = paths[i].getPoint(t)
    each.position.set(pt.x, pt.y, pt.z)

    // .lookAt ( vector : Vector3 ) : BufferGeometry
    // vector - A world vector to look at.
    each.lookAt(pt.x, pt.y, pt.z)
  })
  t = ((t >= 1) ? 0 : t + 0.002)
}
```

### 线上光缆移动

#### 创建光缆

```js
const drawAnimatedPath = () => { // 光缆
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({
    color: getColor(getRandomInt(0, 1000)),
    linewidth: 50,
    transparent: true,
    opacity: 1
  })

  curveObj = new THREE.Line(geometry, material)

  pathGeometry.push(geometry)

  threedObj.add(curveObj)
}
```

#### 移动光缆

```js
export const updateCurve = () => {
  let pt = ''
  pathGeometry.forEach((each, i) => {
    // 获取之前创建的线上的点集合，并截取一部分
    pt = paths[i].getPoints(50).slice(curveIndex, curveIndex + 20)


    pathGeometry[i].vertices = pt // 赋值顶点数据
    pathGeometry[i].verticesNeedUpdate = true // 顶点更新

    // needUpdate， 好多对象上都有这个属性
    // 简言之，告诉renderer要更新缓存了
  })

  const speed = 0.1 // 越大越快 范围 0～1
  curveIndex = ((curveIndex > 50) ? 0 : curveIndex + speed)
};
```
