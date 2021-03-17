/**
 * 引入航线数据
 * 使经纬度对应坐标系
 *
 * 改变线的颜色 在drawStaticPath()中
*/
import { getVector, map, getColor, getRandomInt } from './lib/helpers.js'

// 线
let t = 0
let curveObj = ''
const paths = [] // 线的集合
const movingPoints = [] // 航线上的移动点
const pathGeometry = []
let curveIndex = 0

const drawStaticPath = (curve) => {
  const geometry = new THREE.Geometry()
  geometry.vertices = curve.getPoints(50)
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 3,
    transparent: true,
    opacity: 0
  })

  const curveStatic = new THREE.Line(geometry, material)

  threedObj.add(curveStatic)
}

const drawAnimatedPath = (curve) => {
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({
    color: getColor(getRandomInt(0, 1000)),
    linewidth: 3,
    transparent: true,
    opacity: 0.5
  })

  curveObj = new THREE.Line(geometry, material)

  pathGeometry.push(geometry)
  threedObj.add(curveObj)
};

const addSinglePath = (data) => {
  const srcLat = data.srcLat
  const srcLng = data.srcLng
  const desLat = data.desLat
  const desLng = data.desLng

  const distance = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor

  const vectorSrc = getVector(srcLat, srcLng)
  const vectorDes = getVector(desLat, desLng)

  const dist = vectorSrc.distanceTo(vectorDes)

  const controlVectorSrc = vectorSrc.clone()
  const controlVectorDes = vectorDes.clone()

  const b = 0.5
  const controlX = b * (vectorSrc.x + vectorDes.x)
  const controlY = b * (vectorSrc.y + vectorDes.y)
  const controlZ = b * (vectorSrc.z + vectorDes.z)

  const midPoint = new THREE.Vector3(controlX, controlY, controlZ)
  let smoothDist = distance * map(dist, 0, 10, 0, (15 / dist))

  midPoint.setLength(smoothDist)

  controlVectorDes.add(midPoint)
  controlVectorSrc.add(midPoint)

  smoothDist += Math.PI / 4 * 2
  console.log(smoothDist)

  controlVectorDes.setLength(smoothDist)
  controlVectorSrc.setLength(smoothDist)

  const curve = new THREE.CubicBezierCurve3(vectorSrc, controlVectorSrc, controlVectorDes, vectorDes)
  paths.push(curve)

  drawStaticPath(curve)
  drawAnimatedPath(curve)
}

const createMover = () => {
  const geometry = new THREE.SphereGeometry(100 * zoomFactor, 40, 30)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const mesh = new THREE.Mesh(geometry, material)

  movingPoints.push(mesh)
  threedObj.add(mesh)
}

export const addPathData = (data) => {
  data.forEach((each) => {
    addSinglePath(each)
    createMover()
  })
}

export const updatePathMover = () => {
  let pt
  movingPoints.forEach((each, i) => {
    pt = paths[i].getPoint(t)
    each.position.set(pt.x, pt.y, pt.z)
    each.lookAt(pt.x, pt.y, pt.z)
  })
  t = ((t >= 1) ? 0 : t + 0.002)
}

export const updateCurve = () => {
  let pt;
  pathGeometry.forEach((each, i) => {
    pt = paths[i].getPoints(50).slice(curveIndex, curveIndex + 20);
    pathGeometry[i].vertices = pt;
    pathGeometry[i].verticesNeedUpdate = true;
  });
  curveIndex = ((curveIndex > 50) ? 0 : curveIndex + 1);
};
