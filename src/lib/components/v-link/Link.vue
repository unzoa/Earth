<template>
  <div class="link-wrapper">
    <a
      :href="hrefStr"
      :target="unBlank ? '' : '_blank'"
      :class="className"
      :style="styleObj"
      @click="tagHandle"
    >
      <slot />
    </a>
  </div>
</template>

<script>
(function () {
  const originalremoveItem = localStorage.removeItem
  localStorage.removeItem = function (key) {
    const event = new Event('removeItemEvent')
    event.key = key
    window.dispatchEvent(event)
    originalremoveItem.apply(this, arguments)
  }
})()

export default {
  name: 'link-wrapper',

  props: {
    path: String, // #/bala 或 http://balalal.com

    query: {
      type: Object,
      default: () => { return {} }
    },

    className: String,

    styleObj: {
      type: Object,
      default: () => { return {} }
    },

    unBlank: Boolean,

    beforeLink: Function
  },

  data () {
    return {
      hrefStr: ''
    }
  },

  watch: {
    query () {
      this.transHref()
    }
  },

  computed: {
    a_href () {
      let hrefStr = ''
      Object.entries(this.query).forEach(([key, val]) => {
        hrefStr += `${key}=${val}&`
      })

      return `${this.path}?${hrefStr}`
    }
  },

  components: {
  },

  methods: {
    transHref () {
      let query = this.query
      // 判断退出后重置a标签上绑定的token
      if (Object.keys(query).includes('token')) {
        query = {
          ...query,
          token: localStorage[localStorage.tokenName + '_token'] || '',
          userClass: localStorage.userClass || '',
          userName: localStorage.userName || ''
        }
      }

      let hrefStr = ''
      Object.entries(query).forEach(([key, val]) => {
        hrefStr += `${key}=${val}&`
      })

      this.hrefStr = hrefStr ? `${this.path}?${hrefStr}` : `${this.path}`
    },
    tagHandle (el) {
      this.beforeLink && this.beforeLink(el)
    }
  },

  created () {
  },

  mounted () {
    this.transHref()

    window.addEventListener('removeItemEvent', this.transHref)
  },

  destroyed () {
    window.removeEventListener('removeItemEvent', this.transHref)
  }
}
</script>

<style scoped lang="scss">
.link-wrapper {
  position: relative;

  > a {
    display: block;
  }

  .default {
    color: #3399f3;
    text-decoration-line: underline;
  }
}
</style>
