<template>
  <div
    v-if="show"
    class="appBox">
    <div
      v-if="types === 'wx'"
      class="wx"/>
    <div
      v-else
      class="appTxt">
      <div class="txt">
        <div v-html="appTxt.content"/>
      </div>
      <div class="appBtn">
        <div @click="closeApp">取消</div>
        <div @click="downApp">下载APP</div>
      </div>
    </div>
    <div
      class="shade"
      @click="show = !show"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      appTxt: {
        content: ''
      },
      types: ''
    }
  },
  methods: {
    isWx() {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    },
    closeApp() {
      this.show = false
    },
    downApp() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.types = 'wx'
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          let loadDateTime = new Date()
          window.setTimeout(() => {
            let timeOutDateTime = new Date()
            if (
              45 <= timeOutDateTime - loadDateTime &&
              timeOutDateTime - loadDateTime < 5000
            ) {
              return false
            } else {
              window.location.href =
                'https://itunes.apple.com/cn/app/id1030238074?mt=8'
            }
          }, 25)
          window.location.href = 'tuodao16TD://'
        } else if (/(Android)/i.test(navigator.userAgent)) {
          let ifr = document.createElement('iframe')
          ifr.src = 'tuodaoapp://td.app/openwith'
          ifr.style.display = 'none'
          document.body.appendChild(ifr)
          window.setTimeout(() => {
            window.location.href =
              'https://www.51tuodao.com/static_pro/apk/tdjf.apk'
          }, 2000)
          window.location.href = 'tuodaoapp://td.app/openwith'
        }
      }
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
      text-align: center
      div
        display: inline-block
        text-align: left
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
    .shade
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, 0.5)
      z-index: 99
</style>
