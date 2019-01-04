<template>
  <div class="protocalBox">
    <Header :navLeftTxt="'icon'">借款协议</Header>
    <Scatter></Scatter>
  </div> 
</template>
<script>
import Scatter from './scatter.vue'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    Scatter
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: #fff
  padding-top: 88px
  .loan_agree
    padding: 30px 30px 20px
    color: #333
    h1
      font-size: 30px
      font-weight: bold
      text-align: center
      line-height: 65px
    h2
      font-size: 28px
      font-weight: bold
      padding: 30px 0 20px
    p
      font-size: 24px
      line-height: 48px
      text-align: justify
    .importTxt
      padding: 10px 20px
      border: 1px solid #ccc
      position: relative
      span
        display: block
        height: 30px
      .td
        position: absolute
        width: 200px
        height: 200px
        background: url(../../../assets/images/invest-list/gsgz.png) no-repeat
        background-size: 100% 100%
        bottom: 130px
        right: 200px
      .yh
        position: absolute
        width: 200px
        height: 200px
        background: url(../../../assets/images/invest-list/gsgz.png) no-repeat
        background-size: 100% 100%
        bottom: -40px
        right: 80px
</style>

