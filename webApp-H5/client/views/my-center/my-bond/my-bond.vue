<template>
  <div class="bondBox">
    <Header :navLeftTxt="'icon'">债权转让</Header>
    <div class="bondList">
      <p>请在电脑端登录官网或在APP端查看</p>
      <router-link to="" >下载APP</router-link>
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
      navRightFn () {
        this.$router.push({path: '/bondExplain'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .bondBox
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .bondList
      text-align: center
      overflow: hidden
      p
        font-size: 28px
        color: #666
        margin-top: 50%
      a
        display: inline-block
        width: 50%
        line-height: 74px
        text-align: center
        font-size: 30px
        color: #fff
        background: linear-gradient(153deg,rgba(252,141,38,1) 0%,rgba(248,123,60,1) 100%)
        border-radius: 37px
        margin-top: 60px
</style>
