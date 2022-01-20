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

// const TWEEN = require("@tweenjs/tween.js");

export const earth3dObj = (
  cityList,
  flyLineData
) => {
  var object3D = new Object3D();
  // let earthMesh = createEarthImageMesh(GlobalConfig.earthRadius);
  // let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  // object3D.add(cloudMesh);
  // let glow = earthGlow(GlobalConfig.earthRadius,earthGlowPng,3.05);
  // let glowLight = earthGlow(GlobalConfig.earthRadius,earthGlowLightPng,3.15);
  // object3D.add(countryLine(GlobalConfig.earthRadius + 0.01));
  // object3D.add(earthMesh);
  // object3D.add(glow);
  // object3D.add(glowLight);

  // 添加城市标注点和飞线
  if (cityList && flyLineData) {
    // let {waveMeshArr,pointMeshArr} = getCityMeshGroup(cityList);
    // for (let index = 0; index < waveMeshArr.length; index++) {
    //   const cityWaveMesh = waveMeshArr[index];
    //   const cityMesh = pointMeshArr[index];
    //   object3D.add(cityMesh);
    //   object3D.add(cityWaveMesh);
    // }

    //添加飞线
    // let flyManager = earthAddFlyLine(object3D,flyLineData,cityList)

    class Item {
      constructor (obj, id) {
        // const geometry1 = new THREE.SphereGeometry( 1, 32, 16 );
        // const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        // const sphere = new THREE.Mesh( geometry1, material1 );
        // sphere.position.set(10,10,10)
        // object3D.add( sphere );

        const geometry = new THREE.BoxGeometry( 1, 1, 4 );
        const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        const cube = new THREE.Mesh( geometry, material );
        cube.name = id
        obj.add( cube );
        // cube.position.set(5,5,5)
        // cube.lookAt(sphere.position)
      }
    }

    const d = require('../data/trueData.json').data
    const lt = lineObj(object3D, d)

    Object.entries(lt.flyArr).forEach(([id, mesh]) => {
      // const missile = new Missile(object3D)
      // missile.init(id)
      // const girlA = new Girl(object3D)
      // girlA.init(id)

      new Item(object3D, id)
    })


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

        const i = tarPoints.slice(tarPoints.length - 30)[0]
        const point = lon2xyz(realHeight2raiuds14(i.h), i.lon, i.lat)

        const i2 = tarPoints.slice(tarPoints.length - 1)[0]
        const point2 = lon2xyz(realHeight2raiuds14(i2.h), i2.lon, i2.lat)

        const missileTar = object3D.children.find(m => m.name === arcid)
        const scaleVal = 0.2
        missileTar.scale.set(scaleVal, scaleVal, scaleVal)
        missileTar.position.set(point.x, point.y, point.z)
        console.log(missileTar)
        missileTar.lookAt(point2.x, point2.y, point2.z)

      })
    }
    btn.innerHTML = 'test add line slowly'
    btn.style.position = 'fixed'
    btn.style.top = '0'
    btn.style.left = '0'

    document.body.appendChild(btn)

    return { object3D } // , waveMeshArr, flyManager};
  }

  return { object3D };
};
