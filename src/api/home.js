import request from '@/utils/request'

/**
 * 首页-广告区域
 * @returns
 */
export const findBanner = () => {
  return request('/home/banner')
}

/**
 * 首页-新鲜好物
 * @returns
 */
export const findNew = () => {
  return request('/home/new')
}

/**
 * 首页-人气推荐
 * @returns
 */
export const findHot = () => {
  return request('/home/hot')
}

/**
 * 首页-热门品牌
 * @param {*} number 数量限制
 * @returns
 */
export const findBrand = (number = 10) => {
  return request('/home/brand', 'get', { limit: number })
}

/**
 * 首页-产品区块
 * @returns
 */
export const findGoods = () => {
  return request('/home/goods')
}

/**
 * 首页-最新专题
 * @returns
 */
export const findSpecial = () => {
  return request('/home/special')
}
