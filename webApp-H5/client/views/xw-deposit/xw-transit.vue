<template>
  <div class="xwTransit">
    <div class="xwLogo"></div>
    <div class="xwTxt"></div>
    <div class="xwCount">{{countTime}}s</div>
    <div class="xwBg"></div>
    <span>网贷有风险，出借需谨慎</span>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        countTime: 2
      }
    },
    mounted () {
      // 倒计时
      let timer = setInterval(() => {
        this.countTime--
        if (this.countTime <= 0) {
          this.countTime = 0
          clearInterval(timer)
        }
      }, 1000)
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
.xwTransit
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  text-align: center
  font-size: 0
  background-color: #fff
  .xwLogo
    display: inline-block
    margin-top: 60px
    width: 600px
    height: 108px
    background: url(../../assets/images/xw-bank/wx_transit_logo.png) no-repeat
    background-size: 100% 100%
  .xwTxt
    display: inline-block
    width: 606px
    height: 178px
    background: url(../../assets/images/xw-bank/wx_txt.png) no-repeat
    background-size: 100% 100%
    margin-top: 60px
  .xwCount
    font-size: 46px
    color: #BCBCBC
    line-height: 65px
    text-align: center
    margin-top: 50px
  .xwBg
    position: absolute
    left: 0
    right: 0
    bottom: 0
    height: 670px
    background: url(../../assets/images/xw-bank/wx_bg.png) no-repeat
    background-size: 100% 100%
  span
    font-size: 024px
    color: #BCBCBC
    position: absolute
    bottom: 45px
    left: 50%
    transform: translateX(-50%)
</style>





















