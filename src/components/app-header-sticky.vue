<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- 💥 吸顶的时候，才显示吸顶的布局 -->
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'
import AppHeaderNav from './app-header-nav.vue'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    // 获取浏览器滚动垂直方向距离 - vueuse 工具库内部帮我们封装好了
    // 🔔这里解构出来的 y 还是响应式数据，可直接在页面中使用
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 默认状态 - 移到浏览器外
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.2s;
  // 显示状态
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(~@/assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
