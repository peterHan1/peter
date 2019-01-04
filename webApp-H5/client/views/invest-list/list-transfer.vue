<template>
  <div class="listBox">
    <p>请在电脑端登录官网或在APP端查看</p>
    <div class="appBtn">
      <Button :btnClass="'downApp'">立即下载APP</Button>
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
