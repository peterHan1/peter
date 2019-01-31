<template>
  <div>
    <div
      v-if="status === 'ok'"
      class="result">
      <div class="icon ok"/>
      <div class="txt">{{ resultTxt }}</div>
    </div>
    <div
      v-if="status === 'load'"
      class="result">
      <div class="icon load"/>
      <div class="txt">{{ resultTxt }}</div>
    </div>
    <div
      v-if="status === 'no'"
      class="result">
      <div class="icon no"/>
      <div class="txt">{{ resultTxt }}</div>
      <div class="msg">{{ failureTxt }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'result',
  props: {
    status: {
      type: String,
      default: ''
    },
    resultTxt: {
      type: String,
      default: ''
    },
    failureTxt: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
.result
  text-align: center
  .icon
    display: inline-block
    width: 150px
    height: 150px
  .txt
    font-size: $fontsize-large-xxx
    color: $color-gray2
    margin-top: 35px
    line-height: 50px
  .msg
    font-size: $fontsize-medium
    color: $color-gray3
    margin-top: 20px
    line-height: 40px
  .xw_btn
    margin-top: 60px
    text-align: center
    a
      display: inline-block
      line-height: 74px
      text-align: center
      border: 2px solid #FF7102
      border-radius: 35px
      font-size: $fontsize-large-x
  .ok
    background: url(../../../assets/images/xw-bank/xw-ok.png) no-repeat
    background-size: 100% 100%
  .no
    background: url(../../../assets/images/xw-bank/xw-no.png) no-repeat
    background-size: 100% 100%
  .load
    background: url(../../../assets/images/xw-bank/xw-load.png) no-repeat
    background-size: 100% 100%
</style>
