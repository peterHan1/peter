<template>
  <div class="login_box">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >输入登录密码</Header>
    <div class="phone_box">
      <div class="phone">
        <span>密码</span>
        <input :type="pwdType" placeholder="请输入登录密码" v-model="pwdVal"/>
        <div class="iconfont" @click="inputType()"><b v-if="showIcon">&#xe692;</b><b v-else>&#xe68a;</b></div>
        <i class="iconfont" v-show="pwdVal" @click="emptyVal()">&#xe69d;</i>
      </div>
      <div class="pwd_operate">
        <p @click="rememberFn()">
          <i class="iconfont on" v-if="remember">&#xe6c4;</i>
          <i class="iconfont" v-else>&#xe6c3;</i>
          记住我
        </p>
        <router-link to="/forgetPwd" class="forgetPwd">忘记登录密码? </router-link>
      </div>
      <div class="sub_btn">
        <Button :btnClass="pwdVal.length >= 6?'btnRule':'btnRulegary'" @btnFn="subBtn()">确定</Button>
      </div>
      <p class="td_txt">拓道金服承诺不会泄露您的个人信息</p>
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
        showIcon: true,
        pwdVal: '',
        remember: false
      }
    },
    mounted () {
      console.log(this.$route.query.id)
    },
    methods: {
      inputType () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.showIcon = !this.showIcon
      },
      emptyVal () {
        this.pwdVal = ''
      },
      subBtn () {
        console.log(this.pwdVal)
      },
      rememberFn () {
        this.remember = !this.remember
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .login_box
    height: 100%
    padding-top: 88px
    .phone_box
      overflow: hidden
    .phone
      height: 100px
      background-color: #fff
      padding: 0 30px
      margin-top: 30px
      overflow: hidden
      span
        display: block
        color: #333
        font-size: 28px
        line-height: 100px
        float: left
        padding: 0 20px 0 10px
      input
        display: block
        width: 60%
        line-height: 99px
        font-size: 28px
        float: left
        border: none
        caret-color: #ff711c
        color: #333
      i
        display: block
        float: right
        font-size: 36px
        color: #D8D8D8
        line-height: 90px
        margin-right: 30px
      div
        display: block
        float: right
        font-size: 50px
        color: #D8D8D8
        line-height: 90px
    .pwd_operate
      padding: 26px 30px 0
      overflow: hidden

      p
        display: inline-block
        font-size: 24px
        color: #999
        float: left
        .on
          color: #5887FF
      .forgetPwd
        font-size: 24px
        color: #69A5E4
        float: right
    .sub_btn
      width: 100%
      padding: 27px 30px 0
    .td_txt
      font-size: 24px
      color: #999
      text-align: center
      line-height: 90px
</style>
