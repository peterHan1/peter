<template>
  <div class="risk">
    <div class="risk_top risk_new">
      <div class="risk_topbg1"></div>
    </div>
    <div class="risk_top risk_news">
      <h3>贷前评估</h3>
      <div class="risk_topbg"></div>
    </div>
    <div class="risk_com">
      <h3>贷前审查</h3>
      <div class="risk_combg"></div>
    </div>
    <div class="risk_bot">
      <h3>贷中排查和贷后管理</h3>
      <div class="risk_botbg"></div>
    </div>
    <div class="risk_top">
      <h3>催收方式</h3>
      <div class="risk_topbg3"></div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../assets/images/inform/signature_2.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '风险管理'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .risk_top,.risk_com,.risk_bot
    background-color:white
    overflow: hidden
    padding:0 0.3rem
    margin-top:0.2rem
  .risk_topbg
    width:6.64rem
    height:3.63rem
    background:url(../../assets/images/inform/risk_top.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_combg
    width:6.89rem
    height:3.61rem
    background:url(../../assets/images/inform/risk_combg.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_botbg
    width:6.92rem
    height:3.31rem
    background:url(../../assets/images/inform/risk_botbg.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_topbg1
    width:7.50rem
    height:9.63rem
    background:url(../../assets/images/inform/risk_top1.png) no-repeat
    background-size:100% 100%
  .risk_topbg3
    width:6.37rem
    height:6.58rem
    background:url(../../assets/images/inform/risk_top3.png) no-repeat
    background-size:100% 100%
    margin:0.4rem auto
  .risk_new
    padding:0
    margin:0
  .risk_news
    margin:0
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid #f2f3f7
    border-bottom: 0.2rem solid #f2f3f7
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
  h3
    font-size: 0.28rem
    color: #212a36
    height: 0.8rem
    line-height: 0.8rem
    border-bottom: 1px solid #e4e4e4
    font-weight: normal
</style>