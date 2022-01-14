import Vue from 'vue'

// Js
import ajax from '@/lib/js/newAjax'
import utils from '@/lib/js/utils'

import '@/lib/css/reset.css'

Vue.prototype.$ajax = ajax
Vue.prototype.$utils = utils
