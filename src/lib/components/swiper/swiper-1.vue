<template>
  <div class="swiper-plan1">
    <!--
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="true" -->
    <swiper
      v-if="swiperData.length"
      ref="mySwiper"
      :options="swiperOptions"
      style="height: 500px;"
      >
      <swiper-slide
        v-for="(i, j) in swiperData"
        :key="j"
        >
        Slide {{i}}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'swiperPlan1',

  // 模板依赖 (模板内使用的资源)

  components: {
    swiper, swiperSlide
  },

  // 接口 (组件的接口)

  props: ['dataList'],

  // 本地状态 (本地的响应式 property)

  data () {
    return {
      moveTimes: 0, // 移动次数
      len: 5,

      swiperData: [],

      swiperOptions: {
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        direction: 'vertical',
        observer: true,
        observeParents: true,
        setWrapperSize: true,
        slidesPerView: 4,
        spaceBetween: 4,
        loop: false,
        speed: 1500,
        noSwiping: true,
        on: {
          slideChangeTransitionEnd: () => {
            // 2021-09-28 首次运行，就会执行这里
            this.swiperAction()
          }
        }
      }
    }
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },

  // 事件 (通过响应式事件触发的回调)

  watch: {
    dataList (val) {
      if (Array.isArray(val) && val.length) {
        this.swiperData = this.swiperData.length <= 20
          ? this.swiperData.concat(val, val)
          : this.swiperData.concat(val)

        this.$refs.mySwiper && this.swiper.autoplay.start()
      } else {
        this.swiperData = this.swiperData.concat(
          this.swiperData
            .reverse()
            .slice(0, 10)
            .reverse()
        )
      }
    }
  },

  created () {},

  mounted () {
  },

  // 其他生命周期钩子

  // 非响应式的 property (不依赖响应系统的实例 property)

  methods: {
    swiperAction () {
      this.moveTimes++

      // 移动了一次数据返回内容后，就截取删除
      if (this.moveTimes % this.len === 0 && this.swiperData.length > 20) {
        this.swiperData = this.swiperData.slice(this.len, this.swiperData.length)

        this.swiper.slideTo(0, 0, false)

        this.swiperData.length < 20 && this.swiper.autoplay.stop()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .swiper-plan1 {
    position: relative;
  }
</style>
