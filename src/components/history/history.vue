<template>
  <div id="search-history">
    <div class="search-history">
      <ul class="history">
        <li class="history-item"  :key="index" v-for="(item, index) in searchHistory">
          <a href="#">
            <span class="icon_clock"></span>
            <span class="record" @click="send(item)">{{ item }}</span>
            <span class="icon_clear" @click="clearSingle(item)">×</span>
          </a>
        </li>
      </ul>
      <div class="clear-history" @click="clearAll" v-show="showRecord">清除搜索记录</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchHistory: '',
      showRecord: true,
      arr: []
    }
  },
  props: ['userInput', 'getSend'],
  watch: {
    userInput () {
      this.show()
    }
  },
  created() {
    this.show()
  },
  methods: {
    clearSingle(item) {
      let index = this.arr.indexOf(item)
      this.arr.splice(index, 1)
      localStorage.name = this.arr.join(',')
    },
    clearAll() {
      localStorage.name = ''
      this.searchHistory = ''
      this.showRecord = false
    },
    send(item) {
      let data = item
      this.$emit('searchHistory', data)
      // console.log(data)
    },
    show() {
      // this.searchHistory = localStorage.name
      let str = localStorage.name
      let arr = str.split(',')
      this.arr = arr.reverse()
      if (arr[0] === '') {
        arr.splice(0, 1)
      }
      this.searchHistory = arr
    }
  }
}
</script>
<style lang="styl">
  #search-history
    background: #fff
    position: relative
    .search-history
      display: flex
      flex-direction: column
      justify-content: space-between
      .history
        flex: 1
        height: auto
      .history-item
        width: 100%
        height: 44px
        padding: 0 15px
        box-sizing: border-box
        border-top: 1px solid #ededed
        a
          display: flex
          align-items: center
          justify-content: sapce-between
          width: 100%
          height: 100%
          .icon_clock
            display: block
            width: 20px
            height: 20px
            margin-right: 20px
            background-image: url("./clock.png")
            background-repeat: no-repeat
            background-size: cover
          .record
            flex: 1
            display: block
            color: #000
            font-size: 14px;
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          .icon_clear
            dispaly: block
            display: flex
            justify-content: center
            align-items: center
            font-size: 32px
            width: 20px
            height: 20px
            color: rgba(0,0,0,.6)
      .clear-history
        /*position: absolute*/
        /*bottom: 0*/
        width: 100%
        /*height: 44px*/
        line-height: 44px
        font-size: 12px
        display: flex
        align-items: center
        justify-content: center
        color: #47c88a

</style>