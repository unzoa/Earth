<template>
  <div class="earth-wrapper">
    <div
      id="g"
      style="width: 100vw; height: 100vh; background-color: black"
    ></div>
  </div>
</template>

<script>
import Earth from '../../three-earth/app'
import {
  cityList,
  bizLines
} from './data'

export default {
  name: 'EarthComponent',

  // 模板依赖 (模板内使用的资源)

  components: {},

  // 组合 (向选项里合并 property)

  mixins: [],

  // 接口 (组件的接口)

  props: [],

  // 本地状态 (本地的响应式 property)

  data () {
    return {}
  },

  computed: {},

  // 事件 (通过响应式事件触发的回调)

  watch: {},

  created () {},

  mounted () {
    const e = new Earth(
      'g',
      cityList,
      bizLines,
      {
        autoRotate: true,
        zoomChina: false,
        starBackground: true,
        orbitControlConfig: {
          enableRotate: true
        }
      }
    )
    e.load()
  },

  // 其他生命周期钩子

  // 非响应式的 property (不依赖响应系统的实例 property)

  methods: {}
}
</script>

<style scoped lang="scss">
  .earth-wrapper {
    position: relative;
  }
</style>
