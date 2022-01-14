/* eslint-disable */

import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default (width, height)=>{
  const renderer2d = new CSS2DRenderer();
  renderer2d.setSize(width,height)
  renderer2d.domElement.style.position = "absolute";
  renderer2d.domElement.style.top = "0px";
  renderer2d.domElement.tabIndex = 0;
  renderer2d.domElement.className = "coreInnerRenderer2d";

  return renderer2d
}
