<template>
  <div class="box" ref="target">
    <h1>当你看到这个盒子的时候，就需要发送网络请求加载数据了</h1>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  setup () {
    // 配合标签的 ref 属性使用
    const target = ref(null)
    // stop 是一个函数，用于停止检测元素可见性
    const { stop } = useIntersectionObserver(
      target,
      // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
      ([{ isIntersecting }], observerElement) => {
        console.log('目标元素的可见性', isIntersecting)
        // 如果目标可见，发送请求
        if (isIntersecting) {
          console.log('可以发送请求了，发送一次请求即可')
          // 主动停止检测元素可见性
          stop()
        }
      })

    return { target }
  }
}
</script>

<style>
.box {
  width: 90%;
  height: 100px;
  background-color: pink;
  margin: 1000px auto 0;
}
</style>
