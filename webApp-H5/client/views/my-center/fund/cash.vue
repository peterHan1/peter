<template>
  <div class="cashBox">
    <Header :navLeftTxt="'icon'" :fontX="'fontX'" @navLeftFn="navLeftFn()" :navRightTxt="'提现记录'" @navRightFn="navRightFn()">提现</Header>
    <div class="bankTop">
      <span>到账银行</span>
      <span>中国工商银行(尾号3720)</span>
    </div>
    <div class="inp_money">
      <ul>
        <li>可提现金额 <span>{{cashMoney}}</span>元<i class="iconfont" @click="layerMoney=true">&#xe833;</i></li>
        <li>
          <div class="input_money">
            <i class="iconfont">&#xe704;</i>
            <input type="number" placeholder="输入提现金额，100元起" v-model="moneyVal" v-on:input="inputFn()">
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
        <li @click="selectCash('speed')" :class="speedAllow?'':'notAllow'">
          <p>
            <i class="iconfont" v-if="inAccount == 'speed'">&#xe6c4;</i>
            <i class="iconfont" v-else>&#xe6c3;</i>
            快速到账
          </p>
          <div>预计当日到账，单日限额<span>50000</span>元，当日剩余额度<span>800</span>元，限<span>9:00-18:00</span>间操作。</div>
        </li>
        <li @click="selectCash('general')">
          <p>
            <i class="iconfont" v-if="inAccount == 'general'">&#xe6c4;</i>
            <i class="iconfont" v-else>&#xe6c3;</i>
            普通到账
          </p>
          <div>预计下一个工作日到账，单笔限额100万，单日无限额。</div>
        </li>
      </ul>
    </div>
    <div class="sub_btn">
      <div class="td_btn" :class="moneyVal >= 100 && inAccount != ''?'td_btnHig':'td_btnNo'" @click="subCash()">申请提现</div>
    </div>
    <div class="cashExplan">
      <router-link to="/cashExplain">提现说明</router-link>
    </div>
    <Layer v-show="layerMoney" @on-sub="layerNow()" submit="我知道了" >
      <div class="money_txt">
        <p>已出借过可提现金额：<span>0.00</span>元</p>
        <p>未出借过可提现金额：<span>0.00</span>元</p>
      </div>
    </Layer>
    <Layer v-show="cashHint" @on-sub="layerClose()" submit="确定" >
      <div class="hint_txt">{{hint}}</div>
    </Layer>
    <Layer v-show="cashMaintain" @on-close="maintainClose()" @on-sub="maintainSub()" close="否" submit="是" >
      <div class="hint_txt">快速到账维护中，是否转普通到账</div>
    </Layer>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
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
  mounted () {
    console.log(this.moneyVal)
  },
  methods: {
    inputFn () {
      if (this.cashMoney <= 0) {
        this.moneyVal = '0.00'
      }
    },
    selectCash (a) {
      if (a === 'speed') {
        if (this.speedAllow) {
          this.inAccount = this.speedAllow ? a : ''
        }
      } else {
        this.inAccount = a
      }
    },
    subCash () {
      console.log(123)
    },
    allMoney () {
      this.moneyVal = this.cashMoney
    },
    navLeftFn () {
      this.$router.push({path: '/myCenter'})
    },
    navRightFn () {
      this.$router.push({path: '/cashRecord'})
    },
    layerNow () {
      this.layerMoney = false
    },
    layerClose () {
      this.cashHint = false
    },
    maintainClose () {
      this.cashMaintain = false
    },
    maintainSub () {
      this.cashMaintain = false
    }
  },
  components: {
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
      font-size: 28px
      background-color: #fff
      overflow: hidden
      span:nth-child(1)
        color: #333
        float: left
      span:nth-child(2)
        float: right
        color: #999
    .inp_money
      background-color: #fff
      margin-top: 20px
      ul
        li:nth-child(1)
          border-bottom: 1px solid #F2F3F7
          line-height: 73px
          color: #333
          font-size: 28px
          padding: 0 30px
          span
            color: #FC8D26
          i
            margin-left: 15px
            color: #999
        li:nth-child(2)
          padding: 0 30px
          .input_money
            border-bottom: 1px solid #F2F3F7
            overflow: hidden
            height: 128px
            i
              display: block
              font-size: 66px
              line-height: 118px
              color: #000
              float: left
            input
              display: block
              line-height: 125px
              overflow: hidden
              float: left
              width: 60%
              caret-color: #FC8D26 
              font-size: 50px
              color: #333
              background-color: transparent
            input::-webkit-input-placeholder
              color: #c7c7cd
              font-size: 28px
            input:-moz-placeholder
              color: #c7c7cd
              font-size: 28px
            input::-moz-placeholder
              color: #c7c7cd
              font-size: 28px
            input:-ms-input-placeholder
              color: #c7c7cd
              font-size: 28px
            span
              display: block
              color: #FC8D26
              line-height: 125px
              float: right
          .cost_money
            padding: 22px 0 15px
            p
              font-size: 28px
              color: #333
              line-height: 40px
              padding-bottom: 16px
              b
                color: #F97C3C
              span
                font-size: 24px
                color: #999
                float: right
    .selectReturn
      background-color: #fff
      margin-top: 20px
      ul
        padding: 0 30px
        li
          padding-top: 17px
          height: 170px
          color: #999
        p
          line-height: 60px
          position: relative
          padding-left: 50px
          font-size: 28px
          i
            position: absolute
            left: 0
            font-size: 36px
            color: #7b99ef
        div
          padding-left: 50px    
          padding-right: 19px
          font-size: 24px
          span
            color: #FC8D26    
        li:nth-child(1)
          border-bottom: 1px solid #F2F3F7
        .notAllow
          color: #ccc
          i
            color: #ccc
          span
            color: #ccc
    .sub_btn
      padding: 50px 30px 0
    .cashExplan
      padding-top: 40px
      text-align: center
      a
        font-size: 28px
        color: #F97C3C
    .money_txt
      font-size: 24px
      color: #333
      padding: 30px 0 0 40px
      p
        line-height: 40px
        span
          color: #F97C3C
    .hint_txt
      font-size: 28px
      color: #333
      padding: 30px 40px 10px
</style>
