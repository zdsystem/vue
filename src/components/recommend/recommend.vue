<template>
  <div id="remomend">
    <div class="loading"  v-if="!radioList.length">
      <loading></loading>
    </div>
    <div class="recommend-content" v-else>
      <div class="slider-wrapper">
        <swiper-box></swiper-box>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">电台</h1>
        <!-- "ws.stream.qqmusic.qq.com/C100000RJTDN4ZKuBA.m4a?fromtag=38" -->
        <ul class="radio">
          <li class="item" :key="index" v-for="(item, index) in radioList">
            <div>
              <img v-lazy="item.picUrl">
              <span class="icon icon-play"></span>
            </div>
            <h3 class="title">{{ item.Ftitle}}</h3>
          </li>
        </ul>
        <h1 class="list-title">热门歌单</h1>
        <ul class="song radio">
          <router-link :to="{path: '/recommend/albumInfo', query: {id: item.id}}" class="item" :key="index" v-for="(item, index) in songList">
            <div>
              <img v-lazy="item.picUrl">
              <span class="icon icon-play"></span>
              <span class="listen_count">
                <span class="icon-listen"></span>
                <span>{{ (item.accessnum/10000).toFixed(1)}}万</span>
              </span>
            </div>
            <div class="list-info">
              <h3 class="list-tit">{{ item.songListDesc }}</h3>
              <p class="author">{{ item.songListAuthor}}</p>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <transition name="songlist">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import SwiperBox from 'base/slider/slider'
// 导入分装好的请求数据的方法
import {getRecommend} from 'api/recommend'
// ERR_OK 请求数据状态码
import {ERR_OK} from 'api/config'
// 导入加载组件
import Loading from 'components/loading/loading'
export default {
  data() {
    return {
      radioList: [],
      songList: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.radioList = res.data.radioList
          this.songList = res.data.songList
        }
      })
    }
  },
  components: {
    SwiperBox,
    Loading
  }
}
</script>

<style lang="styl">
  @import "~common/stylus/variable"
  #remomend
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        width: 100%
        padding: 0 10px
        box-sizing: border-box
        .list-title
          width: 100%
          height: 65px
          line-height: 65px
          font-size: $font-size-medium-x
          color: $color-text
        .radio
          width: 100%
          display: flex
          justify-content: space-between
          .item
            width: 49%
            background: $color-theme-t
            margin-bottom: 10px
            div
              position: relative
              img
                display: block
                width: 100%
                margin-bottom: 5px
            .title
              height: 36px
              line-height: 18px
              padding: 0 7px 5px
              font-size: $font-size-medium
              white-space: normal
              word-wrap: break-word
            .icon
              position: absolute
              display: block
              background: url(../../common/image/list_sprite.png) no-repeat
              background-size: 24px 60px
              &.icon-play
                bottom: 5px
                right: 5px
                width: 24px
                height: 24px
        .song
          width: 100%
          display: flex
          justify-content: space-between
          flex-wrap: wrap
          .item
            .listen_count
              position: absolute
              bottom: 7px
              left: 5px
              display: flex
              line-height: 12px
              font-size: $font-size-small
              color: $color-theme-t
              .icon-listen
                display: inline-block
                width: 10px
                height: 10px
                margin-right: 5px
                background: url(../../common/image/list_sprite.png) no-repeat 0 -50px
                background-size: 24px 60px
              span
                display: block
                float: left
          .list-info
            padding: 0 7px 5px
            line-height: 21px
            color: $color-text
            .list-tit
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              font-weight: normal
              font-size: $font-size-medium
            .author
              font-size: $font-size-small
</style>