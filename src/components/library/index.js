
// 骨架屏组件
// import XtxSkeleton from './xtx-skeleton'
// // 轮播图组件
// import XtxCarousel from './xtx-carousel'
// // 查看更多 - 首页，一级分类，个人中心都要用到
// import XtxMore from './xtx-more'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'

import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'

// Vue2 全局注册组件
// Vue.component('组件名', 组件)

// Vue3 全局注册组件
// app.component('组件名', 组件)

/*
  组件库自动导入和注册
    - 使用 `require` 提供的函数 `context`  加载某一个目录下的所有 `.vue` 后缀的文件。
    - 然后 `context` 函数会返回一个导入函数 `importFn`
      - 它又一个属性 `keys() `  获取所有的文件路径
    - 通过文件路径数组，通过遍历数组，再使用 `importFn`  根据路径导入组件对象
    - 遍历的同时进行全局注册即可
*/

// require.context(目录路径, 是否加载子目录, 正则匹配文件后缀 )
// 注意：importFn 是一个函数，用于导入文件的
const importFn = require.context('./', false, /\.vue$/)

// console.log(importFn.keys())
// console.dir(importFn)

export default {
  // 这种写法以后是提供给 app.use() 安装组件库用的
  install (app) {
    // Vue3 全局注册组件
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // importFn.keys() 返回值是一个数组，存放文件名路径
    importFn.keys().forEach(item => {
      // 根据文件路径加载文件
      // 注意：这里需要 .default 才可以找到组件
      const com = importFn(item).default
      // 批量注册组件
      app.component(com.name, com)
    })

    // 全局自定义指定
    defineDirective(app)
  }
}

const defineDirective = (app) => {
  // 定义全局自定义指令
  /* <img v-lazy="值" alt="" /> */
  app.directive('lazy', {
    // 标签或组件挂载到页面中（就是 Vue2 insert 插入节点）
    mounted (el, { value }) {
      console.log(el, value)
      // stop 是一个函数，用于停止检测元素可见性
      const { stop } = useIntersectionObserver(
        el,
        // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
        ([{ isIntersecting }], observerElement) => {
          // console.log('目标元素的可见性', isIntersecting)
          // 图片标签是否可见
          if (isIntersecting) {
            // console.log('lazy的值作为src属性的值，加载图片了')
            // 如果目标可见，替换图片地址，自动加载图片
            el.src = value
            // 如果图片地址是错误的，无法加载图片，显示占位图
            el.onerror = () => {
              el.src = defaultImg
            }
            // 主动停止检测元素可见性
            stop()
          }
        })
    }
  })
}
