<template>
  <div class="home-banner">
    <XtxCarousel auto-play :sliders="sliders" />
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    // 开发经验小结：
    // 方案1：用 reactive 定义数组，修改数组的时候需要调用数组方法
    // 方案2：用 ref 定义数组，修改数组的时候可以通过 xxx.value 直接赋值

    // 方案1：(调用属性和方法方便)
    // const sliders = reactive([])
    // sliders.push(...xxx)

    // 方案2：(赋值修改方便)
    const sliders = ref([])
    // sliders.value = xxx

    // 获取到数据
    findBanner().then(res => {
      // console.log(res.result)
      sliders.value = res.result
    })

    return { sliders }
  }
}
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 首页的轮播图左侧还有 250px 的侧边栏
.xtx-carousel {
  // 防止侧边栏遮挡左箭头
  /deep/ .carousel-btn.prev {
    left: 250px + 20px !important;
  }
  // 居中
  /deep/ .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
