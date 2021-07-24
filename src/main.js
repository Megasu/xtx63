// 解构出创建 Vue 应用的函数
import { createApp } from 'vue'
// 导入根组件
import App from './App.vue'
// import App from './知识点补充/动画效果.vue'
// import App from './知识点补充/观察器_检测目标元素的可见性.vue'
// import App from './知识点补充/图片懒加载自定义指令.vue'
// import App from './知识点补充/动态创建标签.vue'

// 导入路由
import router from './router'
// 导入Vuex
import store from './store'

// 导入重置标签样式样式的第三方包
// PS：这里的 improt 是导入样式，所以不需要起名字，也就不用写 from
import 'normalize.css'
// 自己的公用样式
import '@/assets/styles/common.less'
// 这种写法会打包到项目中
// import '@/assets/styles/iconfont.css'

// 导入自己封装的组件库
import XtxUI from '@/components/library/index.js'

// 创建Vue应用
const app = createApp(App)
// 使用Vuex
app.use(store)
// 使用路由
app.use(router)
// 安装自己封装的组件库
app.use(XtxUI)
// 挂载到#app中
app.mount('#app')
