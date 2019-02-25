<template>
  <div class="invite">
    <td-header
      :returnUrl="false"
      url="/"
      title="邀请好友"/>
    <div
      :class="{loginNo: !isLogin}"
      class="header">
      <a @click="toRecord">
        <img
          class="record"
          src="../../../assets/images/activity/inviteFriend/invite8.png">
      </a>
      <div
        v-show="isLogin"
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
      v-show="isLogin"
      class="hongbao">
      <div class="top">
        <div><span>{{ firstVoucher1 }}</span>元</div>
        <div><span>{{ firstScale1 }}</span>%</div>
      </div>
      <div v-if="vipData.level === 1">
        <div class="middle"><div>直接好友每笔出借收益{{ directScale1 }}%</div></div>
        <div class="bottom">好友出借即可</div>
      </div>
      <div v-else-if="vipData.level === 2">
        <div class="middle"><div>直接好友每笔出借收益{{ directScale1 }}%，间接好友每笔出借收益{{ indirectScale1 }}%</div></div>
        <div class="bottom">{{ inviteMember1 }}位好友达到v1等级且好友总待收达{{ recoverTotal1 }}万</div>
      </div>
      <div v-else-if="vipData.level === 3">
        <div class="middle"><div>直接好友每笔出借收益{{ directScale1 }}"%，间接好友每笔出借收益{{ indirectScale1 }}%</div></div>
        <div class="bottom">{{ inviteMember1 }}位好友达到v1等级且好友总待收达{{ recoverTotal1 }}万</div>
      </div>
    </div>
    <div
      v-show="isLogin"
      class="rights">
      <img src="../../../assets/images/activity/inviteFriend/invite3.png">
    </div>
    <div class="first">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">{{ firstVoucher2 }}元抵用券，好友首次出借金额{{ firstScale2 }}%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益{{ directScale2 }}%</dd>
    </div>
    <div class="second">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">{{ firstVoucher3 }}元抵用券，好友首次出借金额{{ firstScale3 }}%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益{{ directScale3 }}%，间接好友每笔出借收益{{ indirectScale2 }}%<br>({{ inviteMember2 }}位好友达到v1且好友总待收达{{ recoverTotal2 }}万)</dd>
    </div>
    <div class="third">
      <dt>好友首次出借，您将获得</dt>
      <dd class="margin">{{ firstVoucher4 }}元抵用券，好友首次出借金额{{ firstScale4 }}%返现</dd>
      <dt>好友第二次出借起，您将获得</dt>
      <dd>直接好友每笔出借收益{{ directScale4 }}%，间接好友每笔出借收益{{ indirectScale3 }}%<br>({{ inviteMember3 }}位好友达到v1且好友总待收达{{ recoverTotal3 }}万)</dd>
    </div>
    <div
      :class="{on: !isLogin}"
      class="rule">
      <router-link to="/home/inviteFriend/inviteRule">查看邀请规则></router-link>
    </div>
    <div
      v-show="isLogin"
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
        v-if="isLogin"
        class="btn"
        @click="toInvite">立即邀请</a>
      <a
        v-else
        class="btn"
        @click="toLogin">立即登录</a>
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
        <div
          ref="layerHb"
          class="layerHb">
          <span
            class="iconfont"
            @click="shadeShow = false">&#xe9ba;</span>
          <div id="container"/>
        </div>
        <!-- <div class="bottom">
          <div class="wx">
            <img src="../../../assets/images/activity/inviteFriend/wx.png">
            <p>分享好友</p>
          </div>
          <a
            :href="dataURL"
            class="downLoad"
            download="img">
            <img src="../../../assets/images/activity/inviteFriend/downLoad.png">
            <p>保存到相册</p>
          </a>
        </div> -->
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
import Axios from 'axios'
import html2canvas from 'html2canvas'
import lev1 from '../../../assets/images/activity/inviteFriend/lev1.png'
import lev2 from '../../../assets/images/activity/inviteFriend/lev2.png'
import lev3 from '../../../assets/images/activity/inviteFriend/lev3.png'
import QRCode from 'qrcode'
import Clipboard from 'clipboard'
import { commenParams } from '~/api/config.js'
import { inviteFriend, wxSignature } from '~/api/home.js'
// import wx from 'weixin-js-sdk'
export default {
  metaInfo: {
    title: '邀请好友'
  },
  data() {
    return {
      lev: [lev1, lev2, lev3],
      levImg: '',
      inviteCode: '',
      shadeShow: false,
      isWx: false,
      time: '',
      clipboard: '',
      layerCode: false,
      vipData: {},
      firstVoucher1: '',
      firstVoucher2: '',
      firstVoucher3: '',
      firstVoucher4: '',
      firstScale1: '',
      firstScale2: '',
      firstScale3: '',
      firstScale4: '',
      directScale1: '',
      directScale2: '',
      directScale3: '',
      directScale4: '',
      indirectScale1: '',
      indirectScale2: '',
      indirectScale3: '',
      recoverTotal1: '',
      recoverTotal2: '',
      recoverTotal3: '',
      inviteMember1: '',
      inviteMember2: '',
      inviteMember3: '',
      dataURL: '',
      inviteUser: ''
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  created() {
    commenParams.accessId = this.$store.state.accessId
    commenParams.accessKey = this.$store.state.accessKey
    this.getData()
  },
  methods: {
    toLogin() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    },
    toRecord() {
      if (this.isLogin) {
        this.$router.push({
          name: 'myCenter-invite-inviteRecord'
        })
      } else {
        this.toLogin()
      }
    },
    getData() {
      inviteFriend(this.$axios).then(res => {
        this.firstVoucher2 = res.content.primary.firstVoucher.amount
        this.firstVoucher3 = res.content.intermediate.firstVoucher.amount
        this.firstVoucher4 = res.content.trump.firstVoucher.amount
        this.firstScale2 = res.content.primary.firstScale * 100
        this.firstScale3 = res.content.intermediate.firstScale * 100
        this.firstScale4 = res.content.trump.firstScale * 100
        this.directScale2 = res.content.primary.directScale * 100
        this.directScale3 = res.content.intermediate.directScale * 100
        this.directScale4 = res.content.trump.directScale * 100
        this.indirectScale2 = res.content.intermediate.indirectScale * 100
        this.indirectScale3 = res.content.trump.indirectScale * 100
        this.recoverTotal2 = res.content.intermediate.recoverTotal
        this.recoverTotal3 = res.content.trump.recoverTotal
        this.inviteMember2 = res.content.intermediate.inviteMember
        this.inviteMember3 = res.content.trump.inviteMember
        if (this.isLogin) {
          this.vipData = res.content
          this.inviteCode = res.content.inviteCode
          this.firstVoucher1 = res.content.config.firstVoucher.amount
          this.firstScale1 = res.content.config.firstScale * 100
          this.directScale1 = res.content.config.directScale * 100
          this.indirectScale1 = res.content.config.indirectScale * 100
          this.recoverTotal1 = res.content.config.recoverTotal
          this.inviteMember1 = res.content.config.inviteMember
          this.inviteUser = res.content.inviteUser
          let ua = navigator.userAgent.toLowerCase()
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.wxShare()
          }
        }
      })
    },
    toImg() {
      const _this = this
      setTimeout(() => {
        // 创建一个新的canvas
        // 此处用于解决截图不清晰问题，将生成的canvas放大，然后再填充到原有的容器中就会清晰
        const width = this.$refs.layerHb.offsetWidth
        const height = this.$refs.layerHb.offsetHeight
        const canvas2 = document.createElement('canvas')
        const scale = 2
        canvas2.width = width * scale
        canvas2.height = height * scale
        canvas2.style.width = width + 'px'
        canvas2.style.height = height + 'px'
        const context1 = canvas2.getContext('2d')
        if (!context1) {
          context1.scale(scale, scale)
        } else {
          _this.$Msg('您的浏览器不支持截图功能，请手动截图', 2000)
        }
        const opts = {
          scale,
          canvas: canvas2,
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width,
          height,
          background: null,
          // 允许加载跨域的图片
          allowTaint: true,
          // 【重要】开启跨域配置
          useCORS: true
        }
        html2canvas(this.$refs.layerHb, opts).then(canvas => {
          const context = canvas2.getContext('2d')
          if (context) {
            context.scale(scale, scale)
            context.mozImageSmoothingEnabled = false
            context.webkitImageSmoothingEnabled = false
            context.imageSmoothingEnabled = false
          }
          // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          _this.dataURL = canvas.toDataURL()
        })
      }, 1000)
      // html2canvas(this.$refs.layerHb, {
      //   backgroundColor: null
      // }).then(canvas => {
      //   let dataURL = canvas.toDataURL('image/png')
      //   this.dataURL = dataURL
      //   console.log(this.dataURL)
      // })
    },
    toInvite() {
      this.shadeShow = true
      this.isWx = false
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.shadeShow = true
        this.isWx = true
      } else {
        let hrefs =
          'https://www.51tuodao.com/html5/ex_register_frist?type=invite&user=' +
          this.inviteUser
        this.zoom(hrefs)
        this.shadeShow = true
        this.isWx = false
        // this.toImg()
      }
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
        { errorCorrectionLevel: 'H', width: 130 },
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
    },
    wxShare() {
      let options = {
        title: '推荐你用拓道出借，送388元红包，快来注册吧',
        desc:
          '互联网金融百强企业，合规运营5年，新网银行存管，新人可享专属福利！',
        link:
          'https://www.51tuodao.com/html5/ex_register_frist?type=invite&user=' +
          this.inviteUser,
        imgUrl: 'https://www.51tuodao.com/h5/img/share.png'
      }
      // Axios({
      //   method: 'get',
      //   url: '/json/h5/getWxConfig?t=' + new Date().getTime(),
      //   params: {url: location.href},
      //   timeout: 6000
      Axios.get(
        'http://72.127.2.140:8090/json/h5/getWxConfig?t=' +
          new Date().getTime(),
        {
          //params参数必写 , 如果没有参数传{}也可以
          params: { url: location.href.split('#')[0] }
        }
      )
        .then(data => {
          if (data.flag && typeof wx !== 'undefined') {
            wx.config({
              debug: false, // 开启调试模式
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.noncestr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
            })
            wx.ready(() => {
              // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
              wx.updateAppMessageShareData(
                {
                  title: options.title, // 分享标题
                  desc: options.desc, // 分享描述
                  link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: options.imgUrl // 分享图标
                },
                function(res) {
                  //这里是回调函数
                }
              )
              wx.onMenuShareAppMessage({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接
                imgUrl: options.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              })
            })
            wx.error(function(res) {
              console.log(res)
            })
          }
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      let copyCode = document.getElementById('copyCode')
      this.clipboard = new Clipboard(copyCode)
    })
  }
}
</script>
<style lang="stylus" scoped>
input,.myCode .code
  user-select text
  -webkit-user-select text
.invite
  position: relative
  padding: 88px 0 150px
  background: -webkit-linear-gradient(#FF4211, #FE2428)
  background: -o-linear-gradient(#FF4211, #FE2428)
  background: -moz-linear-gradient(#FF4211, #FE2428)
  background: linear-gradient(#FF4211, #FE2428)
  .header
    height: 804px
    background: url(../../../assets/images/activity/inviteFriend/invite1.png)center no-repeat
    background-size: 100%
    overflow: hidden
    &.loginNo
      background: url(../../../assets/images/activity/inviteFriend/invite1-1.png)top no-repeat
      background-size: 100%
      margin-bottom: 10px
      height: 602px
    .record
      width: 187px
      height: 54px
      position: absolute
      top: 88px
      right: 20px
    .content
      width: 400px
      height: 270px
      margin: auto
      margin-top:310px
      text-align: center
    .lev img
      width: 200px
      height: 200px
    .messages
      font-size: $fontsize-small-ss
      color: #b4b4b4
      font-style: italic
      margin-top: 10px
  .hongbao
      width: 658px
      height: 466px
      text-align: center
      margin: auto
      overflow: hidden
      background: url(../../../assets/images/activity/inviteFriend/invite2.png)center no-repeat
      background-size: 100%
      .top
        font-size: $fontsize-small-ssss
        color: #ff5339
        margin-left: 150px
        margin-top: 120px
        overflow: hidden
        div
          float: left
          &:first-child
            width: 150px
            margin-right: 230px
        span
          font-size: 37px
          font-weight: bolder
          letter-spacing:-1px
          font-family: "Arial"
      .middle
        width: 620px
        overflow: hidden
        padding: 5px 5px
        border-radius: 50px
        font-size: $fontsize-small-ss
        color: #ff2d22
        margin: 130px auto 10px
        font-weight: bold
        text-align: center
        background: -webkit-linear-gradient(left, #efc277 , #fadca8)
        background: -o-linear-gradient(right, #efc277, #fadca8)
        background: -moz-linear-gradient(right, #efc277, #fadca8)
        background: linear-gradient(to right, #efc277 , #fadca8)
        div
          width: 100%
          padding: 5px 0 5px
          border-radius: 30px
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
    margin:65px 0 10px
    text-align: center
    height: 100px
    img
      width: 275px
      height: 100px
      vertical-align: top
  .first,.second,.third
    margin:0 auto 43px
    padding: 20px 10px 30px 180px
  .first
    width: 674px
    height: 190px
    background: url(../../../assets/images/activity/inviteFriend/invite4.png)top no-repeat
    background-size: 100%
  .second
    width: 674px
    height: 242px
    background: url(../../../assets/images/activity/inviteFriend/invite5.png)top no-repeat
    background-size: 100%
  .third
    width: 674px
    height: 242px
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
    margin-bottom:20px
  .rule
    text-align: center
    font-size: $fontsize-small-ss
    margin-bottom:90px
    &.on
      padding-top: 60px
    a
      color: $color-white
      text-decoration: none
  .inviteCode
    .myCode
      width: 257px
      height: 50px
      margin: auto
      background: url(../../../assets/images/activity/inviteFriend/invite7.png)top no-repeat
      background-size: 100%
    .code
      text-align: center
      font-size: 70px
      color: $color-white
      font-weight: bold
    .title
      color: #ffa19b
      font-size: $fontsize-small-ss
      text-align: center
      margin-top: 15px
  .footer
    width: 100%
    height: 90px
    padding-top: 12px
    text-align: center
    position: fixed
    bottom: 0
    z-index: 100
    background: #FE4B58
    a
      display: block
      text-decoration: none
      margin: auto
      width: 528px
      height: 67px
      line-height: 67px
      font-size: $fontsize-large-x
      color: #e82b27
      border-bottom: 8px solid #E8A039
      border-radius: 40px
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
      width 500px
      height 146px
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
      padding-top: 141px
      text-align center
      .layerHb
        position relative
        width 630px
        height 924px
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
          margin-top 560px
      .bottom
        padding-top: 40px
        div,a
          display inline-block
          width 160px
          font-size $fontsize-large-x
          color $color-white
        div
          margin-right 20px
        img
          width 102px
          height 102px
          margin-bottom 10px
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
