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
            <!-- <lazy-component> -->
            <van-image
              width="2.5rem"
              height="2.5rem"
              round
              :src="this.artInfo.aut_photo"
              lazy-load
            />
            <!-- </lazy-component> -->
          </div>
          <div class="autho_nameOrtime">
            <div>123</div>
            <div>tiem</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getarticlesInfoAPI } from '@/API/userLogin'
export default {
  name: 'ArtListInfoPage',
  data() {
    return {
      artInfo: {},
      imageslazy: '../../assets/1232.png'
    }
  },
  mounted() {
    this.getArtData()
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getArtData() {
      let { data: req } = await getarticlesInfoAPI(this.$route.params.id)
      if (req.message === 'OK') {
        this.artInfo = req.data
        console.log(this.artInfo)
      }
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
        .autho_nameOrtime {
          font-size: 14px;
          div + div {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
