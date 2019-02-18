<template>
  <div class="fix">
    <div class="addBox">
      <td-header title="出借"/>
      <div class="addTop">
        <span>项目可投余额(元)</span>
        <span>{{ surplus }}</span>
      </div>
      <div class="inpMoney">
        <p>出借金额</p>
        <div class="inputs">
          <input
            v-model="importMoney"
            :disabled="Cutsurplus<100"
            type="number"
            placeholder="100元起投"
            @input="oninput"
            @change="change">
          <span @click="lastInvest">余额全投</span>
        </div>
        <div class="showMoney">
          <p>可用余额<b> {{ cashBalance }}</b>元</p>
          <router-link to="/recharge">充值</router-link>
        </div>
      </div>
      <div
        class="discounts"
        @click="disList">
        <span>可用优惠券</span>
        <span> <b
          v-if="disTxt"
          class="on">{{ disTxt }}</b> <b v-else>请选择优惠券</b> <i class="iconfont">&#xe6f2;</i> </span>
      </div>
      <div class="earnings">预计收益<span>0.00元</span></div>
      <div class="sub_btn">
        <button
          v-if="Cutsurplus < 100"
          :disabled="deal == true?false:true"
          :class="{tdButton: deal == true?false:true}"
          @click="subInvest">实付：{{ moneyForm }}元，确认出借
        </button>
        <button
          v-else
          :disabled="importMoney >= 100 && deal == true?false:true"
          :class="{tdButton: importMoney >= 100 && deal == true?false:true}"
          @click="subInvest">实付：{{ moneyForm }}元，确认出借
        </button>
      </div>
      <div class="clause">
        <i @click="consentFn()">
          <b
            v-if="deal"
            class="iconfont on">&#xe6f8;</b>
          <b
            v-else
            class="iconfont">&#xe6f9;</b>
        </i>
        <span>已阅读并同意<router-link to="" >《网络借贷禁止性行为说明》</router-link> <router-link to="" >《借款协议》</router-link> <router-link to="" >《网络借贷风险提示书》</router-link></span>
      </div>
      <div
        :is="listTxt"
        :disId="disId"
        :disType="disType"
        :disTxt="disTxt"
        :moneys="importMoney"
        @colseFn="colseFn"/>
      <Layer
        v-show="balanceShow"
        close="取消"
        submit="充值"
        @on-close="balanceClose()"
        @on-sub="balanceSub()" >
        <div class="balance_txt">账户余额不足，请先充值</div>
      </Layer>
      <Layer
        v-show="appraisalShow"
        close="不同意"
        submit="同意"
        @on-close="appraisalClose()"
        @on-sub="appraisalSub()" >
        <div class="appraisal_txt">您当前的风险测评结果为<span>[{{ evaluationType }}]</span>，可投本金总额不超过40万元，您剩余可投本金<span>[{{ cashBalance }}元]</span>。请重新测评以便更好地了解自身风险承受能力。</div>
      </Layer>
      <Layer
        v-show="dealShow"
        close="不同意"
        submit="同意"
        @on-close="dealClose()"
        @on-sub="dealSub()" >
        <div class="protocol_txt">
          <div class="protocol_box">
            <Ban/>
            <Scatter/>
          </div>
        </div>
      </Layer>
    </div>
  </div>
</template>

<script>
import List from '~/components/business/invest/add/discount-list.vue'
import Ban from '~/components/business/protocol/src/ban.vue'
import Scatter from '~/components/business/protocol/src/scatter.vue'
import { myBankAssets, getEvaluationInfo } from '~/api/user.js'
import { scatterDetail, investScatterAdd } from '~/api/project.js'
import { commenParams } from '~/api/config.js'
import CryptoJS from 'crypto-js'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      importMoney: '',
      moneyForm: '0.00',
      deal: false,
      listTxt: '',
      disTxt: null,
      disId: null,
      disType: null,
      balanceShow: false,
      appraisalShow: false,
      dealShow: false,
      cashBalance: 0,
      income: 0,
      award: 0, // 加息券5%加息即为5
      disVoucherId: '', // 优惠券编码
      evaluationScoreMsg: '',
      joinId: null,
      surplus: null,
      types: {},
      periods: ''
    }
  },
  computed: {
    isLogin() {
      return {
        isLogin: this.$store.state.isLogin
      }
    },
    Cutsurplus() {
      return this.surplus.replace(',', '')
    },
    evaluationStatus() {
      return this.$store.state.evaluationStatus
    },
    evaluationType() {
      return this.$store.state.evaluationType
    }
  },
  created() {
    commenParams.accessId = this.$store.state.accessId
    commenParams.accessKey = this.$store.state.accessKey
    scatterDetail(this.$axios, this.$route.params.desId).then(res => {
      this.surplus = res.content.surplus
      this.periods = res.content.period
      this.joinId = res.content.desId
      this.types = {
        type: res.content.repaymentType,
        interest: res.content.apr,
        time: res.content.period
      }
      this.lastWork()
    })
    myBankAssets(this.$axios).then(res => {
      // this.cashBalance = res.content.cashBalance
      this.cashBalance = '100000'
    })
    // getEvaluationInfo(this.$axios).then(res => {
    //   console.log(res)
    //   // this.evaluationScoreMsg = res.content.evaluationScoreMsg
    // })
  },
  mounted() {
    if (!this.isLogin) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    // 扫尾
    lastWork() {
      if (Number(this.surplus.replace(',', '')) < 100) {
        this.importMoney = this.surplus
        this.incomes()
      }
      this.moneyForm = this.numFilter(this.importMoney)
    },
    encryptByDES(message, key) {
      const keyHex = CryptoJS.enc.Utf8.parse(key)
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },
    subInvest() {
      let psw = this.joinId + String(this.importMoney) + '242628'
      console.log(psw)
      console.log(this.encryptByDES(psw, '20181224'))
      if (
        Number(this.importMoney) > Number(this.cashBalance.replace(',', ''))
      ) {
        this.balanceShow = true
        return false
      } else {
        this.dealShow = true
      }
    },
    consentFn() {
      this.deal = !this.deal
    },
    change() {
      this.disTxt = null
      this.disId = null
      this.disType = null
      this.disVoucherId = ''
      this.award = 0
      this.incomes()
    },
    oninput(e) {
      if (e.target.value > Number(this.surplus.replace(',', ''))) {
        e.target.value = Number(this.surplus.replace(',', ''))
      }
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.importMoney = e.target.value
      this.moneyForm = this.numFilter(this.importMoney)
      this.change()
    },
    lastInvest() {
      if (Number(this.surplus.replace(',', '')) < 100) {
        return false
      } else if (
        Number(this.cashBalance.replace(',', '')) >
        Number(this.surplus.replace(',', ''))
      ) {
        this.importMoney = Number(this.surplus.replace(',', ''))
        return false
      } else {
        this.importMoney = this.cashBalance
      }
      this.moneyForm = this.numFilter(this.importMoney)
      this.change()
    },
    colseFn(...data) {
      this.disId = data[1]
      this.disVoucherId = data[2]
      this.disType = data[3]
      this.listTxt = ''
      if (this.disType === 'jx') {
        this.award = data[0]
        this.disTxt = data[0] + '%加息券'
      } else if (this.disType === 'dk') {
        this.award = 0
        this.disTxt = data[0] + '元抵用券'
        this.moneyForm = this.numFilter(
          this.importMoney - data[0].replace(',', '')
        )
      } else {
        this.award = 0
      }
      this.incomes()
    },
    disList() {
      this.listTxt = 'List'
    },
    balanceClose() {
      this.balanceShow = false
    },
    balanceSub() {
      this.$router.push({
        name: 'myCenter-fund-recharge'
      })
    },
    appraisalSub() {
      this.$router.push({
        name: 'appraisal-indexs'
      })
    },
    appraisalClose() {
      this.appraisalShow = false
    },
    dealClose() {
      this.dealShow = false
    },
    dealSub() {
      let psw = this.joinId + String(this.importMoney)
      investScatterAdd(this.$axios, {
        joinId: this.joinId,
        account: this.importMoney,
        voucherId: this.disVoucherId,
        voucherType: this.disType,
        sycnReturnUrl:
          this.$store.state.returnPath + 'project/result/scatter-addResult',
        accountInterest: this.income,
        secretParam: this.encryptByDES(psw, '20181224')
      }).then(res => {
        let nonce = res.content.nonce
        this.$router.push({
          name: 'xwDeposit-transit',
          params: {
            sign: nonce
          }
        })
      })
    },
    numFilter(value) {
      if (value != '') {
        let transformVal = parseFloat(value).toFixed(3)
        let realVal = transformVal.substring(0, transformVal.length - 1)
        return realVal
      } else {
        return '0.00'
      }
    },
    // 预计收益计算方式
    incomes() {
      let projectStyle = this.types.type
      console.log(projectStyle)
      //endday 按天计息,等额本息,按月付息 到期还本
      //投资金额
      let account = 0
      if (this.importMoney < 100) {
        account = 0
      } else {
        account = this.importMoney
      }
      //基本利息
      let apr = this.types.interest
      //期限  月/天
      let period = this.types.time
      //平台加息
      let award = this.award
      // 期限的计算方式（按天还是按月）
      let val = null
      let preMonth = null
      let preMonthAll = null
      if (projectStyle === 'endday') {
        val = 365
      } else {
        val = 12
      }
      if (projectStyle === '等额本息') {
        let perMonthAprAll = (apr * 0.01 + award * 0.01) / 12
        let perMonthApr = (apr * 0.01) / 12
        let allAward = null
        preMonth = Number(
          (account * perMonthApr * Math.pow(1 + perMonthApr, period)) /
            (Math.pow(1 + perMonthApr, period) - 1)
        ).toFixed(2)
        preMonthAll = Number(
          (account * perMonthAprAll * Math.pow(1 + perMonthAprAll, period)) /
            (Math.pow(1 + perMonthAprAll, period) - 1)
        ).toFixed(2)
        allAward = Number((preMonthAll - preMonth) * period).toFixed(2)
        let leftAcc = account //剩余本金
        let profit = 0
        for (let i = 0; i < period; i++) {
          let per = i + 1 + '/' + period
          let perCapital = null
          let perInterest = null
          if (i === period - 1) {
            perCapital = leftAcc
            perInterest = (leftAcc * perMonthApr).toFixed(2)
            preMonth = Number(perCapital) + Number(perInterest)
          } else {
            perInterest = (leftAcc * perMonthApr).toFixed(2)
            perCapital = (preMonth - perInterest).toFixed(2)
          }
          profit = Number(Number(profit) + Number(perInterest)).toFixed(2)
          leftAcc =
            Number(Number(leftAcc) - Number(perCapital)).toFixed(2) < 0.2
              ? 0
              : Number(Number(leftAcc) - Number(perCapital)).toFixed(2)
        }
        //总利息
        this.income = Number(Number(allAward) + Number(profit)).toFixed(2)
      } else if (projectStyle === '到期还本，按月付息') {
        let profit = Number(
          (account * (award + apr) * 0.01 * period) / val
        ).toFixed(2)
        this.income = profit
      } else if (projectStyle === 'endday') {
        let allAward = Number(
          (account * (award + apr) * 0.01 * period) / val
        ).toFixed(2)
        this.income = allAward
      }
    }
  },
  components: {
    List,
    Scatter,
    Ban
  }
}
</script>

<style lang="stylus" scoped>
.fix
  position: fixed
  z-index: 101
  width: 100%
  height: 100%
  background: $color-background
  top: 0
  left: 0
  right: 0
  bottom: 0
  .addBox
    width: 100%
    padding-top: 88px
    .addTop
      width: 100%
      line-height: 74px
      padding: 0 30px
      font-size: $fontsize-medium
      background-color: $color-white
      overflow: hidden
      span:nth-child(1)
        color: $color-gray1
        float: left
      span:nth-child(2)
        float: right
        color: $color-gray3
    .inpMoney
      background-color: $color-white
      padding: 0 30px
      margin-top: 20px
      p
        font-size: $fontsize-medium
        color: $color-gray3
        b
          color: $color-gray1
      div
        font-size: $fontsize-medium
        span,a
          color: $color-primary
          float: right
        p
         display: inline-block
      p:nth-child(1)
        padding-top: 30px
      .showMoney
        line-height: 102px
        p
          padding: 0
      .inputs
        height: 110px
        border-bottom: 1px solid #E8E8E8
        input
          line-height: 108px
          font-size: 58px
          width: 70%
          float: left
          caret-color: $color-primary
          color: $color-gray1
        input::-webkit-input-placeholder
          font-size: $fontsize-large-xxxxxxx
        input:-moz-placeholder
          font-size: $fontsize-large-xxxxxxx
        input::-moz-placeholder
          font-size: $fontsize-large-xxxxxxx
        input:-ms-input-placeholder
          font-size: $fontsize-large-xxxxxxx
        span
          display: inline-block
          line-height: 108px
    .discounts
      font-size: $fontsize-medium
      color: $color-gray3
      line-height: 100px
      background-color: $color-white
      margin-top: 20px
      padding: 0 30px
      span:nth-child(2)
        color: $color-gray1
        float: right
      .on
        color: $color-primary
    .earnings
      width: 100%
      overflow: hidden
      font-size: $fontsize-medium
      color: $color-gray1
      text-align: right
      line-height: 80px
      padding: 0 30px
      span
        color: $color-primary
    .sub_btn
      padding: 0 30px
      button
        width: 100%
        height: 74px
        background: $color-primary
        border-radius: 34px
        color: $color-white
        font-size: $fontsize-large-x
      .tdButton
        background: $color-gray6
    .clause
      font-size: $fontsize-small-sss
      color: $color-gray3
      padding: 30px 60px 0 40px
      overflow: hidden
      span
        display: inline-block
        text-align: justify
        width: 90%
        line-height: 40px
      i
        display: inline-block
        padding-top: 3px
        width: 6%
        text-align: center
        font-size: $fontsize-large-x
        vertical-align: top
        color: $color-gray4
        .on
          color: $color-assisted
      a
        color: $color-primary
  .balance_txt
    font-size: $fontsize-medium
    color: $color-gray1
    text-align: center
    padding: 52px 0 20px
  .appraisal_txt
    font-size: $fontsize-medium
    color: $color-gray1
    padding: 52px 30px 30px
    text-align: justify
    span
      color: $color-assisted
  .protocol_txt
    height: 5rem
    padding-top: 20px
    .protocol_box
      height: 100%
      overflow: scroll
      -webkit-overflow-scrolling: touch
</style>
