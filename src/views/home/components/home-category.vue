<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <!-- 左侧菜单 -->
    <ul class="menu">
      <li
        v-for="item in list"
        :key="item.id"
        @mouseenter="categoryId = item.id"
        :class="{ active: categoryId === item.id }"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 如果请求回来了二级分类，就显示二级分类 -->
        <template v-if="item.children">
          <RouterLink v-for="item2 in item.children" :key="item2.id" to="/">
            {{ item2.name }}
          </RouterLink>
        </template>
        <!-- 数据没回来的时候，先用骨架屏占位 -->
        <template v-else>
          <XtxSkeleton width="70px" height="15px" style="margin-right:5px" bg="rgba(255,255,255,0.2)"></XtxSkeleton>
          <XtxSkeleton width="60px" height="15px" bg="rgba(255,255,255,0.2)"></XtxSkeleton>
        </template>
      </li>
    </ul>
    <!-- 左侧菜单对应的弹出层 -->
    <div class="layer">
      <h4 v-if="currCategory">
        {{ currCategory.goods ? "分类" : "品牌" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 分类列表 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌列表 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/category'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()

    // 定义成响应式数据，目的，值更新的时候会触发计算函数
    const brand = reactive({
      id: '品牌',
      name: '品牌',
      children: [{ id: '品牌推荐', name: '品牌推荐' }]
    })

    // 获取 6 个品牌数据
    findBrand(6).then(res => {
      // console.log(res)
      brand.brands = res.result
    })

    // 用于左侧渲染的数组
    const list = computed(() => {
      const arr = store.state.category.list.map(v => {
        return {
          ...v,
          // 只提取二级分类的前两项显示
          // 🔔 v.children && 写法，防止初始化还没有 children 的时候调用 slice 函数报错
          children: v.children && v.children.slice(0, 2)
        }
      })

      // 追加品牌推荐，类别只有9个，但是左侧菜单有 10 个，最后一个需自己添加上去
      // 依赖项如果更新，计算函数会自动触发
      arr.push(brand)

      return arr
    })

    // 用于存储当前类别 id 的
    const categoryId = ref(null)

    // 用于侧边栏弹出层展示类别商品的
    const currCategory = computed(() => {
      return list.value.find(item => item.id === categoryId.value)
    })

    return { list, categoryId, currCategory }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  // 左侧菜单
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 左侧菜单对应的弹出层
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      // 分类列表
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      // 品牌列表
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
