<template>
  <div class="appBox" v-if="show">
    <div class="wx" v-if="types === 'wx'"></div>
    <div class="appTxt" v-else>
      <div class="txt" v-html="appTxt.content"></div>
      <div class="appBtn">
        <div @click="closeApp">取消</div>
        <div @click="downApp">下载APP</div>
      </div>
    </div>
    <div class="shade"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        appTxt: {
          content: ''
        },
        types: ''
      }
    },
    mounted () {
      console.log(this.types)
    },
    methods: {
      closeApp () {
        this.show = false
      },
      downApp () {
        console.log('下载app')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .appBox
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    -webkit-transition: opacity 0.3s ease
    -moz-transition: opacity 0.3s ease
    transition: opacity 0.3s ease
    z-index: 9999
    -webkit-user-select: none
    .appTxt
      width: 524px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 999
      overflow: hidden
      border-radius: 16px
    .txt
      padding: 55px 40px 44px
      font-size: 28px
      color: #333
      line-height: 40px
      /deep/ p
        text-align: center
    .wx
      position: absolute
      top: 40px
      right: 70px
      z-index: 999
      width: 418px
      height: 278px
      background: url(../../../assets/images/index/download-app.png) no-repeat
      background-size: 100% 100%
    .appBtn
      display: flex
      align-items: center
      border-top: 1px solid #E8E8E8
      div
        flex: 1
        text-align: center
        font-size: 32px
        color: #999
        line-height: 86px
      div:nth-child(2)
        color: #FF7102
        border-left: 1px solid #E8E8E8
</style>
