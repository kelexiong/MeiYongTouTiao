<template>
  <div class="searchpage">
    <div class="searchbigbox">
      <div class="iconbox" @click.stop="onClickLeft">
        <van-icon name="arrow-left" size="20px" />
      </div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    </div>
    <div class="searchrecordbigbox">
      <div class="searchrecord">
        <div>搜索历史</div>
        <div><van-icon name="delete-o" /></div>
      </div>
      <div class="searchcordtext">
        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">12131</van-tag>
        </div>
        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">12131</van-tag>
        </div>
        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">12131</van-tag>
        </div>
        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">12131</van-tag>
        </div>

        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">1212121131</van-tag>
        </div>
        <div class="cordtextbaoqian">
          <van-tag plain type="primary" class="biaoqian">12131</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.searchpage {
  .searchbigbox {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: pink;
    justify-content: space-between;
    align-items: center;
    .iconbox {
      display: flex;
      align-items: center;
    }
    .van-search {
      flex: 1;
      background-color: transparent;
    }
  }
  .searchrecordbigbox {
    padding: 0 20px;
    .searchrecord {
      flex: 1;
      display: flex;
      margin: 10px 0 0;
      font-size: 14px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      div {
        padding-bottom: 15px;
      }
    }
    .searchcordtext {
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      .cordtextbaoqian {
        display: flex;
        align-items: center;
        margin: 5px;
        .biaoqian {
          padding: 10px;
          border-radius: 40%;
        }
      }
    }
  }
}
</style>
