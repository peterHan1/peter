<template>
  <div class="fix">
    <div class="addBox">
      <td-header
        :returnUrl="false"
        :url="lastUrl"
        title="出借"/>
      <div class="addTop">
        <span>项目可投余额(元)</span>
        <span>{{ surplus }}</span>
      </div>
      <div class="inpMoney">
        <p>出借金额</p>
        <div class="inputs">
          <input
            v-model="importMoney"
            :disabled="cutSurplus<100"
            type="number"
            placeholder="100元起投"
            @input="oninput"
            @change="change">
          <span @click="lastInvest">余额全投</span>
        </div>
        <div class="showMoney">
          <p>可用余额<b> {{ cashBalance }}</b>元</p>
          <a @click="balanceSub">充值</a>
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
      <div class="earnings">预计收益<span>{{ income }}元</span></div>
      <div class="sub_btn">
        <button 
          v-if="cutSurplus < 100"
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
        <span>已阅读并同意<router-link to="/project/protocol/banExplain">《网络借贷禁止性行为说明》</router-link> <router-link to="/project/protocol/riskTip">《网络借贷风险提示书》</router-link> <router-link to="/project/protocol/scatterProtocol">《借款协议》</router-link></span>
      </div>
      <div
        :is="listTxt"
        :disId="disId"
        :disType="disType"
        :disTxt="disVal"
        :periods="periods"
        :moneys="StringMoney"
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
        v-show="showDialog"
        close="取消"
        submit="立即评测"
        @on-close="onClose"
        @on-sub="appraisalSub">
        <div class="out_txt">{{ showInfo }}</div>
      </Layer>
      <Layer
        v-show="appraisalShow"
        close="不同意"
        submit="同意"
        @on-close="appraisalClose()"
        @on-sub="appraisalSub()" >
        <div class="appraisal_txt">您当前的风险测评结果为<span>[{{ evaluationType }}]</span>，可投本金总额不超过{{ quota }}万元，您剩余可投本金<span>[{{ limitQuota }}元]</span>。请重新测评以便更好地了解自身风险承受能力。</div>
      </Layer>
      <Layer
        v-show="dealShow"
        close="不同意"
        submit="同意"
        @on-close="dealClose()"
        @on-sub="dealSub" >
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
import { myBankAssets, detailStatus } from '~/api/user.js'
import { scatterDetail, investScatterAdd } from '~/api/project.js'
import { commenParams } from '~/api/config.js'
import CryptoJS from 'crypto-js'
export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      let desId = route.query.desId
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const data = await scatterDetail(app.$axios, desId)
      store.commit('home/setScatterDetails', data.content)
      const datas = await myBankAssets(app.$axios, commenParams)
      if (datas.code == 100000) {
        store.commit('home/setCashBalance', datas.content.cashBalance)
      } else {
        app.router.push({
          name: 'user-login'
        })
      }
    } else {
      app.router.push({
        name: 'user-login'
      })
    }
  },
  data() {
    return {
      importMoney: '',
      moneyForm: '0.00',
      deal: false,
      listTxt: '',
      disTxt: null,
      disVal: null,
      disId: null,
      disType: null,
      balanceShow: false,
      appraisalShow: false,
      showDialog: false,
      showInfo: '',
      dealShow: false,
      cashBalance: this.$store.state.home.cashBalance,
      income: '0.00',
      award: 0, // 加息券5%加息即为5
      disVoucherId: '', // 优惠券编码
      joinId: this.$store.state.home.scatterDetails.borrowNid,
      surplus: this.$store.state.home.scatterDetails.borrowAccountWait,
      periods: this.$store.state.home.scatterDetails.borrowPeriod,
      evaluationType: '',
      limitQuota: null,
      quota: null,
      lastUrl: `/project/scatter-details/${this.$route.query.desId}`
    }
  },
  computed: {
    cutSurplus() {
      if (RegExp(/,/).test(this.surplus)) {
        return this.surplus.replace(',', '')
      } else {
        return this.surplus
      }
    },
    cutCashBalance() {
      if (RegExp(/,/).test(this.cashBalance)) {
        return this.numFilter(this.cashBalance).replace(',', '')
      } else {
        return this.numFilter(this.cashBalance)
      }
    },
    StringMoney() {
      return String(this.importMoney)
    },
    types() {
      return {
        type: this.$store.state.home.scatterDetails.borrowStyle,
        interest:
          Number(this.$store.state.home.scatterDetails.borrowApr) +
          Number(this.$store.state.home.scatterDetails.awardScale),
        time: this.$store.state.home.scatterDetails.borrowPeriod
      }
    }
  },
  mounted() {
    this.lastWork()
  },
  methods: {
    // 扫尾
    lastWork() {
      if (Number(this.cutSurplus) < 100) {
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
      if (Number(this.importMoney) > Number(this.cutCashBalance)) {
        this.balanceShow = true
      } else {
        detailStatus(this.$axios, commenParams).then(res => {
          console.log(res)
          this.evaluationType = res.content.evaluationType
          this.limitQuota = res.content.limitQuota
          this.quota = res.content.quota
          if (res.content.evaluationStatus != 1) {
            this.showDialog = true
            this.showInfo =
              '为了保障您的切身利益，请在出借前进行“风险承受能力测评”'
            if (res.content.evaluationStatus == 0) {
              this.showInfo =
                '您的“风险承受能力测评”结果已过期，请在出借前重新测评'
            }
          } else if (
            Number(this.importMoney) > Number(this.limitQuota) &&
            res.content.evaluationStatus == 1
          ) {
            this.appraisalShow = true
          } else {
            this.dealShow = true
          }
        })
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
      if (e.target.value > Number(this.cutSurplus)) {
        e.target.value = Number(this.cutSurplus)
      }
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.importMoney = e.target.value
      this.moneyForm = this.numFilter(this.importMoney)
      this.change()
    },
    lastInvest() {
      if (Number(this.cutSurplus) < 100) {
        return false
      } else if (Number(this.cutCashBalance) > Number(this.cutSurplus)) {
        this.importMoney = Number(this.cutSurplus)
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
        this.disVal = String(data[0])
        if (data[0] == null) {
          this.disTxt = null
        } else {
          this.disTxt = data[0] + '%加息券'
        }
      } else if (this.disType === 'dk') {
        this.award = 0
        this.disVal = String(data[0])
        if (data[0] == null) {
          this.disTxt = null
        } else {
          this.disTxt = data[0] + '元抵用券'
        }
        if (this.importMoney - data[0] < 0) {
          this.moneyForm = '0.00'
        } else {
          this.moneyForm = this.numFilter(this.importMoney - data[0])
        }
      } else {
        this.award = 0
      }
      this.incomes()
    },
    disList() {
      if (this.importMoney == '') {
        this.$Msg('请输入出借金额', 2000)
        return false
      }
      this.listTxt = 'List'
    },
    balanceClose() {
      this.balanceShow = false
    },
    balanceSub() {
      this.$store.commit(
        'srcPath',
        this.$route.path + '?desId=' + this.$route.query.desId
      )
      this.$router.push({
        name: 'myCenter-fund-recharge'
      })
    },
    onClose() {
      this.showDialog = false
    },
    appraisalSub() {
      this.$store.commit(
        'srcPath',
        this.$route.path + '?desId=' + this.$route.query.desId
      )
      this.$router.push({ path: '/appraisal/indexs' })
    },
    appraisalClose() {
      this.appraisalShow = false
    },
    dealClose() {
      this.dealShow = false
    },
    dealSub() {
      let psw = this.joinId + String(this.importMoney) + '242628'
      let params = {
        borrowNid: this.joinId,
        account: this.importMoney,
        voucherId: this.disVoucherId,
        voucherType: this.disType,
        redirectUrl:
          // 'http://72.127.2.102:3000/' + 'project/result/scatter-addResult',
          this.$store.state.returnPath + 'project/result/scatter-addResult',
        accountInterest: this.income,
        secretParam: this.encryptByDES(psw, '20181224')
      }
      investScatterAdd(this.$axios, params).then(res => {
        console.log(res)
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
      let account = Number(this.importMoney)
      //基本利息
      let apr = Number(this.types.interest)
      //期限  月/天
      let period = Number(this.types.time)
      //平台加息
      let award = Number(this.award)
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
        console.log(
          account + ',' + award + ',' + apr + ',' + period + ',' + val
        )
        let profit = (
          ((account * (award + apr) * 0.01) / val).toFixed(2) * period
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
    Ban,
    Scatter
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
        input:disabled
          border: none
          background-color: #fff
          color: $color-gray1
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
  .out_txt
    text-align: center
    font-size: $fontsize-medium
    color: $color-gray1
    padding: 48px 40px 21px
</style>
