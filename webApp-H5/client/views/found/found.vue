<template>
  <div class="found">
    <!-- <div class="top">发现</div> -->
    <Header>发现</Header>
    <ul class="header">
      <li>
        <router-link to="/found/member-lev">
          <img src="../../assets/images/found/found9.png" alt="">
          <p>会员中心</p>
        </router-link>
      </li>
      <li>
        <router-link to="inviteFriend">
          <img src="../../assets/images/found/found8.png" alt="">
          <p>邀请好友</p>
        </router-link>
      </li>
      <li>
        <router-link to="">
          <img src="../../assets/images/found/found7.png" alt="">
          <p>精彩活动</p>
        </router-link>
      </li>
    </ul>
    <div class="content">
      <div class="sign_bg">
        <p v-html="signInfo"></p>
        <p>签到赢积分换取福利</p>
        <img @click="onSign" class="fr" :src="signNo" alt="">
      </div>
      <div class="point">
        <span></span>积分福利
      </div>
      <div class="needPoint">
        <img class="title" src="../../assets/images/found/found1.png" alt="">
        <router-link to="login" v-if="!isLogin">
          <span class="login">登录</span>
          <span class="check">查看积分&nbsp;<i class="iconfont">&#xe6c6;</i></span>
        </router-link>
        <router-link to="/found/my-point" v-else>
          <span class="myPoint">我的积分</span>
          <span class="points">&nbsp;{{points}}&nbsp;<i class="iconfont">&#xe6c6;</i></span>
        </router-link>
        <router-link to="/found/get-point" class="fr need">我要积分&nbsp;<i class="iconfont">&#xe6c6;</i></router-link>
      </div>
      <ul class="jxq">
        <li>
          <router-link :to="{path:'/found/point-exchange',query: {id:1}}">
            <img src="../../assets/images/found/found4.png" alt="">
            <p class="first">1%加息券</p>
            <p>100积分</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/found/point-exchange',query: {id:2}}">
            <img src="../../assets/images/found/found5.png" alt="">
            <p class="first">2%加息券</p>
            <p>300积分</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/found/point-exchange',query: {id:3}}">
            <img src="../../assets/images/found/found6.png" alt="">
            <p class="first">3%加息券</p>
            <p>600积分</p>
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="footer">
      <li>
        <router-link to="/found/help">
          <img class="helpImg" src="../../assets/images/found/found10.png" alt="">
          <p>帮助反馈</p>
        </router-link>
      </li>
      <li @click="wxLayer = !wxLayer">
        <img class="wxImg" src="../../assets/images/found/found11.png" alt="">
        <p>关注微信</p>
      </li>
      <li>
        <router-link to="/found/contact">
          <img class="contactImg" src="../../assets/images/found/found12.png" alt="">
          <p>联系我们</p>
        </router-link>
      </li>
    </ul>
    <!-- 签到弹窗 -->
    <Layer v-show="signLayer">
      <div class="signLayer">
        <img src="../../assets/images/found/found14.png" alt=""><br />
        <img @click="signLayer = !signLayer" src="../../assets/images/found/close.png" alt="">
      </div>
    </Layer>
    <!-- 关注微信弹窗 -->
    <Layer v-show="wxLayer" close="取消" submit="去关注" @on-close="wxLayer = !wxLayer" @on-sub="codeSub">
      <div class="wxLayer">
        关注拓道金服服务号，您的贴身管家，账户状态实时跟进，重大活动及时知晓（<span>已自动复制微信号<br />tuodao666</span>）
      </div>
    </Layer>
    <footer-nav  :navClass="'found'"></footer-nav>
  </div>
</template>
<script>
import img1 from '../../assets/images/found/found13.png'
import img2 from '../../assets/images/found/found3.png'
export default {
  metaInfo: {
    title: '发现'
  },
  data () {
    return {
      isLogin: true,
      signInfo: '今日还没有签到哦',
      points: 1000,
      signNo: img2,
      signLayer: false,
      wxLayer: false
    }
  },
  methods: {
    onSign () {
      this.signNo = img1
      this.logined = false
      this.signLayer = !this.signLayer
      this.signInfo = '已累计签到<span>7</span>天'
    },
    codeSub () {}
  }
}
</script>
<style lang="stylus" scoped>
  .found
    font-family: PingFangSC-Regular
    position: relative
    padding: 0.88rem 0 1.12rem
    a
      color:#7e8c8d
  .top
    background-color: #fff
    height: 1.28rem
    line-height: 0.4rem
    letter-spacing: 1px
    padding-top: 0.6rem
    width: 100%
    border-bottom: 1px solid #e8e8e8
    position: fixed
    top: 0
    left: 0
    right: 0
    overflow: hidden
    text-align: center
    font-size: 0.36rem
    color: #333
    z-index: 98
  .header
    display: flex
    justify-content: space-between
    padding: 0.1rem 0.85rem 0.3rem
    overflow: hidden
    margin-bottom: 0.2rem
    background-color: #fff
    li
      width: 1.2rem
      height: 1.65rem
      font-size: 0.28rem
      color: #666
      text-align: center
      p
        font-family: PingFangSC-Medium
      a
        display: block
        line-height: 0.3rem
      img
        width: 100%
  .content
    padding: 0.3rem 0.3rem 0
    background: #fff
    overflow: hidden
    .iconfont
      font-size: 0.22rem
    .sign_bg
      width: 6.9rem
      height: 1.45rem
      margin: auto
      position: relative
      text-align: center
      color: #fff
      overflow: hidden
      background: url(../../assets/images/found/found2.png)center no-repeat
      background-size: 100%
      p:first-child
        margin: 0.25rem 0 0.07rem
        font-size: 0.4rem
      p:nth-child(2)
        font-size: 0.24rem
        width: 2.38rem
        height: 0.4rem
        margin: auto
        line-height: 0.4rem
        border-radius: 0.4rem
        background: -webkit-linear-gradient(left, #9131E4 , #5D4CDF)
        background: -o-linear-gradient(right, #9131E4, #5D4CDF)
        background: -moz-linear-gradient(right, #9131E4, #5D4CDF)
        background: linear-gradient(to right, #9131E4 , #5D4CDF)
      span
        color: yellow
      img
        width: 1.22rem
        height: 1.28rem
        position: absolute
        right: 0.12rem
        top: 50%
        margin-top: -0.64rem
    .point
      font-size: 0.32rem
      color: #333
      margin: 0.55rem 0 0.37rem
      font-family: PingFangSC-Medium
      span
        display: inline-block
        width: 0.08rem
        height: 0.28rem
        border-radius: 0.04rem
        background: #FF7102
        margin-right: 0.15rem
        vertical-align: middle
    .needPoint
      width: 6.9rem
      margin: auto
      height: 0.78rem
      line-height: 0.78rem
      color: #999
      font-size: 0.26rem
      border-radius: 0.39rem
      background-color: #FFF7F2
      overflow: hidden
      margin-bottom: 0.48rem
      a
        display: inline-block
      img
        margin-left: 0.21rem
        margin-right: 0.14rem
        vertical-align: sub
        width: 0.34rem
        height: 0.34rem
      .login
        color: #FF7102
      .need
        margin-right: 0.31rem
      .myPoint
        color: #333
      .points
        color: #FF7102
    .jxq
      overflow: hidden
      padding-bottom: 0.38rem
      display: flex
      justify-content: space-between
      li
        width: 1.7rem
        text-align: center
        img
          width: 100%
        p.first
          font-size: 0.26rem
          color: #333
          margin: 0.3rem 0 0.07rem
        p:last-child
          color: #FF7102
          font-size: 0.24rem
  .footer
    width: 100%
    display: flex
    box-sizing: border-box
    height: 1.98rem
    background: #fff
    margin-top: 0.2rem
    font-size: 0.24rem
    color: #999
    overflow: hidden
    li
      flex: 1
      line-height: 0.4rem
      margin-top: 0.46rem
      text-align: center
      &:nth-child(2)
        margin-top: 0.46rem
      img.helpImg
        width: 0.628rem
        height: 0.6rem
      img.wxImg
        width: 0.74rem
        height: 0.6rem
      img.contactImg
        width: 0.587rem
        height: 0.6rem
  .signLayer
    width: 100%
    text-align: center
    z-index: 10
    img:first-child
      width: 5.1rem
      height: 5.82rem
      margin-bottom: 0.2rem
    img:last-child
      width: 0.76rem
      height: 0.76rem
  .wxLayer
    width: 100%
    padding: 0.3rem 0.3rem 0.1rem
    line-height: 0.4rem
    letter-spacing: 1px
    span
      color: #FF6600
  .fr
    float: right
  .fade-enter-active, .fade-leave-active
    transition: opacity .2s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>