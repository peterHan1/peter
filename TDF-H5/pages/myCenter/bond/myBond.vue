<template>
  <div class="bondBox">
    <td-header 
      :returnUrl="false"
      title="债权转让" 
      url="myCenter-center"/>
    <div class="listTab">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
    </div>
    <p>请在电脑端登录官网或在APP端查看</p>
    <div class="btn">
      <td-button
        value="下载APP"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabel: '可转让',
      disabled: false,
      tabLabels: [
        {
          label: '可转让'
        },
        {
          label: '转让记录'
        },
        {
          label: '承接记录'
        }
      ]
    }
  },
  mounted() {
    if (!this.$store.state.accessId && !this.$store.state.accessKey) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    downApp() {
      this.$App(
        '<p>您确定下载以下内容吗?</p> <p>拓道金服 V3.9.2 54MB&nbsp;</p>'
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.bondBox
  width: 100%
  padding-top: 88px
  text-align: center
  .listTab
    background-color: $color-white
    line-height: 88px
    /deep/ .cube-tab-bar-slider
      width: 50px
      margin-left: 13%
      height: 6px
      border-radius: 3px
  p
    font-size: $fontsize-medium
    color: $color-gray2
    margin-top: 50%
  .btn
    padding-top: 60px
    width: 440px
    margin: 0 auto
</style>
