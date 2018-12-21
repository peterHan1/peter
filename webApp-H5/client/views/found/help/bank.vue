<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">银行资金存管</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.什么是银行存管？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>银行存管是指用户在P2P平台上的交易资金交由银行进行管理，平台无法接触交易资金的一种资金管理模式。借款人、出借人和平台通过在银行方开设存管账户，来实现交易和资金的结算。</p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.如何开通银行存管？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>A、新用户：存管系统上线后新注册用户在充值、出借、提现前需开通银行存管账户；存管账户开通需用户提供真实姓名、身份证号、银行卡号、银行预留手机号，并设置支付密码，该支付密码在出借、提现、债权转让中使用。（所有资料提交正确则开通成功。）</p>
            <p>B、老用户：存管系统上线前已实名认证用户，在充值、投资、提现、债权转让前需要重新激活存管账户。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.开通银行存管账户提示失败，该如何处理？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>A、根据页面提示的报错信息，对自己填写的姓名、身份证号码、银行卡号码、银行预留手机号进行校对，确认填写无误。</p>
            <p>B、暂不支持您输入的银行卡，建议更换银行卡。</p>
            <p>C、联系客服，寻求帮助（请通过关注“拓道金服”微信(QQ)公众号联系在线客服，服务热线：400-85-666-85）。</p>
          </div>
        </li>
        <li>
          <a @click="active4 = !active4">
            <span class="fl">4.存管后，如何保证用户资金安全？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>拓道金服作为一家致力合规、长远发展的平台，存管系统上线后，用户开户建立独立存管子账户，充值、出借、提现都通过存管子账户，完全分离平台与资金的接触。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">5.存管后，出借人可以在新网银行查询到存管账户吗？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>用户可直接在“个人资料”中看到。</p>
          </div>
        </li>
        <li>
          <a  @click="active6 = !active6">
              <span class="fl">6.出借人如何更换绑定银行卡？</span>
              <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
              <p>PC端：在“账户设置”→“我的银行卡”→“更换银行卡”中，点击更换银行卡，就会跳转到存管银行的页面自主进行更换银行卡。 </p>
              <p>APP端：在“我的”→“账户设置”→“我的银行卡”中，点击更换银行卡，就会跳转到存管银行的页面自主进行更换银行卡。</p>
          </div>
      </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '银行资金存管'
  },
  data () {
    return {
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false
    }
  },
  methods: {
    navRightFn () {
      this.$router.push('/found/help/suggestion')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .help
    font-size:0.28rem
    overflow: hidden
    padding-top: 0.88rem
    .fl
      float:left
    .fr
      float:right
  .help_bot
    margin:0.2rem 0 1.23rem
    li
      a
        background-color:white
        display:block
        border-bottom: 1px solid #e4e4e4
        height:0.8rem
        line-height:0.8rem
        font-size:0.24rem
        color:#626262
        padding:0 0.3rem
        .iconfont
          -webkit-transition:.3s
          -moz-transition: .3s
          -ms-transition: .3s
          -o-transition: .3s
          transition: .3s
        .deg
          -webkit-transform:rotate(180deg)
          -moz-transform:rotate(180deg)
          -ms-transform:rotate(180deg)
          -o-transform:rotate(180deg)
          transform:rotate(180deg)
          -webkit-transition:.3s
          -moz-transition: .3s
          -ms-transition: .3s
          -o-transition: .3s
          transition: .3s
      div
        font-size:0.24rem
        color:#626262
        padding:0.22rem 0.3rem
        p
          line-height:0.4rem
          text-align: justify
</style>