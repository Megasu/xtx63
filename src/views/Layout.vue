<template>
  <!-- 把首页的每个模块都封装成组件，方便后期维护 -->
  <!-- 顶部通栏布局 -->
  <AppTopnav></AppTopnav>
  <!-- 公共头部 -->
  <AppHeader></AppHeader>
  <!-- 公共头部 - 吸顶 -->
  <AppHeaderSticky></AppHeaderSticky>
  <div class="main">
    <!-- 二级路由坑位 -->
    <router-view></router-view>
  </div>
  <!-- 公共底部 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  name: 'xtx-layout',
  setup () {
    // Vue3 组合API写法
    const store = useStore()
    // console.log(store)
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.main{
  min-height: 600px;
}
</style>
