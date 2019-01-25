<template>
  <div class="login">
    <td-header title="登录/注册"/>
    <ul>
      <li>密码</li>
      <li>
        <input
          v-model="pwd"
          :type="type"
          @input="oninput">
        <p
          class="iconfont"
          @click="showPwd"><i v-if="showIcon">&#xe6e6;</i><i v-else>&#xe6e7;</i></p>
      </li>
    </ul>
    <div class="pwd_operate">
      <p @click="rememberFn()">
        <i 
          v-if="remember" 
          class="iconfont on">&#xe6dd;</i>
        <i 
          v-else 
          class="iconfont">&#xe6de;</i>
        记住我
      </p>
      <router-link 
        :to="{name:'user-forgetPwd',params:{phone:this.$route.params.phone}}"
        class="forgetPwd">忘记登录密码? {{ phone }}</router-link>
    </div>
    <button
      :disabled="disabled"
      :class="{'btno':!disabled}"
      @click="submit">确定</button>
    <div class="ps">拓道金服承诺不会泄露您的个人信息</div>
  </div>
</template>
<script>
import { login } from '~/plugins/api.js'
import md5 from 'md5'
export default {
  data() {
    return {
      disabled: true,
      pwd: '',
      type: 'password',
      showIcon: true,
      remember: 0,
      phone: ''
    }
  },
  methods: {
    showPwd(e) {
      this.type = this.type === 'password' ? 'text' : 'password'
      this.showIcon = !this.showIcon
    },
    submit() {
      const params = {
        phone: this.$route.params.phone,
        password: md5(this.pwd),
        remember: this.remember
      }
      login(this.$axios, params).then(res => {
        if (res) {
          var obj = {
            accessId: res.data.content.accessId,
            accessKey: res.data.content.accessKey
          }
          obj = JSON.stringify(obj)
          localStorage.setItem('user', obj)
          this.$store.commit('myCenter/setPhone', {
            phone: this.$route.params.phone
          })
          this.$router.push({
            name: 'tuodao-td'
          })
        }
      })
    },
    oninput(e) {
      if (this.pwd.length >= 6) {
        this.disabled = false
      }
    },
    rememberFn() {
      if (this.remember === 0) {
        this.remember = 1
      } else {
        this.remember = 0
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
// input
.login
  padding-top: 88px
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
    p
      position: absolute
      top: 35px
      right: 30px
.pwd_operate
  padding: 26px 30px 0
  overflow: hidden
  p
    display: inline-block
    font-size: $fontsize-small-ss
    color: $color-gray3
    float: left
    .iconfont
      font-size: $fontsize-small-s
    .on
      color: $color-assisted
  .forgetPwd
    font-size: $fontsize-small-ss
    color: $color-assisted
    float: right
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
.ps
  font-size: $fontsize-small-ss
  color: $color-gray3
  text-align: center
  margin-top: 30px
</style>
