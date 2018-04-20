<template>
    <div class="m-header">
      <div class="icon"></div>
      <!-- <h1 class="text">QQ Music</h1> -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="styl">
  @import "~common/stylus/variable"
  .m-header
    height: 44px
    display: flex
    align-items: center
    justify-content: center
    color: $color-theme-t
    font-size: 0
    background: rgb(49,194, 124)
    .icon
      display: block
      width: 90px
      height: 25px
      margin-right: 9px
      background-image: url("./logo.png")
      background-repeat: no-repeat
      background-size: cover
</style>
