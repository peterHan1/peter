<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">注册登录</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a href="javascript:;" @click="active1 = !active1">
            <span class="fl">1.如何成为拓道金服会员？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>网页端注册：登录拓道金服官网www.51tuodao.com，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。</p>
            <p>手机端注册（ios版本/安卓版本）：打开手机APP点击【资产】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p>
            <p>微信端注册：关注“拓道金服”后，点击下方的【我要赚钱】，在【我要注册】里即可注册。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active2 = !active2">
            <span class="fl">2.注册时手机收不到验证码怎么办？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>请确认手机是否安装短信拦截或过滤软件；</p>
            <p>请确认手机是否能够正常接收短信（信号问题、欠费、停机等）；</p>
            <p>短信收发过程中可能会存在延迟，请耐心等待；</p>
            <p>可能由于以前该号码被通信供应商系统列为黑名单，请联系在线客服，或者拨打服务热线：400-85-666-85。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '登录注册'
  },
  data () {
    return {
      active1: false,
      active2: false
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