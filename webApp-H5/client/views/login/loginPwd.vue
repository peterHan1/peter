<template>
  <div class="login_box">
    <Header :titles="titles" @navLeftFn="navLeftFn()"></Header>
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
      <router-link to="" class="forgetPwd">忘记登录密码? </router-link>
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
        titles: {
          navLeft: 'icon',
          title: '输入登录密码',
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
  @import "../../assets/styles/variable.styl"
  .login_box
    height: 100%
    background-color: #F2F3F7
    padding-top: 0.88rem
    box-sizing: border-box
    .phone_box
      overflow: hidden
    .phone
      height: 0.9rem
      background-color: #fff
      padding: 0 0.3rem
      margin-top: 0.3rem
      span
        display: block
        color: #333
        font-size: 0.26rem
        line-height: 0.9rem
        float: left
        padding: 0 0.4rem 0 0.1rem
      input
        display: block
        height: 100%
        width: 60%
        font-size: 0.26rem
        float: left
        border: none
        caret-color:#7b99ef
        color: #333
      i
        display: block
        float: right
        font-size: 0.36rem
        color: #D8D8D8
        line-height: 0.9rem
        margin-right: 0.3rem
      div
        display: block
        float: right
        font-size: 0.5rem
        color: #D8D8D8
        line-height: 0.9rem
    .forgetPwd
      font-size: 0.26rem
      color: #7b99ef
      float: right
      margin-right: 0.55rem
      line-height: 1rem
    .sub_btn
      width: 90%
      margin: 0.6rem auto 0
</style>
