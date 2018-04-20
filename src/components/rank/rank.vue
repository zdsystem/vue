<template>
  <div class="rank">
    <div class="toplist">
      <div>
        <ul v-bind:key="index" v-for="(item, index) in ranks">
          <router-link :to="{path:'/rank/topList', query:{id: topID[index]}}" class="item">
            <div class="icon">
              <img v-lazy="item.picUrl" width="100" height="100">
              <span class="listen_count">
                <span class="icon-listen"></span>
                <span>{{ (item.listenCount/10000).toFixed(1)}}万</span>
              </span>
            </div>
            <ul class="songlist">
              <li class="song">
                <h3 class="title">{{ item.topTitle }}</h3>
              </li>
              <li class="song" v-bind:key="index" v-for="(item, index) in songList[index]">
                <span class="index">{{ index + 1 }}</span>
                <span class="song-name">{{ item.songname }}</span>
                <span class="singername">- {{ item.singername }}</span>
              </li>
            </ul>
          </router-link>
        </ul>
      </div>
    </div>
    <transition name="toplist">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive>   -->
    </transition>
  </div>
</template>

<script>
// 导入分装好的请求数据的方法
import {getTopList} from 'api/rank'
// ERR_OK 请求数据状态码
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      ranks: [],
      songList: [],
      topTitle: [],
      show: true,
      topID: [],
      showTemp: false
    }
  },
  created() {
    this._getTopList()
  },
  watch: {},
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        // console.log(this.$refs)
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.ranks = res.data.topList
          this.ranks.forEach((r) => {
            this.songList.push(r.songList)
            // console.log(this.topID)
            // 响应用户点击的ID值
            this.topID.push(r.id)
            // console.log(this.topID)
            this.topTitle = r.title
          })
        }
      })
    },
    sendID(i) {
    }
  }
}
</script>

<style scoped lang="styl" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .rank
    /*position: relative*/
    /*width: 100%*/
    /*top: 88px*/
    bottom: 0
    /*padding: 0 10px*/
    /*overflow: hidden*/
    box-sizing: border-box
    .toplist
      height: 100%
      ul
        .item
          display: flex
          margin-top: 10px
          height: 100px
          margin: 10px 10px
          background: $color-theme-t
          .icon
            position: relative
            flex: 0 0 100px
            height: 100px
            .listen_count
              position: absolute
              bottom: 7px
              left: 5px
              display: flex
              line-height: 12px
              font-size: $font-size-small
              color: $color-text-lll
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
          .songlist
            display: flex
            flex-direction: column
            justify-content: center
            padding: 10px 20px
            height: 100px
            overflow: hidden
            color: #000
            font-size: $font-size-medium
            box-sizing: border-box
            .song
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              line-height: 26px
              .title
                font-size: $font-size-medium-x;
                color: color-text;
                font-weight: normal;
                margin-bottom: 5px;
              .index
                color: $color-text-ll
                margin-right: 5px
              .singername
                margin-left: 3px
                color: $color-text-ll
    /*.toplist-transition
      position: absolute
      top: 0
      left: 0*/
      /*opacity: 0*/
</style>