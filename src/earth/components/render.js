/* eslint-disable */

import { WebGLRenderer,PCFShadowMap } from "three";

export default (width, height)=>{
  let renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.setSize(width,height)

  return renderer
}
