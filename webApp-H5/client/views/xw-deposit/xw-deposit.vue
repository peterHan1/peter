<template>
  <div class="deposit">
    <Header :navLeftTxt="'icon'">激活存管账户</Header>
    <div class="txt">为保障您的资金安全，请先激活北京银行存管账户，激活账户绑定的银行卡作为充值提现唯一银行卡</div>
    <ul>
      <li>
        <input type="text" placeholder="请输入真实姓名" v-model="nameVal"/>
      </li>
      <li>
        <input type="text" placeholder="请输入身份证号码" v-model="fszVal"/>
      </li>
    </ul>
    <div class="sub_bth">
      <div class="td_btn" :class="nameVal != '' && fszVal.length >= 18 ?'td_btnHig':'td_btnNo'">确定</div>
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
        nameVal: '',
        fszVal: ''
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .deposit
    min-height: 100%
    padding-top: 88px
    box-sizing: border-box
    .txt
      height: 120px
      font-size: 26px
      color: #999
      padding: 20px 0 0 40px
      box-sizing: border-box
    ul
      background-color: #fff
      li
        border-bottom: 1px solid #E8E8E8
        height: 100px
        padding: 0 30px
        input
          display: block
          width: 100%
          line-height: 99px
        input[disabled]
          color: #333
          background-color: #fff
        input::-webkit-input-placeholder
          color: #A3A3A3
        input:-moz-placeholder
          color: #A3A3A3
        input::-moz-placeholder
          color: #A3A3A3
        input:-ms-input-placeholder
          color: #A3A3A3
      li:last-child
        border: none
    .sub_bth
      width: 90%
      margin: 60px auto 0  
</style>
