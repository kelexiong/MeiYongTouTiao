<template>
  <div class="times_dianzan_huifu">
    <div>{{ Date('yyyy - mm - dd') }}</div>
    <div class="times_dianzan"><van-icon name="gem-o" />{{ 1 }}</div>
    <div class="tiems_huifu"><van-icon name="gem-o" />{{ 2 }}</div>
  </div>
</template>

<script>
export default {
  name: 'ArtCmtDianOrHui'
}
</script>

<style lang="less">
.times_dianzan_huifu {
  display: flex;
  align-items: center;
  font-size: 12px;
  .times_dianzan {
    display: flex;
    padding: 0 10px;
  }
  .tiems_huifu {
    display: flex;
    padding: 0 10px;
  }
}
</style>
