<template>
  <div class="artListInfobox">
    <div class="top">
      <van-nav-bar title="搜索结果" left-arrow fixed :placeholder="true" @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div class="conter">
      <!-- <div v-html="sa"></div> -->
      <div class="authorinfobox">
        <div class="biaoti">
          <h6>{{ artInfo.title }}</h6>
        </div>
        <div class="author_Info_box">
          <div class="autho_touxiang">
            <lazy-component>
              <van-image
                width="2.5rem"
                height="2.5rem"
                round
                :src="this.artInfo.aut_photo"
                lazy-load
              />
            </lazy-component>
          </div>
          <div class="autho_tow">
            <div class="autho_nameOrtime">
              <div>{{ this.artInfo.aut_name }}</div>
              <div>{{ this.artInfo.pubdate }}</div>
            </div>
            <div class="guanzhu_btn" @click="focusauthor(guanzhu)">
              <van-button type="info" plain size="mini" icon="plus" v-if="!guanzhu"
                >关注</van-button
              >
              <van-button type="info" size="mini" v-else>已关注</van-button>
            </div>
          </div>
        </div>
        <div class="fenggexian"></div>
      </div>
      <div class="artInfos">
        <!-- <span class="scroll">  </span> -->

        <div v-html="artInfo.content"></div>
      </div>
    </div>
    <van-divider>End</van-divider>
    <div class="like_box" @click.stop="isLikings(dianzhan)">
      <van-button icon="good-job" type="danger" size="small" v-if="dianzhan === 1"
        >已点赞</van-button
      >
      <van-button icon="good-job-o" type="danger" plain size="small" v-else>点赞</van-button>
    </div>
    <van-divider></van-divider>
    <ArtCmt v-if="artInfo.art_id" :art_id="artInfo.art_id" ref="ArtCmt"></ArtCmt>
    <!-- 底部发布评论 -->
    <div class="floor" :class="iswrite ? 'art-cmt-container-1' : 'art-cmt-container-2'">
      <!-- <van-tabbar v-model="active" fixed :placeholder="true">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar> -->
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="!iswrite">
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
        <div class="ipt-cmt-div" @click.stop="qiehuan">发表评论</div>
        <div class="icon-box">
          <van-badge :content="cmtCount" :max="99">
            <van-icon name="comment-o" size="20" />
          </van-badge>
          <van-icon name="star-o" size="20" />
          <van-icon name="share-o" size="20" />
        </div>
      </div>
      <!-- 底部添加评论区域 - 2 -->
      <van-overlay v-show="iswrite" @click.stop="qisiwole($event)">
        <div class="cmt-box van-hairline--top" @click.stop="">
          <textarea
            placeholder="友善评论、理性发言、阳光心灵"
            v-model="commentContent"
            ref="textarea"
          ></textarea>
          <van-button type="default" :disabled="commentContent.trim() === ''" @click.native="faBiao"
            >发布</van-button
          >
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import {
  getarticlesInfoAPI,
  followingsAPI,
  cancelFollowingsAPI,
  likingsAPI,
  cancellikingsAPI,
  releaseCommentsAPI
} from '@/API/userLogin'
import ArtCmt from '@/components/ArtCmt/ArtCmt.vue'
export default {
  name: 'ArtListInfoPage',

  data() {
    return {
      artInfo: {},
      imageslazy: '../../assets/1232.png',
      active: 0,
      guanzhu: false,
      dianzhan: 0,
      iswrite: false,
      commentContent: '',
      cmtCount: 0
    }
  },
  mounted() {
    this.getArtData()
  },
  components: {
    ArtCmt
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getArtData() {
      let { data: req } = await getarticlesInfoAPI(this.$route.params.id)
      if (req.message === 'OK') {
        this.artInfo = req.data
        this.guanzhu = req.data.is_followed
        this.dianzhan = req.data.attitude
        this.cmtCount = req.data.comm_count
      }
    },
    async focusauthor(flg) {
      if (flg) {
        let result = await cancelFollowingsAPI(this.artInfo.aut_id)
        if (result.status === 204) {
          this.guanzhu = false
        }
      } else {
        let result = await followingsAPI(this.artInfo.aut_id)
        if (result.data.message === 'OK') this.guanzhu = true
      }
    },
    async isLikings(flg) {
      if (flg === 1) {
        let result = await cancellikingsAPI(this.artInfo.art_id)
        if (result.status === 204) this.dianzhan = 0
      } else {
        let result = await likingsAPI(this.artInfo.art_id)

        if (result.data.message === 'OK') this.dianzhan = 1
      }
    },
    qiehuan() {
      this.iswrite = true
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    async faBiao() {
      let data = {
        target: this.artInfo.art_id,
        content: this.commentContent
      }
      let { data: req } = await releaseCommentsAPI(data)
      if (req.message === 'OK') {
        this.iswrite = false

        // 第一种写法，用户体验稍微差点，有页面重新加载效果
        // this.$refs.ArtCmt._data.pinlunarr = []
        // this.$refs.ArtCmt.getcomments(this.artInfo.art_id)
        // 第二种写法，无页面刷新效果
        this.$refs.ArtCmt._data.pinlunarr.unshift(req.data.new_obj)
        this.cmtCount++
        this.commentContent = ''
      }

      // console.log(this.$refs.ArtCmt)
    },
    qisiwole(evt) {
      // if (!this.$refs.textarea.contains(evt.target)) {
      this.iswrite = false
      // }
    }
  }
}
</script>

<style lang="less">
.artListInfobox {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .conter {
    .authorinfobox {
      padding: 20px 0;
      .biaoti {
        padding-bottom: 15px;
        h6 {
          padding: 0;
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .author_Info_box {
        display: flex;
        align-items: center;
        .autho_touxiang {
          margin-right: 10px;
          .van-image {
            display: block;
          }
        }
        .autho_tow {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .autho_nameOrtime {
            font-size: 14px;
            div + div {
              margin-top: 10px;
            }
          }
          .guanzhu_btn {
            margin-right: 5px;
          }
        }
      }
      .fenggexian {
        border-bottom: 1px solid #ccc;
        margin: 20px 0;
      }
    }
    .artInfos {
      font-size: 12px;
      line-height: 24px;
      width: 100%;
      // overflow: hidden;
      word-break: break-all;
      div {
        // width: 100%;
        // padding: 20px;
        box-sizing: border-box;
      }
      pre {
        overflow-x: scroll;
        background-color: #ccc;
        opacity: 0.4;
      }
      img {
        width: 100%;
        height: 100%;
      }
      // p {
      //   font-size: 14px;
      // }
    }
  }
  .like_box {
    display: flex;
    justify-content: center;
  }
  .floor {
    // 发布评论的盒子 - 1
    .add-cmt-box {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      line-height: 46px;
      padding-left: 10px;
      .ipt-cmt-div {
        flex: 1;
        border: 1px solid #efefef;
        border-radius: 15px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        padding-left: 15px;
        margin-left: 10px;
        background-color: #f8f8f8;
      }
      .icon-box {
        width: 40%;
        display: flex;
        justify-content: space-evenly;
        line-height: 0;
      }
    }

    .child {
      width: 20px;
      height: 20px;
      background: #f2f3f5;
    }

    // 发布评论的盒子 - 2
    .cmt-box {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      padding-left: 10px;
      box-sizing: border-box;
      background-color: white;
      textarea {
        flex: 1;
        height: 66%;
        border: 1px solid #efefef;
        background-color: #f8f8f8;
        resize: none;
        border-radius: 6px;
        padding: 5px;
      }
      .van-button {
        height: 100%;
        border: none;
      }
    }
  }
}
</style>
