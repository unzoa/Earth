# 绘制国家轮廓

> 应用了 threeGeoJSON.js, 构造函数THREEGeoJSONGlobeMap()

```js
export function drawWorldMap(tar, radius) {
  fetch("/static/world-countries.json")
    .then(r => { return r.json() })
    .then(data => {
      var mapDrawer = new THREEGeoJSONGlobeMap()
      var boundaries = mapDrawer.drawThreeGeo(data, radius, 'sphere', {
        color: 0xCCE563,
        transparent: true,
        opacity: 0.5
      })

      const angle = Math.PI / 2
      boundaries.rotation.y = angle

      boundaries.scale.set(1.1, 1.1, 1.1)

      tar.add(boundaries)
  });
}
```