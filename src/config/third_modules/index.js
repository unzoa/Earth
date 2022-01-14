/* eslint-disable */
import Vue from 'vue'

import './axios'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

if (process.env.NODE_ENV !== 'production') { // 打包时候不引入，利用index.html下elementui
  require('element-ui/lib/theme-chalk/index.css')
}
