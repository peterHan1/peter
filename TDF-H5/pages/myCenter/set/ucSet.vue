<template>
  <div class="ucSet">
    <td-header 
      :returnUrl="false"
      title="设置" 
      url="myCenter-center"/>
    <ul>
      <li>
        <router-link
          v-if="realNameStatus"
          to="/myCenter/set/ucAutonym">
          <span>实名认证</span>
          <span>已认证 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
        <router-link
          v-else
          to="/xwDeposit/deposit">
          <span>实名认证</span>
          <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
      </li>
      <li>
        <div
          v-if="authStatus"
          @click="downApp">
          <span>我的银行卡号</span>
          <span>{{ bankName }} 尾号{{ bankCode }} <i class="iconfont">&#xe6f2;</i></span>
        </div>
        <router-link
          v-else
          to="/xwDeposit/deposit">
          <span>我的银行卡号</span>
          <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
      </li>
      <li>
        <div>
          <span>绑定手机号</span>
          <span>{{ mobile }}</span>
        </div>
      </li>
      <li>
        <div v-if="authStatus">
          <span>存管账号</span>
          <span>{{ userNo }}</span>
        </div>
        <router-link
          v-else
          to="/xwDeposit/deposit">
          <span>存管账号</span>
          <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
      </li>
      <li>
        <router-link
          v-if="authStatus"
          to="/myCenter/set/xwAccredit">
          <span>业务授权</span>
          <span v-if="authStatus === 1">已授权 <i class="iconfont">&#xe6f2;</i></span>
          <span v-if="authStatus === 2">已过期 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
        <router-link
          v-else
          to="/xwDeposit/deposit">
          <span>业务授权</span>
          <span>未激活存管账户 <i class="iconfont">&#xe6f2;</i></span>
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link to="/myCenter/member/member">
          <span>拓道会员</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/appraisal/indexs">
          <span>风险承受能力测评</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/myCenter/set/setPwd">
          <span>密码管理</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
      <li>
        <router-link to="/myCenter/set/about">
          <span>关于拓道</span>
          <i class="iconfont">&#xe6f2;</i>
        </router-link>
      </li>
    </ul>
    <div
      class="getOut"
      @click="getOut">安全退出</div>
    <Layer
      v-show="out"
      close="残忍退出"
      submit="留在这里"
      @on-close="outFn()"
      @on-sub="close()" >
      <div class="out_txt">你确定要离开拓道金服吗？</div>
    </Layer>
  </div>
</template>

<script>
import { loginOut } from '~/api/user.js'
import { commenParams } from '~/api/config.js'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      out: false,
      phone: this.$store.state.phone,
      mobile: '',
      realNameStatus: 0,
      bankName: '',
      bankCode: '',
      userNo: '',
      authStatus: 0
    }
  },
  async beforeCreate() {
    await this.$store.dispatch('myCenter/getUser')
    await this.$store.dispatch('myCenter/getDetailStatus')
    this.mobile = this.$store.state.myCenter.mobile
    this.realNameStatus = this.$store.state.myCenter.realNameStatus
    this.bankName = this.$store.state.myCenter.bankName
    this.bankCode = this.$store.state.myCenter.bankNum
    this.userNo = this.$store.state.myCenter.userNo
    this.authStatus = this.$store.state.myCenter.authStatus
  },
  mounted() {
    if (!this.$store.state.accessId && !this.$store.state.accessKey) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    downApp() {
      this.$App('请在电脑端登录官网或在APP端找更换银行卡')
    },
    outFn() {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      loginOut(this.$axios, this.phone, commenParams).then(res => {
        Cookie.set('accessId', '')
        Cookie.set('accessKey', '')
        Cookie.set('phone', '')
        this.$router.push({
          name: 'user-login'
        })
      })
    },
    getOut() {
      this.out = true
    },
    close() {
      this.out = false
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .ucSet
    padding-top: 88px
    ul
      padding: 0 30px
      background-color: $color-white
      margin-top: 20px
      li
        border-bottom: 1px solid $color-gray5
        div
          display: flex
          justify-content: space-between
        a
          width: 100%
          height: 100%
          display: flex
          justify-content: space-between
        span
          font-size: $fontsize-medium
          line-height: 100px
        span:nth-child(1)
          color: $color-gray1
        span:nth-child(2)
          color: $color-gray3
        i
          font-size: $fontsize-large-xxx
          color: $color-gray3
          display: block
          line-height: 100px
          float: right
      li:last-child
        border: none
    .getOut
      font-size: $fontsize-medium
      color: $color-primary
      line-height: 100px
      background-color: $color-white
      text-align: center
      margin-top: 20px
    .out_txt
      text-align: center
      font-size: $fontsize-medium
      color: $color-gray1
      padding: 48px 40px 21px
</style>
