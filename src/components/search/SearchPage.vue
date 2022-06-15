<template>
  <div class="bigbox">
    <div class="searchpage" v-if="this.$route.path === '/search'">
      <div class="searchbigbox">
        <div class="iconbox" @click.stop="onClickLeft">
          <van-icon name="arrow-left" size="20px" />
        </div>
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @input.native="searchfuzu"
        />
      </div>
      <div class="searchrecordbigbox">
        <div v-if="value === ''">
          <div class="searchrecord">
            <div>搜索历史</div>
            <div><van-icon name="delete-o" @click.native.stop="deletehistory" /></div>
          </div>
          <div class="cordtextbaoqian">
            <van-tag
              plain
              type="primary"
              class="biaoqian"
              v-for="(historyitem, index) in history"
              :key="index"
              @click.stop="repeatsearchfuzu(historyitem)"
              >{{ historyitem }}</van-tag
            >
          </div>
        </div>
        <div class="searchcordtext" v-else>
          <div class="searchauxiliary" v-if="searchList.length !== 0 && searchList[0] !== null">
            <ul>
              <li v-for="(item, index) in searchList" :key="index" @click="toArtInfo(item)">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="searchNull" v-else><span>暂无搜索内容</span></div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { suggestionAPI, searchresultAPI } from '@/API/userLogin'
let timesss = null
export default {
  name: 'SearchPage',
  data() {
    return {
      value: '',
      // 搜索列表数据
      searchList: [],
      history: JSON.parse(localStorage.getItem('history')) || [],
      // 默认页数
      page: 1
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    searchfuzu() {
      this.searchList = []
      clearTimeout(timesss)
      if (this.value) {
        timesss = setTimeout(async () => {
          let result = await suggestionAPI(this.value)
          if (
            result.data.message === 'OK' &&
            result.data.data.options.length !== 0 &&
            result.data.data.options[0] !== null
          ) {
            this.searchList = result.data.data.options
          } else {
            this.$notify({ type: 'danger', message: '暂无搜索' })
          }
          this.historyList(this.value)
          console.log(typeof result.data.data.options[0], result.data.data.options.length)
        }, 1000)
      }
    },
    //清空历史记录
    deletehistory() {
      this.history = []
      localStorage.removeItem('history')
    },
    repeatsearchfuzu(value) {
      this.value = value
      this.searchfuzu()
    },
    // 跳转到对应文章
    async toArtInfo(item) {
      this.$router.push(`/search/${item}`)
    }
  },
  computed: {
    historyList() {
      return function (value) {
        let index = this.history.indexOf(value)
        if (index === -1) {
          this.history.push(value)
        } else {
          // let a = this.history.splice(index, 1).unshift(value)
          this.history.splice(index, 1)
          this.history.unshift(value)
        }
        localStorage.setItem('history', JSON.stringify(this.history))
        return JSON.parse(localStorage.getItem('history')) || []
      }
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
    .cordtextbaoqian {
      display: flex;
      align-items: center;
      margin: 5px;
      flex-wrap: wrap;
      .biaoqian {
        padding: 10px;
        margin: 15px 15px 0 0;
        border-radius: 40%;
      }
    }
    .searchcordtext {
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;

      .searchauxiliary {
        font-size: 16px;
        ul {
          list-style: none;
          li {
            padding: 5px;
          }
        }
        flex: 1;
      }
      .searchNull {
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        align-items: center;
        span {
          color: #ccc;
        }
      }
    }
  }
}
</style>
