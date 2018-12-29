<template>
  <div class="recharge">
    <Header :navLeftTxt="'icon'" :navRightTxt="'充值记录'" @navRightFn="navRightFn()">充值</Header>
    <div>
      <ul>
        <li>
          <div class="bankImg ABOC "></div>
          <div class="bankInfo">
            <p>中国工商银行</p>
            <p>************ 3720</p>
          </div>
        </li>
        <li>
          <div class="input_money">
            <i class="iconfont">&#xe704;</i>
            <input type="number" placeholder="输入提现金额，100元起" v-model="moneyVal">
          </div>
        </li>
        <li>
          <p>本次最多可充值 <b>5000</b>元</p>
        </li>
      </ul>
      <div class="sub_btn">
        <div class="td_btn" :class="moneyVal >= 100?'td_btnHig':'td_btnNo'" @click="subBth()">充值</div>
      </div>
      <div class="txt">
          <p>1、快捷支付充值时，限额随银行变动调整，以银行限额为准。</p>
          <p>2、如果充值金额未到账，请联系客服 客服电话：400-85-666-85</p>
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
        moneyVal: null
      }
    },
    mounted () {
    },
    methods: {
      navRightFn () {
        this.$router.push({path: '/rachargeRecord'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .recharge
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    ul
      margin-top: 20px
      li:nth-child(1)
        height: 144px
        background-color: #fff
        border-bottom: 1px solid #f2f3f7
        .bankImg
          float: left
          width: 72px
          height: 72px
          margin-top: 27px
          margin-left: 30px
          background-size: 100% 100%
        .bankInfo
          float: left
          margin-top: 30px
          margin-left: 30px
          font-size: 28px
          p:nth-child(1)
            line-height: 40px
            color: #333
          p:nth-child(2)
            line-height: 40px
            color: #666
      li:nth-child(2)
          padding: 0 30px
          background-color: #fff
          .input_money
            overflow: hidden
            border-bottom: 1px solid #F2F3F7
            height: 128px
            i
              display: block
              font-size: 66px
              line-height: 118px
              color: #000
              float: left
            input
              display: block
              overflow: hidden
              float: left
              width: 60%
              line-height: 125px
              caret-color: #FC8D26 
              font-size: 50px
              color: #333
              background-color: transparent
              margin-left: 10px
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
      li:nth-child(3)
        padding: 30px 30px
        height: 100px
        background-color: #fff
        color: #333
        font-size: 28px
        b
          color: #FC8D26
    .sub_btn
      padding: 20px 30px 0
    .txt
        padding: 0 40px
        margin-top: 50px
        p
          font-size: 24px
          color: #999
          line-height: 33px
</style>