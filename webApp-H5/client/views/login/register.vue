<template>
  <div class="register_box">
    <Header :navLeftTxt="'icon'" @navLeftFn="navLeftFn()" >注册</Header>
    <div class="reg_box">
      <ul>
        <li>
          <span>图形验证码</span>
          <input type="text" placeholder="请输入图形验证码" class="codeInp" v-model="imgCode" />
          <img src="../../assets/images/login/phoneCode.jpg" alt="">
        </li>
        <li>
          <span>验证码</span>
          <input type="number" placeholder="请输入验证码" v-model="phoneVal"/>
          <div class="phoneCode count_style" v-if="codeNum">{{countTime}}s</div>
          <div class="phoneCode" @click="getCode()" v-else>获取验证码</div>
        </li>
        <li>
          <span>设置密码</span>
          <input class="inp_width" :type="pwdType" placeholder="设置6-16位字母或数字登录密码" v-model="pwdVal"/>
          <div class="iconfont inpType" @click="inputType()"><b v-if="showIcon">&#xe692;</b><b v-else>&#xe68a;</b></div>
        </li>
      </ul>
      <div class="inviter">
        <p @click="inviterFn()">我有邀请人 <span class="iconfont" :class="[rotate?'up':'down']">&#xe6a3;</span></p>
        <ul v-show="inviter_phone" class="inviterUl">
          <li>
            <span>邀请人</span>
            <input type="text" placeholder="邀请人手机号、推荐码（选填项)" class="inp_width" />
          </li>
        </ul>
      </div>
      <div class="sub_btn">
        <div class="td_btn" :class="phoneVal.length != 0 && pwdVal.length >= 6 && pwdVal.length <= 16 && clauses?'td_btnHig':'td_btnNo'" @click="subBth()">下一步</div>
      </div>
      <div class="clause">
        <i class="iconfont" :class="[clauses?'on':'']" @click="clauseFn">&#xe618;</i>
        <span>我已阅读并同意<router-link to="" >《网贷禁止性行为说明》</router-link><router-link to="" >《网络借贷风险告知书》</router-link>及<router-link to="" >《拓道金服用户注册协议》</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        pwdType: 'password',
        imgCode: '',
        pwdVal: '',
        phoneVal: '',
        showIcon: true,
        inviter_phone: false,
        rotate: false,
        codeNum: false,
        countTime: 5,
        clauses: false
      }
    },
    mounted () {
    },
    methods: {
      subBth () {
        let vm = this
        if (vm.imgCode === '' || vm.phoneVal === '' || vm.pwdVal === '') {
          this.$Msg('请完整填写信息！', 2000)
        } else if (!/^[0-9A-Za-z]{6,16}$/.test(vm.pwdVal)) {
          this.$Msg('请输入6-16位数字或字母密码', 2000)
        } else if (!vm.clauses) {
          this.$Msg('请阅读并同意风险告知书与注册协议', 2000)
        } else {
          // this.$Loading.Load()
          // this.$Loading.Close()
          console.log('注册')
        }
      },
      inputType () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.showIcon = !this.showIcon
      },
      getCode () {
        if (this.imgCode.length === 4) {
          this.codeNum = true
          let timer = setInterval(() => {
            this.countTime--
            if (this.countTime <= 0) {
              this.countTime = 60
              this.codeNum = false
              clearInterval(timer)
            }
          }, 1000)
        } else {
          this.$Msg('请输入正确图形验证码！', 2000)
        }
      },
      inviterFn () {
        this.inviter_phone = !this.inviter_phone
        this.rotate = !this.rotate
      },
      clauseFn () {
        this.clauses = !this.clauses
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .register_box
    height: 100%
    padding-top: 88px
    box-sizing: border-box
    .reg_box
      margin-top: 20px
      ul
        padding: 0 30px
        background-color: #fff
        li
          height: 100px
          border-bottom: 1px solid #efeff4
          position: relative
          overflow: hidden
          span
            display: block
            line-height: 100px
            font-size: 28px
            color: #333
            float: left
            margin-right: 20px
          input
            display: block
            line-height: 98px
            font-size: 28px
            color: #333
            float: left
            caret-color: #ff711c
          .inp_width
            width: 70%
          img
            display: block
            width: 184px
            height: 60px
            float: right
            margin-top: -(@height/2)px
            position: absolute
            right: 0
            top: 50%
          .inpType
            position: absolute
            right: 0
            b
              font-size: 50px
              line-height: 99px
              color: #D8D8D8
          .phoneCode
            display: block
            width: 185px
            line-height: 60px
            font-size: 26px
            color: #fff
            margin-top: -30px
            position: absolute
            right: 0
            top: 50%
            background-color: #FF7102
            text-align: center
            border-radius: 6px
          .count_style
            background-color: #ccc
        li:last-child
          border: none    
      .clause
        font-size: 22px
        color: #999
        padding: 30px 60px 0 40px
        overflow: hidden
        span
          display: inline-block
          text-align: justify
          width: 90%
          line-height: 40px
        i
          display: inline-block
          width: 6%
          height: 100%
          text-align: center
          font-size: 30px
          vertical-align: top
          color: #ccc
        .on
          color: #ff711c
        a
          color: #ff711c
      .inviter
        p
          font-size: 28px
          color: #999
          padding: 40px 30px 20px
          span
            display: inline-block
            font-size: 30px
            color: #999
            margin-left: 10px
          .down
            transition: all 0.5s
          .up
            transform:rotate(-180deg)
            transition: all 0.5s
      .sub_btn
        width: 90%
        margin: 30px auto 0
</style>
