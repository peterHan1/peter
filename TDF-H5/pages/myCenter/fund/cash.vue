<template>
  <div 
    v-if="this.$store.state.isLogin" 
    class="cashBox">
    <td-header
      :returnUrl="false" 
      url="/myCenter/center"
      title="提现" 
      rightTxt="提现记录"
      @navRightFn="navRightFn">
      <span>充值记录</span>
    </td-header>
    <div class="bankTop">
      <span>到账银行</span>
      <span v-if="content">{{ content.bankNmae }}(尾号{{ bankVal }})</span>
    </div>
    <div class="inp_money">
      <ul>
        <li>可提现金额 <span v-if="content">{{ content.balance }}</span> <span v-else>-</span>元<i 
          class="iconfont" 
          @click="layerMoney=true">&#xe6f7;</i></li>
        <li>
          <div class="input_money">
            <i class="iconfont">&#xe704;</i>
            <input 
              v-model="moneyVal" 
              :type="inputType" 
              placeholder="输入提现金额，100元起" 
              @input="inputFn">
            <span @click="allMoney()">全部</span>
          </div>
          <div class="cost_money">
            <p>实际到账金额：<b>{{ credited }}</b>元</p>
            <p>手续费：<b>{{ fee }}</b>元 <span>您本月还有<b v-if="content">{{ content.freeTimes }}</b>次免费提现次数</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="selectReturn">
      <ul>
        <li 
          :class="speedAllow?'':'notAllow'" 
          @click="selectCash('urgent')">
          <p>
            <i 
              v-if="inAccount == 'urgent'" 
              class="iconfont">&#xe6f8;</i>
            <i 
              v-else 
              class="iconfont">&#xe6f9;</i>
            快速到账
          </p>
          <div>预计当日到账，单日限额<span>{{ urgent.maxFloatAmount }}</span>元，当日剩余额度<span>{{ floatAmount }}</span>元，限<span>{{ urgent.time }}</span>间操作。</div>
        </li>
        <li @click="selectCash('normal')">
          <p>
            <i 
              v-if="inAccount == 'normal'" 
              class="iconfont">&#xe6f8;</i>
            <i 
              v-else 
              class="iconfont">&#xe6f9;</i>
            普通到账
          </p>
          <div>预计下一个工作日到账，单笔限额{{ normal.maxAccount | setMoney }}万，单日无限额。</div>
        </li>
      </ul>
    </div>
    <div class="sub_btn">
      <td-button
        :disabled="moneyVal > 0 && inAccount != '' ? false : true"
        value="申请提现"
        @btnFn="subCash"
      />
    </div>
    <div class="cashExplan">
      <router-link to="/myCenter/fund/cashExplain">提现说明</router-link>
    </div>
    <Layer 
      v-show="layerMoney" 
      submit="我知道了" 
      @on-sub="layerNow()" >
      <div class="money_txt">
        <p>已出借过可提现金额：<span>{{ content.balanceCashFree }}</span>元</p>
        <p>未出借过可提现金额：<span>{{ content.balanceCashParaFee }}</span>元</p>
      </div>
    </Layer>
    <Layer 
      v-show="cashHint" 
      submit="确定" 
      @on-sub="layerClose()" >
      <div class="hint_txt">{{ hint }}</div>
    </Layer>
    <Layer 
      v-show="cashMaintain" 
      close="否" 
      submit="是" 
      @on-close="maintainClose()" 
      @on-sub="maintainSub()" >
      <div class="maintain_txt">快速到账维护中，是否转普通到账</div>
    </Layer>
  </div>
</template>

<script>
import { prepareDoCash, applyCash, getCashFee } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'
import CryptoJS from 'crypto-js'

export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const res = await prepareDoCash(app.$axios)
      if (res.code === 100000) {
        store.commit('myCenter/setCash', res.content)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
  data() {
    return {
      moneyVal: null,
      inAccount: '',
      speedAllow: this.$store.state.myCenter.cashContent.urgent.open,
      cashMoney: '0.00',
      layerMoney: false,
      cashHint: false,
      cashMaintain: false,
      hint: '',
      content: this.$store.state.myCenter.cashContent,
      bankVal: this.$store.state.myCenter.cashContent.account.substr(-4),
      balance: this.$store.state.myCenter.cashContent.balance.replace(
        /\,/g,
        ''
      ),
      normal: this.$store.state.myCenter.cashContent.normal,
      urgent: this.$store.state.myCenter.cashContent.urgent,
      floatAmount: this.$store.state.myCenter.cashContent.urgent.floatAmount,
      fee: '-',
      credited: '-',
      inputType: ''
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    } else {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.inputType = 'number'
      } else {
        this.inputType = 'tel'
      }
    }
  },
  methods: {
    inputFn(e) {
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]
      this.moneyVal = e.target.value
      this.speedAllow = true
      if (Number(this.moneyVal) > Number(this.balance)) {
        this.moneyVal = this.moneyVal.substr(0, this.moneyVal.length - 1)
      } else if (this.moneyVal >= 100 && this.balance >= 100) {
        this.cashFee(this.moneyVal)
      } else if (this.moneyVal < 100) {
        this.fee = '-'
        this.credited = '-'
      }
      if (Number(this.moneyVal) > Number(this.floatAmount)) {
        this.speedAllow = false
        this.inAccount = ''
      }
    },
    selectCash(a) {
      if (a === 'urgent') {
        if (this.speedAllow) {
          this.inAccount = this.speedAllow ? a : ''
        }
      } else {
        this.inAccount = a
      }
    },
    cashFee(money) {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      if (money >= 100) {
        getCashFee(this.$axios, money).then(res => {
          this.fee = res.content.fee
          this.credited = res.content.credited
        })
      }
    },
    subCash() {
      if (Number(this.moneyVal) > Number(this.balance)) {
        this.$Msg('提现金额大于可提现金额', 2000)
      } else if (this.moneyVal < 100 && this.moneyVal > 0) {
        this.$Msg('提现金额不能低于100元', 2000)
      } else if (this.inAccount && this.moneyVal >= 100) {
        let money = this.moneyVal + '242628'
        // money = this.encryptByDES(money, '201812243')
        let params = {
          account: this.moneyVal,
          secretParam: money,
          withdrawType: this.inAccount,
          redirectUrl: this.$store.state.returnPath + 'myCenter/fund/cashResult'
        }
        commenParams.accessId = this.$store.state.accessId
        commenParams.accessKey = this.$store.state.accessKey
        this.$load.Load()
        applyCash(this.$axios, params).then(res => {
          this.$load.Close()
          if (res.code === 800034) {
            this.cashMaintain = true
          } else if (res.code === 800035) {
            this.cashHint = true
            this.hint = '当前不在快速到账时间内，请选择普通到账提现'
          } else if (res.code === 800036) {
            this.cashHint = true
            this.hint = '提现金额大于快速到账当日剩余额度，请选择普通到账提现'
          } else if (res.code === 100000) {
            let nonce = res.content.nonce
            this.$router.push({
              name: 'xwDeposit-transit',
              params: {
                sign: nonce
              }
            })
          } else {
            this.$Msg(res.message, 2000)
          }
        })
      }
    },
    canHigh() {
      return (
        this.moneyVal >= 100 &&
        this.inAccount != '' &&
        Number(this.moneyVal) <= Number(this.balance)
      )
    },
    encryptByDES(message, key) {
      const keyHex = CryptoJS.enc.Utf8.parse(key)
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },
    allMoney() {
      this.moneyVal = this.balance
      this.cashFee(this.moneyVal)
    },
    layerNow() {
      this.layerMoney = false
    },
    layerClose() {
      this.cashHint = false
      this.speedAllow = false
      this.inAccount = 'normal'
    },
    maintainClose() {
      this.cashMaintain = false
      this.speedAllow = false
      this.inAccount = ''
    },
    maintainSub() {
      this.cashMaintain = false
      this.speedAllow = false
      this.inAccount = 'normal'
    },
    navRightFn() {
      this.$router.push({ path: '/myCenter/fund/cashRecord' })
    }
  },
  filters: {
    setMoney(value) {
      return value / 10000
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cashBox
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .bankTop
      width: 100%
      line-height: 74px
      padding: 0 30px
      font-size: $fontsize-medium 
      background-color: $color-white
      color: $color-gray1
      display: flex
      justify-content: space-between
      span:nth-child(2)
        color: $color-gray3
    .inp_money
      background-color: $color-white
      margin-top: 20px
      ul
        li:nth-child(1)
          border-bottom: 1px solid $color-gray5
          line-height: 73px
          color: $color-gray1
          font-size: $fontsize-medium 
          padding: 0 30px
          span
            color: $color-primary
          i
            margin-left: 15px
            color: $color-gray3
        li:nth-child(2)
          padding: 0 30px
          .input_money
            border-bottom: 1px solid $color-gray5
            overflow: hidden
            display: flex
            align-items: center
            i
              font-size: 68px
              line-height: 110px
            input
              flex: 1
              height: 100%
              width: 50%
              caret-color: $color-primary
              font-size: 64px
              color: $color-gray1
              background-color: transparent
              line-height: normal
            input::-webkit-input-placeholder
              transform: translate(0, -8px)
              line-height: 100px
            input:-moz-placeholder
              transform: translate(0, -8px)
              line-height: 100px
            input::-moz-placeholder
              transform: translate(0, -8px)
              line-height: 100px
            input:-ms-input-placeholder
              transform: translate(0, -8px)
              line-height: 100px
            span
              color: $color-primary
              font-size: $fontsize-medium
              line-height: 110px
          .cost_money
            padding: 22px 0 15px
            p
              font-size: $fontsize-medium 
              color: $color-gray1
              line-height: 40px
              padding-bottom: 16px
              b
                color: $color-primary
              span
                font-size: $fontsize-small-ss
                color: $color-gray3
                float: right
    .selectReturn
      background-color: $color-white
      margin-top: 20px
      ul
        padding: 0 30px
        li
          padding-top: 17px
          height: 170px
        p
          line-height: 60px
          position: relative
          padding-left: 50px
          font-size: $fontsize-medium 
          color: $color-gray1
          i
            position: absolute
            left: 0
            font-size: $fontsize-large-xxx
            color: $color-assisted
        div
          padding-left: 50px    
          padding-right: 19px
          font-size: $fontsize-small-ss
          color: $color-gray3
          line-height: 36px
          span
            color: $color-primary
        li:nth-child(1)
          border-bottom: 1px solid $color-gray5
        .notAllow
          p
            color: $color-gray4
          div
            color: $color-gray4
          i
            color: $color-gray4
          span
            color: $color-gray4
    .sub_btn
      padding: 75px 30px 0
    .cashExplan
      padding-top: 40px
      text-align: center
      a
        font-size: $fontsize-medium 
        color: #F97C3C
    .money_txt
      font-size: $fontsize-small-ss
      color: $color-gray1
      padding: 30px 0 0
      p
        line-height: 40px
        text-align: center
    .hint_txt
      font-size: $fontsize-medium 
      color: $color-gray1
      padding: 60px 40px 16px
    .maintain_txt
      text-align: center
      font-size: $fontsize-medium 
      color: $color-gray1
      padding: 48px 40px 21px  
</style>
