<template>
  <div class="myCenter">
    <div class="my_nav">
      <div><span></span><span class="vip0"></span></div><div><i class="newsIn"></i></div>
    </div>
    <div class="my_box">
      <div class="myCenter_top">
        <div v-if="login">
          <router-link to="" class="login">登录/注册</router-link>
        </div>
        <div v-else>
          <div class="user_earnings">
            <div class="earnings">
              <p>待收本息(元)</p>
              <p v-if="moneyShow">123,456,78.00</p>
              <p v-else>******</p>
            </div>
            <div class="showIcon">
              <i class="iconfont" @click="moneyHide()" v-if="moneyShow">&#xe68a;</i>
              <i class="iconfont" @click="moneyHide()" v-else>&#xe692;</i>
            </div>
          </div>
          <div class="user_asset">
            <router-link to="totalMoney">
              <p>总资产(元) <i class="iconfont">&#xe6ba;</i> </p>
              <p v-if="moneyShow">331.00</p>
              <p v-else>****</p>
            </router-link>
            <router-link to="totalIncome">
              <p>累计收益(元) <i class="iconfont">&#xe6ba;</i> </p>
              <p v-if="moneyShow">123,45.00</p>
              <p v-else>****</p>
            </router-link>
          </div>
        </div>
      </div>
      <router-link to="" class="evaluation">
        <span>风险评测</span>
        <span>去评测 <i class="iconfont">&#xe83d;</i> </span>
      </router-link>
      <div class="myCenter_money">
        <div class="money_bot">
          <div>
            <p>可用余额(元)</p>
            <p>123,456,78.00</p>
          </div>
          <div>
            <router-link to="" >提现</router-link>
            <router-link to="" >充值 </router-link>
          </div>
        </div>
      </div>
      <div class="myCenter_fund">
        <ul>
          <li>
            <div class="loanBg"></div>
            <p>出借记录</p>
          </li>
          <li>
            <div class="bondBg"></div>
            <p>债权转让</p>
          </li>
          <li>
            <router-link to="returnMoney" >
              <div class="returnBg"></div>
              <p>回款日历</p>
            </router-link>
          </li>
          <li>
            <div class="fundBg"></div>
            <p>资金流水</p>
          </li>
        </ul>
      </div>
      <div class="myCenter_list">
        <ul>
          <li class="coupon_bg">
            <router-link to="" >
              <span class="coupon">优惠券</span>
              <b>1张加息券</b>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
          </li>
          <li class="int_bg">
            <router-link to="" >
              <span>我的积分</span>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
          </li>
          <li class="invite_bg">
            <router-link to="" >
              <span>邀请记录</span>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
          </li>
          <li class="auto_bg">
            <router-link to="/autoLoan" >
              <span>自动投标</span>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
          </li>
          <li class="set_bg">
            <router-link to="/ucSet" >
              <span>账户设置</span>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="td_deposit"><span>您的资金由银行资金存管系统进行存管</span></div>
    </div>
    <footer-nav :navClass="'myCenter'"></footer-nav>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        moneyShow: true,
        login: false
      }
    },
    mounted () {
    },
    methods: {
      moneyHide () {
        this.moneyShow = !this.moneyShow
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .myCenter
    height: 100%
    box-sizing: border-box
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
      div:nth-child(2)
        height: 100%
        line-height: 68px
        float: right
        i
          display: inline-block
          width: 54px
          height: 54px
          background: url(../../assets/images/my-center/newsBg.png) no-repeat
          background-size: 100% 100%
        i.newsIn
          background: url(../../assets/images/my-center/newsIn.png) no-repeat
          background-size: 100% 100%
    .my_box
      background-color: #F2F3F7
      padding: 88px 0 130px
      .myCenter_top
        padding-top: 100px
        width:100%
        height: 332px
        background: url(../../assets/images/my-center/my_moneyBg.png) no-repeat
        background-size: 100% 100%
        padding: 32px 30px 0
        box-sizing: border-box
        .login
          display: block
          width: 284px
          height: 94px
          line-height: 94px
          border: 1px solid #fff
          border-radius: 20px
          color: #fff
          font-size: 36px
          text-align: center
          margin: 50px auto
        .user_earnings
          overflow: hidden
          font-size: 0
          .earnings
            float: left
            p:nth-child(1)
              font-size: 24px
              color: #fff
              opacity: 0.8
              line-height: 33px
              letter-spacing: 1px
            p:nth-child(2)
              font-size: 64px
              color: #fff
              line-height: 78px
          .showIcon
            float: right
          i
              font-size: 60px
              color: #fff
        .user_asset
          display: flex
          margin-top: 36px
          a
            flex: 1
            p:nth-child(1)
              font-size: 24px
              color: #fff
              line-height: 33px
              opacity: 0.8
              letter-spacing: 1px
            p:nth-child(2)
              font-size: 48px
              color: #fff
              line-height: 48px
              margin-top: 20px
      .evaluation
        display: block
        width: 100%
        padding: 0 30px
        font-size: 28px
        color: #FFB540
        line-height: 72px
        background-color: #FFF7EA
        box-sizing: border-box
        overflow: hidden
        span:nth-child(1)
          float: left
        span:nth-child(2)
          float: right
      .myCenter_money
        padding: 0 30px
        background-color: #fff
        p:nth-child(1)
          font-size: 24px
          color: #999
          line-height: 33px
        p:nth-child(2)
          font-size: 34px
          color: #666
          line-height: 48px
          margin-top: 5px
        .money_bot
          display: flex
          padding: 26px 0
          div
            flex: 1
            overflow: hidden
          a
            display: inline-block
            width: 160px
            line-height: 68px
            font-size: 28px
            color: #FF7102
            background-color: #F0F0F7
            border-radius: 20px
            text-align: center
            float: left
            margin-top: 10px
          a:nth-child(1)
            margin-right: 20px
      .myCenter_fund
        width: 100%
        background-color: #fff
        margin-top: 20px
        padding: 27px 30px 36px
        box-sizing: border-box
        ul
          display: flex
          li
            flex: 1
            text-align: center
            a
              display: block
            p
              font-size: 24px
              color: #333
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
        background-color: #fff
        margin-bottom: 50px
        margin-top: 20px
        ul
          li
            padding-left: 100px
            height: 100px
            line-height: 100px
            box-sizing: border-box
            a
              display: block
              border-bottom: 1px solid #F2F3F7
              box-sizing: border-box
              position: relative
              width: 100%
              height: 100%
            span
              font-size: 30px
              color: #333
            .coupon
              position: relative
            .coupon:after
              display: block
              content: ''
              width: 8px
              height: 8px
              background-color: #ff7102
              border-radius: 50%
              position: absolute
              top: -5px
              right: -10px
            b
              position: absolute
              right: 80px
              font-size: 28px
              color: #ff7102
              font-weight: normal
            i
              position: absolute
              right: 30px
              font-size: 30px
              color: #B3B3B3
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
          .int_bg a:before
            background: url(../../assets/images/my-center/int_bg.png) no-repeat
            background-size: 100% 100%
          .invite_bg a:before
            background: url(../../assets/images/my-center/invite_bg.png) no-repeat
            background-size: 100% 100%
          .auto_bg a:before
            background: url(../../assets/images/my-center/auto_bg.png) no-repeat
            background-size: 100% 100%
          .old_bg a:before
            background: url(../../assets/images/my-center/old_bg.png) no-repeat
            background-size: 100% 100%
          .set_bg a:before
            background: url(../../assets/images/my-center/set_bg.png) no-repeat
            background-size: 100% 100%
      .td_deposit
        font-size: 24px
        color: #999
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
