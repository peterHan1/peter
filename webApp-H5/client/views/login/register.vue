<template>
  <div class="register_box">
    <Header :titles="titles" @navLeftFn="navLeftFn()"></Header>
    <div class="reg_box">
      <p class="phoneTxt">已向您的手机号166****6666发送验证码,请查收</p>
      <ul>
        <li>
          <span>验证码</span>
          <input type="number" placeholder="请输入验证码" v-model="phoneVal"/>
          <div class="phoneCode">50s后重发</div>
        </li>
        <li>
          <span>设置密码</span>
          <input :type="pwdType" placeholder="设置6-16位登录密码" v-model="pwdVal"/>
          <div class="iconfont" @click="inputType()"><b v-if="showIcon">&#xe692;</b><b v-else>&#xe68a;</b></div>
          <i class="iconfont" v-show="pwdVal" @click="emptyVal()">&#xe69d;</i>
        </li>
      </ul>
      <div class="inviter">
        <p @click="inviterFn()">我有邀请人 <span class="iconfont" :class="[rotate?'up':'down']">&#xe6a3;</span></p>
        <ul v-show="inviter_phone" class="inviterUl">
          <li>
            <span>邀请人</span>
            <input type="text" placeholder="邀请人手机号、推荐码（选填项)" class="inp_width" />
          </li>
        </ul>
      </div>
      <div class="clause">
        <i class="iconfont" :class="iconOk?'iconOn':'iconNo'" @click="consentTd()">&#xe618;</i>
        <span>我已阅读并同意拓道金服<router-link to="" >《网贷禁止性行为说明》、</router-link><router-link to="" >《网络借贷风险告知书》</router-link>及<router-link to="" >《拓道金服用户注册协议》</router-link></span>
      </div>
      <div class="sub_btn">
        <div class="td_btn" :class="phoneVal.length != 0 && pwdVal.length >= 6 && pwdVal.length <= 16 && iconOk?'td_btnHig':'td_btnNo'" @click="subBth()">确定</div>
        <P>收不到短信验证码？点击<span>获取语音验证码</span></P>
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
        pwdType: 'password',
        pwdVal: '',
        phoneVal: '',
        showIcon: true,
        inviter_phone: false,
        iconOk: true,
        rotate: false,
        titles: {
          navLeft: 'icon',
          title: '注册',
          navRight: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      inputType () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.showIcon = !this.showIcon
      },
      consentTd () {
        this.iconOk = !this.iconOk
      },
      emptyVal () {
        this.pwdVal = ''
      },
      inviterFn () {
        this.inviter_phone = !this.inviter_phone
        this.rotate = !this.rotate
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/styles/variable.styl"
  .register_box
    height: 100%
    background-color: #F2F3F7
    padding-top: 0.88rem
    box-sizing: border-box
    .reg_box
      .phoneTxt
        font-size: 0.24rem
        color: #777
        padding-left: 0.6rem
        line-height: 0.9rem
      li
        height: 0.88rem
        background-color: #fff
        border-bottom: 1px solid #efeff4
        span
          display: block
          height: 100%
          width: 1.3rem
          line-height: 0.8rem
          font-size: 0.26rem
          color: #333
          float: left
          margin-left: 0.6rem
        input
          display: block
          height: 100%
          font-size: 0.26rem
          color: #333
          float: left
          caret-color:#7b99ef
        input::-webkit-input-placeholder
          color: #c7c7cd
        input:-moz-placeholder
          color: #c7c7cd
        input::-moz-placeholder
          color: #c7c7cd
        input:-ms-input-placeholder
          color: #c7c7cd
        .inp_width
          width: 60%
        div
          display: block
          height: 100%
          float: right
          margin-right: 0.4rem
          line-height: 0.88rem
          font-size: 0.26rem
          color: #777
          position: relative
          b
            font-size: 0.5rem
            color: #777
        .phoneCode
          padding-left: 0.4rem
        .phoneCode:before
          content: ''
          display: block
          height: 0.32rem
          border-left: 1px solid #bfbfbf;
          position: absolute
          left: 0
          top: 50%
          margin-top: -(@height / 2)rem
        i
          display: block
          height: 100%
          font-size: 0.36rem
          color: #D8D8D8
          float: right
          line-height: 0.88rem
          margin-right: 0.3rem
      .clause
        font-size: 0.24rem
        color: #999
        padding: 0.14rem 0.6rem
        height: 0.77rem
        text-align: justify
        i
          display: block
          width: 0.55rem
          float: left
          height: 100%
          text-align: center
          font-size: 0.36rem
          line-height: 0.3rem
        .iconOn
          color: #ff711c
        .iconNo
          color: #ddd
        a
          color: #ff711c
      .inviter
        padding: 0.4rem 0 0
        .inviterUl
          padding-bottom: 0.2rem
        p
          font-size: 0.26rem
          color: #999
          padding: 0 0.58rem 0.4rem
          span
            display: inline-block
            font-size: 0.3rem
            color: #999
            margin-left: 0.1rem
          .down
            transition: all 0.5s
          .up
            transform:rotate(-180deg)
            transition: all 0.5s
            color: #ff711c
      .sub_btn
        width: 90%
        margin: 0.6rem auto 0
        p
          font-size: 0.2rem
          color: #a2a2a2
          text-align: center
          line-height: 1rem
          span
            color: #ff711c
</style>
