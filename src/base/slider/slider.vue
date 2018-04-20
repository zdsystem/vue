<template>
  <div class="swiper-box" ref="swiperBox">
    <swiper class="box-content" ref="mySwiper" :options="swiperOption">
      <swiper-slide class="slider-group" :href="item.linkUrl" :key="index" v-for="(item, index) in sliderList">
        <a ref="sliderLink" class="slider-link" :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
        <!-- <img src="./slider.jpg"> -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination">
        <b class="swiper-pagination-bullet" :key="index" v-for="(item, index) in sliderList"></b>
      </div>
    </swiper>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'

import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  data() {
    return {
      sliderList: [],
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        // autoplay: true,
        // 用户操作swiper之后，是否禁止autoplay。默认为true：停止
        disableOnInteraction: true,
        delay: 3000,
        stopOnLastSlide: false,
        // 设置slider容器能够同时显示的slides数量 或者 'auto'则自动根据slides的宽度来设定数量
        sliderPerView: 'auto',
        loopedSlides: 5,
        // active slide会居中，而不是默认状态下的居左
        centeredSlides: true,
        paginationClickable: true,
        // 在slide之间设置距离
        spaceBetween: 0,
        effect: 'slide',
        onSlideChangeEnd: swiper => {
          this.page = swiper.realIndex + 1
          this.index = swiper.realIndex
        }
      }
    }
  },
  created() {
    this._getRecommend()
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // swiper对象使用
    let that = this
    // 切换到指定的slide
    this.swiper.slideTo(0, 0, false)
    this.swiper.setTransition(swiper, 1000)
    // 自动播放
    setInterval(function() {
      that.swiper.slideNext()
    }, 3000)
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === 0) {
          this.sliderList = res.data.slider
        }
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scroped lang="styl">
  @import "~common/stylus/variable"
  .swiper-box
    width: 100%
    .box-content
      min-height: 1px
      .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        .slider-link
          display: block
          width: 100%
          overflow: hidden
          text-decoretion: none
          img
            display: block
            width: 100%
      .swiper-pagination
        position: absolute;
        bottom: 6px
        left: 0
        right: 0
        padding: 0 6px
        text-align: center
        z-index: 999
        .swiper-pagination-bullet
          display: inline-block;
          margin: 0 4px;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: rgba(144,144,144,.8)
          &.swiper-pagination-bullet-active
            background: #fff
</style>
