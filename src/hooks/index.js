import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * 数据懒加载函数
 * @param { Function } apiFn 请求API函数
 * @returns { Object } { result: 请求结果, target: 被检测元素 }
 */
export const useLazyData = (apiFn) => {
  // 准备响应式数据
  const result = ref([])

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
        // 获取请求，更新响应式数据
        apiFn().then(res => {
          result.value = res.result
        })
        // 主动停止检测元素可见性
        stop()
      }
    }
  )
  // 响应式数据给模板使用
  //   result    请求结果
  //   target    被检测元素
  return { result, target }
}
