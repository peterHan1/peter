<template>
  <div class="auditReport">
    <td-header title="审计报告"/>
    <div class="div_box">
      <div class="div_img">
        <router-link to="/home/inform/auditReport/src/audit-report-2017">
          <img
            class="lazy"
            src="../../../../assets/images/inform/audit/audit-report-2017.png">
        </router-link>
      </div>
      <div class="div_img">
        <router-link to="/home/inform/auditReport/src/audit-report-2018">
          <img
            class="lazy"
            src="../../../../assets/images/inform/audit/audit-report-2018.png">
        </router-link>
      </div>
      <div class="div_img">
        <router-link to="/home/inform/auditReport/src/audit-report-2018-2">
          <img
            class="lazy"
            src="../../../../assets/images/inform/audit/audit-report-2018-2.png">
        </router-link>
      </div>
    </div>
    <div class="inform_signature">
      <router-link to="/home/inform/auditReport/src/audit-report-sign">
        <div><h3 class="title">法人签章</h3></div>
        <img src="../../../../assets/images/inform/signature-2.png">
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '审计报告'
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .auditReport
    padding:108px 0 40px
    background-color:$color-background
    .div_img
      height:366px
      margin-top:20px
      a
        display:block
        width: 100%
        height:100%
        img
          width: 100%
          vertical-align: middle
    .div_box
      padding:0 30px
    .sign
      padding:0
    .inform_signature
      background-color: $color-white
      border-top: 20px solid $color-background
      border-bottom: 20px solid $color-background
      h3
        font-size: $fontsize-medium
        color: $color-gray1
        height: 80px
        line-height: 80px
        border-bottom: 1px solid #e4e4e4
      div
        padding: 0 30px
      img
        width: 100%
        height: 380px
</style>
