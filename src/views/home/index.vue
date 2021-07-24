<template>
  <div class="page-home">
    <!-- 首页模块：侧边栏和焦点图 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 楼层1：新鲜好物 -->
    <HomeNew />
    <!-- 楼层2：人气推荐 -->
    <HomeHot />
    <!-- 楼层3：热门品牌 -->
    <HomeBrand />
    <!-- 楼层4567：商品区块 -->
    <HomeProduct></HomeProduct>
    <!-- 最新专题 -->
    <HomeSpecial></HomeSpecial>
  </div>
</template>

<script>
import HomeBanner from './components/home-banner.vue'
import HomeBrand from './components/home-brand.vue'
import HomeCategory from './components/home-category.vue'
import HomeHot from './components/home-hot.vue'
import HomeNew from './components/home-new.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeSpecial }
}
</script>

<style scoped lang="less"></style>
