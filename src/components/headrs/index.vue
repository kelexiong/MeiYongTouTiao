<template>
  <van-nav-bar
    :title="this.$route.path === '/userInfoPage' ? '霉用头条' : ''"
    fixed
    placeholder:true
  >
    <template #left>
      <div class="leftbox" v-if="isleftboxshow">
        <img src="@/assets/1232.png" alt="logo" class="logo" />
        <span class="logospan">霉用头条</span>
      </div>
    </template>
    <!-- 右侧的插槽 -->
    <template #right>
      <van-icon v-if="isleftboxshow" name="search" color="white" size="18" @click.stop="toSearch" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'Headrs',
  data() {
    return {
      leftboxshow: false
    }
  },
  methods: {
    toSearch() {
      this.$router.push('/search')
    }
  },
  computed: {
    isleftboxshow() {
      return this.$route.path === '/userInfoPage' ? false : true
    }
  }
}
</script>

<style lang="less">
.van-nav-bar__content {
  background-color: pink;
  .van-nav-bar__title {
    color: #fff;
  }
  .leftbox {
    display: flex;
    width: 210px;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 1.0667rem;
    }
    .logospan {
      color: #fff;
    }
  }
}
</style>
