<template>
  <div class="ucSet">
    <td-header title="实名认证"/>
    <div class="txt">您已通过实名认证，如需帮助请联系客服</div>
    <ul>
      <li>
        <span>真实姓名</span>
        <span v-if="this.$store.state.myCenter.realName">{{ this.$store.state.myCenter.realName }}</span>
        <span v-else>-</span>
      </li>
      <li>
        <span>身份证号</span>
        <span v-if="this.$store.state.myCenter.idCard">{{ this.$store.state.myCenter.idCard }}</span>
        <span v-else>-</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { accountDetail } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      let res = await accountDetail(app.$axios, commenParams)
      if (res.code === 100000) {
        store.commit('myCenter/setAccount', res.content)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ucSet
    padding-top: 88px
    .txt
      height: 100px
      font-size: $fontsize-medium
      color: $color-gray3 
      padding-left: 70px
      line-height: 100px
      position: relative
    .txt:before
      content: ''
      display: block
      width: 32px
      height: 32px
      background: url(../../../assets/images/my-center/iBg.png) no-repeat
      background-size: 100% 100%
      position: absolute
      left: 30px
      top: 50%
      margin-top: -16px
    ul
      padding: 0 30px
      background-color: $color-white
      li
        border-bottom: 1px solid $color-gray5
        line-height: 100px
        display: flex
        justify-content: space-between
        span
          font-size: $fontsize-medium
          color: $color-gray1
        span:nth-child(2)
          color: $color-gray3 
      li:last-child
        border: none
</style>
