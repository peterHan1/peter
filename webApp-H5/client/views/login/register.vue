<template>
  <div class="register_box">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >注册</Header>
    <div class="reg_box">
      <p class="phoneTxt">已向您的手机号166****6666发送验证码,请查收</p>
      <ul>
        <li>
          <span>验证码</span>
          <input type="number" placeholder="请输入验证码" v-model="phoneVal"/>
          <div class="phoneCode" v-if="codeNum">{{countTime}}s后重发</div>
          <div class="phoneCode" @click="getCode()" v-else>获取验证码</div>
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
        <span>我已阅读并同意<router-link to="" >《网贷禁止性行为说明》、</router-link><router-link to="" >《网络借贷风险告知书》</router-link>及<router-link to="" >《拓道金服用户注册协议》</router-link></span>
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
        codeNum: false,
        countTime: 5
      }
    },
    mounted () {
    },
    methods: {
      subBth () {
        this.$Loading.Load()
        this.$Loading.Close()
        console.log('注册')
      },
      inputType () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.showIcon = !this.showIcon
      },
      getCode () {
        this.codeNum = true
        let timer = setInterval(() => {
          this.countTime--
          if (this.countTime <= 0) {
            this.countTime = 60
            this.codeNum = false
            clearInterval(timer)
          }
        }, 1000)
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
  .register_box
    height: 100%
    padding-top: 88px
    box-sizing: border-box
    .reg_box
      .phoneTxt
        font-size: 24px
        color: #777
        padding-left: 60px
        line-height: 90px
      li
        height: 88px
        background-color: #fff
        border-bottom: 1px solid #efeff4
        span
          display: block
          height: 100%
          width: 130px
          line-height: 80px
          font-size: 26px
          color: #333
          float: left
          margin-left: 60px
        input
          display: block
          height: 100%
          font-size: 26px
          color: #333
          float: left
          caret-color:#ff711c
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
          margin-right: 40px
          line-height: 88px
          font-size: 26px
          color: #777
          position: relative
          b
            font-size: 50px
        .phoneCode
          padding-left: 40px
        .phoneCode:before
          content: ''
          display: block
          height: 32px
          border-left: 1px solid #bfbfbf;
          position: absolute
          left: 0
          top: 50%
          margin-top: -(@height / 2)px
        i
          display: block
          height: 100%
          font-size: 36px
          color: #D8D8D8
          float: right
          line-height: 88px
          margin-right: 30px
      .clause
        font-size: 24px
        color: #999
        padding: 0 60px
        overflow: hidden
        span
          display: inline-block
          text-align: justify
          width: 90%
        i
          display: inline-block
          width: 6%
          height: 100%
          text-align: center
          font-size: 36px
          vertical-align: top
        .iconOn
          color: #ff711c
        .iconNo
          color: #ddd
        a
          color: #ff711c
      .inviter
        padding: 40px 0 0
        .inviterUl
          padding-bottom: 20px
        p
          font-size: 26px
          color: #999
          padding: 0 58px 40px
          span
            display: inline-block
            font-size: 30px
            color: #999
            margin-left: 10px
          .down
            transition: all 0.5s
          .up
            transform:rotate(-180deg)
            transition: all 0.5s
            color: #ff711c
      .sub_btn
        width: 90%
        margin: 60px auto 0
        p
          font-size: 20px
          color: #a2a2a2
          text-align: center
          line-height: 100px
          span
            color: #ff711c
</style>
