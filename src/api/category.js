import request from '@/utils/request'

/**
 * 首页-全部分类（包含推荐商品）
 * @returns
 */
export const getAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 首页-热门品牌
 * @param {*} number 请求数量
 * @returns
 */
export const findBrand = (number) => {
  return request('/home/brand', 'get', { limit: number })
}

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
