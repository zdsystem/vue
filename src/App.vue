<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
  </div>
</template>

<script>
// 导入组件
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  // 注册组件
  components: {
    MHeader,
    Tab
  }
}
</script>
<style scoped lang="styl">
  @import "common/stylus/variable"
</style>
