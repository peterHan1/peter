<template>
  <cube-scroll>
    <div class="personnel">
      <div class="personnel_bg"/>
      <div class="inform_signature">
        <div><h3 class="title">法人签章</h3></div>
        <img src="../../../../../assets/images/inform/signature-2.png">
      </div>
    </div>
  </cube-scroll>
</template>
<style lang="stylus" scoped>
  .personnel
    padding: 0.46rem 0rem 0
    border-top: 0.2rem solid $color-background
  .personnel_bg
    width: 6.8rem
    height: 7.96rem
    background: url(../../../../../assets/images/inform/personnel-bg.png) no-repeat
    background-size: 100% 100%
    margin: 0 auto
  .certificate
    padding: 0 0.3rem
    background-color: $color-white
    padding-top: 0.2rem
    padding-bottom: 0.65rem
    .flex
      display: flex
      overflow: hidden
    .flex-1
      flex: 1
    .div_fr
      margin-right: 0.3rem
    .div_img
      width: 3.28rem
      height: 4.6rem
      margin-top: 0.18rem
      position: relative
      img
        width: 3.28rem
        height: 4.6rem
      a
        display: block
      .txt_p
        width: 100%
        height: 0.48rem
        line-height: 0.48rem
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
