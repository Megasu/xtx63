// 解构出的函数
//   createRouter           -  用于创建路由的函数
//   createWebHashHistory   -  哈希路由模式
//   createWebHistory       -  History 模式
import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/views/Layout.vue'
import Home from '@/views/home/index.vue'
import Category from '@/views/category/index.vue'
import SubCategory from '@/views/category/sub.vue'
// 路由配置 - 路径和组件的映射关系
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: 'category/:id', component: Category },
      { path: 'category/sub/:id', component: SubCategory }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用哈希路由模式
  history: createWebHashHistory(),
  // 路由配置
  routes
})

export default router
