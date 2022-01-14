import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import lazyLoading from './tupian.png'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  filter: {
    progressive (listener, options) {
      if (listener.src.indexOf('Curaçao.png') > -1) {
        listener.src = '../static/flag/Curacao.png'
      }
    },
    webp (listener, options) {
      if (!options.supportWebp) return
      if (listener.src.indexOf('Curaçao.png') > -1) {
        listener.src = '../static/flag/Curacao.png'
      }
    }
  },
  error: lazyLoading,
  loading: lazyLoading,

  attempt: 1
})
