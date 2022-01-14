<template>
  <div
  class="file-name">
    <el-tooltip
      class="item"
      :effect="effect"
      :content="text"
      :placement="align">
      <p>{{nameFilter()}}</p>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'FileName',

  props: {
    'name': String,
    'content': String,

    'length': Number,

    'effect': {
      type: String,
      default: 'light'
    },

    align: {
      type: String,
      default: 'top'
    }
  },

  computed: {
    text () {
      return this.name || this.content
    }
  },

  methods: {
    nameFilter () {
      let nameVal = this.text
      let nameLen = this.length
      if (nameVal.length > nameLen) {
        return nameVal.slice(0, nameLen) + '...'
      } else {
        return nameVal
      }
    }
  }
}
</script>

<style scoped="scoped">
  .file-name{
    display: inline-block;
  }
</style>
