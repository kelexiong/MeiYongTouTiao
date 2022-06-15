<template>
  <div class="serachresultbox">
    <div class="top">
      <van-nav-bar title="搜索结果" left-arrow fixed :placeholder="true" @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div class="conter">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getArtcleListLis"
      >
        <van-cell
          v-for="item in artlist"
          :key="item.art_id"
          @click.stop="toArtcleInfo(item.art_id)"
        >
          <!-- 标题区域的插槽 -->
          <template #title>
            <div class="title-box">
              <!-- 标题 -->
              <span>{{ item.title }}</span>
              <!-- 单张图片 -->
              <img
                v-if="item.cover.type === 1"
                v-lazy="item.cover.images[0]"
                alt=""
                class="thumb"
              />
            </div>
            <!-- 三张图片 -->
            <div class="thumb-box" v-if="item.cover.type === 3">
              <img
                v-for="(itemsimg, index) in item.cover.images"
                :key="index"
                v-lazy="itemsimg"
                alt=""
                class="thumb"
              />
            </div>
          </template>
          <!-- label 区域的插槽 -->
          <!-- <template #label>
          <div class="label-box">
            <span
              >作者：{{ item.aut_name }} &nbsp;&nbsp; {{ item.comm_count }}评论 &nbsp;&nbsp;
              发布日期：{{ times(item.pubdate) }}</span
            > -->
          <!-- 关闭按钮 -->
          <!-- <van-icon name="cross" @click.stop="isShow(item.art_id)" />
          </div>
        </template> -->
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchresultAPI } from '@/API/userLogin'
export default {
  name: 'ArticleLIstLI',
  data() {
    return {
      artlist: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  mounted() {
    this.getArtcleListLis()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    async getArtcleListLis() {
      let item = this.$route.params.q
      let { data: req } = await searchresultAPI(item, this.page)
      if (req.message === 'OK') {
        this.artlist.push(...req.data.results)
        this.page++
        this.loading = false
      } else {
        this.$notify({ type: 'danger', message: '网络出问题了耶' })
      }
      if (req.data.results.length <= 1) {
        this.finished = true
      }
    },
    // 去往文章详情页面
    toArtcleInfo(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.serachresultbox {
  width: 100%;
  height: 100%;
  .top {
  }
  .conter {
    width: 100%;
    .thumb {
      // 矩形黄金比例：0.618
      width: 113px;
      height: 70px;
      background-color: #f8f8f8;
      object-fit: cover;
    }

    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .center-title {
      text-align: center;
    }
    .thumb-box {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
