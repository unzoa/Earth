<template>
  <div class="v-echart">
    <!-- <p v-if="!Object.keys(options).length">无数据</p> -->
    <p v-if="emptyText">{{emptyText}}</p>

    <div
      :class="className"
      class="no-print"
      style="width: 100%; height: 100%;"
      ></div>
  </div>
</template>

<script type="text/javascript">
/* eslint-disable */
import echarts from 'echarts'
import world from 'echarts/map/js/world'

let chartObj = {}

export default {
  name: 'VEchart',

  props: {
    className: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => { }
    },
    notClearBol: {
      type: Boolean,
      default: false
    },
    notResizeRouteList: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      emptyText: '加载中...'
    }
  },

  watch: {
    options (op) {
      this.init(op, true)
    }
  },

  methods: {
    init (op, watchEnd = false) {
      if (Object.keys(op).length) {
        this.emptyText = ''
        this.draw(op)
      } else {
        // 是一个异步请求时，mounted中APi可能还未能返回：显示“加载中..”
        // watch 返回 {} 即可显示 '未查询到数据'
        this.emptyText = watchEnd ? '未查询到数据' : '加载中...'
      }
    },

    draw (op) {
      // line等  图形移动加载，非重新渲染
      if (!this.notClearBol) {
        chartObj[this.className].clear()
      }

      chartObj[this.className].setOption(op)
      this.$emit('chart', chartObj[this.className])

      window.addEventListener(
        'resize',
        this.chartResize
      )
    },

    chartResize () {
      if (this.notResizeRouteList.includes(this.$route.path)) return

      this.$utils.debounce(() => {
        chartObj[this.className].resize()
      }).bind(this)()
    }
  },

  mounted () {
    chartObj[this.className] = echarts.init(document.querySelector('.' + this.className))
    this.init(this.options)
  },

  destroyed () {
    window.removeEventListener('resize', this.chartResize)
  }
}
</script>

<style lang="scss" scoped>
.v-echart {
  position: relative;
  height: 100%;
  width: 100%;
  p {
    position: absolute;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;

    text-align: center;
    color: #c0c4cc;
    font-size: 18px;
  }
}

@media print {
  .no-print {
    display: none;
  }
}
</style>
