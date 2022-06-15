<template>
  <div ref="ArtListBox">
    <!--       :immediate-check="false" -->
    <van-pull-refresh
      v-model="isLoading"
      animation-duration="3000"
      :disabled="finished"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="100"
        @load="onLoad"
      >
        <van-cell
          v-for="item in artlist"
          :key="item.art_id"
          @click.stop="gotoArtlistInfo(item.art_id)"
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
          <template #label>
            <div class="label-box">
              <span
                >作者：{{ item.aut_name }} &nbsp;&nbsp; {{ item.comm_count }}评论 &nbsp;&nbsp;
                发布日期：{{ times(item.pubdate) }}</span
              >
              <!-- 关闭按钮 -->
              <van-icon name="cross" @click.stop="isShow(item.art_id)" />
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 不感兴趣弹出层组件 -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      v-no-through
      @closed="isFirst = true"
    >
      <!-- 一级反馈面板 get-container="body" -->
      <div class="content" v-if="isFirst">
        <van-cell
          v-for="(closeList, index) in actions"
          :key="index"
          :title="closeList.name"
          clickable
          class="center-title"
          @click="onCellClick(closeList.name)"
        />
      </div>
      <!-- 二级反馈面板 -->
      <div v-else>
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
        <van-cell
          v-for="report in reports"
          :key="report.type"
          :title="report.label"
          clickable
          title-class="center-title"
          @click="ReportArticle(report.type)"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getAllListAPI, dislikeArticleAPI, reportArticleAPI } from '@/API/userLogin'
import reports from '@/views/ArtList/reports'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArtList',
  data() {
    return {
      // timestamp: ''
      artlist: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      isLoading: false,
      // 不感兴趣弹出
      show: false,
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }, { name: '拉黑作者' }],
      isFirst: true,
      // 约定的文章举报类型
      reports,
      noId: ''
    }
  },
  props: ['channelId'],
  mounted() {
    // this.getAllList()
  },
  methods: {
    async getAllList(state) {
      let { data: res } = await getAllListAPI(this.channelId, this.timestamp)
      if (res.message === 'OK') {
        if (state === 'up') {
          this.artlist = [...this.artlist, ...res.data.results]
          // 加载状态结束
          this.loading = false
        } else {
          this.artlist = [...res.data.results, ...this.artlist]
          this.isLoading = false
        }

        // this.artlist.push(...res.data.results)
        this.timestamp = res.data.pre_timestamp
        this.isLoading = false
        // 数据全部加载完成
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      } else {
        this.$notify('Sorry!Your request has failed')
      }
    },
    // 上拉加载
    onLoad() {
      this.getAllList('up')
    },
    // 下拉加载
    onRefresh() {
      this.getAllList('down')
    },
    // 点击关闭后的弹出显示
    isShow(id) {
      this.show = true
      this.noId = id
    },
    // 防止炸楼
    boom() {
      let height = document.documentElement.clientHeight - this.$refs.ArtListBox.offsetHeight
      // this.$emit('delArtList', this.noId)
      if (height > -100) {
        this.getAllList('down')
      }
    },
    // 关闭不敢兴趣的动作
    async onCellClick(name) {
      switch (name) {
        case '不感兴趣':
          let result = await dislikeArticleAPI(this.noId)
          if (result.data.message === 'OK') {
            this.$notify({ type: 'success', message: '不感兴趣删除添加成功' })
            this.artlist = this.artlist.filter(item =>
              item.art_id !== this.noId ? item : undefined
            )
            this.boom()
            this.show = false
            // let artlistbox = document.querySelector('#ArtListBox')
          }
          break
        case '拉黑作者':
          this.show = false
          break
        default:
          this.isFirst = false
      }
    },
    async ReportArticle(type) {
      let result = await reportArticleAPI(this.noId, type)
      if (result.data.message === 'OK') {
        this.$notify({ type: 'success', message: '成功添加到举报的反感内容' })
        this.artlist = this.artlist.filter(item => (item.art_id !== this.noId ? item : undefined))
        this.boom()
        this.show = false
      }
    },
    // 去文章详情页面
    gotoArtlistInfo(id) {
      this.$router.push(`/artcleInfo/${id}`)
    }
  },
  computed: {
    times() {
      return function (time) {
        let index = time.slice(0, time.indexOf(' '))
        // let oldtimes = Date.parse(index)
        // let newtimes = Date.now()
        let poortiems = Math.floor((Date.now() - Date.parse(index)) / 1000 / 3600 / 24 / 30)
        if (poortiems < 12) {
          return poortiems + '月前'
        }
        return Math.floor(poortiems / 12) + '年前'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
</style>
