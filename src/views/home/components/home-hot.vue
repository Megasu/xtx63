<template>
  <HomePanel ref="target" title="人气推荐" subTitle="人气爆款 不容错过">
    <Transition name="fade">
      <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="ellipsis">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else></HomeSkeleton>
    </Transition>
  </HomePanel>
</template>

<script>
/*
  封装API调用接口
  进行组件基础布局
  调用接口渲染组件
*/
import { findHot } from '@/api/home'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
// 导入懒加载函数
import { useLazyData } from '@/hooks'
export default {
  components: { HomePanel, HomeSkeleton },
  name: 'HomeHot',
  setup () {
    // 调用懒加载函数，当前组件可见的时候，通过 findHot 发送网络请求获取数据
    //   result    请求结果
    //   target    被检测元素
    const { result: goods, target } = useLazyData(findHot)
    return { goods, target }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
