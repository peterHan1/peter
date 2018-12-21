<template>
  <div class="Td_share">
    <!-- <title-nav :titles="titles"></title-nav> -->
    <div class="banner">
      <img src="../../assets/images/activity/td-share/banner.png" />
    </div>
    <div class="register_box">
      <div class="banner_shada"></div>
      <div class="register">
        <div class="register_inp">
          <ul>
            <li>
              <div class="list_div">
                <span class="phone"></span>
                <div class="inp_div">
                  <input type="number" placeholder="请输入手机号码" class="phone_ipnut" maxlength="11" @blur="onBlur" v-model="phoneValue" @keyup="phoneValue=phoneValue.replace(/^ +| +$/g,'')"/>
                </div>
              </div>
            </li>
            <li class="imgCode_li">
              <div class="list_div"><span class="imgCode"></span><div class="inp_div"><input type="text" placeholder="请输入图形验证码" class="imgCode_input" v-model="imgCodeValue" /></div></div>
              <img :src="imgCodeSrc" @click="getImgCode" />
            </li>
            <li class="phoneCode_li">
              <div class="list_div"><span class="phoneCode"></span><div class="inp_div"><input type="text" placeholder="请输入短信验证码" class="phoneCode_input" v-model="msgCodeValue" /></div></div>
              <div class="get_code" id="get_code" :class="{get_codes: active}" @click="getMsgCode">获取验证码</div>
            </li>
            <li>
              <div class="list_div"><span class="psd"></span><div class="inp_div"><input type="password" placeholder="请设置6-16位登录密码" class="psw_input" v-model="pswValue" /></div></div>
            </li>
          </ul>
          <div class="read">
            <div class="checkbox" :class="{checkboxs: checked}" id="checkbox" @click="checkbox" v-model="checked"></div>
            <label for="checkbox">我已阅读并同意《拓道金服用户注册协议》</label>
          </div>
          <div class="sub_register" @click="register" @touchstart="showActive = !showActive" @touchend.prevent="showActive = !showActive"><span v-if="showActive"></span><b>立即注册</b></div>
        </div>
      </div>
    </div>
    <div class="td_bg">
      <div class="td_explain">
        <h3>预期收益非平台承若收益，市场有风险，出借需谨慎</h3>
        <p>浙ICP证B2-20160394 浙ICP备13034095号</p>
        <h2>杭州拓道互联网金融服务有限公司</h2>
        <h2>杭州市西湖区中节能西溪首座</h2>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import imgCode from '../../assets/images/activity/td-share/img-code.jpg'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      titles: {
        'title': '',
        'right': '',
        'url': '',
        'color': '',
        'iconShow': true
      },
      phoneValue: '',
      imgCodeValue: '',
      imgCodeSrc: imgCode,
      active: false,
      time: '',
      num: 60,
      checked: false,
      msgCodeValue: '',
      pswValue: '',
      showActive: false
    }
  },
  methods: {
    onBlur () {
      if (/^1[345678]\d{9}$/.test(this.phoneValue)) {
        // ajax请求接口是否注册 如果已经注册 弹窗提示
        // $("#result_yet").show();
      } else {
        // 请输入正确的手机号
      }
    },
    getImgCode () {
      this.imgCodeSrc = 'https://www.51tuodao.com/authImage?t=' + new Date().getTime()
    },
    getMsgCode () {
      if (this.active) {
        return false
      } else {
        if (/^1[345678]\d{9}$/.test(this.phoneValue) && this.imgCodeValue !== '') {
          this.getCode()
        } else if (/^1[345678]\d{9}$/.test(this.phoneValue) === false) {
          console.log('请输入正确的手机号')
        } else if (this.imgCodeValue === '') {
          console.log('图形验证码不正确')
        }
      }
    },
    getCode () {
      axios({
        method: 'post',
        url: 'http://72.127.2.135:8082/api/front/operation/getIdentifyingCode',
        params: {phone: this.phoneValue, inputCode: this.imgCodeValue},
        timeout: 6000
      }).then(response => {
        if (response.data) {
          if (response.data.response.info.code === 100000) {
            this.code = response.data.response.content.code
            // 验证码已发送到您手机
            this.time = setInterval(() => {
              this.active = true
              this.num--
              this.codeWord = this.num + 's后重发'
              if (this.num < 0) {
                clearInterval(this.time)
                this.num = 60
                this.codeWord = '重新获取'
                this.active = false
              }
            }, 1000)
          } else if (response.data.response.info.code === 700002) {
            // 验证码获取次数已用完，请明日重试
          } else if (response.data.response.info.code === 700001) {
            // 发送短信太过频繁
          } else if (response.data.response.info.code === 800103) {
            // 图形验证码错误，请重新输入
          } else if (response.data.response.info.code === 800102) {
            // 图形验证码失效，请尝试刷新验证码
          } else {
            // response.data.response.info.msg
          }
        } else {
          // 网络出错,请稍后重试')
        }
      })
    },
    checkbox () {
      if (this.checked) {
        this.checked = !this.checked
      } else {
        this.checked = !this.checked
      }
    },
    register () {
      let phone = /^1[345678]\d{9}$/.test(this.phoneValue)
      let pswLength = this.pswValue.length
      if (!phone) {
        // 请输入正确的手机号
      } else if (this.imgCodeValue === '') {
        // 请输入图形验证码
      } else if (this.msgCodeValue === '') {
        // 请输入短信验证码
      } else if (pswLength < 6 || pswLength > 16) {
        // 请设置6-16位登录密码
      } else if (this.checked === false) {
        // 请阅读并同意《拓道金服用户注册协议》
      } else if (this.phoneValue !== '' && this.imgCodeValue !== '' && this.msgCodeValue !== '' && this.pswValue !== '') {
        // 请求接口
      }
    }
  },
  components: {
    // titleNav
  }
}
</script>
<style lang="stylus" scoped>
  *
    font-family: "PingFang SC"
    -webkit-tap-highlight-color: rgba(0,0,0,0)
  .Td_share
    .banner
      width: 100%
      height: 3.84rem
      z-index:9
      img
        width: 100%
        height: 100%
        z-index:9
    .register_box
      position: relative
      height: 10rem
    .banner_shada
      position: absolute
      left:0
      top:-0.5rem
      right:0
      width: 100%
      background-color: #000
      height:0.5rem
      background: -webkit-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.1))
      background: -o-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.1))
      background: -moz-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.1))
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.1))
    .register
      position: absolute
      left:0
      top:-0.45rem
      right:0
      bottom:0
      width: 100%
      background: url(../../assets/images/activity/td-share/register.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
      .register_inp
        width: 100%
        height: 9.42rem
        margin-top: 0.9rem
        text-align: center
        background: url(../../assets/images/activity/td-share/register-inp.png) no-repeat
        -webkit-background-size: 100% 100%
        background-size: 100% 100%
        ul
          padding: 2.7rem 0.8rem 0
          overflow: hidden
          li
            .list_div
              height: 0.8rem
              float: left
              line-height: 0
              width: 100%
              background-color: #f6e7c7
              margin-bottom: 0.3rem
              border-radius: 5px
          li.imgCode_li .list_div,.inp_div
            width: 65%
          li.imgCode_li img
            float: right
            height: 0.8rem
            width: 32%
            border-radius: 5px
          li.phoneCode_li .list_div,.inp_div
            width: 65%
          li #get_code
            float: right
            height: 0.8rem
            line-height:0.8rem
            text-align:center
            width: 32%
            border-radius: 5px
            font-size: 0.28rem
            color: #9d773b
          li .get_code
            background-color: #fff
          li .get_codes
            background-color: #f6e7c7
          li span
            display: inline-block
            margin-top: 0.2rem
            float: left
          li .inp_div
            height: 100%
            float: left
            margin-left: 0.22rem
            position: relative
          li .inp_div:before
            content: " "
            position: absolute
            left: 0px
            top: 50%
            width: 1px
            height: 0.28rem
            background-color: #c4a77b
            -webkit-transform: translateY(-50%)
            -moz-transform: translateY(-50%)
            -ms-transform: translateY(-50%)
            -o-transform: translateY(-50%)
            transform: translateY(-50%)
          li:last-child span
            margin-top: 0.1rem
          li input::-webkit-input-placeholder
            color: #c4a77b
          li input:-moz-placeholder
            color:#c4a77b
          li input::-moz-placeholder
            color:#c4a77b
          li input:-ms-input-placeholder
            color:#c4a77b
          li input
            width: 100%
            height:100%
            caret-color:#c4a77b
            font-size: 0.28rem
            color:#9d773b
            border: none
            background-color: transparent
            outline: none
            padding-left: 0.25rem
          li span.phone
            width: 0.31rem
            height: 0.4rem
            margin-left: 0.37rem
            background: url(../../assets/images/activity/td-share/phone.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
          li span.imgCode
            width: 0.4rem
            height: 0.34rem
            margin-left: 0.32rem
            background: url(../../assets/images/activity/td-share/img-code.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
          li span.phoneCode
            width: 0.4rem
            height: 0.4rem
            margin-left: 0.32rem
            background: url(../../assets/images/activity/td-share/phone-code.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
          li span.psd
            width: 0.42rem
            height: 0.42rem
            margin-left: 0.3rem
            background: url(../../assets/images/activity/td-share/psd.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
        .read
          font-size: 0.22rem
          color: #725221
          padding-left: 0.8rem
          text-align: left
          label
            display: inline-block
          .checkbox
            display: inline-block
            width: 0.26rem
            height: 0.26rem
            vertical-align: middle
            background: url(../../assets/images/activity/td-share/checkbox2.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
          .checkboxs
            background: url(../../assets/images/activity/td-share/checkbox.png) no-repeat
            -webkit-background-size: 100% 100%
            background-size: 100% 100%
        .sub_register
          position:relative
          font-size: 0.36rem
          color: #fff
          margin-top: 0.5rem
          display: inline-block
          width: 3.84rem
          height: 1.04rem
          line-height: 0.96rem
          text-align: center
          background: url(../../assets/images/activity/td-share/btn-reg.png) no-repeat
          -webkit-background-size: 100% 100%
          background-size: 100% 100%
          span
            position:absolute
            left:0.12rem
            top:0.07rem
            border-radius: 5px
            display: inline-block
            width: 3.6rem
            height: 0.8rem
            background-color: rgba(0,0,0,0.1)
          b
            z-index: 99
            font-weight: normal
    .td_bg
      width: 100%
      height: 18.62rem
      background: url(../../assets/images/activity/td-share/td-bg.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
      position: relative
      .td_explain
        position: absolute
        left: 0
        right: 0
        bottom: 0
        text-align: center
        padding-bottom: 0.4rem
        h2
          font-size: 0.22rem
          color: #513d1f
          line-height: 0.38rem
        h3
          font-size: 0.24rem
          color: #513d1f
        p
          font-size: 0.2rem
          color: #513d1f
          margin: 0.14rem 0 0.26rem
.result_layer .layer_txt
  width: 6.53rem
  height: 5.89rem
  text-align: center
  position: fixed
  top:50%
  left:50%
  z-index: 99
  background: url(../../assets/images/activity/td-share/result-layer.png) no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  -webkit-transform: translateY(-50%) translateX(-50%)
  -moz-transform: translateY(-50%) translateX(-50%)
  -ms-transform: translateY(-50%) translateX(-50%)
  -o-transform: translateY(-50%) translateX(-50%)
  transform: translateY(-50%) translateX(-50%)
.result_layer .layer_txt .txt
  height: 2.4rem
  margin-top: 1.8rem
.result_layer .layer_txt .txt p
  font-size:0.56rem
  color: #9d773b
.result_layer .layer_txt .close_x
  display: inline-block
  font-size: 0.5rem
  color: #c99860
  position: absolute
  top: -0.3rem
  right: 0.1rem
.result_layer .layer_txt .download_btn
  position:relative
  margin: 0 auto 0
  font-size: 0.36rem
  color: #fff
  width: 3.84rem
  height: 1.04rem
  line-height: 0.96rem
  text-align: center
  background: url(../../assets/images/activity/td-share/btn-reg.png) no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
.result_layer .layer_txt .download_btn span
  position:absolute
  left:0.12rem
  top:0.07rem
  border-radius: 5px
  display: inline-block
  width: 3.6rem
  height: 0.8rem
  background-color: rgba(0,0,0,0.1)
.result_layer .layer_txt .download_btn b
  font-weight: normal
.result_layer .shada
  position: fixed
  left:0
  right:0
  top:0
  bottom:0
  background-color: rgba(0,0,0,0.5)
#result_ok .layer_txt .txt p
  line-height: 2.4rem
#result_yet .layer_txt .txt
  padding-top: 0.5rem
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
.layer_xy
  line-height:0.8rem
  padding:0 0.3rem
  border-radius: 5px
  position: fixed
  top: 50%
  left: 50%
  background-color: rgba(0,0,0,0.6)
  -webkit-transform: translateY(-50%) translateX(-50%)
  -moz-transform: translateY(-50%) translateX(-50%)
  -ms-transform: translateY(-50%) translateX(-50%)
  -o-transform: translateY(-50%) translateX(-50%)
  transform: translateY(-50%) translateX(-50%)
.layer_xy div
  font-size: 0.24rem
  color:#fff
  white-space: nowrap
</style>