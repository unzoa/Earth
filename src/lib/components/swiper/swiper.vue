<template>
  <div class="swiper-container">
    <div class="outter">
      <div class="con">
        <ul>
          <li
            v-for="(i, j) in sandBox"
            :key="j"
            :class="['slide-item', direction]"
            :style="{
              height: direction === 'vertical' ? 100 / slidesPerView + '%' : '',
              width: direction === 'vertical' ? '' : 'calc(' + 100 / slidesPerView + '% - 10px)'
            }">{{i}}</li>
        </ul>

        <button @click="add">add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperUp',

  props: {
    direction: {
      type: String,
      default: 'vertical'
    },
    moveInterval: {
      type: Number,
      default: 3 // 间隔 越大，移动速度越慢
    },
    slidesPerView: {
      type: Number,
      default: 4
    },
    duration: {
      type: Number,
      default: 3000
    },
    moveTime: { // 移动的时间
      type: Number,
      default: 200
    },
    arr: {
      type: Array,
      default: () => {
        return new Array(50).fill(Math.random())
      }
    }
  },

  data () {
    return {
      con: '',
      autoplayTimer: {},

      speed: 1,

      sandIndex: 5,
      sandBox: new Array(5).fill(Math.random())
    }
  },

  methods: {
    /**
     * [slowlyMove 容器 .con 慢慢移动]
     */
    slowlyMove () {
      const {
        direction,
        con,
        moveTime,
        speed
      } = this

      const intervalObj = setInterval(() => {
        console.log('111: ', 111)
        direction === 'vertical'
          ? con.scrollTop += 1 // 向上移动
          : con.scrollLeft += 1 // 向左移动
      }, speed)

      setTimeout(() => {
        clearInterval(intervalObj)
      }, moveTime)
    },

    add () {
      this.sandIndex = this.sandIndex === 49 ? 0 : ++this.sandIndex
      this.sandBox.push(this.arr[this.sandIndex])

      this.slowlyMove()

      // 删除第一个li节点
      setTimeout(() => {
        this.sandBox.shift()
      }, this.moveTime)
    },

    action () {
      this.autoplayTimer = setInterval(() => {
        this.add()
      }, this.duration)
    }
  },

  mounted () {
    const {
      direction,
      slidesPerView
      // moveInterval,
      // action
    } = this
    this.con = document.querySelector('.con')
    this.speed = this.moveTime / (direction === 'vertical' ? this.con.offsetHeight : window.innerWidth) / slidesPerView
    // action()
  }
}
</script>

<style scoped="scoped" lang="scss">
  .swiper-container {
    position: relative;
    color: #fff;

    .outter {
      width: 100%;
      height: 100%;
    }

    .con {
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    ul {
      height: 100%;
      padding: 0;
      margin: 0;

      font-size: 0;

      white-space: nowrap;
    }
    li {
      font-size: 12px;
      list-style: none;
      box-sizing: border-box;
      border-bottom: 1px solid lime;
    }

    .vertical {
      width: 100%;
    }

    .horizontal {
      display: inline-block;
      height: 50px;
      margin-right: 10px;
    }
    .horizontal:last-child {
      width: 20%;
      margin-right: 0px;
    }
  }
</style>
