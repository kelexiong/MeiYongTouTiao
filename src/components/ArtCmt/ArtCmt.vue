<template>
  <div class="xiehaode">
    <div>
      <!-- 评论列表 -->
      <!-- <div class="cmt-list"> -->
      <!-- 评论的 Item 项 -->
      <!-- <div class="cmt-item"> -->
      <!-- 头部区域 -->
      <!-- <div class="cmt-header"> -->
      <!-- 头部左侧 -->
      <!-- <div class="cmt-header-left">
            <img src="" alt="" class="avatar" />
            <span class="uname">zs</span>
          </div> -->
      <!-- 头部右侧 -->
      <!-- <div class="cmt-header-right">
            <van-icon name="like" size="16" color="red" />
            <van-icon name="like-o" size="16" color="gray" />
          </div>
        </div> -->
      <!-- 主体区域 -->
      <!-- <div class="cmt-body">
          基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon
          属性引用。基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。
        </div> -->
      <!-- 尾部区域 -->
      <!-- <div class="cmt-footer">3天前</div>
      </div>
    </div> -->
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="bigbox" v-for="(items, index) in pinlunarr" :key="items.com_id">
        <!-- 头像 -->
        <div class="big_tou">
          <ArtCmtTouXiang :images="items.aut_photo"></ArtCmtTouXiang>
        </div>
        <!-- 用户名和等级 -->
        <div class="user_nameOrlver">
          <ArtCmtUserName :rootname="items.aut_name"></ArtCmtUserName>
          <div class="user_text">
            {{ items.content }}
          </div>
          <!-- 点赞和回复 -->
          <ArtCmtDianOrHui :rootId="items.com_id" :rootIsLiking="items.is_liking"></ArtCmtDianOrHui>
          <!-- 回复的板块 -->
          <div class="huifu" v-show="index === 0" v-for="(item, indexs) in cslists" :key="indexs">
            <div class="tou">
              <ArtCmtTouXiang></ArtCmtTouXiang>
            </div>
            <div class="huifu_userInfoOrtext">
              <div class="uersname">
                <ArtCmtUserName :name="item.name"></ArtCmtUserName>
              </div>
              <span>{{ item.title }}</span>
              <div>
                <ArtCmtDianOrHui></ArtCmtDianOrHui>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// import moment from 'moment'
import { commentsAPI } from '@/API/userLogin'
import ArtCmtTouXiang from '@/components/ArtCmt/ArtCmtComponet/ArtCmtTouXiang'
import ArtCmtUserName from '@/components/ArtCmt/ArtCmtComponet/ArtCmtUserName'
import ArtCmtDianOrHui from '@/components/ArtCmt/ArtCmtComponet/ArtCmtDianOrHui'
export default {
  name: 'ArtCmt',
  data() {
    return {
      page: undefined,
      pinlunData: {},
      pinlunarr: [],
      loading: false,
      finished: false,
      cslists: [
        {
          name: '皮皮虾',
          title:
            '皮皮虾全为海生。掠虾类起源于中生代的侏罗纪，绝大多数种类生活于热带和亚热带海域，少数见于温带海域。中国沿海均有，其中以虾蛄科（Squillidae），口虾蛄属（Oratosquilla）旗下的广温性品种——口虾蛄（Oratosquilla oratoria）分布最广、产量最大'
        },
        {
          name: '螃蟹',
          title:
            '螃蟹（páng xiè）属软甲纲，十足目，是甲壳类动物，身体被硬壳保护着，靠鳃呼吸。在生物分类学上，它与虾、龙虾、寄居蟹是同类动物。'
        }
      ]
    }
  },
  components: {
    ArtCmtTouXiang,
    ArtCmtUserName,
    ArtCmtDianOrHui
  },
  props: ['art_id'],
  mounted() {
    this.$nextTick(function () {
      this.getcomments(this.art_id)
    })
  },
  methods: {
    // 获取文章评论信息
    async getcomments(id) {
      let { data: req } = await commentsAPI(id, this.page || '')
      if (req.message === 'OK') {
        this.pinlunData = req.data
        this.pinlunarr.push(...req.data.results)
        if (req.data.last_id) {
          this.page = req.data.last_id
          this.loading = false
        } else {
          this.page = null
          this.finished = true
        }
      }
    },
    onLoad() {
      this.getcomments(this.art_id)
    }
  },
  computed: {}
}
</script>

<style lang="less">
/**.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
} */
.xiehaode {
  padding: 10px 10px;
  .bigbox {
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    .big_tou {
      width: 40px;
      height: 40px;
    }
    .user_nameOrlver {
      width: 100%;
      padding-left: 10px;
      .user_text {
        font-size: 16px;
        padding: 10px 0;
      }
      .huifu {
        position: relative;
        background-color: #eee;
        .tou {
          position: absolute;
          top: 0;
          width: 1rem;
          height: 1rem;
        }
        .tou + .huifu_userInfoOrtext {
          margin-left: 1.5rem;
        }
        .huifu_userInfoOrtext {
          font-size: 14px;
          .uersname {
            display: inline-flex;
          }
          .spanbox {
            margin-left: 10px;
          }
          span {
            margin-left: 20px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
