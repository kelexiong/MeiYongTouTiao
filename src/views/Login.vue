<template>
  <div class="denglv">
    <van-nav-bar title="霉用头条" />
    <!-- <van-image width="100" height="100" :src="require('../assets/123.gif')" /> -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.mobile"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ]"
      />
      <van-field
        v-model="form.code"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userlogin } from '@/API/userLogin'
// import { Notify } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: '13888888123',
        code: '246810'
      }
    }
  },

  methods: {
    async onSubmit() {
      try {
        let { data } = await userlogin(this.form)
        if (data.message === 'OK') {
          this.$store.dispatch('saveToken', data.data)
          this.$router.push({
            path: '/userInfoPage'
          })
        } else {
          this.$notify({ type: 'warning', message: '登录失败' })
        }
      } catch (error) {
        this.$notify({ type: 'warning', message: error.response.data.message })
      }
    }
  }
}
</script>

<style lang="less">
.denglv {
  flex: 1;

  background: url(~@/assets/123.gif) no-repeat center top;
  .van-nav-bar__content {
    background-color: pink;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-form {
    padding: 75px;
    .van-cell {
      background: none;
      .van-field__label {
        color: #fff;
      }
      .van-field__control {
        color: #fff;
      }
    }
  }
}
</style>
