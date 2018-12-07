<template>
  <div class="explain">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()">风险测评</Header>
    <div class="page">
      <router-link to="/appraisal/list" >开始测评</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .explain
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow: hidden
    box-sizing: border-box
    .page
      height: 100%
      width: 100%
      background: url(../../../assets/images/my-center/pageIndex.png) no-repeat
      background-size: 100% 100%
      position: relative
      a
        display: inline-block
        padding: 0 135px
        line-height: 80px
        color: #fff
        font-size: 28px
        position: absolute
        bottom: 100px
        left: 24%
        background-color: #ff8a10
        border-radius: 20px
</style>
