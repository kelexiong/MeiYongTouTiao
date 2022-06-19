<template>
  <div class="times_dianzan_huifu">
    <div>{{ toTimes('2022-06-18 12:00:00') }}</div>
    <div class="times_dianzan">
      <van-icon name="like-o" v-if="!flg" @click.stop="isDianZhan" /><van-icon
        v-else
        name="like"
        color="red"
        @click.stop="isDianZhan"
      />{{ 1 }}
    </div>

    <div class="tiems_huifu"><van-icon name="gem-o" />{{ 2 }}</div>
  </div>
</template>

<script>
import { nocommentlikingsAPI, commentlikingsAPI } from '@/API/userLogin'
export default {
  name: 'ArtCmtDianOrHui',
  props: ['rootId', 'rootIsLiking'],
  data() {
    return {
      flg: this.rootIsLiking
    }
  },
  methods: {
    toTimes(t) {
      let time = Date.parse(t)
      let time1 = Math.floor(time / 1000)
      let time2 = Math.floor(new Date() / 1000)
      let h = time2 - time1
      let tt =
        h / 60 < 1
          ? (tt = '刚刚')
          : h / 60 < 60
          ? (tt = Math.floor(h / 60) + '分站前')
          : h / 3600 < 24
          ? Math.floor(h / 3600) + '小时前'
          : h / 3600 / 24 < 30
          ? Math.floor(h / 3600 / 24) + '天前'
          : h / 3600 / 24 / 30 < 12
          ? Math.floor(h / 3600 / 24 / 30) + '月前'
          : Math.floor(h / 3600 / 24 / 30 / 12) + '年前'
      return tt || NaN
    },
    // 是否点赞
    async isDianZhan() {
      if (this.flg) {
        let result = await nocommentlikingsAPI(this.rootId)
        if (result.status === 204) {
          this.flg = false
        }
      } else {
        let result = await commentlikingsAPI(this.rootId)
        result.data.message === 'OK' ? (this.flg = true) : ''
      }
    }
  },
  computed: {
    isLiking() {
      return this.rootIsLiking || false
    }
  }
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
