<template>
  <div class="newcomer">
    <td-header
      :returnUrl="false"
      url="/"
      title="新手专区"/>
    <div class="header" />
    <div class="title">新手抵用券</div>
    <div class="dyq" />
    <div class="btns">
      <a
        class="btn"
        @click="getCoupon">
        点击领取
      </a>
    </div>
    <div class="titles1">
      <img src="../../../assets/images/activity/newcomer/newcomer3.png">
    </div>
    <div class="title">新手专享加息</div>
    <div class="jx" />
    <div class="btns">
      <!-- 跳转到省心投列表页 -->
      <router-link
        to="/project"
        class="btn">
        查看详情
      </router-link>
    </div>
    <div class="titles2">
      <img src="../../../assets/images/activity/newcomer/newcomer4.png">
    </div>
    <div class="title">为什么选择我们</div>
    <ul>
      <li
        class="margin"
        style="margin-bottom: 1.02rem;">
        <img
          src="../../../assets/images/activity/newcomer/newcomer5.png"
          style="width: 1.42rem;height: 1.4rem;">
        <p>互联网金融百强公司</p>
      </li>
      <li class="margin">
        <img
          src="../../../assets/images/activity/newcomer/newcomer6.png"
          style="width: 1.55rem;height: 1.43rem;">
        <p>银行资金存管</p>
      </li>
      <li>
        <img
          src="../../../assets/images/activity/newcomer/newcomer7.png"
          style="width: 1.44rem;height: 1.4rem;">
        <p>8000万A轮融资</p>
      </li>
      <li>
        <img
          src="../../../assets/images/activity/newcomer/newcomer8.png"
          style="width: 1.55rem;height: 1.35rem;">
        <p>盈科、天册律师事务所<br>共同鉴证</p>
      </li>
    </ul>
    <div class="footer" />
    <!-- 跳转到新用户出借需知，公告详情页 -->
    <a
      href="https://www.51tuodao.com/html5/app/nt_detail?id=15244&amp;typeId=gonggao"
      class="footers"/>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  mounted() {
    this.isLogin
  },
  methods: {
    toLogin() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    },
    getCoupon() {
      if (this.isLogin) {
        this.$router.push({
          name: 'myCenter-discount-myDiscount'
        })
      } else {
        this.toLogin()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .newcomer
    padding: 88px 0 124px
    overflow: hidden
    height: 2430px
    position: relative
    background: url(../../../assets/images/activity/newcomer/newcomer1.png)0 88px no-repeat
    background-size: 100%
    .header
      width: 100%
      height: 425px
    .title
      text-align: center
      color: #000
      font-size: $fontsize-large-xxx
      font-weight: bold
      margin:15px 0 0
    .dyq
      width: 685px
      height: 327px
      margin: auto
      font-size: $fontsize-small-ss
      color: $color-white
      overflow:hidden
      padding-left: 38px
      line-height: 35px
      background: url(../../../assets/images/activity/newcomer/newcomer2.png)center no-repeat
      background-size: 100%
      .top
        font-size: 38px
        color: #fffb65
        margin: 44px 0 17px
        line-height: normal
        font-weight: 900
    .btns
      position: relative
      height: 42.5px
      margin-bottom: 100px
    .btn
      display: block
      width: 265px
      height: 85px
      position: absolute
      left: 50%
      margin-left: -132.5px
      top: -42.5px
      color: $color-white
      text-align: center
      line-height: 85px
      font-size: $fontsize-large-xx
      border-radius: 50px
      background: -webkit-linear-gradient(#F0B20F, #EA4D25)
      background: -o-linear-gradient(#F0B20F, #EA4D25)
      background: -moz-linear-gradient(#F0B20F, #EA4D25)
      background: linear-gradient(#F0B20F, #EA4D25)
      box-shadow: 0 5px 20px rgba(234,80,36,.8)
    .jx
      width: 584px
      height: 350px
      overflow: hidden
      position: relative
      margin: auto
      background: url(../../../assets/images/activity/newcomer/newcomer11.png)center no-repeat
      background-size: 100%
    .titles1
      width: 566px
      height: 19px
      margin: auto
      img
        vertical-align: top
        height: 100%
    .titles2
      width: 526px
      height: 20px
      margin: auto
      img
        vertical-align: top
        height: 100%
    ul
      width: 90%
      padding: 0 5%
      margin: 60px auto 37px
      overflow: hidden
      font-size: $fontsize-small-ss
      color: $color-gray3
      li
        float: left
        width: 50%
        text-align: center
        &.margin
          margin-bottom: 105px
    .footers
      display: block
      width: 100%
      height: 124px
      position: fixed
      bottom: 0
      z-index: 100
      background: url(../../../assets/images/activity/newcomer/newcomer9.png)center no-repeat
      background-size: 100%
</style>
