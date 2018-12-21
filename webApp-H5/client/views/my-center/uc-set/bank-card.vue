<template>
  <div class="wx_bank">
    <Header :navLeftTxt="'icon'">我的银行卡</Header>
    <div class="bank_tlt">为保障您的资金安全，只能绑定一张银行卡；绑定的银行卡作为充值提现唯一银行卡</div>
    <div class="bank_message">
      <div class="bank_bg">
        <div class="bank_left">
          <div class="ABOC imgSize"></div>
        </div>
        <div class="bank_right">
          <h6>农业银行</h6>
          <p>银行预留手机号 152****8261</p>
          <h5>**** **** **** 4324</h5>
        </div>
      </div>
    </div>
    <div class="link_a">
      <a href="javascript:;" class="phone_a">更换银行预留手机号 > </a>
      <a href="javascript:;" class="bank_a">更换银行卡 > </a>
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
  .wx_bank
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: #fff
    padding-top: 88px
    box-sizing: border-box
    .bank_tlt
      background-color: #F2F3F7
      font-size: 24px
      color: #666
      line-height: 36px
      padding: 20px 30px
      text-align: justify
    .bank_message
      padding:26px 30px 0
      .bank_bg
        width: 100%
        height: 266px
        border-radius: 20px
        background: url(../../../assets/images/my-center/bank_bg.png) no-repeat
        background-size: 100% 100%
        .bank_left
          float: left
          margin-top: 45px
          margin-left: 45px
          div
            width: 76px
            height: 76px
        .bank_right
          float: left
          margin-top: 38px
          margin-left: 26px
          h6
            font-size: 36px
            color: #333
            line-height: 50px
            font-weight: normal
          p
            font-size: 28px
            color: #999
            line-height: 40px
          h5
            font-weight: normal
            font-size: 48px
            color: #333
            line-height: 67px
            margin-top: 27px
    .link_a
      padding: 0 60px
      overflow: hidden
      margin-top: 16px
      a
        font-size: 24px
        color: #666
      a:nth-child(1)
        float: left
      a:nth-child(2)
        float: right
</style>
