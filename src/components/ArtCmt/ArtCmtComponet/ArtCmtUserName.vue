<template>
  <div class="user_namebox">
    <div class="user_name">123</div>
    <div class="user_lver"><van-icon name="gem-o" /></div>
  </div>
</template>

<script>
export default {
  namne: 'ArtCmtUserName'
}
</script>

<style lang="less" scoped>
.user_namebox {
  display: flex;
  padding-top: 5px;
  align-items: center;
  .user_name {
    font-size: 14px;
  }
  .user_lver {
    font-size: 14px;
  }
  div + div {
    margin-left: 10px;
  }
}
</style>
