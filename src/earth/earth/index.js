/* eslint-disable */
import * as THREE from 'three'
import { Object3D } from "three";
import { createEarthImageMesh } from "./earth";

// import { createEarthCloudImageMesh } from "./cloud";
import { earthGlow } from "./glow";
import { GlobalConfig } from "../config/index";
import { countryLine } from "./countryPolygon";
// import type { City, FlyData } from "../types/index";
import { getCityMeshGroup } from "./cityPoint";

import { earthAddFlyLine } from "./flyLine";
import lineObj from './darw-line/drawLine'

import Missile from './load-modles/missile'
import { lon2xyz, realHeight2raiuds14 } from "../tools/index";

import Girl from './load-modles/girl'

import earthGlowPng from "../img/earth_glow.png";
import earthGlowLightPng from "../img/earth_glow_light.png";

export const earth3dObj = () => {
  let object3D = new Object3D()

  const d = require('../data/trueData.json').data
  const lt = lineObj(object3D, d)

  let missileIndex = 0
  function addMissle () {
    const id = Object.keys(lt.flyArr)[missileIndex]
    const missileItem = new Missile()
    missileItem.init(
      id,
      (missileIndex + 1) * 3,
      missile => {
        missileIndex++

        if (missileIndex <= Object.keys(lt.flyArr).length) {
          object3D.add(missile)

          addMissle()
        }
      }
    )
  }
  addMissle()

  const btn = document.createElement('button')
  btn.onclick = () => {
    d.forEach(({arcid, info}) => {
      const tarMesh = lt.flyArr[arcid]
      if (tarMesh.len > info.length) {
        return false
      }

      tarMesh.len++

      const tarPoints =
        info
          .slice(0, tarMesh.len)
          .map(i => {
            return {
              h: i.hgt / 1000,
              lat: i.lat,
              lon: i.lon
            }
          })

      lt.addMissileLineSlowly(tarPoints, tarMesh)

      const i = tarPoints.slice(tarPoints.length - 3)[0]
      const point = lon2xyz(realHeight2raiuds14(i.h), i.lon, i.lat)

      const i2 = tarPoints.slice(tarPoints.length - 1)[0]
      const point2 = lon2xyz(realHeight2raiuds14(i2.h), i2.lon, i2.lat)

      const missileTar = object3D.children.find(m => m.name === (arcid + '-cube-outter'))

      const scaleVal = 0.2
      missileTar.scale.set(scaleVal, scaleVal, scaleVal)
      missileTar.position.set(point.x, point.y, point.z)
      missileTar.lookAt(point2.x, point2.y, point2.z)

    })

    console.log(object3D.children)
  }
  btn.innerHTML = 'test add line slowly'
  btn.style.position = 'fixed'
  btn.style.top = '0'
  btn.style.left = '0'
  document.body.appendChild(btn)

  let earthMesh = createEarthImageMesh(GlobalConfig.earthRadius);
  object3D.add(earthMesh);

  let glow = earthGlow(GlobalConfig.earthRadius,earthGlowPng,3.05);
  object3D.add(glow);

  let glowLight = earthGlow(GlobalConfig.earthRadius,earthGlowLightPng,3.15);
  object3D.add(glowLight);

  object3D.add(countryLine(GlobalConfig.earthRadius + 0.01));

  const girl = new Girl(object3D)
  girl.init('hasdahks')

  return { object3D }
}

export const a = ( cityList, flyLineData ) => {
  var object3D = new Object3D();

  let earthMesh = createEarthImageMesh(GlobalConfig.earthRadius);
  object3D.add(earthMesh);

  let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  object3D.add(cloudMesh);

  let glow = earthGlow(GlobalConfig.earthRadius,earthGlowPng,3.05);
  object3D.add(glow);

  let glowLight = earthGlow(GlobalConfig.earthRadius,earthGlowLightPng,3.15);
  object3D.add(glowLight);

  object3D.add(countryLine(GlobalConfig.earthRadius + 0.01));

  // 添加城市标注点和飞线
  if (cityList && flyLineData) {
    let {waveMeshArr,pointMeshArr} = getCityMeshGroup(cityList);
    for (let index = 0; index < waveMeshArr.length; index++) {
      const cityWaveMesh = waveMeshArr[index];
      const cityMesh = pointMeshArr[index];
      object3D.add(cityMesh);
      object3D.add(cityWaveMesh);
    }

    //添加飞线
    let flyManager = earthAddFlyLine(object3D,flyLineData,cityList)

    return { object3D, waveMeshArr, flyManager};
  }

  return { object3D };
};
