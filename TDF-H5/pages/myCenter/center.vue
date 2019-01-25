<template>
  <div class="myCenter">
    <div class="my_nav">
      <div><span/><span :class="'vip' + content.level"/></div>
    </div>
    <div class="my_box">
      <div class="myCenter_top">
        <div v-if="login">
          <router-link 
            to="/user/login" 
            class="login">登录/注册</router-link>
        </div>
        <div v-else>
          <div class="user_earnings">
            <div class="earnings">
              <p>待收本息(元)</p>
              <p v-if="moneyShow">{{ content.accountWait }}</p>
              <p v-else>******</p>
            </div>
            <div class="showIcon">
              <i 
                v-if="moneyShow" 
                class="iconfont" 
                @click="moneyHide()">&#xe6e7;</i>
              <i 
                v-else 
                class="iconfont" 
                @click="moneyHide()">&#xe6e6;</i>
            </div>
          </div>
          <div class="user_asset">
            <div @click="downappFn">
              <p>总资产(元) <i class="iconfont">&#xe6ba;</i> </p>
              <p v-if="moneyShow">{{ content.total }}</p>
              <p v-else>****</p>
            </div>
            <div @click="downappFn">
              <p>累计收益(元) <i class="iconfont">&#xe6ba;</i> </p>
              <p v-if="moneyShow">{{ content.tenderInterestYes }}</p>
              <p v-else>****</p>
            </div>
          </div>
        </div>
      </div>
      <div class="myCenter_money">
        <div class="money_bot">
          <div v-if="login">
            <p>可用余额(元)</p>
            <p> - </p>
          </div>
          <div v-else>
            <p>可用余额(元)</p>
            <p v-if="moneyShow">{{ content.cashBalance }}</p>
            <p v-else>****</p>
          </div>
          <div>
            <router-link to="/myCenter/fund/cash" >提现</router-link>
            <router-link to="/myCenter/fund/recharge" >充值 </router-link>
          </div>
        </div>
      </div>
      <div class="myCenter_fund">
        <ul>
          <li>
            <router-link to="/myCenter/invest/myInvest" >
              <div class="loanBg"/>
              <p>出借记录</p>
            </router-link>
          </li>
          <li>
            <router-link to="/myCenter/bond/myBond" >
              <div class="bondBg"/>
              <p>债权转让</p>
            </router-link>
          </li>
          <li @click="downApp">
            <div class="returnBg"/>
            <p>回款日历</p>
          </li>
          <li>
            <router-link to="/myCenter/record/moneyRecord" >
              <div class="fundBg"/>
              <p>资金流水</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="myCenter_list">
        <ul>
          <li class="coupon_bg">
            <router-link to="/myCenter/discount/myDiscount" >
              <span class="coupon">优惠券</span>
              <i class="iconfont">&#xe6f2;</i>
            </router-link>
          </li>
          <li class="invite_bg">
            <router-link to="/myCenter/invite/inviteRecord" >
              <span>邀请记录</span>
              <i class="iconfont">&#xe6f2;</i>
            </router-link>
          </li>
          <li class="set_bg">
            <router-link to="/myCenter/set/ucSet" >
              <span>账户设置</span>
              <i class="iconfont">&#xe6f2;</i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="td_deposit"><span>您的资金由银行资金存管系统进行存管</span></div>
    </div>
    <td-footer :navClass="'myCenter'"/>
  </div>
</template>

<script>
import { myBankAssets } from '../../plugins/api.js'

export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      moneyShow: true,
      login: false,
      id: '',
      content: ''
    }
  },
  mounted() {
    myBankAssets(this.$axios).then(res => {
      if (res) {
        this.content = res.data.content
      } else {
        this.login = true
      }
    })
  },
  methods: {
    moneyHide() {
      this.moneyShow = !this.moneyShow
    },
    downApp() {
      this.$App('请在电脑端登录官网或在APP端查看')
    },
    downappFn() {
      this.$App('请在APP端查看')
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .myCenter
    .my_nav
      position: fixed
      left: 0
      top: 0
      right: 0
      height: 88px
      background: url(../../assets/images/my-center/my_nav.png) no-repeat
      background-size: 100% 100%
      z-index: 99
      padding: 0 30px
      div:nth-child(1)
        height: 100%
        width: 50%
        line-height: 0
        float: left
        position: relative
        span:nth-child(1)
          display: inline-block
          width: 64px
          height: 64px
          background: url(../../assets/images/my-center/user_header.png) no-repeat
          background-size: 100% 100%
          position: absolute
          left: 0
          top: 50%
          margin-top: -32px
        span:nth-child(2)
          display: inline-block
          width: 140px
          height: 40px
          position: absolute
          left: 71px
          top: 50%
          margin-top: -20px
        .vip0
          background: url(../../assets/images/my-center/vip0.png) no-repeat
          background-size: 100% 100%
        .vip1
          background: url(../../assets/images/my-center/vip1.png) no-repeat
          background-size: 100% 100%
        .vip2
          background: url(../../assets/images/my-center/vip2.png) no-repeat
          background-size: 100% 100%
        .vip3
          background: url(../../assets/images/my-center/vip3.png) no-repeat
          background-size: 100% 100%
        .vip4
          background: url(../../assets/images/my-center/vip4.png) no-repeat
          background-size: 100% 100%
        .vip5
          background: url(../../assets/images/my-center/vip5.png) no-repeat
          background-size: 100% 100%
        .vip6
          background: url(../../assets/images/my-center/vip6.png) no-repeat
          background-size: 100% 100%
    .my_box
      background-color: $color-background
      padding: 88px 0 130px
      .myCenter_top
        padding-top: 100px
        width:100%
        height: 332px
        background: url(../../assets/images/my-center/my_moneyBg.png) no-repeat
        background-size: 100% 100%
        padding: 32px 30px 0
        .login
          display: block
          width: 284px
          height: 94px
          line-height: 94px
          border: 2px solid $color-white
          border-radius: 20px
          color: $color-white
          font-size: $fontsize-large-xxx
          text-align: center
          margin: 50px auto
        .user_earnings
          overflow: hidden
          font-size: 0
          .earnings
            float: left
            p:nth-child(1)
              font-size: $fontsize-small-ss
              color: $color-white
              opacity: 0.8
              line-height: 33px
              letter-spacing: 1px
            p:nth-child(2)
              font-size: $fontsize-large-xxxxxxxx
              color: $color-white
              line-height: 78px
              height: 78px
          .showIcon
            float: right
          i
              font-size: $fontsize-large-xxxxxx
              color: $color-white
        .user_asset
          display: flex
          margin-top: 36px
          div
            flex: 1
            p:nth-child(1)
              font-size: $fontsize-small-ss
              color: $color-white
              line-height: 33px
              opacity: 0.8
              letter-spacing: 1px
              i
                font-size: $fontsize-small-ss
                color: $color-white
                margin-left: 10px
            p:nth-child(2)
              font-size: $fontsize-large-xxxxxx
              color: $color-white
              line-height: 48px
              margin-top: 20px
      .myCenter_money
        padding: 0 30px
        background-color: $color-white
        p:nth-child(1)
          font-size: $fontsize-small-ss
          color: $color-gray3
          line-height: 33px
        p:nth-child(2)
          font-size: $fontsize-large-xxx
          color: $color-gray2
          line-height: 48px
          height: 48px
          margin-top: 5px
        .money_bot
          display: flex
          padding: 28px 0
          div
            flex: 1
            overflow: hidden
          a
            display: inline-block
            width: 160px
            line-height: 68px
            font-size: $fontsize-medium
            color: $color-primary
            background-color: $color-gray10
            border-radius: 40px
            text-align: center
            float: left
            margin-top: 10px
          a:nth-child(1)
            margin-right: 20px
      .myCenter_fund
        width: 100%
        background-color: $color-white
        margin-top: 20px
        padding: 27px 30px 36px
        ul
          display: flex
          li
            flex: 1
            text-align: center
            a
              display: block
            p
              font-size: $fontsize-small-ss
              color: $color-gray1
              line-height: 33px
            div
              width: 64px
              height: 64px
              margin: 0 auto
            .loanBg
              background: url(../../assets/images/my-center/loanBg.png) no-repeat
              background-size: 100% 100%
            .bondBg
              background: url(../../assets/images/my-center/bondBg.png) no-repeat
              background-size: 100% 100%
            .returnBg
              background: url(../../assets/images/my-center/returnBg.png) no-repeat
              background-size: 100% 100%
            .fundBg
              background: url(../../assets/images/my-center/fundBg.png) no-repeat
              background-size: 100% 100%
      .myCenter_list
        background-color: $color-white
        margin-bottom: 50px
        margin-top: 20px
        ul
          li
            padding-left: 100px
            height: 100px
            line-height: 100px
            a
              display: block
              border-bottom: 1px solid $color-gray5
              position: relative
              width: 100%
              height: 100%
            span
              font-size: $fontsize-large-x
              color: $color-gray1
            b
              position: absolute
              right: 80px
              font-size: $fontsize-medium
              color: $color-primary
              font-weight: normal
            i
              position: absolute
              right: 30px
              font-size: $fontsize-large-xxxxx
              color: $color-gray9
          li:last-child
            a
              border: none
          li a:before
            position: absolute
            left: -70px
            top: 50%
            margin-top: -22px
            content: ""
            width: 48px
            height: 48px
          .coupon_bg a:before
            background: url(../../assets/images/my-center/coupon_bg.png) no-repeat
            background-size: 100% 100%
          .invite_bg a:before
            background: url(../../assets/images/my-center/invite_bg.png) no-repeat
            background-size: 100% 100%
          .old_bg a:before
            background: url(../../assets/images/my-center/old_bg.png) no-repeat
            background-size: 100% 100%
          .set_bg a:before
            background: url(../../assets/images/my-center/set_bg.png) no-repeat
            background-size: 100% 100%
      .td_deposit
        font-size: $fontsize-small-ss
        color: $color-gray3
        text-align: center
        span
          display: inline-block
          position: relative
        span:before
          content: ''
          position: absolute
          left: -30px
          top: 50%
          display: inline-block
          width: 22px
          height: 26px
          margin-top: -13px
          background: url(../../assets/images/index/td_deposit.png)
          background-size: 100% 100%      
</style>
