<template>
<!-- <transition name="slide"> -->
  <!-- <div> -->
    <div id="topList">
      <div v-show="update_time">
        <div id="info_box">
          <div class="topbar">
            <span class="back" @click="back">返回</span>
            <span class="song-list">{{ topinfo.ListName }}</span>
          </div>
          <div class="album">
            <div class="ablum-pic">
              <img :src="topinfo.pic_album">
            </div>
            <div class="ablum-bd">
              <h1 class="album-name"> {{ topinfo.ListName }}</h1>
              <p class="album-desc" v-show="day_of_year">{{'第' + day_of_year + '天'}}</p>
              <p class="album-desc">{{ update_time }}</p>
            </div>
          </div>
          <div class="play">
            <div>
              <audio :src="'http://ws.stream.qqmusic.qq.com/C100' + songmid + '.m4a?fromtag=38'" controls>
            </audio>
            </div>
          </div>
        </div>
        <div id="count-box">
          <span>排行榜</span>
          <span>{{'共' + cur_song_num +'首'}}</span>
        </div>
        <ul class="list-rank">
          <li :key="index" v-for="(item, index) in songlist" @click="play(songlist[index].data.songmid)">
            <span :class="{hotOrder: index < 3 ? true : false,  listOrder: index >= 3 ? true : false}">{{ index + 1 }}</span>
            <div class="list-desc">
              <h3 class="list-tit">{{item.data.songname}}</h3>
              <div>
                <p :key="i" v-for="(item, i) in songlist[index].data.singer">
                <span>{{item.name + ''}}</span>
                <span v-show="albumdesc[index].length>1 ">·</span>
                <!-- <span v-show="songlist[index].data.singer.length > 1"> / </span> -->
                </p>
                <span>{{ albumdesc[index] }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  <!-- </div> -->
<!-- </transition> -->
</template>
<script>
import {getTopList} from 'api/recommend'
export default {
  data() {
    return {
      // 顶部信息
      topinfo: [],
      // 更新事件
      update_time: undefined,
      // 天数
      day_of_year: undefined,
      // 排行榜
      cur_song_num: undefined,
      // 排行榜详细数据
      songlist: [],
      // 歌手
      singer: [],
      albumdesc: [],
      songmid: '0001vkQa2eCvyl'
    }
  },
  created() {
    this._getTopList()
    // this.$route.query.id
  },
  watch: {
    id() {
      this._getTopList()
    }
  },
  methods: {
    _getTopList() {
      getTopList(this.$route.query.id).then((res) => {
        this.info = res
        this.topinfo = res.topinfo
        // 更新时间
        this.update_time = res.update_time
        // 天数
        this.day_of_year = res.day_of_year - 1
        // 排行榜
        this.cur_song_num = res.cur_song_num
        for (let i = 0; i < res.songlist.length; i++) {
          this.albumdesc.push(res.songlist[i].data.albumdesc)
        }
        this.songlist = res.songlist
      })
    },
    back() {
      this.$router.push({path: '/rank'})
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    },
    play(item) {
      this.songmid = item
    }
  }
}
</script>
<style lang="styl" scoped>
    #topList
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: auto
      overflow: hidden
      background: #fff
      /*background: red*/
      &.toplist-enter
        left: 100%
        /*opacity: 0*/
        /*transform: tranlateX(375px)*/
      &.toplist-enter-active
        transition: left .3s linear
        /*transition: opacity .3s linear*/
      &.toplist-enter-to
        left: 0
        /*opacity: 1*/
      &.toplist-leave
        left: 0
        /*opacity: 1*/
      &.toplist-leave-active
        transition: left .3s linear
        /*transition: opacity .3s linear*/
      &.toplist-leave-to
        left: 100%
      #info_box
        /*padding: 17px 16px*/
        overflow: hidden
        font-size: 12px
        color: #777
        background: rgba(0,0,0,.5)
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
          width: 100%
          height: auto
          padding: 17px 16px
          display: flex
          .ablum-pic
            width: 125px
            height: 125px
            margin-right: 10px
            img
              /*width: 125px*/
              width: 100%
              height: 100%
          .ablum-bd
            display: flex
            flex-direction: column
            justify-content: center
            color: #fff
            .album-name
              max-height: 47px
              line-height: 1.3
              overflow: hidden
              font-size: 18px
            .album-desc
              max-height: 36px
              overflow: hidden
              margin-top: 8px
        .play
          width: 100%
          height: 40px
          padding: 10px 0
          text-align: center
          div
            display: inline-block
            width: 300px
            height: 40px
            line-height: 40px
            overflow: hidden
            text-align: center
            font-size: 16px
            color: #fff
            border-radius: 20px
            background: #31c27c
      #count-box
        height: 54px
        line-height: 54px
        margin: 0 16px -10px
        font-weight: 300
      .list-rank
        padding: 10px 16px
        li
          padding: 10px 0
          display: flex
          height: 42px
          .listOrder
            display: inline-block
            color: #777
            line-height: 42px
          .hotOrder
            line-height: 42px
            display: inline-block
            color: #FF400B
          .list-desc
            flex: 1
            flex-direction: column
            margin-left: 16px
            h3
              height: 24px
              line-height: 24px
              font-size: 16px
              margin-bottom: 3px
              color: #000
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              /*font-weight: 400*/
            div
              display: flex
              color: #777
              height: 18px
              font-weight: 300
              font-size: 12px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
</style>