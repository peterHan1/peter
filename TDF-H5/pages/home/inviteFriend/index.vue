<template>
  <div class="invite">
    <td-header title="邀请好友"/>
    <div
      :class="{loginNo: active}"
      class="header">
      <router-link to="/invite-prize-record">
        <img
          class="record"
          src="../../../assets/images/activity/inviteFriend/invite8.png">
      </router-link>
      <div
        v-show="!active"
        class="content">
        <p class="lev">
          <img :src="lev[vipData.level-1]">
        </p>
        <p
          class="messages"
          v-html="vipData.message"/>
      </div>
    </div>
    <div
      v-show="!active"
      class="hongbao">
      <div class="top">
        <!-- <div><span>{{ vipData.config.firstVoucher.amount }}</span>元</div> -->
        <!-- <div><span>{{ vipData.config.firstScale*100 }}</span>%</div> -->
      </div>
      <div class="middle"><div>直接好友每笔出借收益5%，间接好友每笔出借收益2%</div></div>
      <div class="bottom">15位好友达到V1等级且好友总待收达400万</div>
    </div>
    <div 
      v-show="!active"
      class="rights">
      <img src="../../../assets/images/activity/inviteFriend/invite3.png">
    </div>
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
      <dd>直接好友每笔出借收益3%，间接好友每笔出借收益1%<br>(6位好友达到v1且好友总待收达200万)</dd>
    </div>
    <div class="third">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">10元抵用券，好友首次出借金额0.25%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益5%，间接好友每笔出借收益2%<br>(15位好友达到v1且好友总待收达400万)</dd>
    </div>
    <div
      :class="{on:active}"
      class="rule">
      <router-link to="/home/inviteFriend/inviteRule">查看邀请规则></router-link>
    </div>
    <div
      v-show="!active"
      class="inviteCode">
      <div class="myCode"/>
      <p
        id="copyCode"
        :data-clipboard-text="inviteCode"
        class="code"
        @click="copys">{{ inviteCode }}</p>
      <p class="title">点击邀请码复制</p>
    </div>
    <div class="footer">
      <a
        class="btn"
        @click="links">立即{{ text }}</a>
    </div>
    <div
      v-show="shadeShow"
      class="shade">
      <div
        class="mask"
        @click="shadeShow = false"/>
      <div
        v-if="isWx"
        class="txt"/>
      <div
        v-else
        class="layerNoWx">
        <div class="layerHb">
          <span
            class="iconfont"
            @click="shadeShow = false">&#xe9ba;</span>
          <div id="container"/>
        </div>
        <div class="bottom">
          <div class="wx">
            <img src="../../../assets/images/activity/inviteFriend/wx.png">
            <p>分享好友</p>
          </div>
          <div class="downLoad">
            <img src="../../../assets/images/activity/inviteFriend/downLoad.png">
            <p>保存到相册</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="layerCode"
      class="layerCode">
      <div class="content">
        <span
          class="iconfont"
          @click="layerCode = false">&#xe9ba;</span>
        <input
          v-model="inviteCode"
          type="text">
        <p>请手动复制邀请码</p>
      </div>
      <div class="shade"/>
    </div>
  </div>
</template>
<script>
import lev1 from '../../../assets/images/activity/inviteFriend/lev1.png'
import lev2 from '../../../assets/images/activity/inviteFriend/lev2.png'
import lev3 from '../../../assets/images/activity/inviteFriend/lev3.png'
import QRCode from 'qrcode'
import Clipboard from 'clipboard'
import { inviteFriend, wxSignature } from '../../../plugins/api.js'
// import wx from 'weixin-js-sdk'
export default {
  metaInfo: {
    title: '邀请好友'
  },
  data() {
    return {
      // false为已登录，true为未登录
      lev: [lev1, lev2, lev3],
      levImg: '',
      active: false,
      text: '邀请',
      inviteCode: 'D6895',
      shadeShow: false,
      isWx: false,
      time: '',
      clipboard: '',
      layerCode: false,
      vipData: {}
    }
  },
  methods: {
    isLogin() {
      // if (true) {
      //   return false
      // } else {
      //   this.active = true
      //   this.text = '登录'
      // }
    },
    links() {
      this.shadeShow = true
      this.isWx = false
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.shadeShow = true
        this.isWx = true
      } else {
        this.zoom('http://baidu.com')
        this.shadeShow = true
        this.isWx = false
      }
      // if (this.active) {
      //   this.$router.push('/login')
      // } else {
      // }
    },
    zoom(qrCode) {
      if (qrCode === null) {
        return false
      }
      this.isShow = true
      this.incomingId = qrCode
      var container = document.getElementById('container')
      container.innerHTML = ''
      QRCode.toCanvas(
        qrCode,
        { errorCorrectionLevel: 'H', width: 115 },
        function(err, canvas) {
          if (err) throw err
          container.appendChild(canvas)
        }
      )
    },
    copys() {
      let _this = this
      let copyCode = document.getElementById('copyCode')
      _this.clipboard.on('success', function(e) {
        _this.$Msg('邀请码复制成功', 2000)
        _this.clipboard.destroy()
        _this.clipboard = new Clipboard(copyCode)
      })
      _this.clipboard.on('error', function(e) {
        _this.$Msg('邀请码复制失败，请手动复制邀请码', 1000)
        _this.clipboard.destroy()
        setTimeout(() => {
          _this.layerCode = true
        }, 1500)
      })
    }
  },
  mounted() {
    inviteFriend(this.$axios).then(res => {
      this.vipData = res.data.content
      console.log(res.data.content.config)
    })
    this.$nextTick(() => {
      let copyCode = document.getElementById('copyCode')
      this.clipboard = new Clipboard(copyCode)
    })
    // wxSignature(this.$axios, params).then(res => {
    //   let { data } = res.data.content
    //   wx.config({
    //     debug: false, // 开启调试模式
    //     appId: data.appId, // 必填，公众号的唯一标识
    //     timestamp: data.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: data.noncestr, // 必填，生成签名的随机串
    //     signature: data.signature, // 必填，签名
    //     jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
    //   })
    // })
    // wx.ready(() => {
    //   // 分享给朋友
    //   wx.onMenuShareAppMessage({
    //     title: '这里是标题', // 分享标题
    //     desc: 'This is a test!', // 分享描述
    //     link: '链接', // 分享链接
    //     imgUrl: '图片', // 分享图标
    //     type: '', // 分享类型,music、video或link，不填默认为link
    //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //     success: function() {
    //       // 用户确认分享后执行的回调函数
    //     },
    //     cancel: function() {
    //       // 用户取消分享后执行的回调函数
    //     }
    //   })
    // })
  }
}
</script>
<style lang="stylus" scoped>
input,.myCode .code
  user-select text
  -webkit-user-select text
.invite
  position: relative
  padding: 0.88rem 0 1.5rem
  background: -webkit-linear-gradient(#FF4211, #FE2428)
  background: -o-linear-gradient(#FF4211, #FE2428)
  background: -moz-linear-gradient(#FF4211, #FE2428)
  background: linear-gradient(#FF4211, #FE2428)
  .header
    height: 8.04rem
    background: url(../../../assets/images/activity/inviteFriend/invite1.png)center no-repeat
    background-size: 100%
    overflow: hidden
    &.loginNo
      background: url(../../../assets/images/activity/inviteFriend/invite1-1.png)top no-repeat
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
      width: 4rem
      height: 2.7rem
      margin: auto
      margin-top:3.1rem
      text-align: center
    .lev img
      width: 2rem
      height: 2rem
    .messages
      font-size: $fontsize-small-ss
      color: #b4b4b4
      font-style: italic
      margin-top: 0.1rem
  .hongbao
      width: 6.58rem
      height: 4.66rem
      text-align: center
      margin: auto
      overflow: hidden
      background: url(../../../assets/images/activity/inviteFriend/invite2.png)center no-repeat
      background-size: 100%
      .top
        font-size: $fontsize-small-ssss
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
        width: 6.2rem
        overflow: hidden
        padding: 0.05rem 0.05rem
        border-radius: 0.5rem
        font-size: $fontsize-small-ss
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
        font-size: $fontsize-small-ss
        color: $color-white
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
    padding: 0.2rem 0.1rem 0.3rem 1.8rem
  .first
    width: 6.74rem
    height: 1.9rem
    background: url(../../../assets/images/activity/inviteFriend/invite4.png)top no-repeat
    background-size: 100%
  .second
    width: 6.74rem
    height: 2.42rem
    background: url(../../../assets/images/activity/inviteFriend/invite5.png)top no-repeat
    background-size: 100%
  .third
    width: 6.74rem
    height: 2.42rem
    background: url(../../../assets/images/activity/inviteFriend/invite6.png)top no-repeat
    background-size: 100%
  dt
    font-size:$fontsize-small-sss
    color: $color-white
    opacity: 0.7
  dd
    font-size:$fontsize-small-sss
    font-weight: bold
    color: $color-white
  .margin
    margin-bottom:0.2rem
  .rule
    text-align: center
    font-size: $fontsize-small-ss
    margin-bottom:0.9rem
    &.on
      padding-top: 0.6rem
    a
      color: $color-white
      text-decoration: none
  .inviteCode
    .myCode
      width: 2.57rem
      height: 0.5rem
      margin: auto
      background: url(../../../assets/images/activity/inviteFriend/invite7.png)top no-repeat
      background-size: 100%
    .code
      text-align: center
      font-size: 0.7rem
      color: $color-white
      font-weight: bold
    .title
      color: #ffa19b
      font-size: $fontsize-small-ss
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
      font-size: $fontsize-large-x
      color: #e82b27
      border-bottom: 0.08rem solid #E8A039
      border-radius: 0.4rem
      background: #FFDB69
  .shade
    position fixed
    left 0
    top: 0
    width 100%
    height 100%
    z-index 990
    .mask
      position:absolute
      left: 0
      top: 0
      width 100%
      height 100%
      background rgba(0,0,0,0.7)
      z-index 10
    .txt
      width 5rem
      height 1.46rem
      position:absolute
      right: 60px
      top: 40px
      z-index 20
      background: url(../../../assets/images/activity/inviteFriend/title.png)no-repeat
      background-size: 100% 100%
    .layerNoWx
      width 100%
      height 100%
      position absolute
      left 0
      top 0
      z-index 20
      padding-top: 40px
      text-align center
      .layerHb
        position relative
        width 545px
        height 800px
        margin auto
        overflow hidden
        background url(../../../assets/images/activity/inviteFriend/layer.png)no-repeat
        background-size 100%
        span 
          font-size $fontsize-large-xxxxx
          position absolute
          right 30px
          top 30px
          color $color-white
        #container
          text-align center
          margin-top 484px
          height 100px
      .bottom
        padding-top: 40px
        div
          display inline-block
          width 160px
          font-size $fontsize-large-x
          color $color-white
          &:first-child
            margin-right 20px
        img
          width 102px
          height 102px
          margin-bottom 0.1rem
  .layerCode
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 999
    .content
      width 500px
      padding: 40px 30px 20px
      background-color $color-white
      border-radius 5px
      position absolute
      left 50%
      top 50%
      transform translate(-50%,-50%)
      z-index 20
      text-align center
      input 
        display block
        text-align center
        font-size $fontsize-large-x
        color $color-gray1
        width 100%
        height 50px
        border 1px solid $color-background
      span
        font-size $fontsize-large-xxx
        position absolute
        right 5px
        top 5px
        color $color-gray1
      p
        font-size $fontsize-small-sss
        color $color-gray8
        padding-top 20px
    .shade
      width 100%
      height 100%
      position absolute
      z-index 10
      left 0
      top 0
      background rgba(0,0,0,0.7)
</style>
