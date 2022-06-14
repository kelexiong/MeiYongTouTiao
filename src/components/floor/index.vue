<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/userInfoPage" icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  data() {
    return {
      active: 0
    }
  }
  // watch: {
  //   active: {
  //     handler(nextval, oldval) {
  //     }
  //   }
  // }
}
</script>

<style lang="less">
.van-tabbar-item {
  background-color: pink;
}
</style>
