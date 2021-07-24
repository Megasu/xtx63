import { getAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'

// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    show (state, item) {
      // 找到目标对象
      const current = state.list.find(v => v.id === item.id)
      // 修改目标对象状态，显示
      current.open = true
    },
    hide (state, item) {
      // 找到目标对象
      const current = state.list.find(v => v.id === item.id)
      // 修改目标对象状态，显示
      current.open = false
    }
  },
  // 异步请求
  actions: {
    // category/getList
    async getList ({ commit }) {
      const { result } = await getAllCategory()
      // 为每个一级分类添加一个 open 字段用于控制二级分类开启或者关闭
      result.forEach(item => {
        item.open = false
      })
      // console.log(111, result)
      // commit 修改数据
      commit('setList', result)
    }
  }
}
