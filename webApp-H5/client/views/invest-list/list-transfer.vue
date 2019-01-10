<template>
  <div class="listBox">
    <p>请在电脑端登录官网或在APP端查看</p>
    <div class="appBtn">
      <Button :btnClass="'downApp'" @btnFn="downApp()">立即下载APP</Button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      downApp () {
        this.$App('<p>您确定下载以下内容吗？</p><p>拓道金服V3.9.2 54MB &nbsp;</p>')
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
.listBox
  text-align: center
  p
    font-size: 30px
    color: #999
    margin-top: 320px
  .appBtn
   margin-top: 52px
   text-align: center
</style>
