<template>
  <div class="forgetPwd">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >忘记密码</Header>
    <ul>
      <li>188****8888</li>
      <li>
        <input type="text" placeholder="请输入图形验证码" class="codeInp" v-model="imgCode" />
        <img src="../../assets/images/login/phoneCode.jpg" alt="">
      </li>
      <li>
        <input type="text" placeholder="请输入验证码" class="codeInp" v-model="phoneCode" />
        <span @click="getCodeFn" v-if="countNum">获取验证码</span>
        <span class="count_style" v-else>{{countTime}}秒</span>
      </li>
    </ul>
    <div class="sub_btn">
      <div class="td_btn" :class="imgCode && phoneCode?'higBtn':'garyBth'" @click="resetFn()">下一步</div>
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
        imgCode: '',
        phoneCode: '',
        name: '',
        sfz: '',
        countTime: 60,
        countNum: true
      }
    },
    mounted () {
    },
    methods: {
      getCodeFn () {
        if (this.imgCode.length < 4) {
          this.$Msg('请输入正确的图形验证码', 2000)
        } else {
          this.$Loading.Load()
          // 倒计时
          this.countNum = false
          let timer = setInterval(() => {
            this.countTime--
            if (this.countTime <= 0) {
              this.countTime = 60
              this.countNum = true
              clearInterval(timer)
            }
          }, 1000)
          setTimeout(() => {
            this.$Loading.Close()
          }, 2000)
          console.log(this.imgCode)
        }
      },
      resetFn () {
        this.$router.push({path: '/resetPwd'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .forgetPwd
    min-height: 100%
    padding-top: 88px
    box-sizing: border-box
    ul
      background-color: #fff
      padding: 0 30px 0 100px
      li
        border-bottom: 1px solid #e8e8e8
        font-size: 28px
        height: 100px
        line-height: 100px
        position: relative
        input
          display: block
          line-height: 98px
          width: 100%
          float: left
          caret-color: #ff711c
          font-size: 28px
        .codeInp
          width: 60%
        img
          display: block
          width: 184px
          height: 60px
          float: right
          margin-top: -30px
          position: absolute
          right: 0
          top: 50%
        span
          display: block
          height: 60px
          float: right
          font-size: 26px
          width: 186px
          line-height: 60px
          background-color: #FF7102
          color: #fff
          text-align: center
          border-radius: 6px
          margin-top: -30px
          position: absolute
          right: 0
          top: 50%
        .count_style
          background-color: #ccc  
      li:before
        content: ''
        display: block
        width: 40px
        position: absolute
        left: -70px
        top: 50%
      li:nth-child(1):before
        height: 42px
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon1.png) no-repeat
        background-size: 100% 100%
      li:nth-child(2):before
        height: 36px
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon2.png) no-repeat
        background-size: 100% 100%
      li:nth-child(3):before
        height: 32px
        margin-top: -(@height/2)
        background: url(../../assets/images/login/icon3.png) no-repeat
        background-size: 100% 100%
      li:last-child
        border: none
    .sub_btn
      padding: 20px 30px 0
    .higBtn
      background-color: #ff711c
    .garyBth
      background-color: #DEDEDE
</style>
