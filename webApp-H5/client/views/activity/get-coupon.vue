<template>
  <div class="getQ">
    <div class="header">
      <div class="jxq" @click="jxqGet">点击领取3%加息券 >></div>
    </div>
    <div class="body">
      <ul class="jxqRule">
        <li>1. 每个用户每天限领 1 张3%加息券</li>
        <li>2. 3%加息券当天有效，当天24点过期</li>
      </ul>
      <div class="main">
        <div class="title">
          <img src="./../../assets/images/activity/get-coupon/get-coupon6.png" alt="">输入出借金额<img src="./../../assets/images/activity/get-coupon/get-coupon7.png" alt="">
        </div>
        <input type="text" class="money" v-model="moeny" @input="onInput" @focus="iptFocus" @blur="iptBlur" :style="{ fontWeight: activeFont}">
        <p class="tips">* 可输入金额范围：1000 - 500000</p>
        <div class="title">
          <img src="./../../assets/images/activity/get-coupon/get-coupon6.png" alt="">领取专属抵用券<img src="./../../assets/images/activity/get-coupon/get-coupon7.png" alt="">
        </div>
        <div class="bottom">
          <div class="dyqOne">
            <p class="num"><span class="numOne" :class="{active1: active1}">{{ numOne }}</span> 元</p>
            <div class="explain">
              <p class="padding">期限：1个月及以上</p>
              <p class="center">额度：满<span class="limit1" :class="{active2: active2}">{{ num }}</span>元可用</p>
            </div>
            <div class="btn btn1" @click="dyqGet1">立即领取</div>
          </div>
          <div class="dyqTwo">
            <p class="num"><span class="numTwo" :class="{active1: active1}">{{ numTwo }}</span> 元</p>
            <div class="explain">
              <p class="padding">期限：3个月及以上</p>
              <p class="center" id="center">额度：满<span class="limit2" :class="{active2: active2}">{{ num }}</span>元可用</p>
            </div>
            <div class="btn btn2" @click="dyqGet2">立即领取</div>
          </div>
        </div>
      </div>
      <ul class="dyqRule">
        <li>1. 每个用户每天限领2张抵用券</li>
        <li>2. 抵用券面额可通过输入出借金额，来
          <p>计算约3%等额加息金额。例：在1月及以上，数字输入13000，可得32元（不足1元部分舍去，最小单位“元”）</p></li>
        <li>3.抵用券当天有效，当天24点过期</li>
      </ul>
    </div>
    <!-- 加息券弹窗 -->
    <Layer v-show="jxqLayer">
      <div class="jxqAlert">
        <img @click="jxqLayer = !jxqLayer" class="close" src="../../assets/images/activity/get-coupon/close.png" alt="">
        <p class="jxqTitle">您确定要领取这个优惠券吗？</p>
        <p class="content">3%&nbsp;加息券</p>
        <p class="rule">加息券当天有效，24点过期</p>
        <a class="jxqBtn" @click="jxqConfirm">确定领取</a>
        <p class="titles">确认后预计5分钟内发放到您的账户<br />若超时未到账请再次尝试或联系客服</p>
    </div>
    </Layer>
    <!-- 抵用券弹窗 -->
    <Layer v-show="dyqLayer">
      <div class="dyqAlert">
          <img @click="dyqLayer = !dyqLayer" class="close" src="../../assets/images/activity/get-coupon/close.png" alt="">
          <p class="dyqTitle">您确定要领取这个优惠券吗？</p>
          <p class="content">{{hongBao}}</p>
          <p class="rule">{{dyqRule}}</p>
          <a class="dyqBtn dyqBtn1" @click="dyqConfirm1" v-if="btnShow">确定领取</a>
          <a class="dyqBtn dyqBtn2" @click="dyqConfirm2" v-else>确定领取</a>
          <p class="titles">确认后预计5分钟内发放到您的账户<br />若超时未到账请再次尝试或联系客服</p>
      </div>
    </Layer>
    <!-- 领取成功弹窗 -->
    <Layer v-show="successLayer">
      <div class="success">
          <img @click="successLayer = !successLayer" class="close" src="../../assets/images/activity/get-coupon/close.png" alt="">
          <p class="successTitle">恭喜您！<br />已经成功领取优惠券</p>
          <a class="next" @click="successLayer = !successLayer">继续领取</a>
          <router-link to="" class="use" v-if="isApp">使用优惠券</router-link>
          <router-link v-else to="https://www.51tuodao.com/front/app/downLoadForPhone2" class="download">下载APP</router-link>
      </div>
    </Layer>
    <!-- 登录提醒弹窗 -->
    <Layer v-show="loginLayer">
      <div class="loginNo">
          <img @click="loginLayer = !loginLayer" class="close" src="../../assets/images/activity/get-coupon/close.png" alt="">
          <p class="loginNoTitle">您还未登录<br />赶快登录领取优惠券吧</p>
          <router-link to="/login" class="login">登录</router-link>
      </div>
    </Layer>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '券拿多少我说了算'
  },
  data () {
    return {
      moeny: '请输入出借金额',
      num: '',
      numOne: '',
      numTwo: '',
      activeFont: 'normal',
      active1: true,
      active2: true,
      jxqLayer: false,
      dyqLayer: false,
      successLayer: false,
      loginLayer: false,
      btnShow: true,
      isApp: true,
      hongBao: '',
      dyqRule: ''
    }
  },
  methods: {
    onInput () {
      this.moeny = this.moeny.replace(/\D/g, '')
      if (this.moeny.length === 1 && this.moeny === 0) {
        this.moeny = 0
      }
      if (this.moeny > 500000) {
        this.moeny = 500000
        this.active1 = false
        this.active2 = false
        this.num = this.moeny
        this.numOne = Math.floor(this.moeny * 0.03 / 12)
        this.numTwo = Math.floor(this.moeny * 0.03 / 4)
        this.$Msg('已超出可输入范围', 2000)
      } else if (this.moeny >= 1000) {
        this.active1 = false
        this.active2 = false
        this.num = this.moeny
        this.numOne = Math.floor(this.moeny * 0.03 / 12)
        this.numTwo = Math.floor(this.moeny * 0.03 / 4)
      } else {
        this.num = ''
        this.numOne = ''
        this.numTwo = ''
        this.active1 = true
        this.active2 = true
      }
    },
    iptFocus () {
      if (this.moeny === '请输入出借金额') {
        this.moeny = ''
        this.activeFont = 'bold'
      }
    },
    iptBlur () {
      if (this.moeny === '') {
        this.moeny = '请输入出借金额'
        this.activeFont = 'normal'
      }
      if (this.moeny < 1000) {
        this.$Msg('出借金额不能小于1000元', 2000)
      }
    },
    jxqGet () {
      // 首先要先判断用户是否登陆
      // 未登录则弹出提示登录
      // this.loginLayer = !this.loginLayer
      // 已登录则：系统判断：该用户账户内是否已有优惠券（加息券当天最多1张）
      // 若已领取超限 ，则弹出 “您今日领取次数已用完”
      // 请输入出借金额
      // this.$Msg('您今日领取次数已用完', 2000)
      // 若仍可领取，则跳出弹框
      this.jxqLayer = !this.jxqLayer
    },
    dyqGet1 () {
      // 首先要先判断用户是否登陆
      // 未登录则弹出提示登录
      // this.loginLayer = !this.loginLayer
      // 已登录则：系统判断：该用户账户内是否已有优惠券（加息券当天最多1张）
      // 若已领取超限 ，则弹出 “您今日领取次数已用完”
      // this.$Msg('您今日领取次数已用完', 2000)
      // 若仍可领取,则弹窗领取抵用券
      if (Number(this.moeny) >= 1000 && Number(this.moeny) <= 500000) {
        this.hongBao = this.numOne + ' 元'
        this.dyqRule = '1个月及以上 满' + this.num + '元可用'
        this.btnShow = true
        this.dyqLayer = !this.dyqLayer
      } else {
        return false
      }
    },
    dyqGet2 () {
      // 首先要先判断用户是否登陆
      // 未登录则弹出提示登录
      // this.loginLayer = !this.loginLayer
      // 已登录则：系统判断：该用户账户内是否已有优惠券（加息券当天最多1张）
      // 若已领取超限 ，则弹出 “您今日领取次数已用完”
      // this.$Msg('您今日领取次数已用完', 2000)
      // 若仍可领取,则弹窗领取抵用券
      if (Number(this.moeny) >= 1000 && Number(this.moeny) <= 500000) {
        this.hongBao = this.numTwo + ' 元'
        this.dyqRule = '3个月及以上 满' + this.num + '元可用'
        this.btnShow = false
        this.dyqLayer = !this.dyqLayer
      } else {
        return false
      }
    },
    dyqConfirm1 () {
      this.dyqLayer = !this.dyqLayer
      // 领取成功
      this.successLayer = !this.successLayer
    },
    dyqConfirm2 () {
      this.dyqLayer = !this.dyqLayer
      // 领取成功
      this.successLayer = !this.successLayer
    },
    jxqConfirm () {
      this.jxqLayer = !this.jxqLayer
    }
  }
}
</script>
<style lang="stylus" scoped>
  *
    -webkit-overflow-scrolling: touch
    box-sizing:border-box
  .getQ
    font-family:"PingFang SC"
    .body
      margin-top: -1px
      padding-bottom: 0.37rem
      background: -webkit-linear-gradient(#E23D36, #b4292a)
      background: -o-linear-gradient(#E23D36, #b4292a)
      background: -moz-linear-gradient(#E23D36, #b4292a)
      background: linear-gradient(#E23D36, #b4292a)
    .header
      height: 6.36rem
      width: 100%
      overflow: hidden
      background: url(../../assets/images/activity/get-coupon/get-coupon1-1.png)
      background-size: 100%
      background-position: center
      background-repeat: no-repeat
      .jxq
        -webkit-appearance: none
        -webkit-tap-highlight-color: transparent
        width: 5.7rem
        height: 1.1rem
        font-weight: bold
        line-height: 1.1rem
        font-size: 0.4rem
        margin: 4.84rem auto 0
        color: #802f14
        text-align: center
    .jxqRule
      width: 6.88rem
      margin: 0 auto 0.7rem
      font-size: 0.3rem
      color: #ffffff
      padding: 1.24rem 0 0.5rem 0.9rem
      background: url(../../assets/images/activity/get-coupon/get-coupon2.png)
      background-size: 100%
      background-position: center
      background-repeat: no-repeat
      li
        height: 0.4rem
        line-height: 0.4rem
        opacity: 0.6
        -moz-opacity:0.6
        -khtml-opacity: 0.6
    .numOne,.numTwo
      font-weight: bold
      display: inline-block
    .active1
      border-bottom: 2px solid #b7802c
      padding: 0 0.4rem
    .main
      height: 8.98rem
      width: 100%
      padding-top: 0.85rem
      background: url(../../assets/images/activity/get-coupon/get-coupon3.png)
      background-size: 100%
      background-position: center
      background-repeat: no-repeat
      .title
        text-align: center
        font-size: 0.4rem
        margin-bottom: 0.1rem
        font-weight: bold
        color: #6B451B
        line-height: 0.4rem
        img
          margin: 0.35rem 0.28rem 0.43rem
          width: 0.25rem
          height: 0.16rem
          vertical-align: middle
      input
        display:block
        width: 5.7rem
        height: 0.9rem
        text-align: center
        font-size: 0.32rem
        background: #F6F0E7
        color: #6B451B
        border-radius: 0.45rem
        border:1px solid #BE9D65
        margin: auto
        outline: none
        &::-webkit-input-placeholder
          color: #b77033
        &::-moz-placeholder
          color: #b77033
        &:-moz-placeholder
          color: #b77033
        &:-ms-input-placeholder
          color: #b77033
      .tips
        font-size: 0.28rem
        text-align: center
        margin-top: 0.34rem
        color: #6B451B
        margin-bottom: 0.45rem
      .bottom
        overflow: hidden
        .dyqOne,.dyqTwo
          width: 2.95rem
          height: 3.42rem
          float: left
          text-align: center
          background: url(../../assets/images/activity/get-coupon/get-coupon4.png)
          background-size: 100%
          background-position: center
          background-repeat: no-repeat
        .dyqOne
          margin: 0 0.39rem 0 0.6rem
          font-size: 0
          position: relative
        .dyqTwo
          position: relative
        .num
          font-size: 0.5rem
          text-align: center
          color: #B7802C
          margin-top: 0.4rem
        .explain
          display:inline-block
          color: #6B451B
          font-size: 0.26rem
          text-align: left
          margin-top: 0.5rem
          .center
            span
              display: inline-block
              &.active2
                border-bottom: 2px solid #b7802c
                padding: 0 0.3rem
        .btn
          width: 2.35rem
          height: 0.6rem
          -webkit-tap-highlight-color: transparent
          font-size: 0.28rem
          box-shadow: 0 0.05rem 0.08rem #b77033
          line-height: 0.6rem
          color: #ffffff
          border-radius: 0.3rem
          text-align: center
          background: -webkit-linear-gradient(left, #E84543 , #CB2E2C)
          background: -o-linear-gradient(right, #E84543, #CB2E2C)
          background: -moz-linear-gradient(right, #E84543, #CB2E2C)
          background: linear-gradient(to right, #E84543 , #CB2E2C)
        .btn1,.btn2
          position: absolute
          bottom: 0.3rem
          left: 50%
          -webkit-transform: translateX(-50%)
          -moz-transform: translateX(-50%)
          -ms-transform: translateX(-50%)
          -o-transform: translateX(-50%)
          transform: translateX(-50%)
    .dyqRule
      width: 6.92rem
      height: 4.59rem
      margin: 0.38rem auto 0
      padding:1.2rem 0.75rem 0
      font-size: 0.3rem
      color: #ffffff
      background: url(../../assets/images/activity/get-coupon/get-coupon5.png)
      background-size: 100%
      background-position: center
      background-repeat: no-repeat
      li
        line-height: 0.5rem
        opacity: 0.6
        -moz-opacity:0.6
        -khtml-opacity: 0.6
        p
          padding-left: 0.35rem
  .jxqAlert
    width: 5.88rem
    height: 6.85rem
    text-align: center
    background: url(../../assets/images/activity/get-coupon/alert1.png)
    background-size: 100%
    background-position: center
    background-repeat: no-repeat
    .jxqTitle
      color: #6B451B
      font-size: 0.4rem
      padding: 0.6rem 0 1rem 0
    .content
      font-weight: bold
      font-size: 0.64rem
      color: #B7802C
      font-family: "Arial"
    .rule
      font-weight: bold
      font-size: 0.3rem
      color: #B7802C
      margin:0.2rem 0 0.8rem 0
    .jxqBtn
      display:block
      -webkit-tap-highlight-color: transparent
      text-decoration: none
      width: 3rem
      height: 0.8rem
      font-size: 0.3rem
      box-shadow: 0 0.05rem 0.08rem #b77033
      line-height: 0.8rem
      color: #ffffff
      border-radius: 0.4rem
      text-align: center
      margin: 0.1rem auto 0
      background: -webkit-linear-gradient(left, #E84543 , #CB2E2C)
      background: -o-linear-gradient(right, #E84543, #CB2E2C)
      background: -moz-linear-gradient(right, #E84543, #CB2E2C)
      background: linear-gradient(to right, #E84543 , #CB2E2C)
    .titles
      font-size: 0.28rem
      color: #6B451B
      line-height: 0.4rem
      margin-top: 0.3rem
  .dyqAlert
    width: 5.88rem
    height: 6.85rem
    text-align: center
    background: url(../../assets/images/activity/get-coupon/alert1.png)
    background-size: 100%
    background-position: center
    background-repeat: no-repeat
    .dyqTitle
      color: #6B451B
      font-size: 0.4rem
      padding: 0.6rem 0 1rem 0
    .content
      font-weight: bold
      font-size: 0.64rem
      color: #B7802C
      font-family: "Arial"
    .rule
      font-weight: bold
      font-size: 0.3rem
      color: #B7802C
      margin:0.2rem 0 0.8rem 0
    .dyqBtn
      display:block
      -webkit-tap-highlight-color: transparent
      text-decoration: none
      width: 3rem
      height: 0.8rem
      font-size: 0.3rem
      box-shadow: 0 0.05rem 0.08rem #b77033
      line-height: 0.8rem
      color: #ffffff
      border-radius: 0.4rem
      text-align: center
      margin: 0.1rem auto 0
      background: -webkit-linear-gradient(left, #E84543 , #CB2E2C)
      background: -o-linear-gradient(right, #E84543, #CB2E2C)
      background: -moz-linear-gradient(right, #E84543, #CB2E2C)
      background: linear-gradient(to right, #E84543 , #CB2E2C)
    .titles
      font-size: 0.28rem
      color: #6B451B
      line-height: 0.4rem
      margin-top: 0.3rem
  .success
    width: 5.88rem
    height: 4.71rem
    text-align: center
    background: url(../../assets/images/activity/get-coupon/alert3.png)
    background-size: 100%
    background-position: center
    background-repeat: no-repeat
    .successTitle
      font-size: 0.46rem
      line-height: 0.6rem
      color: #B7802C
      padding: 1.1rem 0 1rem
    a
      display: inline-block
      text-decoration: none
      width: 2.05rem
      height: 0.8rem
      font-size: 0.3rem
      box-shadow: 0 0.05rem 0.08rem #b77033
      line-height: 0.8rem
      color: #ffffff
      border-radius: 0.4rem
      text-align: center
      background: -webkit-linear-gradient(left, #E84543 , #CB2E2C)
      background: -o-linear-gradient(right, #E84543, #CB2E2C)
      background: -moz-linear-gradient(right, #E84543, #CB2E2C)
      background: linear-gradient(to right, #E84543 , #CB2E2C)
    .use,.download
      -webkit-tap-highlight-color: transparent
      color: #6B451B
      box-shadow: 0 0.05rem 0.08rem #CF8D4A
      background: -webkit-linear-gradient(left, #F8DAB5 , #E4A869)
      background: -o-linear-gradient(right, #F8DAB5, #E4A869)
      background: -moz-linear-gradient(right, #F8DAB5, #E4A869)
      background: linear-gradient(to right, #F8DAB5 , #E4A869)
    .next
      -webkit-tap-highlight-color: transparent
      margin-right: 0.4rem
  .loginNo
    width: 5.89rem
    height: 4.72rem
    text-align: center
    background: url(../../assets/images/activity/get-coupon/alert2.png)
    background-size: 100%
    background-position: center
    background-repeat: no-repeat
    .loginNoTitle
      font-size: 0.40rem
      line-height: 0.6rem
      color: #B7802C
      padding: 1.1rem 0 0.5rem
    .login
      display:block
      -webkit-tap-highlight-color: transparent
      text-decoration: none
      width: 3rem
      height: 0.8rem
      font-size: 0.3rem
      box-shadow: 0 0.05rem 0.08rem #b77033
      line-height: 0.8rem
      color: #ffffff
      border-radius: 0.4rem
      text-align: center
      margin: 0.1rem auto 0
      background: -webkit-linear-gradient(left, #E84543 , #CB2E2C)
      background: -o-linear-gradient(right, #E84543, #CB2E2C)
      background: -moz-linear-gradient(right, #E84543, #CB2E2C)
      background: linear-gradient(to right, #E84543 , #CB2E2C)
  .close
    position: absolute
    right: 0.2rem
    top: 0.2rem
    overflow: hidden
    width: 0.32rem
    height: 0.32rem
  .popup
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: rgb(0, 0, 0)
    opacity: 0.5
    z-index: 9999
</style>