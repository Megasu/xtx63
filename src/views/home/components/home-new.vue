<template>
  <HomePanel ref="target" title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <!-- 具名插槽 -->
    <template #right>
      <XtxMore></XtxMore>
    </template>
    <!-- 默认插槽 -->
    <Transition name="fade">
      <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else></HomeSkeleton>
    </Transition>
  </HomePanel>
</template>

<script setup>
// 拓展：setup script 写法(实验阶段写法)
//   导入组件后，会自动注册
//   声明的响应式数据，能自动导入
//   ...
// 拓展阅读：https://juejin.cn/post/6955395084518948900
import { findNew } from '@/api/home'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
// 导入懒加载函数
import { useLazyData } from '@/hooks'
//   result    请求结果
//   target    被检测元素
const { result: goods, target } = useLazyData(findNew)
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
