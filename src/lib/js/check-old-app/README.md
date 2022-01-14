# 检查app文件过期

> 线上项目更新后，用户需要主动刷新浏览器才能正常使用新版本系统，或正常使用。本模块会检查项目上vendors文件是否存在，继而刷新页面。

## 第一步 配置

> pcakage.json

```json
...
"script": {
  "build-v": "node src/lib/js/check-old-app/buildVersion.js",
  "build": "npm run build-v && node build/build.js",
}
...
```

## 第二步 运行

> 创建版本文件

```bash
npm run build-v
```

## 第三步 项目中使用

```js
// router.js

import checkOldApp from '@/lib/js/check-old-app/checkOldApp'

router.beforeEach((to, from, next) => {
  // cli3 当vuecli版本高于2，则需要传入 ture
  checkOldApp(cli3Bolean)

  next()
})
```
