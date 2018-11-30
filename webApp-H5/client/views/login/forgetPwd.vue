<template>
  <div class="forgetPwd">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >忘记密码</Header>
    <ul>
      <li>188****8888</li>
      <li>
        <input type="text" placeholder="请输入图形验证码" class="codeInp" v-model="imgCode" />
        <img src="../../assets/images/phoneCode.jpg" alt="">
      </li>
      <li>
        <input type="text" placeholder="请输入验证码" class="codeInp" v-model="phoneCode" />
        <span @click="getCodeFn">获取验证码</span>
      </li>
    </ul>
    <div class="nextBtn" :class="imgCode && phoneCode?'higBtn':'garyBth'">下一步</div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        imgCode: '',
        phoneCode: '',
        name: '',
        sfz: ''
      }
    },
    mounted () {
    },
    methods: {
      getCodeFn () {
        if (this.imgCode.length < 4) {
          this.$Msg('请输入正确的图形验证码', 2000)
        } else {
          // 倒计时
          console.log(this.imgCode)
        }
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .forgetPwd
    min-height: 100%
    padding-top: 0.88rem
    box-sizing: border-box
    ul
      background-color: #fff
      padding: 0 0.4rem
      li
        padding-left: 0.7rem
        border-bottom: 1px solid #d8d8d8
        font-size: 0.26rem
        height: 1rem
        line-height: 1rem
        position: relative
        input
          display: block
          height: 100%
          width: 100%
          float: left
        .codeInp
          width: 60%
        img
          display: block
          height: 0.56rem
          float: right
          margin-top: -0.28rem
          position: absolute
          right: 0
          top: 50%
        span
          display: block
          height: 0.56rem
          float: right
          font-size: 0.24rem
          width: 1.75rem
          line-height: 0.56rem
          background-color: #ff711c
          color: #fff
          text-align: center
          border-radius: 5px
          margin-top: -0.28rem
          position: absolute
          right: 0
          top: 50%
      li:before
        content: ''
        display: block
        width: 0.4rem
        position: absolute
        left: 0
        top: 50%
      li:nth-child(1):before
        height: 0.42rem
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon1.png) no-repeat
        background-size: 100% 100%
      li:nth-child(2):before
        height: 0.36rem
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon2.png) no-repeat
        background-size: 100% 100%
      li:nth-child(3):before
        height: 0.32rem
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon3.png) no-repeat
        background-size: 100% 100%
      li:last-child
        border: none
    .nextBtn
      display: block
      width: 80%
      height: 0.88rem
      line-height: 0.88rem
      margin: 1rem auto 0
      text-align: center
      font-size: 0.32rem
      color: #fff
      border-radius: 5px
    .higBtn
      background-color: #ff711c
    .garyBth
      background-color: #DEDEDE
</style>
