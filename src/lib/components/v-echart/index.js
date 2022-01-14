import VEchart from './VEchart.vue'

VEchart.install = function (Vue) {
  Vue.component(VEchart.name, VEchart)
}

export default VEchart
