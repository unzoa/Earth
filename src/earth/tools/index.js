/* eslint-disable */

export const lon2xyz = (
  radius,
  longitude,
  latitude
) => {
  var lon = (longitude * Math.PI) / 180; //转弧度值
  var lat = (latitude * Math.PI) / 180; //转弧度值
  lon = -lon; // three.js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  var x = radius * Math.cos(lat) * Math.cos(lon);
  var y = radius * Math.sin(lat);
  var z = radius * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return {
    x: x,
    y: y,
    z: z,
  };
};
