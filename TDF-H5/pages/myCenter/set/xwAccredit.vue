<template>
  <div class="accredit">
    <td-header 
      :returnUrl="false"
      title="业务授权" 
      url="/myCenter/set/ucSet"/>
    <ul>
      <li>
        <span>业务授权</span>
        <span v-if="this.$store.state.myCenter.auths === 1">已授权</span>
        <span v-if="this.$store.state.myCenter.auths === 2">已过期 <b @click="appauth">重新授权</b></span>
      </li>
      <li>
        <span>授权金额 <i 
          class="iconfont" 
          @click="openLayer()">&#xe6f7;</i></span>
        <span>{{ this.$store.state.myCenter.authAmount }}元</span>
      </li>
      <li>
        <span>授权期限</span>
        <span v-if="this.$store.state.myCenter.auths === 1">{{ this.$store.state.myCenter.authTime }}到期</span>
        <span v-if="this.$store.state.myCenter.auths === 2">已于{{ this.$store.state.myCenter.authTime }}到期</span>
      </li>
    </ul>
    <Layer 
      v-show="layerShow" 
      submit="我知道了" 
      @on-sub="closeLayer()"><span class="accreditLayer">授权金额指授权单笔交易的金额</span></Layer>
  </div>
</template>

<script>
import { information, hanAppauth } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const res = await information(app.$axios)
      if (res.code === 100000) {
        store.commit('myCenter/setAuths', res.content)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
  data() {
    return {
      layerShow: false
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    appauth() {
      let url = this.$store.state.returnPath + 'myCenter/set/xwAccreditResult'
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      hanAppauth(this.$axios, url).then(res => {
        if (res) {
          let nonce = res.content.nonce
          this.$router.push({
            name: 'xwDeposit-transit',
            params: {
              sign: nonce
            }
          })
        }
      })
    },
    openLayer() {
      this.layerShow = true
    },
    closeLayer() {
      this.layerShow = false
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .accredit
    padding-top: 88px
    ul
      padding: 0 30px
      background-color: $color-white
      margin-top: 20px
      li
        border-bottom: 1px solid $color-gray5
        overflow: hidden
        span
          font-size: $fontsize-medium
          display: block
          line-height: 100px
          b
            color: #FF6866
          i
            display: inline-block
            padding: 0 10px
            font-size: $fontsize-medium
            color: $color-gray3
        span:nth-child(1)
          color: $color-gray1
          float: left
        span:nth-child(2)
          color: $color-gray3
          float: right
      li:last-child
        border: none
    .accreditLayer
      display: block
      font-size: $fontsize-medium
      color: $color-gray1
      line-height: 50px
      text-align: center
      padding: 50px 0 20px
</style>
