/* eslint-disable*/

import { lon2xyz, realHeight2raiuds14 } from "../../tools/index";

import {
  Vector3,
  CatmullRomCurve3,
  Mesh,
  TubeGeometry,
  MeshLambertMaterial
} from "three";

export default class InitFlyLine {
  constructor( earth ) {
    this.flyArr = {}; //存储所有飞线
    this.earth = earth
  }

  init (d) {
    d.forEach(({info, arcid}) => {
      this.earth.add(
        this.drawMissileLine(info, arcid)
      )
    })
  }

  getCurve (points) {
    let curvePoints = []

    points.forEach(i => {
      const point = lon2xyz(realHeight2raiuds14(i.h), i.lon, i.lat)
      curvePoints.push(new Vector3(point.x, point.y, point.z))
    })

    const curve = new CatmullRomCurve3( curvePoints, false );

    return curve
  }

  drawMissileLine (points, arcid) {
    let curvePoints = []

    points.forEach(i => {
      const point = lon2xyz(realHeight2raiuds14(i.h), i.lon, i.lat)
      curvePoints.push(new Vector3(point.x, point.y, point.z))
    })

    const curve = new CatmullRomCurve3( curvePoints, false );
    const curveObject = this.addTube(curve)
    curveObject.len = points.length
    curveObject.arcid = arcid

    this.flyArr[arcid] = curveObject

    return curveObject
  }

  addTube (curve) {
    const geometry = new TubeGeometry( curve, 200, 0.05, 8, false );
    const material = new MeshLambertMaterial( {
      emissive: 0xff0000,
      wireframe: true,
      vertexColors: true,
      reflectivity: 1,
      refractionRatio: 0.98
    } );
    const mesh = new Mesh( geometry, material );
    return mesh
  }

  addMissileLineSlowly (tarPoints, tarMesh) {
    this.remove(tarMesh)

    const newMesh = this.drawMissileLine(tarPoints, tarMesh.arcid)
    this.earth.add(newMesh)
  }

  remove (mesh) {
    mesh.material.dispose();
    mesh.geometry.dispose();
    delete this.flyArr[mesh.arcid]
    mesh.parent.remove(mesh);
    mesh = null;
  }

  animation (delta = 0.015) {
    // this.addMissileLineSlowly()

    // if (delta > 0.2) return;

    // this.flyArr.forEach(elem => {
    //     if (!elem.parent) return;

    //     if (elem._been > elem._repeat) {
    //         elem.visible = false;

    //         if (typeof elem._callback === 'function') {
    //             elem._callback(elem);
    //         }
    //         // this.remove(elem)
    //     } else {
    //         let uniforms = elem.material.uniforms;
    //         //完结一次
    //         if (uniforms.time.value < elem._total) {
    //             uniforms.time.value += delta * (this.baicSpeed / delta) * elem._speed;
    //         } else {
    //             elem._been += 1;
    //             uniforms.time.value = -uniforms.u_len.value;
    //         }
    //     }
    // })
  }

  // addLine ({from, to}) {
  //   const fromXyz = lon2xyz(GlobalConfig.earthRadius, from.longitude, from.latitude);
  //   const toXyz = lon2xyz(GlobalConfig.earthRadius, to.longitude, to.latitude);

  //   let coefficient = 1
  //   let curvePoints = new Array()

  //   // start posi
  //   curvePoints.push(new Vector3(fromXyz.x, fromXyz.y, fromXyz.z))

  //   // more points on line
  //   const distanceDivRadius =
  //     Math.sqrt(
  //       (fromXyz.x - toXyz.x) * (fromXyz.x - toXyz.x) +
  //       (fromXyz.y - toXyz.y) * (fromXyz.y - toXyz.y) +
  //       (fromXyz.z - toXyz.z) * (fromXyz.z - toXyz.z)
  //     ) / GlobalConfig.earthRadius;

  //   const partCount = 3 + Math.ceil(distanceDivRadius * 3);

  //   for (let i = 0; i < partCount; i++) {
  //     const partCoefficient = coefficient + (partCount - Math.abs((partCount - 1) / 2 - i)) * 0.01;

  //     const partTopXyz = this.getPartTopPoint(
  //       {
  //         x:
  //           (fromXyz.x * (partCount - i)) / partCount +
  //           (toXyz.x * (i + 1)) / partCount,
  //         y: (fromXyz.y * (partCount - i)) / partCount + (toXyz.y * (i + 1)) / partCount,
  //         z:
  //           (fromXyz.z * (partCount - i)) / partCount +
  //           (toXyz.z * (i + 1)) / partCount,
  //       },

  //       GlobalConfig.earthRadius,

  //       partCoefficient
  //     )

  //     curvePoints.push(new Vector3(partTopXyz.x, partTopXyz.y, partTopXyz.z));
  //   }

  //   // end posi
  //   curvePoints.push(new Vector3(toXyz.x, toXyz.y, toXyz.z));

  //   const curve = new CatmullRomCurve3( curvePoints, false );
  //   const pointCount = Math.ceil(500 * partCount);
  //   const points = curve.getPoints( pointCount );

  //   // const geometry = new BufferGeometry().setFromPoints( points );
  //   // const material = new LineBasicMaterial( {
  //   //   color : 0xff0000,
  //   //   linewidth: 100
  //   // } );
  //   // const curveObject = new Points( geometry, material );

  //   // return curveObject

  //   // const curveObject = this.beautyLine(points)
  //   const curveObject = this.addTube(curve)
  //   return curveObject
  // }

  // getPartTopPoint (
  //   innerPoint, // { x: number; y: number; z: number }
  //   earthRadius, // number,
  //   partCoefficient, // number
  // ) {
  //   var fromPartLen = Math.sqrt(
  //     innerPoint.x * innerPoint.x +
  //       innerPoint.y * innerPoint.y +
  //       innerPoint.z * innerPoint.z
  //   );

  //   return {
  //     x: (innerPoint.x * partCoefficient * earthRadius) / fromPartLen,
  //     y: (innerPoint.y * partCoefficient * earthRadius) / fromPartLen,
  //     z: (innerPoint.z * partCoefficient * earthRadius) / fromPartLen,
  //   };
  // };

  // beautyLine (
  //   curve,
  //   color = 'rgba(255, 147, 0, 1)', //点的颜色
  //   width = 0.3, //点的半径
  //   length = curve.length // Math.ceil((allPoints.length * 3) / 5), //飞线的长度（点的个数）
  //   // speed = partCount + 1, //飞线的速度
  //   // repeat = 1 //循环次数
  // ) {
  //   const colorArr = this.getColorArr(color)
  //   const geometry = new BufferGeometry() // .setFromPoints( curve );
  //   const material = new ShaderMaterial({
  //       uniforms: {
  //           color: {
  //               value: colorArr[0],
  //               type: "v3"
  //           },
  //           size: {
  //               value: width,
  //               type: "f"
  //           },
  //           u_map: {
  //               value: new TextureLoader().load(pointPng),
  //               type: "t2"
  //           },
  //           u_len: {
  //             value: length,
  //             type: "f"
  //           },
  //           u_opacity: {
  //               value: colorArr[1],
  //               type: "f"
  //           },
  //           time: {
  //               value: -length,
  //               type: "f"
  //           },
  //           isTexture: {
  //               value: 1.0,
  //               type: "f"
  //           }
  //       },
  //       // uniforms: {
  //       //   size: {
  //       //       value: width,
  //       //       type: "f"
  //       //   },
  //       //   time: {
  //       //     value: length,
  //       //     type: "f"
  //       //   }
  //       // },
  //       transparent: false,
  //       depthTest: true,
  //       vertexShader: flyShader.vertexshader,
  //       fragmentShader: flyShader.fragmentshader
  //   });

  //   const material2 = new PointsMaterial( {
  //     color: 0xffffff,
  //     map: new TextureLoader().load(pointPng),
  //     size: 0.5,
  //     sizeAttenuation: true
  //   } );

  //   const [position, u_index] = [
  //       [],
  //       []
  //   ];

  //   curve.forEach(function (elem, index) {
  //     position.push(elem.x, elem.y, elem.z);
  //     u_index.push(index);
  //   })

  //   geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
  //   let mesh = new Points(geometry, material2);

  //   this.flyArr.push(mesh)
  //   return mesh
  // }

  // color (c) {
  //   return new Color(c);
  // }

  // getColorArr (str) {
  //   if (Array.isArray(str)) return str; //error
  //   var _arr = [];
  //   str = str + '';
  //   str = str.toLowerCase().replace(/\s/g, "");
  //   if (/^((?:rgba)?)\(\s*([^\)]*)/.test(str)) {
  //       var arr = str.replace(/rgba\(|\)/gi, '').split(',');
  //       var hex = [
  //           pad2(Math.round(arr[0] * 1 || 0).toString(16)),
  //           pad2(Math.round(arr[1] * 1 || 0).toString(16)),
  //           pad2(Math.round(arr[2] * 1 || 0).toString(16))
  //       ];
  //       _arr[0] = this.color('#' + hex.join(""));
  //       _arr[1] = Math.max(0, Math.min(1, (arr[3] * 1 || 0)));
  //   } else if ('transparent' === str) {
  //       _arr[0] = this.color();
  //       _arr[1] = 0;
  //   } else {
  //       _arr[0] = this.color(str);
  //       _arr[1] = 1;
  //   }

  //   function pad2(c) {
  //       return c.length == 1 ? '0' + c : '' + c;
  //   }
  //   return _arr;
  // }
}