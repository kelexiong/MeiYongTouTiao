<template>
  <div>
    <van-nav-bar title="霉用头条" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style></style>
