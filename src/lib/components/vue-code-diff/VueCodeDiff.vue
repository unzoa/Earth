<template>
  <div class="vue-code-diff-con">
    <vue-code-diff
      :old-string="oldStr"
      :new-string="newStr"
      :context="10"
      outputFormat="side-by-side" />
  </div>
</template>

<script>
import vueCodeDiff from 'vue-code-diff'
export default {
  name: 'VueCodeDiff',
  props: ['oldStr', 'newStr'],

  components: {
    vueCodeDiff
  }
}
</script>

<style lang="scss" scoped>
  .vue-code-diff-con {
    background: #fff;
    /deep/ table.d2h-diff-table {
      position: relative;
      tr {
        td:first-child {
          position: sticky;
          text-align: center;
          left: 0;
        }

        td:last-child {
          > div {
            padding: 0;
          }
        }
      }

      .d2h-files-diff,
      .d2h-code-side-line {
        margin: 0;
      }
    }
  }
</style>
