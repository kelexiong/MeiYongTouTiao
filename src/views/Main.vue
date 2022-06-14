<template>
  <div class="home-container">
    <van-tabs v-model="active" color="pink" :swipeable="true" sticky offset-top="1.22666667rem">
      <van-icon name="plus" size="16" class="plus" />
      <van-tab :title="item.name" v-for="item in articleLists" :key="item.id">
        <!-- @delArtList="delArtList" -->
        <ArtList :channelId="item.id" :key="item.id"></ArtList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArtList from '@/views/ArtList/ArtList'
export default {
  nane: 'Main',
  data() {
    return {
      active: 0
    }
  },
  components: {
    ArtList
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      try {
        let result = this.$store.dispatch('getarticledata')
      } catch (error) {
        this.$notify({ type: 'warning', message: error })
      }
    }
    // delArtList(id) {
    //   console.log(id)
    // }
  },
  computed: {
    articleLists() {
      return this.$store.state.articleInfo.articleList.channels
    }
  }
}
</script>

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
}
// logo 样式
.logo {
  height: 80%;
}
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
// /deep/ .van-tabs__content {
//   padding-top: 0.4133rem;
// }
</style>
