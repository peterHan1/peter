<template>
  <div class="deposit">
    <td-header title="激活存管账户"/>
    <div class="txt">为保障您的资金安全，请先激活北京银行存管账户，激活账户绑定的银行卡作为充值提现唯一银行卡</div>
    <ul>
      <li>
        <input 
          v-model="nameVal" 
          type="text" 
          placeholder="请输入真实姓名">
      </li>
      <li>
        <input 
          v-model="fszVal" 
          type="text" 
          placeholder="请输入身份证号码">
      </li>
    </ul>
    <div class="sub_btn">
      <td-button
        :disabled="nameVal != '' && fszVal.length >= 18 ?false:true"
        value="确定"
        @click="subCash"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameVal: '',
      fszVal: ''
    }
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .deposit
    padding-top: 88px
    .txt
      font-size: $fontsize-small-ss
      color: $color-gray2
      padding: 20px 30px
      line-height: 36px
    ul
      background-color: $color-white
      li
        border-bottom: 1px solid $color-gray5
        height: 100px
        padding: 0 30px
        input
          display: block
          width: 100%
          line-height: 99px
          caret-color: $color-primary
          font-size: $fontsize-medium
          color: $color-gray1
        input[disabled]
          color: #333
          background-color: $color-white
      li:last-child
        border: none
    .sub_btn
      margin-top: 55px
      padding: 0 30px 
</style>
