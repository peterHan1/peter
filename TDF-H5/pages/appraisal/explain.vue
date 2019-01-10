<template>
  <div class="explain">
    <header class="outHeader">
      <span class="iconfont">&#xe6fe;</span>
      <b>退出</b>
      <span>风险测评</span>
    </header>  
    <div class="explain_top">原则上，投资人风险承受能力与产品的项目风险评估结果一一对应，相互关联，即原则上：</div>
    <ul>
      <li>
        <div><span/><b>谨慎型投资人</b></div>
        <p>只可购买项目风险评估结果为A的产品，可投金额不超过40万元；</p>
      </li>
      <li>
        <div><span/><b>稳健型投资人</b></div>
        <p>可以购买项目风险评估结果为A、B的产品，可投金额不超过60万元；</p>
      </li>
      <li>
        <div><span/><b>平衡型投资人</b></div>
        <p>可以购买项目风险评估结果为A、B、C的产品，可投金额不超过80万元；</p>
      </li>
      <li>
        <div><span/><b>积极型投资人</b></div>
        <p>可以购买项目风险评估结果为A、B、C、D的产品，可投金额不超过100万元；</p>
      </li>
      <li>
        <div><span/><b>激进型投资人</b></div>
        <p>可以购买项目风险评估结果为A、B、C、D的产品，可投金额不超过9999万元；</p>
      </li>
    </ul>
    <div class="explain_bot">未进行测评或未明确投资风险和不接受风险所带来的损失的用户，将无法在拓道金服平台进行投资。</div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    navLeftFn() {
      this.$router.push({ path: '/ucSet' })
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .explain
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: $color-white
    padding: 88px 40px 0
    .outHeader
      height: 0.88rem
      line-height: 0.88rem
      width: 100%
      background: $color-white
      position: fixed
      left: 0
      top: 0
      right: 0
      text-align: center
      font-size: $fontsize-large-xxx
      color: $color-gray1
      border-bottom: 0.01rem solid $color-gray5
      .iconfont
        font-size: $fontsize-large-xxxxxxxx
        position: absolute
        left: 15px
      b
        font-size: $fontsize-large-x 
        color: $color-gray2
        position: absolute
        left: 65px
    .explain_top,.explain_bot
      color: $color-gray1
      font-size: $fontsize-medium
      line-height: 48px
    .explain_top
      margin-top: 50px
    .explain_bot
      margin-top: 40px
    li
      margin-top: 15px
      div
        color: $color-gray1
        font-size: $fontsize-small-ss
        overflow: hidden
        span
          float: left
          display: inline-block
          width: 10px
          height: 10px
          border-radius: 50%
          background-color: $color-gray9
          margin-right: 20px
          margin-top: 26px
        b
          float: left
          display: inline-block
          font-weight: normal
          line-height: 64px
      p
        color: $color-gray2
        font-size: $fontsize-small-ss
        line-height: 36px
</style>
