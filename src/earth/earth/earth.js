/* eslint-disable */

import {
  TextureLoader,
  SphereGeometry,
  MeshLambertMaterial,
  Mesh,
} from "three";

import earthTexture from "../img/earth.png"

//添加地球贴图的Mesh到场景中
export const createEarthImageMesh = (radius) => {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new TextureLoader();
  //加载纹理贴图
  var texture = textureLoader.load(earthTexture);
  //创建一个球体几何对象
  var geometry = new SphereGeometry(radius, 96, 96);
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  var material = new MeshLambertMaterial({
    map: texture, //设置地球0颜色贴图map
    // color: 0x3F8693,
    transparent: true,
    opacity: 0.8
  });
  var mesh = new Mesh(geometry, material); //网格模型对象Mesh
  return mesh;
};
