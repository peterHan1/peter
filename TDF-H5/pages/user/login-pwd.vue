<template>
  <div>
    <td-header title="登录"/>
    <ul>
      <li>密码</li>
      <li>
        <input
          v-model.trim="pwd"
          type="password"
          @input="oninput">
        <p
          class="iconfont"
          @click="close">&#xe6e7;</p>
      </li>
    </ul>
    <button
      :disabled="disabled"
      :class="{'btno':!disabled}"
      @click="submit">确定</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      pwd: ''
    }
  },
  methods: {
    close() {},
    submit() {
      console.log('tj')
    },
    oninput(e) {
      console.log(this.pwd.length)
      // this.message = e.target.value.replace(/[^\d]/g, '')
      if (this.pwd.length > 6) {
        console.log(11)
        this.disabled = false
        // this.message = this.message.slice(0, 11)
      }
    }
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
      // ime-mode:Disabled
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
