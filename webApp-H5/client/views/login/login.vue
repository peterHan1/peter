<template>
  <div class="login_box">
    <Header :navLeftTxt="'&#xe687;'" @navLeftFn="navLeftFn()" >登录/注册</Header>
    <div class="phone_box">
      <div class="phone">
        <span>账号</span>
        <input type="number" placeholder="请输入手机号" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phoneVal">
        <i class="iconfont" v-show="phoneVal" @click="emptyVal()">&#xe69d;</i>
      </div>
      <div class="hint_phone" v-show="phoneVal">{{phoneVal}}</div>
      <div class="sub_btn">
        <!-- <div class="td_btn" :class="phoneVal.length == 11?'td_btnHig':'td_btnNo'" >下一步</div> -->
        <Button :btnClass="phoneVal.length == 11?'btnRule':'btnRulegary'" @btnFn="subBtn()">下一步</Button>
      </div>
      <p>拓道金服承诺不会泄露您的个人信息</p>
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
        phoneVal: '',
        phoneCode: '',
        layer_show: true
      }
    },
    mounted () {
    },
    methods: {
      layerShow () {
        this.layer_show = !this.layer_show
      },
      emptyVal () {
        this.phoneVal = ''
      },
      subBtn () {
        if (!this.phoneVal || this.phoneVal.length < 11) {
          this.$Msg('请输正确的入手机号！', 2000)
        } else {
          this.$router.push({path: '/loginPwd', query: {id: this.phoneVal}})
        }
      },
      navLeftFn () {
        this.$router.push({path: '/index'})
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
        font-size: 28px
        line-height: 90px
        float: left
        padding: 0 20px 0 10px
      input
        display: block
        line-height: 90px
        width: 75%
        font-size: 28px
        float: left
        border: none
        caret-color:#ff711c
      i
        display: block
        float: right
        font-size: 36px
        color: #D8D8D8
        line-height: 90px
        padding-right: 9px
    .hint_phone
      width: 90%
      height: 90px
      line-height: 90px
      background-color: #CDE7F5
      border-radius: 5px
      margin: 22px auto 0
      position: relative
      font-size: 44px
      color: #7697D5
      text-align: center
    .hint_phone:after
      content: ''
      position: absolute
      top: -35px
      left: 50%
      margin-left: -20px
      display: block
      border-width: 20px
      border-style: solid
      border-color: transparent transparent #cce6f5 transparent
    .sub_btn
      width: 100%
      padding: 52px 30px 0
    p
      font-size: 24px
      color: #999
      text-align: center
      line-height: 110px
    .importTxt
      overflow: hidden
      padding: 40px 30px
      input
        width: 55%
        height: 70px
        display: block
        float: left
        border: 1px solid #ccc
        padding: 0 10px;
        box-sizing: border-box
        font-size: 28px
      img
        width: 40%
        height: 60px
        display: block
        float: right
        margin-top: 1.5%
    .code_btn
      line-height: 80px
      font-size: 28px
      display: flex
      border-top: 1px solid #ccc
      div
        flex: 1
        text-align: center
        cursor: pointer
        -webkit-tap-highlight-color: transparent
      .code_btn1
        color: #ccc
        border-right: 1px solid #ccc
      .code_btn2
        color: #FF6600
</style>
