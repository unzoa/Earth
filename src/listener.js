const handleWindowResize = () => {
  let ww = window.innerWidth
  let hh = window.innerHeight
  camera.aspect = ww / hh
  camera.updateProjectionMatrix()
  renderer.setSize(ww, hh)
}

export const bindResizeEventListener = () => {
  window.addEventListener('resize', handleWindowResize, false)
}
