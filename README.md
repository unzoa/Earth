# vue-2.x

## node-sass 安装问题

```bash
# 使用淘宝镜像
npm i -D node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
```

## public/static/ [使用]

import 使用相对路径
在js函数中 ./static
template中 /static

## 211012 梳理架构

- public/
  - static/
    - submodule:vendor/
    - submodule:fonts/
- src/
  - asstes/
    - css/
      - color.scss [公用颜色，css用公用变量，js用import方式引用:export导出的变量]
  - submodule:lib/
  - config/
    - projectA/ [为了统一管理对应项目的相关配置]
      - api [（必需）统一配置api并注释]
      - router.js [（必需）]
      - routeName.js [（非必需）配合router的meta，配合menu的中文]
      - menu.js [（非必需）配合el-menu菜单，在对应组件中引用project]
      - static.js [（非必需）公用静态资源，全局注册静态资源]
      - index.js [注册模块]
    - pro.js [当前项目索引]
    - rpLib.js [引用并注册lib中需要全局使用的模块]
    - index.js [注册公共模块，注册对应项目]
- vue.config.js [cli相关配置]
- .eslintrc.js [配置eslint规则]
