/* eslint-disable */

import * as THREE from "three";

import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { controlConfig } from "./config/index";

// components
import initRender from "./components/render";
import initRender2D from "./components/render2d";
import initScene from "./components/scene";
import initCamera from "./components/camera";
import initLight from "./components/light";
import starBackground from "./components/starBg";

import { earth3dObj } from "./earth/index";
import { cityWaveAnimate } from "./earth/cityPoint";

import { InitFlyLine } from "./tools/flyLine";
import { GlobalConfig } from "./config";

const TWEEN = require("@tweenjs/tween.js");

// const EarthConfigProps = {
//   earthRadius: 6400, // GlobalConfig.earthRadius,
//   autoRotate: true,
//   zoomChina: true,
//   starBackground: false,
//   orbitControlConfig:{
//     enableZoom:false,
//     enableRotate:false
//   }
// }

class Earth {
  width = 0 // : number;
  height = 0 // : number;
  parentDom = HTMLElement;
  renderer = THREE.WebGLRenderer;
  renderer2d = CSS2DRenderer;
  scene = THREE.Scene;
  camera = THREE.PerspectiveCamera;
  orbitControl = OrbitControls;
  earth3dObj = THREE.Object3D;
  earthConfig = {} // EarthConfigProps;
  waveMeshArr = THREE.Mesh;
  //城市列表
  cityList = null // ?: Record<string, City>;
  //飞线数据
  flyLineData = [] //?: FlyData[];
  //飞线管理
  flyManager = null //: InitFlyLine = null;

  constructor (
    containerId = '', // : string,
    //地球飞线城市坐标点
    cityList = [], // ?: Record<string, City>,
    //飞线数据
    flyLineData = [], // ?: FlyData[],
    // config: EarthConfigProps = {
    config = {} // EarthConfigProps
  ) {
    this.parentDom = document.getElementById(containerId);
    this.width = this.parentDom.offsetWidth;
    this.height = this.parentDom.offsetHeight;
    this.cityList = cityList;
    this.flyLineData = flyLineData;
    GlobalConfig.earthRadius = config.earthRadius ?? GlobalConfig.earthRadius;
    // this.earthConfig = config;
    this.init();
  }

  load = () => {
    // if (this.earthConfig.starBackground) {
    //   this.scene.add(starBackground());
    // }
    let { object3D, waveMeshArr, flyManager } = earth3dObj(
      this.cityList,
      this.flyLineData
    );
    this.earth3dObj = object3D;
    this.waveMeshArr = waveMeshArr;
    this.flyManager = flyManager;
    this.scene.add(this.earth3dObj);

    const axes = new THREE.AxesHelper(300)
    this.scene.add(axes)

    // if (this.earthConfig.autoRotate && this.earthConfig.zoomChina) {
    //   this.autoRotateEarth();
    // }

    this.animate();
    // this.autoRotateEarth();
  };

  /**
   * @description: 初始化 threeJS 环境
   * @param {*}
   * @return {*}
   */
  init() {
    this.renderer = initRender(this.width, this.height);
    this.renderer2d = initRender2D(this.width, this.height);

    this.parentDom.appendChild(this.renderer.domElement);
    this.parentDom.appendChild(this.renderer2d.domElement);

    this.scene = initScene();
    this.camera = initCamera(this.width, this.height);
    initLight(this.scene);

    const orbitControl = new OrbitControls(
      this.camera,
      this.renderer2d.domElement
    );
    orbitControl.minZoom = controlConfig.minZoom;
    orbitControl.maxZoom = controlConfig.maxZoom;
    orbitControl.minPolarAngle = controlConfig.minPolarAngle;
    orbitControl.maxPolarAngle = controlConfig.maxPolarAngle;
    // orbitControl.enableRotate = this.earthConfig.orbitControlConfig.enableRotate;
    // orbitControl.enableZoom = this.earthConfig.orbitControlConfig.enableZoom;

    orbitControl.update();
    this.orbitControl = orbitControl;
  }

  /**
   * @description: 地球自动旋转
   * @param {*}
   * @return {*}
   */
  autoRotateEarth () {
    const startRotateY = (3.15 * Math.PI) / 2;
    const startZoom = -18;
    const endRotateY = 3.3 * Math.PI;
    const endZoom = 4;

    var that = this;

    //旋转地球动画
    var rotateEarthStep = new TWEEN.Tween({
      rotateY: startRotateY,
      zoom: startZoom,
    })
      .to({ rotateY: endRotateY, zoom: endZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function (object) {
        if (that.earth3dObj) {
          that.earth3dObj.rotation.set(0, object.rotateY, 0);
        }
        // (that.orbitControl as any).zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.reset();
      });

    var rotateEarthStepBack = new TWEEN.Tween({
      rotateY: endRotateY,
      zoom: endZoom,
    })
      .to({ rotateY: 3.15 * Math.PI * 2, zoom: startZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function (object) {
        if (that.earth3dObj) {
          that.earth3dObj.rotation.set(0, object.rotateY, 0);
        }
        // (that.orbitControl as any).zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.reset();
      });

    rotateEarthStep.chain(rotateEarthStepBack);
    rotateEarthStepBack.chain(rotateEarthStep);

    rotateEarthStep.start();
  }

  /**
   * @description: 帧变化需要做的动画
   * @param {*}
   * @return {*}
   */

  animate = () => {
    // if (this.waveMeshArr) {
    //   cityWaveAnimate(this.waveMeshArr);
    // }

    requestAnimationFrame(this.animate);

    //只是自转，不需要缩放到中国
    // if (this.earth3dObj) {
    //   if (this.earthConfig.autoRotate && !this.earthConfig.zoomChina) {
    //     this.earth3dObj.rotation.y += 0.005;
    //   }
    // }
    this.renderer.render(this.scene, this.camera);
    // this.afterAnimate();
  };

  afterAnimate = () => {
    TWEEN.update();
    //飞线更新，这句话一定要有
    if (this.flyManager != null) {
      this.flyManager.animation();
    }
  };
}

export default Earth;
