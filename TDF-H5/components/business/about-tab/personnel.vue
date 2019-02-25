<template>
  <cube-scroll>
    <div class="personnel">
      <div class="personnel_bg"/>
      <div class="inform_signature">
        <div><h3 class="title">法人签章</h3></div>
        <img src="~/assets/images/inform/signature-2.png">
      </div>
    </div>
  </cube-scroll>
</template>
<style lang="stylus" scoped>
  .personnel
    padding: 46px 0rem 0
    border-top: 20px solid $color-background
  .personnel_bg
    width: 680px
    height: 796px
    background: url(../../../assets/images/inform/personnel-bg.png) no-repeat
    background-size: 100% 100%
    margin: 0 auto
  .certificate
    padding: 0 30px
    background-color: $color-white
    padding-top: 20px
    padding-bottom: 65px
    .flex
      display: flex
      overflow: hidden
    .flex-1
      flex: 1
    .div_fr
      margin-right: 30px
    .div_img
      width: 328px
      height: 460px
      margin-top: 18px
      position: relative
      img
        width: 328px
        height: 460px
      a
        display: block
      .txt_p
        width: 100%
        height: 48px
        line-height: 48px
        text-align: center
        position: absolute
        left: 0
        bottom: 0
        background-color: rgba(57,59,63,0.5)
        p
          font-size: $fontsize-small-sss
          color: $color-white
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
