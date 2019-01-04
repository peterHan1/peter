<template>
  <div class="forgetPwd">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >重置密码</Header>
    <ul>
      <li>
        <input type="password" placeholder="请输入6～16位密码" class="codeInp" v-model="pwdOne" />
      </li>
      <li>
        <input type="password" placeholder="请确认新密码" class="codeInp" v-model="pwdTwo" />
      </li>
    </ul>
    <div class="sub_btn">
      <Button :btnClass="pwdOne.length >= 6 && pwdOne.length <= 16 && pwdTwo.length >= 6 && pwdTwo.length <= 16?'btnRule':'btnRulegary'" @btnFn="resetFn()">确定</Button>
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
        pwdOne: '',
        pwdTwo: '',
        name: '',
        sfz: '',
        countTime: 60,
        countNum: true
      }
    },
    mounted () {
    },
    methods: {
      resetFn () {
        console.log('提交重置密码')
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
      li:last-child
        border: none
    .sub_btn
      padding: 20px 30px 0
</style>
