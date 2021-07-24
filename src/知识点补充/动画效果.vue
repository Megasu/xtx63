<template>
  <button @click="show = !show">点击切换（v-if）</button>
  <!-- 🔔注意点：transition 只能包一个标签或者一个组件 -->
  <transition name="fade">
    <div v-if="show" class="box">盒子</div>
  </transition>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const show = ref(true)
    return { show }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
}
// 进入（显示，创建）
// v-enter-from     初始状态 （vue2.0 v-enter）
// v-enter-active   进行中
// v-enter-to       结束状态
.fade-enter-from {
  transform: scale(0);
}
.fade-enter-active {
  transition: all 5s;
}
.fade-enter-to {
  transform: scale(1);
}

// 离开（隐藏，移除）
// v-leave-from   初始状态 （vue2.0 v-leave）
// v-leave-active 进行中
// v-leave-to     结束状态
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 5s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
