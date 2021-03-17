import coordinates from '../static/globePathMock.js'
import pointData from '../static/globeSizeMock.js'
import { baseBuild, controls } from './base.js'
import { buildLights } from './light.js'
import { BuildEarth } from './earth.js'
import { drawWorldMap } from './lib/drawWorldMap.js'
import { addPathData, updatePathMover, updateCurve } from './lines.js'
import { addData } from './point.js'
import { createGalaxy } from './buildGalaxy.js'
import buildMoon from './moon.js'
import { bindResizeEventListener } from './listener.js'

function convertCoord () {
  let obj = {}
  let arr = coordinates.map(i => {
    return [`${i.srcLat},${i.srcLng}`, `${i.desLat},${i.desLng}`]
  }).flat(1)
  arr.forEach(i => {
    obj[i] = Math.random() * 1000
  })
  return obj
}

baseBuild()
controls()
// createGalaxy()
buildLights(threedObj)

drawWorldMap(threedObj, EARTH_RADIUS * zoomFactor)
BuildEarth()
let moon = buildMoon()

addPathData(coordinates)
addData(convertCoord())
bindResizeEventListener()

// 坐标系---
var axes = new THREE.AxesHelper(300);
// scene.add(axes)

// 启动
function animate () {
  requestAnimationFrame(() => {
  	animate()
  });

  cameraControls.update(); // orbitcontrols

  updatePathMover()
  updateCurve()

  threedObj.rotation.y += 0.001
  // threedObj.rotation.x += 0.006 * Math.random()
  moon.rotation.y += 0.001

  renderer.render(scene, camera)
}
animate()
