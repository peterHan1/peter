<template>
  <div class="fix">
    <div class="addBox">
      <td-header title="出借"/>
      <div class="addTop">
        <span>项目可投余额(元)</span>
        <span>51,000.00</span>
      </div>
      <div class="inpMoney">
        <p>出借金额</p>
        <div class="inputs">
          <input
            v-model="importMoney"
            type="number"
            placeholder="100元起投"
            @input="oninput">
          <span>余额全投</span>
        </div>
        <div class="showMoney">
          <p>可用余额<b> 51,000.00</b>元</p>
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
        <td-button
          :disabled="importMoney >= 100 && deal == true?false:true"
          :value="'实付：' + moneyForm + '元，确认出借'"
          @click="subInvest"
        />
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
        @colseFn="colseFn"/>
      <Layer
        v-show="balanceShow"
        close="取消"
        submit="充值"
        @on-close="balanceClose()"
        @on-sub="balanceSub()" >
        <div class="balance_txt">账户余额足，请先充值</div>
      </Layer>
      <Layer
        v-show="appraisalShow"
        close="不同意"
        submit="同意"
        @on-close="appraisalClose()"
        @on-sub="appraisalSub()" >
        <div class="appraisal_txt">您当前的风险测评结果为<span>[谨慎型]</span>，可投本金总额不超过40万元，您剩余可投本金<span>[10000元]</span>。请重新测评以便更好地了解自身风险承受能力。</div>
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
      dealShow: false
    }
  },
  mounted() {},
  methods: {
    subInvest() {
      console.log('加入')
    },
    consentFn() {
      this.deal = !this.deal
    },
    oninput(e) {
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.importMoney = e.target.value
      this.moneyForm = this.numFilter(this.importMoney)
    },
    colseFn(...data) {
      this.disTxt = data[0]
      this.disId = data[1]
      this.disType = data[2]
      this.listTxt = ''
    },
    disList() {
      this.listTxt = 'List'
    },
    balanceClose() {
      this.balanceShow = false
    },
    balanceSub() {
      this.$router.push({ path: '/recharge' })
    },
    appraisalSub() {
      this.$router.push({ path: '/appraisal/index' })
    },
    appraisalClose() {
      this.appraisalShow = false
    },
    dealClose() {
      this.dealShow = false
    },
    dealSub() {
      this.dealShow = false
    },
    numFilter(value) {
      if (value != '') {
        let transformVal = parseFloat(value).toFixed(3)
        let realVal = transformVal.substring(0, transformVal.length - 1)
        return realVal
      } else {
        return '0.00'
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
      font-size: $fontsize-medium
      color: $color-gray1
      text-align: right
      line-height: 80px
      padding: 0 30px
      span
        color: $color-primary
    .sub_btn
      padding: 0 30px
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
