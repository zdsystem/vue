<template>
<div id="album">
  <div :key="index" v-for="(item, index) in cdlist">
    <div id="info_box">
      <div class="topbar">
        <span class="back" @click="back">返回</span>
        <span class="song-list">歌单</span>
      </div>
      <div class="album">
        <div class="album-pic">
          <img :src="cdlist[index].logo">
        </div>
        <div class="album-bd">
          <h1 class="album-name">{{ cdlist[index].dissname }}</h1>
          <p class="album-desc">
            <img :src="cdlist[index].headurl">
            <span>{{ cdlist[index].nickname }}</span>
          </p>
          <p class="album-desc">播放量：{{ (cdlist[index].visitnum /10000).toFixed(1)}}万</p>
        </div>
      </div>
    </div>
    <div id="count-box">
      <span>歌单</span>
      <span>共{{cdlist[index].total_song_num}}首</span>
    </div>
    <ul class="list-rank">
      <li :key="i" v-for="(items, i) in cdlist[index].songlist">
        <div class="list-desc">
          <h3 class="list-tit">{{ cdlist[index].songlist[i].songname }}</h3>
          <span>{{cdlist[index].songlist[i].singer[index].name}}</span>
          <span>·</span>
          <span>
            {{
              cdlist[index].songlist[i].albumname
            }}
         </span>
         </div>
      </li>
    </ul>
    <div class="check-more">点击加载更多</div>
    <h2 class="qui-title">歌单简介</h2>
    <div class=intro>
      <p class="intro-content">
        {{ cdlist[index].desc}}
      </p>
    </div>
    <div class="brand">
      <img src="./logo.svg">
      <p>QQ音乐</p>
    </div>
</div>
</div>
</template>
<script>
import {getDiscList} from 'api/recommend'
export default {
  data() {
    return {
      cdlist: undefined,
      songList: [],
      dissname: '',
      // 用户头像
      headurl: undefined,
      songNum: undefined,
      nickname: '',
      // 播放量
      visitnum: undefined,
      // 歌单封面图像
      logo: '',
      // 歌单信息
      ranklist: undefined
    }
  },
  created() {
    this.getData(this.$route.query.id)
  },
  methods: {
    getData() {
      getDiscList(this.$route.query.id).then((res) => {
        this.cdlist = res.cdlist
      })
    },
    back() {
      this.$router.push({path: '/recommend'})
    }
  }
}
</script>
<style lang="styl" scoped>
#album
  position: absolute
  top: 0
  left: 0
  width: 100%
  z-index: 99
  box-sizing: border-box
  background: #fff
  #info_box
    width: 100%
    box-sizing: border-box
    /*padding: 0 16px*/
    overflow: hidden
    /*padding: 0 16px 17px 16px*/
    background: rgba(0, 0, 0, .6)
    .topbar
      position: relative
      height: 48px
      width: 100%
      margin-bottom: 10px
      line-height: 48px
      font-size: 15px
      color: #fff
      display: flex
      background: rgba(0,0,0,.2)
      .back
        margin-left: 16px
        width: 54px
        height: 48px
        line-height: 48px
        padding: 0 12px
        &::after
          content: ""
          display: block
          width: 54px
          height: 24px
          position: absolute
          top: 11px
          left: 13px
          border: 1px solid #fff
          border-radius: 12px
      .song-list
        font-size: 20px
        display: block
        flex: 1
        text-align: center
    .album
      display: flex
      padding: 0 16px 17px 16px
      .album-pic
        display: block
        width: 125px
        height: 125px
        margin-right: 10px
        img
          width: 125px
          height: 125px
      .album-bd
        display: flex
        flex-direction: column
        justify-content: center
        color: #fff
        h1
          max-height: 47px
          line-height: 23px
          overflow: hidden
          line-clamp: 2
          font-size: 18px
        .album-desc
          margin-top: 8px
          font-size: 12px
          overflow: hidden
          img
            display: inline-block
            width: 24px
            height: 24px
            border-radius: 24px
            margin-right: 8px
            vertical-align: top
          span
            disaply: inline-block
            width: 100%;
            line-height: 21px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            font-size: 14px
            color: #fff
  #count-box
    height: 54px
    line-height: 54px
    margin: 0 16px -10px
    font-weight: 300
    color: #777
  .list-rank
    padding: 10px 16px
    li
      padding: 10px 0
      display: flex
      height: 42px
      .hotOrder
        line-height: 42px
        display: inline-block
        color: #FF400B
      .list-desc
        flex: 1
        flex-direction: column
        /*margin-left: 16px*/
        h3
          height: 24px
          line-height: 24px
          font-size: 16px
          margin-bottom: 3px
          color: #000
          text-overflow: nowrap
          white-space: ellipsis
          overflow: hidden
          /*font-weight: 400*/
        span
          color: #777
          height: 18px
          font-weight: 300
          font-size: 12px
          display: inline-block
  .check-more
    text-align: center
    height: 32px
    line-height: 32px
    margin-bottom: 15px
    font-size: 14px
  .title
    text-align: center
    margin-left: 5px
    overflow: hidden
    line-height: 55px
    white-space: nowrap
    letter-spacing: 5px
    font-size: 18px
  .qui-title
    color: #333
    height: 55px
    line-height: 55px
    padding: 0 40px
    overflow: hidden
    text-align: center
  .intro
    position: relative
    max-height: 84px
    margin: 0 16px 20px
    overflow: hidden
    text-align: justify
    word-wrap: break-word
    font-size: 14px
    line-height: 21px
    color: #777
    p
      position: relative
      max-height: 84px
      overflow: hidden
      text-align: justify
      word-wrap: break-word
      font-size: 14px
  .brand
    padding: 20px 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    img
      display: block
      width: 32px
      height: 32px
      margin-bottom: 5px
  .common-list
    padding: 0 16px
    li
      display: flex
      position: relative
      margin-bottom: 10px
      img
        display: block
        width: 35px
        height: 35px
        margin-right: 10px
        border-radius: 100%
      .item-content
        color: #777
        flex: 1
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        h3
          height: 23px
          line-height: 23px
        .time
          font-size: 12px
          margin-bottom: 5px
        p
          margin: 0
          max-width: 314px
          overflow: hidden
          word-wrap: break-word
          word-break: break-all
          text-align: justify
          line-height: 23px
          span
            white-space: normal
            word-wrap: break-word
            word-break: break-all
            text-align: justify
            line-height: 23px
        .praise
          position: absolute
          top: 0
          right: -.16rem
          padding: 0 16px 10px 10px
</style>
