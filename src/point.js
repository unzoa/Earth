import { getColor } from './lib/helpers.js'

let point = ''
let pointGeo = ''

const createPointUnit = () => {
  const geometry = new THREE.BoxGeometry(100 * zoomFactor, 100 * zoomFactor, 1);
  geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

  const mesh = new THREE.Mesh(geometry);
  return mesh;
};

const drawPoint = () => {
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
    morphTargets: false,
    transparent: true,
    opacity: 0.7
  });
  const points = new THREE.Mesh(pointGeo, mat);

  const angle = Math.PI
  points.rotation.y = angle

  threedObj.add(points);
};

const addPoint = (lat, lng, size, color) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((180 - lng) * Math.PI) / 180;

  const distance = (EARTH_RADIUS + ELEVATION_HEIGHT) * zoomFactor;

  point.position.x = distance * Math.sin(phi) * Math.cos(theta);
  point.position.y = distance * Math.cos(phi);
  point.position.z = distance * Math.sin(phi) * Math.sin(theta);

  point.lookAt(earth.position);

  point.scale.z = Math.max(size * zoomFactor * 5, zoomFactor);
  point.updateMatrix();

  point.geometry.faces.forEach((each, i) => {
    point.geometry.faces[i].color = color;
  });

  pointGeo.merge(point.geometry, point.matrix);
};

export const addData = (data) => {
  let lat;
  let lng;
  let size;
  let color;

  point = createPointUnit()
  pointGeo = new THREE.Geometry();

  Object.keys(data).forEach((key) => {
      lat = key.split(',')[0];
      lng = key.split(',')[1];
      size = data[key];
      color = getColor(size);
      addPoint(lat, lng, size, color);
  });

  drawPoint();
};