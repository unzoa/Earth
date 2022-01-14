<template>
  <div class="NormalUserHeader">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      :default-active="$route.path"
      :unique-opened=true
      background-color="#333333"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <div
        v-for="(item, index) in menuData"
        :key="index"
        class="menu-item noSelect">
        <el-menu-item
          v-if="item.path"
          :index="item.path">{{item.title}}</el-menu-item>

        <el-submenu
          v-if="!item.path"
          :index="String(index)">
          <template slot="title"> {{item.submenu.submenuTitle}} </template>

          <div
            v-for="(submenuItem, submenuIndex) in item.submenu.submenuItems"
            :key="submenuIndex">
            <el-menu-item v-if="submenuItem.path" :index="submenuItem.path">
              {{submenuItem.title}}
            </el-menu-item>

            <el-submenu
              index="submenuIndex"
              v-if="!submenuItem.path">
              <span slot="title">{{ submenuItem.submenu.submenuTitle }}</span>
              <el-menu-item
                v-for="(submenuItema, submenuIndexa) in submenuItem.submenu.submenuItems"
                :key="submenuIndexa"
                :index="submenuItema.path">{{submenuItema.title}}</el-menu-item>
            </el-submenu>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { curPro } from '../../config'

export default {
  name: 'NormalUserHeader',

  // 本地状态 (本地的响应式 property)

  data () {
    return {
      menuData: curPro.NORMAL_USER
    }
  }
}
</script>

<style scoped lang="scss">
  .NormalUserHeader {
    position: relative;
    .menu-item {
      display: inline-block;
    }
  }
</style>
