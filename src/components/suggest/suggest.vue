<template>
  <div id="suggest">
    <div class="suggest" v-if="code === 0">
      <ul class="suggest-list">
        <li class="suggest-item" v-show="showPic">
          <div class="pic">
              <img :src="src" :class="{ fisrtType: isFirst, secondType: isSecond }">
          </div>
          <div class="name">
            <p class="text">{{ albumname }}</p>
            <p class="sub-text" v-show="isFirst">
              <span>{{ singername }}</span>
            </p>
            <p class="sub-text" v-if="isFirst">
              <span>{{'单曲：' + songnum }}</span>
              <span>{{'专辑：' + albumnum }}</span>
            </p>
            <p class="sub-text" v-if="isSecond">
              <span>{{ singername }}</span>
            </p>
          </div>
        </li>
        <li class="suggest-item" :key="index" v-for="(item, index) in song">
          <i class="icon"></i>
          <div class="name">
            <p class="text" v-html="item.songname"></p>
            <p class="sub-text">
              <span :key="index" v-for="(item, index) in song[index].singer" v-html="item.name"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {search} from 'api/search'
export default {
  data() {
    return {
      page: 1,
      song: [],
      albumnum: '',
      songnum: '',
      albumname: '',
      singername: '',
      singermid: '',
      code: 1,
      type: 0,
      showPic: true,
      src: '',
      isFirst: true,
      isSecond: false,
      albummid: ''
    }
  },
  props: ['userInput', 'getSend'],
  watch: {
    getSend() {
      this.getSend = this.getSend
    },
    userInput () {
      this._search()
      if (this.getSend === 13) {
        this._search()
      }
    }
  },
  created() {},
  methods: {
    _search() {
      // console.log(this.userInput + '用户输入的')
      search(this.userInput, this.page).then((res) => {
        this.song = res.data.song.list
        // 专辑数
        this.albumnum = res.data.zhida.albumnum
        // 单曲数
        this.songnum = res.data.zhida.songnum
        // 歌曲名
        this.singername = res.data.zhida.singername
        // 歌曲名
        this.albumname = res.data.zhida.albumname
        // 歌曲ID
        this.singermid = res.data.zhida.singermid
        this.albummid = res.data.zhida.albummid
        // 返回码 成功0 失败1
        this.code = res.code
        // 直达类型
        this.type = res.data.zhida.type
        // console.log(this.type)
        if (this.type === 2) {
          this.src = 'https://y.gtimg.cn/music/photo_new/T001R68x68M000' + this.singermid + '.jpg?max_age=2592000'
          // 显示第一列
          this.showPic = true
          this.isFirst = true
        } else if (this.type === 3) {
          this.src = 'https://y.gtimg.cn/music/photo_new/T002R68x68M000' + this.albummid + '.jpg?max_age=2592000'
          this.showPic = true
          this.isFirst = false
          this.isSecond = true
        } else {
          this.showPic = false
        }
      })
    }
  }
}
</script>

<style lang="styl" scoped>
#suggest
  .suggest
    .suggest-list
      background: #fff
      .suggest-item
        overflow: hidden
        height: 55px;
        position:relative
        padding-left: 56px
        &.suggest-item::after
          content: " "
          display: block
          position: absolute
          top: 0
          left: 0
          right: 0
          width: 100%
          height: 1px
          background: #e5e5e5
        .icon
          display: block
          position: absolute
          top: 18px
          left: 18px
          width: 22px
          height: 20px
          background-repeat: no-repeat
          background-position: 0 0
          background-image: url(../../common/image/search_sprite.png)
          background-size: 22px 30px
        .pic
          position: absolute
          top: 8px
          left: 8px
          width: 40px
          height: 40px
          .fisrtType
            display: inline-block
            width: 100%
            height: 100%
            border-radius: 999px
          .secondType
            display: inline-block
            width: 40px
            height: 40px
        .name
          margin: 10px 0 2px;
          line-height: 18px;
          font-size: 16px;
          font-weight: normal;
          color: #000;
          .text
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          .sub-text
            span
              font-size: 12px
              color: #808080
              margin-right: 10px
</style>
