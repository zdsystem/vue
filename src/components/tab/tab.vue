<template>
  <div>
    <div class="tab">
      <router-link class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
    </div>
    <loading v-if="this.code === 1"></loading>
    <div class="content" v-else>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
export default {
  created() {
    this._getRecommend()
  },
  data() {
    return {
      code: undefined
    }
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        this.code = res.code
      })
    }
  }
}
</script>

<style scoped lang="styl">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    margin-bottom: 2px
    font-size: $font-size-medium-x
    background: #fff
    .tab-item
      flex: 1
      display: block
      text-align: center
      .tab-link
        display: block
        width: 100%
        margin-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
  .content
    width: 100%
</style>
