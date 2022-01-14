<template>
  <div class="TableDataWithPages">
    <el-table
      v-if="tableData.length"
      ref="multipleTable"
      :data="tableData"
      :cell-style="{'text-align': 'center'}"
      :header-cell-style="{textAlign: 'center'}"
      fit>
      <el-table-column
        v-for="(i, j) in tableTitle" :key="j"
        :prop="i.prop"
        :label="i.label"
        :width="i.width"
        :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="i.prop !== 'operation'">{{ scope.row[i.prop]}}</span>

            <slot
              name="operation"
              v-if="i.prop === 'operation'"
              :row="scope.row"/>
          </template>
        </el-table-column>
      </el-table>

    <div v-if="tableData.length" class="pagination-con">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="count"
        :page-size="20"
        :pager-count="5"
        @current-change="pageChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>

    <p
      v-else
      style="color: #999; text-align: center; padding; 20px 0;">无数据</p>
  </div>
</template>

<script>
// 返回点击事件 currentPage 页码
export default {
  name: 'TableDataWithPages',
  props: ['tableData', 'tableTitle', 'count', 'page'],
  data () {
    return {
      currentPage: 1
    }
  },

  watch: {
    page (val) {
      this.currentPage = Number(val)
    }
  },

  methods: {
    pageChange () {
      this.$emit('currentChange', this.currentPage)
    }
  },

  mounted () {
    if (this.page) {
      this.currentPage = Number(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .TableDataWithPages {
    width: 100%;
    .pagination-con {
      text-align: right;
      margin-top: 10px;
    }
  }
</style>
