<script>
// h() 函数参数，
//    1. 标签名称
//    2. 属性|数据 是对象
//    3. 子节点
// h('div', {class:'box'}, 盒子)
import { h } from 'vue'
export default {
  render () {
    // console.log(h)
    // render 配置项可以用于动态创建标签(节点)
    //   1. 配合 h 函数动态创建 (createElement)
    //   2. 配合 JSX 动态创建
    return h('div', { class: 'box' }, '盒子', '哈哈')
  }
}
</script>

<style lang="less" scoped>
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
}
</style>
