<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="activeIndex = 0" :class="{ disabled: activeIndex === 0  }" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="activeIndex = 1" :class="{ disabled: activeIndex === 1  }" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul v-if="result.length" class="list" :style="`transform: translateX(${ activeIndex ? '-50%' : 0 });`">
          <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
              <!-- 图片懒加载应用 -->
              <img v-lazy="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <!-- 🔔开发的时候可以先把所需的骨架屏写完，后面再添加 v-if 和 v-else -->
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px"  bg="#e4e4e4"></XtxSkeleton>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { findBrand } from '@/api/home'
import HomePanel from './home-panel'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 调用懒加载函数，获取数据
    const { result, target } = useLazyData(findBrand)
    // 用于切换的下标
    const activeIndex = ref(0)

    return { result, target, activeIndex }
  }
}
</script>

<style scoped lang='less'>
.skeleton {
  width: 100%;
  display: flex;
  // 更加简洁的解决方案
  justify-content: space-between;
}
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  // 小箭头禁用状态
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    // 盒子位移的时候有过渡效果
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
