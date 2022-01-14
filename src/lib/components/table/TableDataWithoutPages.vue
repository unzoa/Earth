<template>
  <div class="TableDataWithoutPages">
    <el-table
      ref="multipleTable"
      :data="tableDataUse"
      :cell-style="{'text-align': 'center'}"
      :header-cell-style="{textAlign: 'center'}"
      fit>
      <el-table-column
        v-for="(i, j) in tableTitle" :key="j"
        :prop="i.prop"
        :label="i.label"
        :width="i.width"
        :show-overflow-tooltip="true"></el-table-column>
      </el-table>

    <div v-if="tableData.length" class="pagination-con">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="tableData.length"
        :page-size="per"
        :pager-count="5"
        @current-change="pageChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableDataWithoutPages',
  props: ['tableData', 'tableTitle', 'per', 'page'],
  data () {
    return {
      start: 0,
      total: 0,
      currentPage: 1,
      tableDataUse: []
    }
  },

  watch: {
    tableData (r) {
      this.tableDataUse = r.slice(0, this.per)
    },

    page (num) {
      this.pageChange(num)
    }
  },

  methods: {
    pageChange (num) {
      this.$emit('currentChange', num)
      this.currentPage = Number(num)
      this.start = (num - 1) * this.per
      this.tableDataUse =
        this.tableData.slice(this.start, this.start + this.per || 20)
    }
  },

  mounted () {
    this.tableDataUse = this.tableData.slice(0, this.per)
  }
}
</script>

<style lang="scss" scoped>
  .TableDataWithoutPages {
    .pagination-con {
      text-align: right;
      margin-top: 10px;
    }
  }
</style>
