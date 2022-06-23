<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img v-lazy="getUser_info.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ getUser_info.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>0</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ getUser_info.fans_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ getUser_info.follow_count }}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link @click.stop="editUserInfo" />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link @click.stop="exitLogin" />
    </van-cell-group>
  </div>
</template>

<script>
import { getuserInfoAPI } from '@/API/userLogin'
import { mapGetters } from 'vuex'
export default {
  name: 'userInfoPage',
  data() {
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let { data: req } = await getuserInfoAPI()
      if (req.message === 'OK') {
        this.$store.dispatch('setuser_info', req.data)
      }
    },
    exitLogin() {
      this.$dialog
        .confirm({
          title: '正在退出',
          message: '确定是否退出登录！！！'
        })
        .then(() => {
          this.$router.replace('/login')
          localStorage.removeItem('token')
        })
        .catch(() => {
          // on cancel
        })
    },
    editUserInfo() {
      this.$router.push('/userInfoPage/edit')
    }
  },
  computed: {
    ...mapGetters(['getUser_info'])
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: pink;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: pink;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
