<template>
  <div class="bondBox">
    <td-header title="债权转让"/>
    <div class="listTab">
      <span :class="tabCom === 'can'?'on':''" >
        <b @click="tabFn('can')">可转让</b>
      </span>
      <span :class="tabCom === 'transfe'?'on':''" >
        <b @click="tabFn('transfe')">转让记录</b>
      </span>
      <span :class="tabCom === 'receive'?'on':''" >
        <b @click="tabFn('receive')">承接记录</b>
      </span>
    </div>
    <div class="bondList">
      <p>请在电脑端登录官网或在APP端查看</p>
      <div class="btn">
        <td-button
          value="下载APP"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      tabCom: 'can'
    }
  },
  mounted() {},
  methods: {
    downApp() {
      this.$App(
        '<p>您确定下载以下内容吗?</p> <p>拓道金服 V3.9.2 54MB&nbsp;</p>'
      )
    },
    tabFn(txt) {
      this.tabCom = txt
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .bondBox
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .listTab
      display: flex
      background-color: $color-white
      span
        flex: 1
        text-align: center
        font-size: $fontsize-large-xx
        color: $color-gray3
        line-height: 88px
        b
          display: inline-block
          position: relative
      .on
        color: $color-primary
        b:after
          content: ''
          display: block
          width: 60px
          height: 6px
          background-color: $color-primary
          position: absolute
          bottom: 0
          left: 50%
          transform: translateX(-50%)
          border-radius: 10px
    .bondList
      text-align: center
      overflow: hidden
      p
        font-size: $fontsize-medium
        color: $color-gray2
        margin-top: 50%
      .btn
        padding-top: 60px
        width: 440px
        margin: 0 auto
</style>
