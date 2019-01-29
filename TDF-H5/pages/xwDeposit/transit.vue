<template>
  <div class="xwTransit">
    <div class="xwLogo"/>
    <div class="xwTxt"/>
    <div class="xwCount">{{ countTime }}s</div>
    <div class="xwBg"/>
    <span>网贷有风险，出借需谨慎</span>
    <form 
      id="form" 
      role="form" 
      method="post" 
      action="" 
      style="display: none">
      <input 
        name="serviceName" 
        value="" >
      <input 
        name="platformNo" 
        value="" >
      <input 
        name="userDevice" 
        value="" >
      <input 
        name="reqData" 
        value="">
      <input 
        name="keySerial" 
        value="">  
      <input 
        name="sign" 
        value=""> 
      <button 
        type="submit" 
        class="btn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countTime: 2
    }
  },
  mounted() {
    console.log(this.$route.query.sign)
    // 倒计时
    let timer = setInterval(() => {
      this.countTime--
      if (this.countTime <= 0) {
        this.countTime = 0
        clearInterval(timer)
      }
    }, 1000)
  },
  methods: {},
  components: {}
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
  background-color: $color-white
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
