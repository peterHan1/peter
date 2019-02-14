<template>
  <div class="xwTransit">
    <td-header title="银行存管" />
    <div class="xwLogo"/>
    <div class="xwTxt"/>
    <div class="xwCount">{{ countTime }}s</div>
    <div class="xwBg"/>
    <span>网贷有风险，出借需谨慎</span>
    <form 
      id="form" 
      :action="content.url" 
      role="form" 
      method="post"
      style="display:none"
    >
      <input 
        :value="content.serviceName" 
        name="serviceName" >
      <input 
        :value="content.platformNo" 
        name="platformNo" >
      <input 
        :value="content.userDevice" 
        name="userDevice" >
      <input 
        :value="content.reqData" 
        name="reqData">
      <input 
        :value="content.keySerial" 
        name="keySerial">  
      <input 
        :value="content.sign" 
        name="sign"> 
    </form>
  </div>
</template>

<script>
import { getByNonce } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      countTime: 2,
      content: ''
    }
  },
  mounted() {
    let nonces = this.$route.params.sign
    commenParams.accessId = this.$store.state.accessId
    commenParams.accessKey = this.$store.state.accessKey
    getByNonce(this.$axios, nonces, commenParams).then(res => {
      if (res) {
        this.content = res.content
        let timer = setInterval(() => {
          this.countTime--
          if (this.countTime <= 0) {
            this.countTime = 0
            clearInterval(timer)
            document.getElementById('form').submit()
          }
        }, 1000)
      }
    })
  },
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
.xwTransit
  position: absolute
  left: 0
  top: 88px
  right: 0
  bottom: 0
  text-align: center
  font-size: 0
  background-color: $color-white
  .xwLogo
    display: inline-block
    margin-top: 50px
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
    font-size: $fontsize-large-xxxxxx
    color: $color-gray3
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
    font-size: $fontsize-small-ss
    color: $color-gray3
    position: absolute
    bottom: 45px
    left: 50%
    transform: translateX(-50%)
</style>
