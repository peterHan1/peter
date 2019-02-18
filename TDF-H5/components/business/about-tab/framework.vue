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
    border-top: 0.2rem solid $color-background
  .framework .framework_bg
    width: 6.06rem
    height: 9.26rem
    background: url(../../../assets/images/inform/framework-bg.png) no-repeat
    background-size: 100% 100%
    margin: 0.75rem auto
  .inform_signature
    background-color: $color-white
    border-top: 0.2rem solid $color-background
    border-bottom: 0.2rem solid $color-background
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
    h3
      font-size: $fontsize-medium
      color: $color-gray1
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid $color-gray5
      font-weight: normal
</style>
