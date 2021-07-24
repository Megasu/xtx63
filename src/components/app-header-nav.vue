<template>
  <ul class="navs">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 一级分类渲染 -->
    <!-- 模板获取VueX数据写法和以前一样 $store.state.category.list -->
    <li
      v-for="item in list"
      :key="item.id"
      @mouseenter="show(item)"
      @mouseleave="hide(item)"
    >
      <!-- 一级分类链接，点击的时候需要隐藏弹出层 -->
      <RouterLink @click="hide(item)" :to="`/category/${item.id}`">
        {{ item.name }}
      </RouterLink>
      <!-- open 类名控制弹出层的显示或隐藏 -->
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <!-- 二级分类渲染 children 列表 -->
          <li v-for="item2 in item.children" :key="item2.id">
            <!-- 二级分类链接，点击的时候需要隐藏弹出层 -->
            <RouterLink @click="hide(item)" :to="`/category/sub/${item2.id}`">
              <img :src="item2.picture" alt="" />
              <p>{{ item2.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    // 获取仓库
    const store = useStore()
    // 通过计算函数简化在模板的调用过程
    const list = computed(() => {
      return store.state.category.list
    })

    // 控制显示隐藏
    const show = item => {
      store.commit('category/show', item)
    }
    const hide = item => {
      store.commit('category/hide', item)
    }
    // 返回给模板使用
    return { list, show, hide }
  }
}
</script>

<style lang="less" scoped>
.navs {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}

.layer {
  // .layer.open
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
