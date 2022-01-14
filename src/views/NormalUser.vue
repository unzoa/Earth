<template>
  <div
    class="home"
    :style="{
      background: colorPrimary
    }"
    >
    <EarthComponent />
    <NormalUserHeader />

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { colorPrimary } from '../assets/css/color.scss'
import EarthComponent from '../components/Earth'
import NormalUserHeader from '../components/normal-user-header/NormalUserHeader.vue'
export default {
  name: 'Home',

  data () {
    return {
      colorPrimary
    }
  },

  components: {
    NormalUserHeader,
    EarthComponent
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
