<template>
  <div class="forgetPwd">
    <div v-if="resetBox">
      <td-header title="忘记密码"/>
      <ul>
        <li>
          <i class="iconfont">&#xe6ee;</i>
          {{ phone }}</li>
        <li>
          <i class="iconfont">&#xe6eb;</i>
          <input 
            v-model="imgCode" 
            type="text" 
            placeholder="请输入图形验证码" 
            class="codeInp" >
          <img
            :src="imgYzm"
            @click="editCaptcha">
        </li>
        <li>
          <i class="iconfont">&#xe6ea;</i>
          <input 
            v-model="phoneCode" 
            type="text" 
            placeholder="请输入验证码" 
            class="codeInp" >
          <span 
            v-if="countNum" 
            @click="getCodeFn">获取验证码</span>
          <span 
            v-else 
            class="count_style">{{ countTime }}秒</span>
        </li>
      </ul>
      <div class="sub_btn">
        <td-button
          :disabled="imgCode.length >= 4 && phoneCode.length >= 4 ? false : true"
          value="下一步"
          @btnFn="returnFn"
        />
      </div>
    </div>
    <div 
      v-else 
      class="forgetPwd resetPwd">
      <header>
        <i
          class="iconfont"
          @click="back">&#xe6fe;</i>
        <span>重置密码</span>
      </header>
      <ul>
        <li>
          <i class="iconfont">&#xe6ed;</i>
          <input 
            v-model="pwdOne" 
            type="password" 
            placeholder="请输入6～16位密码" 
            maxlength="16"
            class="codeInp" >
        </li>
        <li>
          <i class="iconfont">&#xe6ec;</i>
          <input 
            v-model="pwdTwo" 
            type="password" 
            placeholder="请确认新密码" 
            maxlength="16"
            class="codeInp" >
        </li>
      </ul>
      <div class="sub_btn">
        <td-button
          :disabled="pwdOne.length < 6 || pwdOne.length > 16 || pwdTwo.length < 6 || pwdTwo.length > 16"
          value="确定"
          @btnFn="resetFn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { newResetUserPsw, getPhoneCode } from '~/api/user.js'

import md5 from 'md5'

export default {
  data() {
    return {
      imgYzm: `/api/AuthImageForApp?phone=${this.phone}&${Math.random()}`,
      imgCode: '',
      phoneCode: '',
      countTime: 60,
      countNum: true,
      phone: this.$route.query.phone,
      phoneCodeId: '',
      resetBox: true,
      pwdOne: '',
      pwdTwo: ''
    }
  },
  mounted() {
    this.editCaptcha()
  },
  methods: {
    editCaptcha() {
      this.imgYzm = `/api/AuthImageForApp?phone=${this.phone}&${Math.random()}`
    },
    getCodeFn() {
      if (this.imgCode.length < 4) {
        this.$Msg('请输入正确的图形验证码', 2000)
      } else {
        this.$load.Load()
        getPhoneCode(this.$axios, {
          phone: this.$route.query.phone,
          type: 'reset',
          imgCode: this.imgCode
        }).then(res => {
          this.$load.Close()
          if (res.code === 100000) {
            this.phoneCodeId = res.content.code
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
          } else {
            this.$Msg(res.message, 2000)
          }
        })
      }
    },
    returnFn() {
      if (this.imgCode.length < 4) {
        this.$Msg('请输入正确的图形验证码', 2000)
      } else if (this.phoneCode.length < 4) {
        this.$Msg('请输入正确的手机验证码', 2000)
      } else if (this.phoneCodeId.length < 1) {
        this.$Msg('请获取手机验证码', 2000)
      } else {
        this.resetBox = false
      }
    },
    resetFn() {
      if (this.pwdOne.length >= 6 && this.pwdTwo.length >= 6) {
        if (this.pwdOne === this.pwdTwo) {
          const params = {
            phone: this.$route.query.phone,
            newPassword: md5(this.pwdTwo),
            codeId: this.phoneCodeId.toString(),
            codeNumber: this.phoneCode,
            imgCode: this.imgCode
          }
          newResetUserPsw(this.$axios, params).then(res => {
            if (res.code === 100000) {
              this.$router.push({
                name: 'user-loginPwd',
                query: {
                  phone: this.phone
                }
              })
            } else {
              this.$Msg(res.message, 2000)
              this.editCaptcha()
            }
          })
        } else {
          this.$Msg('两次密码输入不一致', 2000)
        }
      } else {
        this.$Msg('请输入6-16位密码', 2000)
      }
    },
    back() {
      this.pwdOne = ''
      this.pwdTwo = ''
      this.resetBox = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.forgetPwd
  position: absolute
  height: 100%
  width: 100%
  padding-top: 88px
  background-color: #fff
  ul
    padding: 0 30px 0 100px
    border-top: 30px solid #F2F3F7
    li
      border-bottom: 1px solid #e8e8e8
      font-size: 28px
      height: 100px
      line-height: 100px
      position: relative
      .iconfont
        position: absolute
        left: -60px
        font-size: $fontsize-large-xxxx
        color: $color-gray3
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
  .sub_btn
    padding: 45px 30px 0
  header
    height 88px
    line-height: 88px
    width: 100%
    background: $color-white
    position: fixed
    left: 0
    top: 0
    right: 0
    text-align: center
    font-size: $fontsize-large-xxx
    color: $color-gray1
    border-bottom: 1px solid $color-gray5
    z-index: 99
    i
      position: absolute
      top: 0
      left: 0
      font-size: 60px
      margin-left: 15px
.resetPwd
  padding: 0      
</style>
