# [vue-code-diff](https://www.npmjs.com/package/vue-code-diff)
> 代码比对展示

## 安装
```shell
npm instal vue-code-diff --save-dev
```

## 由于插件使用了id="app"问题
> 项目本身使用app，并且有耦合的样式。
此时需要将node_modules中的模块修改id的值，并对模块包执行npm run build打包
重新启动本项目即可

## 使用
```vue
<template>
  <div>
    <vue-code-diff :old-string="oldStr" :new-string="newStr" :context="10" />
  </div>
</template>

import CodeDiff from 'vue-code-diff'
export default {
  components: {CodeDiff},
  data(){
    return {
      oldStr: 'old code',
      newStr: 'new code'
    }
  }
}
```

## 参数说明

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| old-string| 陈旧的字符串| string  |   —    |    —     |
| new-string| 新的字符串| string  |   —    |    —     |
| context| 不同地方上下间隔多少行不隐藏 | number  |   —    |    —     |
| outputFormat| 展示的方式 | string  |   line-by-line，side-by-side    |    line-by-line     |
