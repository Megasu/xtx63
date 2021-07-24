// 同理，解构出创建 Vuex 仓库的函数
import { createStore } from 'vuex'
// 导入 Vuex 持久化存储插件
import createPersistedstate from 'vuex-persistedstate'

// 导入项目中的三个模块
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

const store = createStore({
  state: {
    // 存放数据的
  },
  mutations: {
    // 修改数据
  },
  actions: {
    // 异步操作
  },
  modules: {
    // 模块
    cart,
    category,
    user
  },
  getters: {
    // VueX的计算属性
  },
  plugins: [
    // 配置持久化存储插件
    createPersistedstate({
      // 本地存储的键名称
      key: 'erabbit-client-pc-store',
      // 把 user 模块和 cart 模块的信息同步到本地存储
      paths: ['user', 'cart']
    })
  ]
})

export default store
