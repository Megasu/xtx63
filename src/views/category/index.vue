<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <!-- mode="out-in" 动画模式：旧元素先离场，新元素再入场 -->
        <Transition name="fade-right" mode="out-in">
          <!-- :key 值不同，节点就会重新创建，触发动画效果 -->
          <XtxBreadItem :key="topCategory.name">{{ topCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem
            v-for="good in item.goods"
            :key="good.id"
            :good="good"
          ></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup () {
    // 轮播图数据获取 - 通过请求获取
    const sliders = ref([])
    findBanner().then(res => {
      sliders.value = res.result
    })

    // 顶级分类数据获取 - 从 Vuex 中获取
    const store = useStore()
    // Vue2 写法 const id = this.$route.params.id
    // Vue3 写法 const id = useRoute().params.id
    const route = useRoute()

    const topCategory = computed(() => {
      // 短路运算防止在模板中使用报错(因为分类是需要请求)
      return (
        store.state.category.list.find(item => item.id === route.params.id) ||
        {}
      )
    })

    const subList = ref([])
    const getList = async id => {
      const { result } = await findTopCategory(id)
      subList.value = result.children
    }

    // 监听路由中 id 的变化
    watch(
      () => route.params.id,
      id => {
        console.log('id参数发生了变化，需要获取当前分类的楼层数据', id)
        getList(id)
      },
      { immediate: true }
    ) // 立即执行

    return { sliders, topCategory, subList }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
