<template>
  <div class="risk">
    <td-header title="关于拓道"/>
    <div class="risk_top risk_new">
      <div class="risk_topbg1"/>
    </div>
    <div class="risk_top risk_news">
      <h3>贷前评估</h3>
      <div class="risk_topbg"/>
    </div>
    <div class="risk_com">
      <h3>贷前审查</h3>
      <div class="risk_combg"/>
    </div>
    <div class="risk_bot">
      <h3>贷中排查和贷后管理</h3>
      <div class="risk_botbg"/>
    </div>
    <div class="risk_top">
      <h3>催收方式</h3>
      <div class="risk_topbg3"/>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../assets/images/inform/signature-2.png">
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '风险管理'
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .risk
    padding-top: 0.88rem
  .risk_top,.risk_com,.risk_bot
    background-color: $color-white
    overflow: hidden
    padding:0 0.3rem
    margin-top:0.2rem
  .risk_topbg
    width:6.64rem
    height:3.63rem
    background:url(../../../../assets/images/inform/risk-top.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_combg
    width:6.89rem
    height:3.61rem
    background:url(../../../../assets/images/inform/risk-combg.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_botbg
    width:6.92rem
    height:3.31rem
    background:url(../../../../assets/images/inform/risk-botbg.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_topbg1
    width:7.50rem
    height:9.63rem
    background:url(../../../../assets/images/inform/risk-top1.png) no-repeat
    background-size:100% 100%
  .risk_topbg3
    width:6.37rem
    height:6.58rem
    background:url(../../../../assets/images/inform/risk-top3.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_new
    padding:0
    margin:0
  .risk_news
    margin:0
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
