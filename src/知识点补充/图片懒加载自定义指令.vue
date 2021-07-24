<template>
  <img class="box" v-lazy="imgSrc" alt="" />
  <img
    class="box"
    v-for="item in result"
    :key="item.id"
    v-lazy="item.imgUrl"
    alt=""
  />
</template>

<script>
export default {
  setup () {
    const result = [
      {
        id: '16',
        imgUrl:
          'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/dfc11bb0-4af5-4e9b-9458-99f615cc685a.jpg'
      },
      {
        id: '18',
        imgUrl:
          'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/1ba86bcc-ae71-42a3-bc3e-37b662f7f07e.jpg'
      },
      {
        id: '19',
        imgUrl:
          'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg'
      }
    ]
    // 错误的图片地址
    const imgSrc = 'https://yanxuan-item.nosdn.127.net/6d0.jpg'
    return { imgSrc, result }
  }
}
</script>

<style>
.box {
  width: 200px;
  display: block;
  margin: 0 auto;
  padding: 100px 0;
}
</style>
