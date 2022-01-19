/* eslint-disable */

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

import earthGlowPng from "../img/earth_glow.png";
import earthGlowLightPng from "../img/earth_glow_light.png";

export const earth3dObj = (
  cityList,
  flyLineData
) => {
  var object3D = new Object3D();
  let earthMesh = createEarthImageMesh(GlobalConfig.earthRadius);
  // let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  // object3D.add(cloudMesh);
  let glow = earthGlow(GlobalConfig.earthRadius,earthGlowPng,3.05);
  let glowLight = earthGlow(GlobalConfig.earthRadius,earthGlowLightPng,3.15);
  object3D.add(countryLine(GlobalConfig.earthRadius + 0.01));
  object3D.add(earthMesh);
  object3D.add(glow);
  // object3D.add(glowLight);

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

    const d = require('../data/trueData.json').data
    const lt = lineObj(object3D, d)

    const btn = document.createElement('button')
    btn.onclick = () => {
      d.forEach(({arcid, info}) => {
        const tarMesh = lt.flyArr[arcid]
        if (tarMesh.len > info.length) {
          return false
        }

        tarMesh.len++

        const tarPoints = info
          .slice(0, tarMesh.len)
          .map(i => {
            return {
              h: i.hgt / 1000,
              lat: i.lat,
              lon: i.lon
            }
          })
        lt.addMissileLineSlowly(tarPoints, tarMesh)
      })
    }
    btn.innerHTML = 'test add line slowly'
    btn.style.position = 'fixed'
    btn.style.top = '0'
    btn.style.left = '0'

    document.body.appendChild(btn)

    return { object3D, waveMeshArr, flyManager};
  }

  return { object3D };
};
