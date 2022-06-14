<template>
  <div class="home-container">
    <van-tabs v-model="active" color="pink" :swipeable="true" sticky offset-top="1.22666667rem">
      <van-icon name="plus" size="16" class="plus" @click="close" />
      <van-tab :title="item.name" v-for="item in articleLists" :key="item.id">
        <!-- @delArtList="delArtList" -->
        <ArtList :channelId="item.id" :key="item.id"></ArtList>
      </van-tab>
      <!-- 频道弹出层 -->
      <van-popup class="channelShowBox" v-model="channelShow" @close="bianjizhuangtai = false">
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon name="cross" @click.stop="channelShow = false" />
          </template>
        </van-nav-bar>
        <!-- 编辑主体区域 -->
        <div class="bianji_bigbox">
          <div class="bianji_yitianjiabox">
            <!-- 文本 -->
            <div class="bianji_taitoubox">
              <div>已添加频道：</div>
              <span v-if="bianjizhuangtai">点击移出频道</span>
              <span v-else>点击编辑频道</span>
            </div>
            <!-- 按钮 -->
            <div class="bianji_tianjiabtn">
              <van-button
                v-if="bianjizhuangtai"
                round
                type="default"
                size="mini"
                @click.stop="bianjizhuangtai = false"
                >完成</van-button
              ><van-button
                v-else
                round
                type="default"
                size="mini"
                @click.stop="bianjizhuangtai = true"
                >编辑</van-button
              >
            </div>
          </div>
          <!-- 标签栏目 -->
          <div class="bianji_biaoqianbox">
            <div class="flex_boxs" v-for="item in userartchannel" :key="item.id">
              <van-tag plain size="large" type="primary">
                {{ item.name }}
                <span
                  class="offvantag"
                  v-show="bianjizhuangtai && item.name !== '推荐'"
                  @click.stop="removedchannel(item)"
                  >x</span
                >
              </van-tag>
            </div>
          </div>
        </div>
        <!-- 分割线 -->
        <div class="xian"></div>
        <!-- 可添加主体区域 -->
        <div class="bianji_bigbox">
          <div class="bianji_yitianjiabox">
            <!-- 文本 -->
            <div class="bianji_taitoubox">
              <div>可添加加频道：</div>
              <span>点击添加到频道</span>
            </div>
          </div>
          <!-- 标签栏目 -->
          <div class="bianji_biaoqianbox">
            <div class="flex_boxs" v-for="noitem in nouserartchannel" :key="noitem.id">
              <van-tag plain size="large" type="primary" @click.stop="addchannel(noitem)">
                {{ noitem.name }}
              </van-tag>
            </div>
          </div>
        </div>
      </van-popup>
    </van-tabs>
  </div>
</template>

<script>
import ArtList from '@/views/ArtList/ArtList'
import { getAllChannelAPI, updateUserChannelAPI } from '@/API/userLogin'

export default {
  nane: 'Main',
  data() {
    return {
      active: 0,
      // 频道弹出层
      channelShow: false,
      // 编辑状态
      bianjizhuangtai: false,

      userartchannel: []
    }
  },
  components: {
    ArtList
  },
  mounted() {
    this.getData()
  },
  methods: {
    deepClone(obj) {
      const newobj = []
      for (const key in obj) {
        newobj[key] = obj[key]
      }
      return newobj
    },
    // 获取全部频道
    getData() {
      try {
        let result = this.$store.dispatch('getarticledata')
      } catch (error) {
        this.$notify({ type: 'warning', message: error })
      }
    },
    async close() {
      this.channelShow = true
      let result = await getAllChannelAPI()
      if (result.data.message === 'OK') {
        this.userartchannel = result.data.data.channels
      } else {
        this.$notify({ type: 'success', message: '网络出错了' })
      }
      // this.nouserartchannel = this.articleLists.filters(item=>
    },
    async updateChannelInfo() {
      let data = this.userartchannel
        .filter(item => item.name !== '推荐')
        .map((item, index) => {
          return {
            id: item.id,
            seq: index + 1
          }
        })
      let result = await updateUserChannelAPI(data)
      result.status === 201 ? '' : this.$notify({ type: 'danger', message: '网络出错了' })
    },

    addchannel(item) {
      if (this.bianjizhuangtai) {
        this.userartchannel.push(item)
        this.updateChannelInfo()
      }
    },
    // 移出频道
    removedchannel(removeitem) {
      this.userartchannel = this.userartchannel.filter(item => item.id !== removeitem.id)
      this.updateChannelInfo()
    }
  },
  computed: {
    articleLists() {
      return this.$store.state.articleInfo.articleList.channels
    },
    nouserartchannel() {
      let arr = this.deepClone(this.articleLists)
      for (let i = 0; i < this.userartchannel.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (this.userartchannel[i].id === arr[j].id) {
            arr.splice(j, 1)
            break
          }
        }
      }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
  .channelShowBox {
    width: 100%;
    height: 100%;
    .bianji_bigbox {
      padding: 10px;
      font-size: 14px;
      .bianji_yitianjiabox {
        display: flex;
        justify-content: space-between;
        .bianji_taitoubox {
          display: flex;
          align-items: center;
          div {
            font-weight: 800;
          }
          span {
            font-size: 12px;
            color: #aaa;
          }
        }
        .bianji_tianjiabtn {
          text-align: right;
          button {
            font-size: 10px;
            padding: 10px;
          }
        }
      }
      .bianji_biaoqianbox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding-top: 10px;
        .flex_boxs {
          display: flex;
          flex: 0 1 25%;
          padding: 5px;
          box-sizing: border-box;
        }
        span {
          position: relative;
          flex: 1;
          height: 35px;
          font-size: 10px;
          justify-content: center;
          align-items: center;
          .offvantag {
            position: absolute;
            top: 0;
            right: 5px;
            text-align: center;
            line-height: 10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
        }
      }
    }
    .xian {
      margin: 0 10px;
      border-bottom: 1px solid #ddd;
    }
  }
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
