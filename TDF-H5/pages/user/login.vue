<template>
  <div>
    <td-header title="登录/注册"/>
    <ul>
      <li>账号</li>
      <li>
        <input
          v-model.trim="iphone"
          type="tel"
          placeholder="请输入手机号码"
          @input="oninput">
        <p
          v-if="iphone"
          class="iconfont"
          @click="close">&#xe6ff;</p>
      </li>
    </ul>
    <div
      v-if="isShow"
      class="enlarge"><i/>{{ iphone }}</div>
    <button
      :disabled="disabled"
      :class="{'btno':!disabled}"
      @click="submit">下一步</button>
  </div>
</template>
<script>
import { orRegister } from '../../plugins/api.js'
// import tt from '../../plugins/test.js'
import md5 from 'md5'
export default {
  data() {
    return {
      isShow: false,
      iphone: '',
      disabled: true
      // test: list
    }
  },
  methods: {
    close() {
      if (this.iphone) {
        this.isShow = false
        this.disabled = true
        this.iphone = ''
      }
    },
    submit() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.iphone)) {
        alert('手机号输入有误')
        return
      }
      orRegister(this.$axios, this.iphone).then(res => {
        if (res.content.type === 'register') {
          console.log(res)
          this.$router.replace('/user/registerAgreement')
        }
      })
    },
    oninput(e) {
      // this.isShow = true
      // if (this.iphone == '') this.isShow = false
      this.iphone = e.target.value.replace(/[^\d]/g, '')
      if (this.iphone.length >= 11) {
        this.isShow = false
        this.disabled = false
        this.iphone = this.iphone.slice(0, 11)
      }
    }
  },
  created() {
    // this.onload()
    // const pwd = md5('123123')
    // this.fetchSomething()
    // mo.getxia(this.$axios, 13500000486, pwd)
  }
}
</script>
<style lang="stylus" scoped>
// input
ul
  display: flex
  width: 100%
  height: 100px
  background: $color-white
  align-items: center
  color: $color-gray1
  margin-top: 30px
  li
    &:nth-child(1)
      margin: 0 20px 0 30px
    &:nth-child(2)
      flex:1
      position relative
    input
      font-size: 28px
      width:100%
      height: 100px
      line-height 1.2
      ime-mode:Disabled
      // background yellow
    p
      position: absolute
      top: 35px
      right: 30px
.enlarge
  background: #CDE7F5
  width: 690px
  height: 103px
  border-radius: 10px
  position: relative
  margin:30px auto 0 auto
  text-align: center
  line-height: 103px
  font-size: 44px
  color: #7697D5
  i
    content: ''
    width: 0
    height: 0
    border-width: 20px
    border-style: solid
    border-color: transparent transparent #CDE7F5 transparent
    position: absolute
    top: -38px
    left: 50%
    margin-left: -20px
button
  background #D8D8D8
  color: $color-white
  width: 690px
  height: 74px
  font-size: $fontsize-large-x
  border-radius: 34px
  margin: 52px 30px 0 30px
  &.btno
    background: $color-primary
</style>
