<template>
  <div class="auditReport">
    <div class="div_box">
      <div class="div_img">
        <router-link to="/inform/audit-report/audit-report-2017">
          <img class="lazy" src="../../assets/images/inform/auditReportP2017.png">
        </router-link>
      </div>
      <div class="div_img">
        <router-link to="/inform/audit-report/audit-report-2018">
          <img class="lazy" src="../../assets/images/inform/auditReportP2018.png">
        </router-link>
      </div>
      <div class="div_img">
        <router-link to="/inform/audit-report/audit-report-2018_2">
          <img class="lazy" src="../../assets/images/inform/auditReportP2018_2.png">
        </router-link>
      </div>
    </div>
    <div class="inform_signature">
      <router-link to="new_auditReport_sign">
        <div><h3 class="title">法人签章</h3></div>
        <img src="../../assets/images/inform/signature_2.png" alt="">
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '审计报告'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .auditReport
    padding:0.2rem 0 0.4rem
    background-color:#f2f3f7
    .div_img
      height:3.66rem
      margin-top:0.2rem
      a
        display:block
        width: 100%
        height:100%
        img
          width: 100%
          vertical-align: middle
    .div_box
      padding:0 0.3rem
    .sign
      padding:0
    .inform_signature
      background-color: #fff
      border-top: 0.2rem solid #f2f3f7
      border-bottom: 0.2rem solid #f2f3f7
      h3
        font-size: 0.28rem
        color: #212a36
        height: 0.8rem
        line-height: 0.8rem
        border-bottom: 1px solid #e4e4e4
      div
        padding: 0 0.3rem
      img
        width: 100%
        height: 3.8rem
</style>