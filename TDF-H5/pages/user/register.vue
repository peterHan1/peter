<template>
  <div>
    <td-header title="注册"/>
    <div class="register">
      <div class="input-box">
        <span>图形验证码</span>
        <input
          type="text"
          placeholder="请输入图形验证码">
        <div>图形验证码</div>
      </div>
      <div class="input-box">
        <span>验证码</span>
        <input
          type="text"
          placeholder="请输入验证码">
        <button class="btn">获取验证码</button>
      </div>
      <div class="input-box">
        <span>验证码</span>
        <input
          type="text"
          placeholder="设置6-16位字母或数字登录密码">
        <em class="iconfont">&#xe6e6;</em>
      </div>
    </div>

    <div class="invite">我有邀请人<i class="iconfont">&#xe6e9;</i></div>
    <div class="input-box">
      <span>图形验证码</span>
      <input
        type="text"
        placeholder="邀请人手机号码/邀请码（选填项）">
      <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>
    <td-button
      value="下一步"
      disabled="disabled"/>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      pwdType: 'password',
      imgCode: '',
      pwdVal: '',
      phoneVal: '',
      showIcon: true,
      inviter_phone: false,
      rotate: false,
      codeNum: false,
      countTime: 5,
      clauses: false
    }
  },
  mounted() {},
  methods: {
    subBth() {
      let vm = this
      if (vm.imgCode === '' || vm.phoneVal === '' || vm.pwdVal === '') {
        this.$Msg('请完整填写信息！', 2000)
      } else if (!/^[0-9A-Za-z]{6,16}$/.test(vm.pwdVal)) {
        this.$Msg('请输入6-16位数字或字母密码', 2000)
      } else if (!vm.clauses) {
        this.$Msg('请阅读并同意风险告知书与注册协议', 2000)
      } else {
        // this.$Loading.Load()
        // this.$Loading.Close()
        console.log('注册')
      }
    },
    inputType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      this.showIcon = !this.showIcon
    },
    getCode() {
      if (this.imgCode.length === 4) {
        this.codeNum = true
        let timer = setInterval(() => {
          this.countTime--
          if (this.countTime <= 0) {
            this.countTime = 60
            this.codeNum = false
            clearInterval(timer)
          }
        }, 1000)
      } else {
        this.$Msg('请输入正确图形验证码！', 2000)
      }
    },
    inviterFn() {
      this.inviter_phone = !this.inviter_phone
      this.rotate = !this.rotate
    },
    clauseFn() {
      this.clauses = !this.clauses
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.register
  background: $color-white
  margin-top: 30px
.input-box
  color: $color-gray1
  line-height: 1
  // font-size: $fontsize-medium
  display: flex
  height: 100px
  background: $color-white
  padding: 0 30px
  align-items: center
  justify-content:space-between
  overflow: hidden
  border-bottom: 1px solid $color-background; /*no*/
  &:last-child
      border-bottom: 0
    input
      height: 60px
      font-size: $fontsize-medium
      // background red
      flex: 1
      margin-left: 20px
    div
      // width: 184px
      // height: 60px
      // line-height: 60px
      // background: pink
    .btn
      width: 184px
      height:60px
      font-size: $fontsize-medium-s
      border-radius: 6px
      background: $color-primary
      color: $color-white
    .iconfont
      font-size: 45px
      color: $color-gray3
.invite
  color: $color-gray3
  margin: 39px 0 20px 30px
  .iconfont
    color: $color-gray3

</style>
