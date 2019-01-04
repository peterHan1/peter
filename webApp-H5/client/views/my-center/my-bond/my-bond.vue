<template>
  <div class="bondBox">
    <Header :navLeftTxt="'icon'">债权转让</Header>
    <div class="bondList">
      <p>请在电脑端登录官网或在APP端查看</p>
      <div class="btn">
        <Button :btnClass="'downApp'" @btnFn="downApp()">下载APP</Button>
      </div>
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
      downApp () {
        console.log('下载app')
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
      .btn
        padding-top: 60px  
</style>
