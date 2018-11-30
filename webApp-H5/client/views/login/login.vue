<template>
  <div class="login_box">
    <Header :navLeftTxt="'取消'" @navLeftFn="navLeftFn()" >登录/注册</Header>
    <div class="phone_box">
      <div class="phone">
        <span>账号</span>
        <input type="tell" placeholder="请输入手机号" maxlength="11" v-model="phoneVal">
        <i class="iconfont" v-show="phoneVal" @click="emptyVal()">&#xe69d;</i>
      </div>
      <div class="hint_phone" v-show="phoneVal">{{phoneVal}}</div>
      <div class="sub_btn">
        <div class="td_btn" :class="phoneVal.length == 11?'td_btnHig':'td_btnNo'" @click="subBth()">确定</div>
      </div>
      <p>拓道金服承诺不会泄露您的个人信息</p>
    </div>
    <Popup v-show="layerCode" @on-close="codeClose()" @on-sub="codeSub()" close="取消" submit="确定">
      <div class="importTxt">
        <input type="text" placeholder="请输入图片验证" v-model="phoneCode"/>
        <img src="../../assets/images/phoneCode.jpg" alt="">
      </div>
    </Popup>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        phoneVal: '',
        layerCode: false,
        phoneCode: '',
        layer_show: true
      }
    },
    mounted () {
    },
    methods: {
      layerShow () {
        this.layer_show = !this.layer_show
      },
      emptyVal () {
        this.phoneVal = ''
      },
      subBth () {
        let val = this.phoneVal
        if (val.length === 11) {
          this.layerCode = true
        }
      },
      navLeftFn () {
        console.log('点击了取消')
      },
      codeClose () {
        this.layerCode = false
        console.log(this.layerCode)
      },
      codeSub () {
        if (!this.phoneCode) {
          this.$Msg('请输入验证码', 2000)
        }
      }
    },
    components: {
      // Layer
    }
  }
</script>

<style lang="stylus" scoped>
  .login_box
    height: 100%
    background-color: #F2F3F7
    padding-top: 0.88rem
    box-sizing: border-box
    .phone_box
      overflow: hidden
    .phone
      height: 0.9rem
      background-color: #fff
      padding: 0 0.3rem
      margin-top: 0.3rem
      span
        display: block
        color: #333
        font-size: 0.26rem
        line-height: 0.9rem
        float: left
        padding: 0 0.4rem 0 0.1rem
      input
        display: block
        height: 100%
        width: 75%
        font-size: 0.26rem
        float: left
        border: none
        caret-color:#7b99ef
        color: #333
      i
        display: block
        float: right
        font-size: 0.36rem
        color: #D8D8D8
        line-height: 0.9rem
        padding-right: 0.3rem
    .hint_phone
      width: 90%
      height: 0.9rem
      line-height: 0.9rem
      background-color: #cce6f5
      border-radius: 5px
      margin: 0.22rem auto 0
      position: relative
      font-size: 0.46rem
      color: #6695d2
      text-align: center
    .hint_phone:after
      content: ''
      position: absolute
      top: -0.4rem
      left: 50%
      margin-left: -0.2rem
      display: block
      border-width: 0.2rem
      border-style: solid
      border-color: transparent transparent #cce6f5 transparent
    .sub_btn
      width: 90%
      margin: 0.6rem auto 0
    p
      font-size: 0.26rem
      color: #8f8f8f
      text-align: center
      line-height: 1.1rem
    .importTxt
      overflow: hidden
      padding: 0.4rem 0.3rem
      input
        width: 55%
        height: 0.7rem
        display: block
        float: left
        border: 1px solid #ccc
        padding: 0 0.1rem;
        box-sizing: border-box
        font-size: 0.28rem
      img
        width: 40%
        height: 0.6rem
        display: block
        float: right
        margin-top: 1.5%
    .code_btn
      line-height: 0.8rem
      font-size: 0.28rem
      display: flex
      border-top: 1px solid #ccc
      div
        flex: 1
        text-align: center
        cursor: pointer
        -webkit-tap-highlight-color: transparent
      .code_btn1
        color: #ccc
        border-right: 1px solid #ccc
      .code_btn2
        color: #FF6600
  .layer_hd
    img
      width: 6rem
      height: 7rem
</style>
