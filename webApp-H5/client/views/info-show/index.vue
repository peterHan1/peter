<template>
  <div class="info-index">
    <router-link to="/infoShow/about"><img src="../../assets/images/infrom1.png"></router-link>
    <router-link to="/infoShow/data"><img src="../../assets/images/infrom2.png"></router-link>
    <router-link to="/infoShow/report"><img src="../../assets/images/infrom3.png"></router-link>
    <router-link to="/infoShow/auditRep"><img src="../../assets/images/infrom7.png"></router-link>
    <router-link to="/infoShow/lowFile"><img src="../../assets/images/infrom4.png"></router-link>
    <router-link to="/infoShow/risk"><img src="../../assets/images/infrom5.png"></router-link>
    <router-link to="/infoShow/know"><img src="../../assets/images/infrom6.png"></router-link>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '信息披露'
  }
}
</script>

<style lang="stylus" scoped>
  .info-index
    display flex
    flex-direction column
    margin 0 4%
    a
      text-align center
      height 120px
      overflow hidden
      margin-top 30px
      img
        width 100%
        height 120px
</style>
