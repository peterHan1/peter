<template>
  <div class="addBox">
    <Header :navLeftTxt="'icon'">出借</Header>
    <div class="addTop">
      <span>项目可投余额(元)</span>
      <span>51,000.00</span>
    </div>
    <div class="inpMoney">
      <p>出借金额</p>
      <div class="inputs">
        <input type="number" placeholder="100元起投" v-model="importMoney" @input="oninput">
        <span>余额全投</span>
      </div>
      <div class="showMoney">
        <p>可用余额<b> 51,000.00</b>元</p>
        <router-link to="/recharge">充值</router-link>
      </div>
    </div>
    <div class="discounts" @click="disList">
      <span>可用优惠券</span>
      <span> <b v-if="disTxt" class="on">{{disTxt}}</b> <b v-else>请选择优惠券</b> <i class="iconfont">&#xe83d;</i> </span>
    </div>
    <div class="earnings">预计收益<span>0.00元</span></div>
    <div class="sub_btn">
      <div class="td_btn" :class="importMoney >= 100 && deal == true?'td_btnHig':'td_btnNo'" @click="subInvest()">实付：<b v-if="importMoney != ''">{{importMoney | numFilter}}</b> <b v-else>0.00</b> 元，确认出借</div>
    </div>
    <div class="clause">
      <i @click="consentFn()">
        <b class="iconfont on" v-if="deal">&#xe6c4;</b>
        <b class="iconfont" v-else>&#xe6c3;</b>
      </i>
      <span>已阅读并同意<router-link to="" >《网络借贷禁止性行为说明》</router-link> <router-link to="" >《借款协议》</router-link> <router-link to="" >《网络借贷风险提示书》</router-link></span>
    </div>
    <div :is="listTxt" @colseFn="colseFn" :disId="disId" :disType="disType" :disTxt=disTxt></div>
    <Layer v-show="balanceShow" @on-close="balanceClose()" @on-sub="balanceSub()" close="取消" submit="充值" >
      <div class="balance_txt">账户余额足，请先充值</div>
    </Layer>
    <Layer v-show="appraisalShow" @on-close="appraisalClose()" @on-sub="appraisalSub()" close="不同意" submit="同意" >
      <div class="appraisal_txt">您当前的风险测评结果为<span>[谨慎型]</span>，可投本金总额不超过40万元，您剩余可投本金<span>[10000元]</span>。请重新测评以便更好地了解自身风险承受能力。</div>
    </Layer>
    <Layer v-show="dealShow" @on-close="dealClose()" @on-sub="dealSub()" close="不同意" submit="同意" >
      <div class="protocol_txt">
        <div class="protocol_box">
          <Ban></Ban>
          <Scatter></Scatter>
        </div>
      </div>
    </Layer>
  </div>
</template>

<script>
import List from './add/discount-list.vue'
import Ban from './protocol/ban.vue'
import Scatter from './protocol/scatter.vue'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      importMoney: '',
      deal: false,
      listTxt: '',
      disTxt: null,
      disId: null,
      disType: null,
      balanceShow: false,
      appraisalShow: false,
      dealShow: true
    }
  },
  mounted () {
  },
  methods: {
    subInvest () {
      console.log('加入')
    },
    consentFn () {
      this.deal = !this.deal
    },
    oninput (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.importMoney = e.target.value
    },
    colseFn (...data) {
      this.disTxt = data[0]
      this.disId = data[1]
      this.disType = data[2]
      this.listTxt = ''
    },
    disList () {
      this.listTxt = 'List'
    },
    balanceClose () {
      this.balanceShow = false
    },
    balanceSub () {
      this.$router.push({path: '/recharge'})
    },
    appraisalSub () {
      this.$router.push({path: '/appraisal/index'})
    },
    appraisalClose () {
      this.appraisalShow = false
    },
    dealClose () {
      this.dealShow = false
    },
    dealSub () {
      this.dealShow = false
    }
  },
  filters: {
    numFilter (value) {
      let transformVal = parseFloat(value).toFixed(3)
      let realVal = transformVal.substring(0, transformVal.length - 1)
      return realVal
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
  .addBox
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .addTop
      width: 100%
      line-height: 74px
      padding: 0 30px
      font-size: 28px
      background-color: #fff
      overflow: hidden
      span:nth-child(1)
        color: #333
        float: left
      span:nth-child(2)
        float: right
        color: #999
    .inpMoney
      background-color: #fff
      padding: 0 30px
      margin-top: 20px
      p
        font-size: 28px
        color: #999
        b
          color: #333
      div
        font-size: 28px
        span,a
          color: #FF7102
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
          caret-color:#ff711c
        span
          display: inline-block
          line-height: 108px
    .discounts
      font-size: 28px
      color: #999
      line-height: 100px
      background-color: #fff
      margin-top: 20px
      padding: 0 30px
      span:nth-child(2)
        color: #333
        float: right
      .on
        color: #FF7102
    .earnings
      font-size: 28px
      color: #333
      text-align: right
      line-height: 80px
      padding: 0 30px
      span
        color: #FF7102
    .sub_btn
      padding: 0 30px
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
        padding-top: 3px
        width: 6%
        text-align: center
        font-size: 30px
        vertical-align: top
        color: #ccc
        .on
          color: #5887ff
      a
        color: #ff711c
  .balance_txt
    font-size: 28px
    color: #333
    text-align: center
    padding: 52px 0 20px
  .appraisal_txt
    font-size: 28px
    color: #333
    padding: 52px 30px 30px
    text-align: justify
    span
      color: #5887FF
  .protocol_txt
    height: 5rem
    padding-top: 20px
    .protocol_box
      height: 100%
      overflow: scroll
      -webkit-overflow-scrolling: touch
</style>
