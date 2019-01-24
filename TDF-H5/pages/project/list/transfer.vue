<template>
  <div class="listBox">
    <p>请在电脑端登录官网或在APP端查看</p>
    <div class="appBtn">
      <td-button
        value="立即下载APP"
        @btnFn="downApp"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    downApp() {
      this.$App(
        '<p>您确定下载以下内容吗？</p><p>拓道金服V3.9.2 54MB &nbsp;</p>'
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
.listBox
  text-align: center
  p
    font-size: $fontsize-large-x
    color: $color-gray3
    margin-top: 320px
  .appBtn
   margin: 52px auto 0
   text-align: center
   width: 440px
</style>
