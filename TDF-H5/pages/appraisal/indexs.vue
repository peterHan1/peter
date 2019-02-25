<template>
  <div class="explain">
    <td-header title="风险测评"/>
    <div class="page">
      <router-link to="/appraisal/list" >开始测评</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .explain
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    padding-top: 88px
    .page
      height: 100%
      width: 100%
      background: url(../../assets/images/my-center/pageIndex.png) no-repeat
      background-size: 100% 100%
      position: relative
      a
        display: inline-block
        padding: 0 135px
        line-height: 80px
        color: $color-white
        font-size: $fontsize-medium
        position: absolute
        bottom: 100px
        left: 24%
        background-color: $color-appraisal
        border-radius: 37px
</style>
