<script>
// 动态创建面包屑主要步骤：
//   1. 创建xtx-bread父容器
//   2. 获取默认插槽内容
//   3. 去除xtx-bread-item组件的i标签，因该由render函数来动态生成
//   4. 遍历插槽中的item，得到一个动态创建的节点，注意最后一个item不加i标签
//   5. 把动态创建的节点渲染再xtx-bread标签中
//   补充：h 函数在 Vue3 的全名是 createVNode ，在 Vue2 的叫 createElement
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 默认插槽接收到的内容
    const slot = this.$slots.default()
    // 动态改造一下
    const arr = []
    slot.forEach((item, index) => {
      // 防止传入注释，注释后面也会创建 i 标签
      if (item.type.name === 'XtxBreadItem' || item.type.name === 'Transition') {
        // 添加 item 子节点
        arr.push(item)
        // 添加 i 标签
        if (index < slot.length - 1) {
          arr.push(h('i', { class: 'iconfont icon-angle-right' }))
        }
      }
    })
    // console.log('slot', slot)
    // console.log('arr', arr)
    // <i class="iconfont icon-angle-right"></i>
    // 动态创建节点
    return h('div', { class: 'xtx-bread' }, arr)
  }
}
</script>

<style lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // i:last-child {
  //   display: none;
  // }
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
