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
      <div class="sub_btn">
        <div class="td_btn" :class="pwdVal.length != 0?'td_btnHig':'td_btnNo'" @click="subBth()">确定</div>
      </div>
      <router-link to="forgetPwd" class="forgetPwd">忘记登录密码? </router-link>
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
        pwdVal: ''
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
      subBth () {
        console.log(this.pwdVal)
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
    box-sizing: border-box
    .phone_box
      overflow: hidden
    .phone
      height: 90px
      background-color: #fff
      padding: 0 30px
      margin-top: 30px
      span
        display: block
        color: #333
        font-size: 26px
        line-height: 90px
        float: left
        padding: 0 40px 0 10px
      input
        display: block
        width: 60%
        line-height: 90px
        font-size: 26px
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
    .forgetPwd
      font-size: 26px
      color: #7b99ef
      float: right
      margin-right: 55px
      line-height: 100px
    .sub_btn
      width: 90%
      margin: 60px auto 0
</style>
