<template>
  <div class="xiehaode">
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
    <div class="bigbox">
      <div>
        <!-- 头像 -->
        <ArtCmtTouXiang></ArtCmtTouXiang>
      </div>
      <div class="user_nameOrlver">
        <!-- 用户名和等级 -->
        <ArtCmtUserName></ArtCmtUserName>
        <div class="user_text">
          属性引用。基于字体的图标集标集标集标集标集标集标集标集标集标集标集标集
        </div>
        <!-- 点赞和回复 -->
        <ArtCmtDianOrHui></ArtCmtDianOrHui>
      </div>
      <div>{{ toTimes() }}</div>
    </div>
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
      pinlunarr: []
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
    // 获取文章信息
    async getcomments(id) {
      let { data: req } = await commentsAPI(id, this.page || '')
      if (req.message === 'OK') {
        this.pinlunData = req.data
        this.pinlunarr.push(...req.data.results)
      }
    },
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
    }
    //
    /*
[
{
start:初始时间，
end:末尾时间，
value:“刚刚”    然后只需要对这个map一下，如果你那个时间戳＞这个start ＜end 那就把value返回出去
}
]
*/

    /*
arr:[{
  start:Math.floor(new Date() / 1000)
  end:Math.floor(new Date() / 1000)+60
  value:'刚刚'
}，
{
  start:Math.floor(new Date()/1000*60)
  end:Math.floor(new Date()/1000*60)*60
  value:'分钟'
}，
{
  start:Math.floor(new Date()/1000*60*60)
  end:Math.floor(new Date()/1000*60*60*24)
  value:'小时'
}，
{
  start:1
  end:60
  value:'秒'
}，
{
  start:61
  end:3600
  value:'分'
}，
{
  start:3601
  end:3600*24+1
  value:'小时'
}
]




*/
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

.bigbox {
  display: flex;
  padding: 10px 10px;
  .user_nameOrlver {
    .user_text {
      font-size: 16px;
    }
  }
}
</style>
