<template>
  <div class="Test">
    <h1 style="font-size: 55px">{{payload.text}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Test',

  // 模板依赖 (模板内使用的资源)

  components: {},

  // 组合 (向选项里合并 property)

  mixins: [],

  // 接口 (组件的接口)

  props: {
    payload: {
      type: Object,
      default: () => { }
    }
  },

  // 本地状态 (本地的响应式 property)

  data () {
    return {
    }
  },

  computed: {},

  // 事件 (通过响应式事件触发的回调)

  watch: {},

  created () { },

  mounted () {
  },

  // 其他生命周期钩子

  // 非响应式的 property (不依赖响应系统的实例 property)

  methods: {
  }
}
</script>

<style scoped lang="scss">
.Test {
  position: relative;
}
</style>
