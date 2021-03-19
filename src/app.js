import coordinates from '../static/globePathMock.js'

import { baseBuild, controls } from './main/base.js'
import { buildLights } from './main/light.js'
import { bindResizeEventListener } from './main/listener.js'

// 地球
import { BuildEarth } from './view/earth/earth.js'
import { addPathData, updatePathMover, updateCurve } from './view/earth/lines.js'
import { addData } from './view/earth/point.js'
import { drawWorldMap } from './lib/drawWorldMap.js'

import { createGalaxy } from './view/buildGalaxy.js'
import buildMoon from './view/moon.js'

// 火球
import material from './view/fireBall/shader2.js'
import FireBall from './view/fireBall/fireBall.js'

import galaxy from './view/sketchfab/galaxy.js'

import cimu from './view/CiMuTongZi/cimu.js'

function convertCoord (coords = coordinates) {
  let obj = {}
  let arr = coords.map(i => {
    return [`${i.srcLat},${i.srcLng}`, `${i.desLat},${i.desLng}`]
  }).flat(1)
  arr.forEach(i => {
    obj[i] = 100 // Math.random() * 1000
  })
  return obj
}

// main
baseBuild()
controls()
buildLights()
bindResizeEventListener()

// view
// createGalaxy()
galaxy()
// cimu()

// earth
drawWorldMap(threedObj, EARTH_RADIUS * zoomFactor)
BuildEarth()
addData(convertCoord()) // points
addPathData(coordinates) // lines

FireBall()
let moon = buildMoon()

// 坐标系---
var axes = new THREE.AxesHelper(300)
// scene.add(axes)

// 启动
function animate () {
  requestAnimationFrame(() => { animate() })

  cameraControls.update() // orbitcontrols

  updatePathMover()
  updateCurve()

  threedObj.rotation.y += 0.001

  moon.rotation.y += 0.001

  galaxyObj && (galaxyObj.rotation.y += 0.001)

  material.uniforms[ 'time' ].value += .001

  renderer.render(scene, camera)
}
animate()
