<template>
  <div class="user_namebox">
    <div class="user_name">{{ names }}</div>
    <div class="user_lver"><van-icon name="gem-o" /></div>
  </div>
</template>

<script>
export default {
  namne: 'ArtCmtUserName',
  props: ['name', 'rootname'],
  computed: {
    names() {
      return this.name || this.rootname || '测试'
    }
  }
}
</script>

<style lang="less" scoped>
.user_namebox {
  display: flex;
  padding-top: 5px;
  align-items: center;
  .user_name {
    font-size: 16px;
    font-weight: 700;
  }
  .user_lver {
    font-size: 16px;
  }
  div + div {
    margin-left: 10px;
  }
}
</style>
