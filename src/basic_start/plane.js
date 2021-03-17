// 飞机形状(不想画的，可以下载个 飞机模型 使用加载器加载进来)
var planeShape = new THREE.Shape();
planeShape.moveTo( 0, 0);
planeShape.lineTo(0.2, -0.2);
planeShape.lineTo(0.2, -1.3);
planeShape.lineTo(1.6,-2.7);
planeShape.lineTo(1.6,-3);
planeShape.lineTo(0.2, -2.1);
planeShape.lineTo(0.2, -3);
planeShape.lineTo(0.5, -3.4);
planeShape.lineTo(0.5, -3.7);
planeShape.lineTo(0, -3.3);
planeShape.lineTo(-0.5, -3.7);
planeShape.lineTo(-0.5, -3.4);
planeShape.lineTo(-0.2, -3);
planeShape.lineTo(-0.2, -2.1);
planeShape.lineTo(-1.6,-3);
planeShape.lineTo(-1.6,-2.7);
planeShape.lineTo(-0.2, -1.3);
planeShape.lineTo(-0.2, -0.2);

export var planeGeometry = new THREE.ShapeGeometry(planeShape);

// 飞机材质
export var planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x0FB4DD,
  side: THREE.DoubleSide,
  depthTest: false // 作用是能否透过球体看到飞机，如果是false则旋转到球体另一面也能看到飞机
});
