// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 小兔鲜儿两个服务器，优先选择第一台服务器，注意点两个服务器的数据是不通用的
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

// 创建 axios 实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 从仓库的 user 模块中获取用户信息
  const { profile } = store.state.user
  // 是否有 token
  if (profile.token) {
    // 添加到请求头中
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  // 返回修改后的配置
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
// 请求成功：res => res.data  取出 data 数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 请求失败：
  // 401 状态码, 用户信息无效, 进入该函数
  if (err.response && err.response.status === 401) {
    // 清空用户信息
    store.commit('user/setUser', {})
    // 把当前的路由信息进行 url 编码处理
    // router.currentRoute.value.fullPath 就是当前路由地址
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转到登录页，同时存储原本的路由信息，用于登录后回跳页面
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 让 get 和 post 参数写法在调用的时候统一起来
export default (url, method = 'get', submitData) => {
  return instance({
    url,
    method,
    // 根据请求方式，自动匹配请求参数选项是 params 还是 data
    //  [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
