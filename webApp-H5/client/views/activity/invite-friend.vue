<template>
  <div class="invite">
    <Header navLeftTxt="icon">邀请好友</Header>
    <div class="header" :class="{loginNo: active}">
      <router-link to="/invite-prize-record">
        <img class="record" src="../../assets/images/activity/invite-friend/invite8.png" alt="">
      </router-link>
      <div class="content" v-show="!active">
        <p class="lev"><img src="../../assets/images/activity/invite-friend/lev1.png" alt=""></p>
        <p class="messages">您距中级理财师还差2个V1好友<br />未达到200万代收金额</p>
      </div>
    </div>
    <div class="hongbao" v-show="!active">
      <div class="top">
        <div><span>10</span>元</div>
        <div><span>0.25</span>%</div>
      </div>
      <div class="middle"><div>直接好友每笔出借收益5%，间接好友每笔出借收益2%</div></div>
      <div class="bottom">15位好友达到V1等级切好友总待收达400万</div>
    </div>
    <div class="rights" v-show="!active"><img src="../../assets/images/activity/invite-friend/invite3.png" alt=""></div>
    <div class="first">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">10元抵用券，好友首次出借金额0.25%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益2%</dd>
    </div>
    <div class="second">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">10元抵用券，好友首次出借金额0.25%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益3%，间接好友每笔出借收益1%<br />(6位好友达到v1且好友总待收达200万)</dd>
    </div>
    <div class="third">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">10元抵用券，好友首次出借金额0.25%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益5%，间接好友每笔出借收益2%<br />(15位好友达到v1且好友总待收达400万)</dd>
    </div>
    <div class="rule" :class="{on:active}"><router-link to="/invite-rule">查看邀请规则></router-link></div>
    <div class="inviteCode" v-show="!active">
      <div class="myCode"></div>
      <p class="code">D6K7K</p>
      <p class="title">长按邀请码复制</p>
    </div>
    <div class="footer">
      <a class="btn" @click="links">立即{{text}}</a>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '邀请好友'
  },
  data () {
    return {
      // false为已登录，true为未登录
      active: false,
      text: '邀请'
    }
  },
  methods: {
    isLogin () {
      // if (true) {
      //   return false
      // } else {
      //   this.active = true
      //   this.text = '登录'
      // }
    },
    links () {
      if (this.active) {
        this.$router.push('/login')
      } else {
        // 弹出下拉层（分享列表）
      }
    }
  },
  mouted () {
    this.isLogin()
  }
}
</script>
<style lang="stylus" scoped>
.invite
  position: relative
  padding: 0.88rem 0 1.5rem
  background: -webkit-linear-gradient(#FF4211, #FE2428)
  background: -o-linear-gradient(#FF4211, #FE2428)
  background: -moz-linear-gradient(#FF4211, #FE2428)
  background: linear-gradient(#FF4211, #FE2428)
  .header
    height: 8.04rem
    background: url(../../assets/images/activity/invite-friend/invite1.png)center no-repeat
    background-size: 100%
    overflow: hidden
    &.loginNo
      background: url(../../assets/images/activity/invite-friend/invite1-1.png)top no-repeat
      background-size: 100%
      margin-bottom: 0.1rem
      height: 6.02rem
    .record
      width: 1.87rem
      height: 0.54rem
      position: absolute
      top: 0.88rem
      right: 0.2rem
    .content
      width: 3.6rem
      height: 2.7rem
      margin: auto
      margin-top:3.1rem
      text-align: center
    .lev img
      width: 2rem
      height: 2rem
    .messages
      font-size: 0.24rem
      color: #b4b4b4
      font-style: italic
      margin-top: 0.1rem
  .hongbao
      width: 6.58rem
      height: 4.66rem
      text-align: center
      margin: auto
      overflow: hidden
      background: url(../../assets/images/activity/invite-friend/invite2.png)center no-repeat
      background-size: 100%
      .top
        font-size: 0.2rem
        color: #ff5339
        margin-left: 1.5rem
        margin-top: 1.2rem
        overflow: hidden
        div
          float: left
          &:first-child
            width: 1.5rem
            margin-right: 2.3rem
        span
          font-size: 0.37rem
          font-weight: bolder
          letter-spacing:-1px
          font-family: "Arial"
      .middle
        width: 6.1rem
        overflow: hidden
        padding: 0.05rem 0.05rem
        border-radius: 0.5rem
        font-size: 0.24rem
        color: #ff2d22
        margin: 1.3rem auto 0.1rem
        font-weight: bold
        text-align: center
        background: -webkit-linear-gradient(left, #efc277 , #fadca8)
        background: -o-linear-gradient(right, #efc277, #fadca8)
        background: -moz-linear-gradient(right, #efc277, #fadca8)
        background: linear-gradient(to right, #efc277 , #fadca8)
        div
          width: 100%
          padding: 0.05rem 0 0.05rem
          border-radius: 0.3rem
          background: -webkit-linear-gradient(left, #fadca8 , #efc277)
          background: -o-linear-gradient(right, #fadca8, #efc277)
          background: -moz-linear-gradient(right, #fadca8, #efc277)
          background: linear-gradient(to right, #fadca8 , #efc277)
      .bottom
        width: 100%
        text-align: center
        font-size: 0.24rem
        color: #fff
        opacity: 0.7
  .rights
    margin:0.65rem 0 0.1rem
    text-align: center
    height: 1rem
    img
      width: 2.75rem
      height: 1rem
      vertical-align: top
  .first,.second,.third
    margin:0 auto 0.43rem
    padding: 0.2rem 0 0.3rem 1.8rem
  .first
    width: 6.74rem
    height: 1.9rem
    background: url(../../assets/images/activity/invite-friend/invite4.png)top no-repeat
    background-size: 100%
  .second
    width: 6.74rem
    height: 2.42rem
    background: url(../../assets/images/activity/invite-friend/invite5.png)top no-repeat
    background-size: 100%
  .third
    width: 6.74rem
    height: 2.42rem
    background: url(../../assets/images/activity/invite-friend/invite6.png)top no-repeat
    background-size: 100%
  dt
    font-size:0.22rem
    color: #fff
    opacity: 0.7
  dd
    font-size:0.22rem
    font-weight: bold
    color: #fff
  .margin
    margin-bottom:0.2rem
  .rule
    text-align: center
    font-size: 0.24rem
    margin-bottom:0.9rem
    &.on
      padding-top: 0.6rem
    a
      color: #fff
      text-decoration: none
  .inviteCode
    .myCode
      width: 2.57rem
      height: 0.5rem
      margin: auto
      background: url(../../assets/images/activity/invite-friend/invite7.png)top no-repeat
      background-size: 100%
    .code
      text-align: center
      font-size: 0.7rem
      color: #fff
      font-weight: bold
    .title
      color: #ffa19b
      font-size: 0.24rem
      text-align: center
      margin-top: 0.15rem
  .footer
    width: 100%
    height: 0.9rem
    padding-top: 0.12rem
    text-align: center
    position: fixed
    bottom: 0
    z-index: 100
    background: #FE4B58
    a
      display: block
      text-decoration: none
      margin: auto
      width: 5.28rem
      height: 0.67rem
      line-height: 0.67rem
      font-size: 0.3rem
      color: #e82b27
      border-bottom: 0.08rem solid #E8A039
      border-radius: 0.4rem
      background: #FFDB69
</style>
