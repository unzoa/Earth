function animate (tar) {
  requestAnimationFrame(() => {
    animate(tar)
  });

  // tar.rotation.x += 0.01;
  tar.rotation.y += 0.01;

  renderer.render(scene, camera);
}