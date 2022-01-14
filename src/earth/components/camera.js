/* eslint-disable */

import { PerspectiveCamera } from "three";

export default (width, height)=>{
  let aspect = width / height;
  let camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
  camera.position.set(30, 26, 10);

  return camera
}

