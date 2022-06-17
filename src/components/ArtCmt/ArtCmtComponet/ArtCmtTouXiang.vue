<template>
  <div class="user_touxiang">
    <img v-lazy="" alt="" />
  </div>
</template>

<script>
export default {
  name: 'ArtCmtTouXiang'
}
</script>

<style lang="less" scoped>
.user_touxiang {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
