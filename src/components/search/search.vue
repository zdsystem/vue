<template>
  <div class="search">
    <!-- 输入框区域 -->
    <div class="search-box-wrapper">
      <div class="search-box">
        <i class="icon-search"></i>
        <input ref="userSearh" class="box" placeholder="搜索歌曲、歌手、专辑" v-model.trim.lazy="search"
        @focus="clearHot" @keyup.enter="send"/>
        <i v-show="search" @click="clearSearch" class="icon-dismiss"></i>
      </div>
      <div class="clear-txt" @click="clearTxt" v-show="txtShow">取消</div>
    </div>
    <!-- 显示热门搜索、搜索历史块 -->
    <div class="shortcut-wrapper">
      <div class="shortcut">
        <div>
          <div class="hot-key" v-show="boolear">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item tag-hot" v-if="!this.statusCode">
                <a :href="special_url">{{ special_key }}</a>
              </li>
              <li class="item" @click="addSearch(item.k)" :key="index" v-for="(item, index) in hotKey">
                <a href="#">{{ item.k }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="search-history" v-show="historyShow">
      <history :userInput="search" @searchHistory="dosearchHistory"></history>
    </div>
    <div class="search-list">
      <suggest :userInput="search" :getSend="sendKey"></suggest>
    </div>
  </div>
</template>

<script>
// 导入搜索建议结果组件
import Suggest from 'components/suggest/suggest'
// 导入获取键的方法
import {getHotKey} from 'api/search'
// 导入搜索历史组件
import History from 'components/history/history'

// import {insertArr, saveSearch} from 'common/js/cache'
// import {saveSearch} from 'common/js/cache'

// import storage from 'good-storage'
export default {
  data () {
    return {
      special_key: '',
      special_url: '',
      rand: undefined,
      hotKey: [],
      search: '',
      txtShow: false,
      // 默认为真显示热门搜索块
      boolear: true,
      statusCode: 1,
      sendKey: '',
      historyShow: false
    }
  },
  created () {
    this._getHotKey()
    // this.saveHistory()
  },
  methods: {
    _getHotKey () {
      getHotKey().then((data) => {
        this.statusCode = data.code
        this.hotKey = data.data.hotkey.slice(0, 10)
        this.special_url = data.data.special_url
        this.special_key = data.data.special_key
      })
    },
    clearSearch() {
      this.search = ''
    },
    // 点击显示的热门搜索内容写入到输入框中
    addSearch (searchContent) {
      this.search = searchContent
      this.boolear = false
      this.txtShow = true
    },
    // 点击搜索框
    clearHot() {
      // 隐藏热门搜索
      this.boolear = false
      // 显示取消样式
      this.txtShow = true
      this.historyShow = true
      // 初始化localstorage
      if (localStorage.name === undefined) {
        localStorage.name = localStorage['name'] = ''
      }
    },
    // 点击‘取消’触发的事件
    clearTxt() {
      // 清空搜索内容
      this.search = ''
      // 隐藏‘取消’字体
      this.txtShow = false
      this.boolear = true
      this.historyShow = false
    },
    send(e) {
      this.sendKey = e.keyCode
      this.historyShow = false
      if (localStorage.name.split(',').indexOf(this.search.trim()) === -1) {
        let locals = this.search
        localStorage.name = localStorage['name'] += locals + ','
      }
    },
    dosearchHistory(data) {
      this.search = data
      // 隐藏搜索历史
      this.historyShow = false

      // console.log(data)
    }
  },
  components: {
    Suggest,
    History
  }
}
</script>

<style lang="styl" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  html
    background: #fff
  .search
    .search-box-wrapper
      background: $color-background
      border-radius: 999px
      display: flex
      padding: 10px
      .search-box
        flex:1
        display: flex
        align-items: center
        box-sizing: border-box
        padding: 0 6px
        height: 36px
        background: $color-background-w
        border-radius: 6px
        .icon-search
          font-size: 24px
          color: #b1b1b1
        .box
          flex: 1
          margin: 0 5px
          outline: none
          line-height: 18px
          background: $color-background-w
          color: $color-text-d
          font-size: $font-size-medium
          &::placeholder
            color: $color-text-d
        .icon-dismiss
          font-size: 16px
          color: #b1b1b1
      .clear-txt
        display: block
        padding-right: 10px
        padding-left: 10px
        font-size: 14px
        height: 36px
        line-height: 36px
    .shortcut-wrapper
      /*position: fixed*/
      /*top: 145px*/
      /*bottom: 0*/
      width: 100%
      /*padding-top: 15px*/
      background: $color-background-w
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 20px 15px 20px

          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            font-size: 0
            display: inline-block
            height: 30px
            line-height: 30px
            padding: 0 10px
            margin: 0 12px 10px 0
            border-radius: 99px
            font-size: $font-size-medium
            color: $color-text
            border: 1px solid $color-text
            &.tag-hot
              border-color: #fc4524
              a
                color: #fc4524
            a
             color: $color-text
</style>