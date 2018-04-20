<template>
  <div id="loading">
    <img :src="require('common/image/loading.gif')" alt="">
  </div>
</template>
<script>
export default {
}
</script>
<style lang="styl" scoped>
  #loading
    width: 100%
    display: flex
    align-items: center
    img
      display: block
      margin: 150px auto
</style>
