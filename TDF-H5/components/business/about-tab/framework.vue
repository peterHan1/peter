<template>
  <cube-scroll>
    <div class="framework">
      <div class="framework_bg"/>
      <div class="inform_signature">
        <div><h3 class="title">法人签章</h3></div>
        <img src="~/assets/images/inform/signature-2.png">
      </div>
    </div>
  </cube-scroll>
</template>
<style lang="stylus" scoped>
  .framework
    background-color: $color-white
    overflow: hidden
    border-top: 20px solid $color-background
  .framework .framework_bg
    width: 606px
    height: 926px
    background: url(../../../assets/images/inform/framework-bg.png) no-repeat
    background-size: 100% 100%
    margin: 75px auto
  .inform_signature
    background-color: $color-white
    border-top: 20px solid $color-background
    border-bottom: 20px solid $color-background
    div
      padding: 0 30px
    img
      width: 100%
      height: 380px
    h3
      font-size: $fontsize-medium
      color: $color-gray1
      height: 80px
      line-height: 80px
      border-bottom: 1px solid $color-gray5
      font-weight: normal
</style>
