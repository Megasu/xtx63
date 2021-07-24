<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 轮播图主体 -->
    <ul class="carousel-body">
      <!-- fade 类名可控制图片淡入效果 -->
      <li
        class="carousel-item"
        v-for="(item, index) in sliders"
        :key="index"
        :class="{ fade: activeIndex === index }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 左箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 右箭头 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 指示器(小圆点) -->
    <div class="carousel-indicator">
      <span
        v-for="(item, index) in sliders"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数组
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否需要自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 持续时间
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 准备一个下标，用于控制小圆点和图片展示
    const activeIndex = ref(0)

    // 左右箭头换图
    const toggle = number => {
      // 由于左边箭头点击的时候会出现越界的情况，所以先用一个临时变量存储起来，用于判断是否越界
      const temp = activeIndex.value + number
      // 左边越界
      if (temp < 0) {
        // 把下标变成最后一个的下标
        activeIndex.value = props.sliders.length - 1
        return
      }
      // 右边越界
      if (temp > props.sliders.length - 1) {
        // 把下标变回 0
        activeIndex.value = 0
        return
      }
      // 没有越界情况，直接使用
      activeIndex.value = temp
    }

    let timer = null

    const autoPlayFn = () => {
      // 防止启动多个定时器
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        console.log('测试定时器是否被调用了')
        toggle(1)
      }, props.duration)
    }

    // 自动播放的两个条件
    //  1. 数组长度大于1
    //  2. 传递了 autoPlay 属性
    watch(
      () => props.sliders,
      () => {
        if (props.sliders.length > 1 && props.autoPlay) {
          autoPlayFn()
        }
      }
    )

    // 鼠标移入清理定时器，鼠标移出重新启动定时器
    const stop = () => {
      clearInterval(timer)
    }
    const start = () => {
      autoPlayFn()
    }

    // 卸载组件 (就是以前的销毁组件，Vue3换叫法了而已)
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { activeIndex, toggle, stop, start }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  // .carousel-body{}
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // 默认图片是透明度为 0 (你看不到)
      opacity: 0;
      transition: opacity 0.5s linear;
      // fade 显示图片
      &.fade {
        // 透明度为 1，能看到了
        opacity: 1;
        // 由于图片都是定位的, 所以调整层级显示的到最前面
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
