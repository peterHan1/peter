<template>
  <div class="inform">
    <Header navLeftTxt="icon">信息披露</Header>
    <router-link to="inform/aboutTd"><img src="../../assets/images/inform/inform1.png"></router-link>
    <router-link to="inform/platfromData"><img src="../../assets/images/inform/inform2.png"></router-link>
    <router-link to="inform/operReport"><img src="../../assets/images/inform/inform3.png"></router-link>
    <router-link to="inform/auditReport"><img src="../../assets/images/inform/inform7.png"></router-link>
    <router-link to="inform/lawFile"><img src="../../assets/images/inform/inform4.png"></router-link>
    <router-link to="inform/riskManage"><img src="../../assets/images/inform/inform5.png"></router-link>
    <router-link to="inform/knowUs"><img src="../../assets/images/inform/inform6.png"></router-link>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '信息披露'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .inform
    margin: 0 4%
    padding-top:1.1rem
    a
      display: block
      img
        height:1.2rem
        margin-top: 0.2rem
</style>