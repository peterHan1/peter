<template>
  <div>
    <td-header title="注册"/>
    <div class="register">
      <div class="input-box">
        <span>图形验证码</span>
        <input
          v-model.trim="imgCode"
          type="text"
          placeholder="请输入图形验证码"
          @input="inputImgCode">
        <div><img
          :src="imgYzm"
          @click="editCaptcha"></div>
      </div>
      <div class="input-box">
        <span>验证码</span>
        <input
          v-model.trim="phoneCode"
          type="text"
          placeholder="请输入验证码"
          @input="inputPhoneCode">
        <div><button
          :disabled="disabled"
          class="yzm-btn"
          @click="phoneYzm">{{ showInfo }}</button></div>
      </div>
      <div class="input-box">
        <span>设置密码</span>
        <input
          v-model.trim="pwd"
          type="password"
          placeholder="设置6-16位字母或数字登录密码"
          @input="inputPwd">
        <em class="iconfont">&#xe6e6;</em>
      </div>
    </div>
    <div class="inviter">
      <p @click="inviterFn()">我有邀请人 <span 
        :class="[rotate?'up':'down']" 
        class="iconfont">&#xe6e9;</span></p>
      <div 
        v-show="inviter_phone" 
        class="input-box" >
        <span>邀请人</span>
        <input
          v-model.trim="referrer"
          type="text"
          placeholder="邀请人手机号码/邀请码（选填项）">
        <div class="none"/>
      </div>  
    </div>
    <div class="btn">
      <button
        :disabled="!imgCode||!phoneCode||!pwd"
        @click="onSub">下一步</button>
    </div>
    <!-- <div class="ck1">
      <input
        id="ag"
        type="checkbox">
      <label for="ag"><em/><div>已阅读并同意<router-link to="">《网络借贷禁止性行为说明》</router-link><router-link to="">《网络借贷风险告知书》</router-link>及<router-link to="">《拓道金服用户注册协议》</router-link></div></label>
    </div> -->
    <div class="clause">
      <i 
        :class="[clauses?'on':'']" 
        class="iconfont" 
        @click="clauseFn">&#xe6ef;</i>
      <span>已阅读并同意<router-link to="" >《网贷禁止性行为说明》</router-link><router-link to="" >《网络借贷风险告知书》</router-link>及<router-link to="" >《拓道金服用户注册协议》</router-link></span>
    </div>
  </div>
</template>

<script>
import { vregister, getPhoneCode } from '../../plugins/api.js'
import md5 from 'md5'
export default {
  head() {
    return {
      title: '拓道金服-注册'
    }
  },
  data() {
    return {
      imgYzm: '/api/AuthImageForApp?phone=' + this.$route.params.phone,
      disabled: false,
      showInfo: '获取验证码',
      phoneCodeId: '',
      imgCode: '',
      phoneCode: '',
      pwd: '',
      referrer: '',
      inviter_phone: false,
      rotate: false,
      clauses: false
    }
  },
  methods: {
    inputImgCode(e) {
      this.imgCode = e.target.value
        .replace(/[\W]/g, '')
        .toUpperCase()
        .slice(0, 4)
    },
    inputPhoneCode(e) {
      this.phoneCode = e.target.value.replace(/\D/g, '').slice(0, 7)
    },
    inputPwd(e) {
      this.pwd = e.target.value.replace(/[\W]/g, '').slice(0, 16)
    },
    editCaptcha() {
      this.imgYzm = `/api/AuthImageForApp?phone=${
        this.$route.params.phone
      }&${Math.random()}`
    },

    doCountDown() {
      this.time--
      if (this.time > 0) {
        this.showInfo = this.time
      } else {
        clearInterval(this.clock)
      }
    },
    phoneYzm() {
      getPhoneCode(this.$axios, {
        phone: this.$route.params.phone,
        type: 'reg'
      }).then(res => {
        console.log(res.data.content.code)
        this.phoneCodeId = res.data.content.code
      })
      let time = 60
      const clock = setInterval(() => {
        if (time > 0) {
          this.disabled = true
          this.showInfo = time < 10 ? `0${time}s` : time
        } else {
          clearInterval(clock)
          this.disabled = false
          this.showInfo = '获取验证码'
        }
        time--
      }, 1000)
    },
    onSub() {
      if (!this.imgCode) {
        this.$Msg('请输入图形验证码', 2000)
        return
      }
      if (!this.phoneCode) {
        this.$Msg('请输入验证码', 2000)
        return
      }
      if (!this.pwd) {
        this.$Msg('请设置密码', 2000)
        return
      }
      if (!this.clauses) {
        this.$Msg('请阅读并同意风险告知书与注册协议', 2000)
        return
      }
      const codeReg = /^[0-9a-zA-Z]+$/
      const pwdLen = this.pwd.length
      if (pwdLen < 6 || pwdLen > 16 || !codeReg.test(this.pwd)) {
        this.$Msg('请设置6-16位字母或数字登录密码', 2000)
        return
      }
      const params = {
        phone: this.$route.params.phone,
        password: md5(this.pwd),
        codeId: this.phoneCodeId,
        codeNumber: this.phoneCode,
        imgCode: this.imgCode,
        referrer: this.referrer
      }
      vregister(this.$axios, params).then(res => {
        if (!res) {
          this.editCaptcha()
        } else {
          var obj = {
            accessId: res.data.content.accessId,
            accessKey: res.data.content.accessKey
          }
          obj = JSON.stringify(obj)
          localStorage.setItem('user', obj)
          // 跳注册结果页面
          this.$router.push({
            name: 'user-registerResult',
            params: { phone: this.iphone }
          })
        }
      })
    },
    inviterFn() {
      this.inviter_phone = !this.inviter_phone
      this.rotate = !this.rotate
    },
    clauseFn() {
      this.clauses = !this.clauses
    }
  }
}
</script>

<style lang="stylus" scoped>
.register
  background: $color-white
  padding-top: 88px
.input-box
  color: $color-gray1
  line-height: 1
  display: flex
  height: 100px
  background: $color-white
  padding: 0 30px
  align-items: center
  justify-content:space-between
  overflow: hidden
  border-bottom: 1px solid $color-background; /*no*/
  // line-height 100px
  .none
    width: 10px
  &:last-child
      border-bottom: 0
    span
      white-space:nowrap
    input
      height: 60px
      font-size: $fontsize-medium
      flex: 1
      margin-left: 20px
    div
      width: 184px
      height: 60px
      overflow: hidden
      img
        width: 100%
        height: 100%
      .yzm-btn
        width: 100%
        height: 100%
        font-size: 26px
        border-radius: 6px
        background: $color-primary
        color: $color-white
      .yzm-btn[disabled]
        background: #ccc
    .iconfont
      font-size: 45px
      color: $color-gray3
.inviter
  p
    font-size: 28px
    color: $color-gray3
    padding: 40px 30px 20px
    span
      display: inline-block
      font-size: $fontsize-large-x
      color: $color-gray3
      margin-left: 10px
    .down
      transition: all 0.5s
    .up
      transform:rotate(-180deg)
      transition: all 0.5s
.clause
  font-size: $fontsize-small-sss
  color: $color-gray3
  padding: 30px 60px 0 40px
  overflow: hidden
  span
    display: inline-block
    text-align: justify
    width: 90%
    line-height: 40px
  i
    display: inline-block
    width: 6%
    height: 100%
    text-align: center
    font-size: 30px
    vertical-align: top
    color: $color-gray4
  .on
    color: $color-primary
  a
    color: $color-primary
.btn
  margin: 30px
  button
    width 100%
    border-radius: 34px
    height: 74px
    background: $color-primary
    color: $color-white
    font-size: $fontsize-large-x
  button[disabled]
    background: $color-gray6
</style>
