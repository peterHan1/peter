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
    padding-top: 88px
  .risk_top,.risk_com,.risk_bot
    background-color: $color-white
    overflow: hidden
    padding:0 30px
    margin-top:20px
  .risk_topbg
    width:664px
    height:363px
    background:url(../../../../assets/images/inform/risk-top.png) no-repeat
    background-size:100% 100%
    margin:40px auto
  .risk_combg
    width:689px
    height:361px
    background:url(../../../../assets/images/inform/risk-combg.png) no-repeat
    background-size:100% 100%
    margin:40px auto
  .risk_botbg
    width:692px
    height:331px
    background:url(../../../../assets/images/inform/risk-botbg.png) no-repeat
    background-size:100% 100%
    margin:40px auto
  .risk_topbg1
    width:750px
    height:963px
    background:url(../../../../assets/images/inform/risk-top1.png) no-repeat
    background-size:100% 100%
  .risk_topbg3
    width:637px
    height:658px
    background:url(../../../../assets/images/inform/risk-top3.png) no-repeat
    background-size:100% 100%
    margin:40px auto
  .risk_new
    padding:0
    margin:0
  .risk_news
    margin:0
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
