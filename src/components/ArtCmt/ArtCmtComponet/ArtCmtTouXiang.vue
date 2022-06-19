<template>
  <div class="user_touxiang">
    <img v-lazy="imagesUrl" alt="" />
  </div>
</template>

<script>
export default {
  name: 'ArtCmtTouXiang',
  data() {
    return {
      dataxiang: require('@/assets/123.gif')
    }
  },
  props: ['images'],
  computed: {
    imagesUrl() {
      return this.images || this.dataxiang
    }
  }
}
</script>

<style lang="less" scoped>
.user_touxiang {
  width: 100%;
  height: 100%;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
