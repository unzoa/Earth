<template>
  <div class="loading-con">
    <!-- <div class="loading-con"> -->
      <div>
        <i class="el-icon-loading"></i>
        <span>加载中，请稍等...</span>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'Loading'
}
</script>
<style scoped="scoped" lang="scss">
  .loading-con {
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    div {
      background: $color-primary;
      box-sizing: border-box;
      padding: 30px 50px;
      border-radius: 10px;
      color: #fff;
    }
  }
</style>
