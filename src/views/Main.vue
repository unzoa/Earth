<template>
  <div class="Main">
    <div class="vuex-sample">
      <el-tag>vuex 例子</el-tag>
      <label> {{$store.state.count}} - {{count}} </label>
      <el-button @click="$store.commit('increaseCount')">count +</el-button>
      <el-button @click="$store.commit('decreaseCount')">count 1</el-button>
    </div>

    <el-table
      :data="tableData"
      stripe
      fit
      tooltip-effect="dark"
      highlight-current-row
      :cell-style="elTable.cellStyle"
      :header-cell-style="elTable.headerCellStyle"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import elTable from '../config/third_modules/element/elTable'
export default {
  name: 'Main',

  components: {},

  props: [],

  data () {
    return {
      elTable,

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },

  computed: {
    ...mapGetters(['count'])
  },

  mounted () {
    // this.$ajax.get('login')
  }
}
</script>

<style scoped lang="scss">
.Main {
  position: relative;
}
</style>
