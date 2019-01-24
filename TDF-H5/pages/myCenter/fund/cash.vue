<template>
  <div class="cashBox">
    <td-header 
      title="提现" 
      rightTxt="提现记录"
      @navRightFn="navRightFn">
      <span>充值记录</span>
    </td-header>
    <div class="bankTop">
      <span>到账银行</span>
      <span>中国工商银行(尾号3720)</span>
    </div>
    <div class="inp_money">
      <ul>
        <li>可提现金额 <span>{{ cashMoney }}</span>元<i 
          class="iconfont" 
          @click="layerMoney=true">&#xe6f7;</i></li>
        <li>
          <div class="input_money">
            <i class="iconfont">&#xe704;</i>
            <input 
              v-model="moneyVal" 
              type="number" 
              placeholder="输入提现金额，100元起" 
              @input="inputFn()">
            <span @click="allMoney()">全部</span>
          </div>
          <div class="cost_money">
            <p>实际到账金额：<b>0.00</b>元</p>
            <p>手续费：<b>0.00</b>元 <span>您本月还有<b>1</b>次免费提现次数</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="selectReturn">
      <ul>
        <li 
          :class="speedAllow?'':'notAllow'" 
          @click="selectCash('speed')">
          <p>
            <i 
              v-if="inAccount == 'speed'" 
              class="iconfont">&#xe6f8;</i>
            <i 
              v-else 
              class="iconfont">&#xe6f9;</i>
            快速到账
          </p>
          <div>预计当日到账，单日限额<span>50000</span>元，当日剩余额度<span>800</span>元，限<span>9:00-18:00</span>间操作。</div>
        </li>
        <li @click="selectCash('general')">
          <p>
            <i 
              v-if="inAccount == 'general'" 
              class="iconfont">&#xe6f8;</i>
            <i 
              v-else 
              class="iconfont">&#xe6f9;</i>
            普通到账
          </p>
          <div>预计下一个工作日到账，单笔限额100万，单日无限额。</div>
        </li>
      </ul>
    </div>
    <div class="sub_btn">
      <td-button
        :disabled="moneyVal >= 100 && inAccount != ''?false:true"
        value="申请提现"
        @click="subCash"
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
        <p>已出借过可提现金额：<span>0.00</span>元</p>
        <p>未出借过可提现金额：<span>0.00</span>元</p>
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
export default {
  data() {
    return {
      moneyVal: null,
      inAccount: '',
      speedAllow: true,
      cashMoney: '0.00',
      layerMoney: false,
      cashHint: false,
      cashMaintain: false,
      hint: '当前不在快速到账时间内，请选择普通到账提现',
      max: '提现金额大于快速到账当日剩余额度，请选择普通到账提现'
    }
  },
  mounted() {},
  methods: {
    inputFn() {
      if (this.cashMoney <= 0) {
        this.moneyVal = '0.00'
      }
    },
    selectCash(a) {
      if (a === 'speed') {
        if (this.speedAllow) {
          this.inAccount = this.speedAllow ? a : ''
        }
      } else {
        this.inAccount = a
      }
    },
    subCash() {
      console.log(123)
    },
    allMoney() {
      this.moneyVal = this.cashMoney
    },
    layerNow() {
      this.layerMoney = false
    },
    layerClose() {
      this.cashHint = false
    },
    maintainClose() {
      this.cashMaintain = false
    },
    maintainSub() {
      this.cashMaintain = false
      this.speedAllow = false
    },
    navRightFn() {
      this.$router.push({ path: '/myCenter/fund/cashRecord' })
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
            height: 128px
            display: flex
            align-items: center
            i
              font-size: $fontsize-large-xxxxxxxxx
              line-height: 110px
            input
              flex: 1
              width: 50%
              caret-color: $color-primary
              font-size: $fontsize-large-xxxxxxxx
              color: $color-gray1
              background-color: transparent
              line-height: normal
            span
              color: $color-primary
              font-size: $fontsize-medium 
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
