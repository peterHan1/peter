<template>
  <div class="be-invited">
    <div class="header">
      <a href="https://www.51tuodao.com/front/app/downLoadForPhone2" class="download"></a>
      <div class="content">
        <div class="point">
          <div class="imgs"><img src="../../assets/images/activity/be-invited/be-invited2.png" alt=""></div>
          <p>您的好友<span>187****5428</span>喊您来拓道领红包啦！</p>
        </div>
        <div class="msg">
          <div class="imgs"><img src="../../assets/images/activity/be-invited/be-invited3.png" alt=""></div>
          <p>我在拓道金服理财收益多多，天天躺着赚钱， 好消息也不忘分享给你，快去出借吧！</p>
        </div>
      </div>
    </div>
    <div class="info">
        <input class="phoneNum" id="phone" type="text" placeholder="请输入手机号码" maxlength="11" @keyup="phone = phone.replace(/^ +| +$/g,'')" v-model="phone" :disabled="requrie" />
      <div class="total" v-if="show">
        <div class="session">
          <input class="imgCodeVal codeIpt" type="text" placeholder="请输入图形验证码" v-model="imgCodeValue" />
          <div class="imgCode code" @click="getImgCode"><img :src="imgCodeSrc" alt=""></div>
        </div>
        <div class="session">
          <input class="msgCodeVal codeIpt" type="text" placeholder="请输入验证码" v-model="msgCodeValue" />
          <div class="msgCode code" @click="getMsgCode" >获取手机验证码</div>
        </div>
        <div class="session">
          <input class="psw" type="password" placeholder="请设置6-16位登陆密码" v-model="pswValue" />
        </div>
      </div>
    </div>
    <div class="agree" v-if="show">
      <input type="checkbox" id="check1" v-model="checkedValue"><label for="check1" @click="checkedValue = !checkedValue" :class="{checkBg: checkedValue}"></label> 我已阅读并同意<a href="../1/law_jd.html">《网贷禁止性行为说明》</a>、<a href="">《网贷借款风险告知书》</a>及<span><a href="">《拓道金服拥护注册协议》</a></span>
    </div>
    <div class="footer">
      <a class="btn first" @click="first" v-if="btnShow">领取388元红包</a>
      <a class="btn second" @click="second" v-else>领取388元红包</a>
      <div class="advantage"><img src="../../assets/images/activity/be-invited/be-invited4.png" alt=""></div>
      <div class="address">
        <p>客服电话：<a href="tel:400-85-666-85">400-85-666-85</a></p>
        <p>©️杭州拓道网络金融服务有限公司版权所有</p>
      </div>
    </div>
    <div class="popup" v-show="false"></div>
    <div class="resigers" v-show="false" id="resigers">
      <div>
        <a href="https://www.51tuodao.com/front/app/downLoadForPhone2" style="display: block;">
          <img src="../../assets/images/activity/be-invited/success.png" alt="" class="open">
        </a>
      </div>
      <img src="../../assets/images/activity/be-invited/close.png" class="close" alt="">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      phone: '',
      show: false,
      requrie: false,
      checkedValue: false,
      btnShow: true,
      imgCodeSrc: '',
      imgCodeValue: '',
      msgCodeValue: '',
      pswValue: '',
      num: 60,
      time: ''
    }
  },
  methods: {
    first () {
      if (this.phone === '') {
        this.$Msg('请输入手机号码', 2000)
      } else {
        if (/^1[34578]\d{9}$/.test(this.phone)) {
          // 开始判断手机号是否注册过
          // 未注册
          this.show = true
          this.requrie = true
          this.getImgCode()
          this.btnShow = false
          // 已注册
          this.$Msg('您已是拓道用户请勿重复注册', 2000)
        } else {
          this.$Msg('手机号码不合法，请重新输入', 2000)
        }
      }
    },
    getImgCode () {
      this.imgCodeSrc = 'https://www.51tuodao.com/authImage?t=' + new Date().getTime()
    },
    getMsgCode () {
      if (this.imgCodeValue !== '') {
        if (this.num === 60) {
          this.getCode()
        }
      } else {
        this.$Msg('请输入图形验证码', 2000)
      }
    },
    getCode () {
      axios({
        method: 'post',
        url: '',
        params: {phone: this.phoneValue, inputCode: this.imgCodeValue},
        timeout: 6000
      }).then(response => {
        if (response.data) {
          if (response.data.response.info.code === 100000) {
            this.code = response.data.response.content.code
            this.$Msg('验证码已发送到您手机', 2000)
            this.time = setInterval(() => {
              this.num--
              this.codeWord = this.num + 's'
              if (this.num < 0) {
                clearInterval(this.time)
                this.num = 60
                this.codeWord = '重新获取'
              }
            }, 1000)
          } else if (response.data.response.info.code === 700002) {
            this.$Msg('验证码获取次数已用完，请明日重试', 2000)
          } else if (response.data.response.info.code === 700001) {
            this.$Msg('发送短信太过频繁', 2000)
          } else if (response.data.response.info.code === 800103) {
            this.$Msg('图形验证码错误，请重新输入', 2000)
          } else if (response.data.response.info.code === 800102) {
            this.$Msg('图形验证码失效，请尝试刷新验证码', 2000)
          } else {
            this.$Msg('response.data.response.info.msg', 2000)
          }
        } else {
          this.$Msg('网络出错,请稍后重试', 2000)
        }
      })
    },
    second () {
      let pswLength = this.pswValue.length
      if (this.imgCodeValue === '') {
        this.$Msg('请输入图形验证码', 2000)
      } else if (this.msgCodeValue === '') {
        this.$Msg('请输入短信验证码', 2000)
      } else if (pswLength < 6 || pswLength > 16) {
        this.$Msg('请设置6-16位登录密码', 2000)
      } else if (this.checkedValue === false) {
        this.$Msg('请阅读并同意协议', 2000)
      } else if (this.imgCodeValue !== '' && this.msgCodeValue !== '' && this.pswValue !== '') {
        // 请求接口
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .be-invited
    width: 100%
    overflow: hidden
    background: url(../../assets/images/activity/be-invited/be-invited1.png)top no-repeat
    background-size: 100%
    .header
      width: 100%
      height: 7.89rem
      overflow: hidden
      padding-bottom: 0.4rem
      .download
        display: block
        width: 2.69rem
        height: 0.95rem
        background: url(../../assets/images/activity/be-invited/download.png) no-repeat
        background-size: 100% 100%
        position: absolute
        top: 0
        right: 0.2rem
        -webkit-tap-highlight-color: rgba(0,0,0,0)
      .content
        width: 6.6rem
        margin:6rem auto 0
        overflow: hidden
        font-size: 0.26rem
        color: #fff
        span
          color: #FDC125
        .imgs
          float: left
          margin-right: 0.25rem
        p
          float: left
          width: 5.5rem
        .point
          margin-bottom: 0.3rem
          overflow: hidden
          img
            width: 0.81rem
            height: .51rem
        .msg img
          width: 0.81rem
          height: .47rem
    .info
      width: 6.6rem
      margin: auto
      .session
        margin-bottom: 0.3rem
        overflow: hidden
        &:first-child
          margin-top: 0.3rem
      .code
        width: 2.2rem
        height: 0.87rem
        border:none
        outline: none
        line-height: 0.87rem
        color: #fff
        background: #FDC125
        border-radius: 0.1rem
        text-align: center
        font-size: 0.28rem
        float: left
        overflow: hidden
      .imgCode img
        width: 100%
        height: 100%
      input::-webkit-input-placeholder
        color:#ccc
        font-size:0.3rem
      input:-moz-placeholder
        color:#ccc
        font-size:0.3rem
      input::-moz-placeholder
        color:#ccc
        font-size:0.3rem
      input:-ms-input-placeholder
        color:#ccc
        font-size:0.3rem
      input
        display: block
        font-size: 0.3rem
        outline: none
        -webkit-appearance: none
        border: 1px solid #FBB67A
        border-radius: 0.1rem
        color: #333
        padding-left: 0.3rem
        width: 100%
        height: 0.87rem
        margin: auto
        background: #fff
        box-shadow: none
      .codeIpt
        width: 3.85rem
        float: left
        margin-right: 0.55rem
    .agree
      color: #fff
      font-size: 0.24rem
      width: 6rem
      padding-left: 0.56rem
      line-height: 0.4rem
      margin: auto
      margin-top: 0.3rem
      position: relative
      input
        margin-right: 0.2rem
        visibility: hidden
        position: absolute
        left: 0
        z-index: 1
      label
        display: inline-block
        width: 0.36rem
        height: 0.36rem
        position: absolute
        left: 0
        top: 0.02rem
        z-index: 10
        background: url(../../assets/images/activity/be-invited/select1.png)center no-repeat
        background-size: 100%
        &.checkBg
          background: url(../../assets/images/activity/be-invited/select2.png)center no-repeat
          background-size: 100%
      span
        color: #FE7814
      a
        color: #FDC125
        text-decoration: none
    .footer
      padding: 0.55rem 0 0rem
      overflow: hidden
      .btn
        display: block
        width: 3.37rem
        height: .8rem
        color: #fe4022
        text-align: center
        line-height: .85rem
        font-size: .33rem
        border-radius: .5rem
        background: -webkit-linear-gradient(#FADCA8, #FEC123)
        background: -o-linear-gradient(#FADCA8, #FEC123)
        background: -moz-linear-gradient(#FADCA8, #FEC123)
        background: linear-gradient(#FADCA8, #FEC123)
        margin: auto
        box-shadow: 0 5px 20px rgba(254,193,35,.3)
      .advantage
        text-align: center
        margin-bottom: 0.9rem
        margin-top: 0.5rem
        img
          width: 5.68rem
          height: 5.27rem
      ul
        width: 100%
        margin: 0 0 1rem
        overflow: hidden
        font-size: 0.24rem
        color: #999999
        li
          float: left
          width: 50%
          text-align: center
          &.margin
            margin-bottom: 1.05rem
      .address
        text-align: center
        font-size: 0.26rem
        padding-bottom: 0.85rem
        color: #fff
        p
          margin-bottom: 0.1rem
          a
            color: #FDC125
            text-decoration: none
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
  .resigers
    text-align: center
    height: 8.01rem
    width: 5.76rem
    position: fixed
    top: 50%
    left: 50%
    z-index: 99999
    margin-left: -2.88rem
    margin-top: -4.005rem
  .resigers .opne
    width: 5.76rem
    height: 6.49rem
  .resigers .close
    width: 1.01rem
    height: 1.01rem
    margin-top: 0.56rem
</style>