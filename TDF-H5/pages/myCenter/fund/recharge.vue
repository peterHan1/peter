<template>
  <div class="recharge">
    <td-header 
      :returnUrl="false" 
      :url="returnUrl"
      title="充值"
      rightTxt="充值记录"
      @navRightFn="navRightFn"/>
    <div>
      <ul>
        <li>
          <div 
            :class="content.bankCode" 
            class="bankImg"/>
          <div class="bankInfo">
            <p>{{ content.bank }}</p>
            <p>{{ content.account }}</p>
          </div>
        </li>
        <li>
          <div class="inputMoney">
            <i class="iconfont">&#xe704;</i>
            <input 
              v-model="moneyVal"
              :placeholder="placeTxt" 
              :type="inputType" 
              @input="inputFn">
          </div>
        </li>
        <li>
          <p>本次最多可充值 <b>{{ content.money }}</b>元</p>
        </li>
      </ul>
      <div class="sub_btn">
        <td-button
          :disabled="moneyVal >= 100 ?false:true"
          value="充值"
          @btnFn="subBtn"
        />  
      </div>
      <div class="txt">
        <p>1、快捷支付充值时，限额随银行变动调整，以银行限额为准。</p>
        <p>2、如果充值金额未到账，请联系客服 <br> &nbsp;&nbsp;&nbsp;&nbsp; 客服电话：400-85-666-85</p>
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeInfo, quickPay } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const res = await rechargeInfo(app.$axios)
      if (res.code === 100000) {
        store.commit('myCenter/setRecharge', res.content)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
  data() {
    return {
      returnUrl: this.$store.state.srcPath
        ? this.$store.state.srcPath
        : '/myCenter/center',
      moneyVal: null,
      content: this.$store.state.myCenter.rechargeContent,
      placeTxt:
        '输入充值金额，' +
        this.$store.state.myCenter.rechargeContent.minMoney +
        '元起投',
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
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.moneyVal = e.target.value
    },
    navRightFn() {
      this.$router.push({ path: '/myCenter/fund/rachargeRecord' })
    },
    subBtn() {
      if (this.moneyVal >= 100) {
        let params = {
          money: this.moneyVal,
          returnUrl:
            this.$store.state.returnPath + 'myCenter/fund/rechargeResult'
        }
        commenParams.accessId = this.$store.state.accessId
        commenParams.accessKey = this.$store.state.accessKey
        this.$load.Load()
        quickPay(this.$axios, params).then(res => {
          this.$load.Close()
          if (res.code === 100000) {
            this.$router.push({
              name: 'xwDeposit-transit',
              params: {
                sign: res.content.requestInfo
              }
            })
          } else {
            this.$Msg(res.message, 2000)
          }
        })
      }
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .recharge
    width: 100%
    padding-top: 88px
    ul
      margin-top: 20px
      background-color: $color-white
      li
        display: flex
        align-items: center
      li:nth-child(1)
        height: 144px
        border-bottom: 1px solid $color-gray5
        .bankImg
          width: 72px
          height: 72px
          margin-left: 30px
          background-size: 100% 100%
        .bankInfo
          margin-left: 30px
          font-size: $fontsize-medium
          p:nth-child(1)
            line-height: 40px
            color: $color-gray1
          p:nth-child(2)
            line-height: 40px
            color: $color-gray2
      li:nth-child(2)
        padding: 0 30px
        .inputMoney
          height: 128px
          display: flex
          align-items: center
          border-bottom: 1px solid $color-gray5
          i
            font-size: 68px
            color: $color-gray1
            margin-top: -10px
          input
            width: 60%
            line-height: normal
            caret-color: $color-primary
            font-size: $fontsize-large-xxxxxxx
            color: $color-gray1
            background-color: transparent
            margin-left: 10px
          input::-webkit-input-placeholder
            transform: translate(0, -5px)
            line-height: 80px
          input:-moz-placeholder
            transform: translate(0, -5px)
            line-height: 80px
          input::-moz-placeholder
            transform: translate(0, -5px)
            line-height: 80px
          input:-ms-input-placeholder
            transform: translate(0, -5px)
            line-height: 80px
      li:nth-child(3)
        padding: 0 30px
        height: 100px
        color: $color-gray1
        font-size: $fontsize-medium
        border: none
        b
          color: $color-primary
    .sub_btn
      padding: 50px 30px 0
    .txt
        padding: 0 40px
        margin-top: 50px
        p
          font-size: $fontsize-small-ss
          color: $color-gray3
          line-height: 33px
</style>
