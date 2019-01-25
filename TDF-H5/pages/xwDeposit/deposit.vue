<template>
  <div class="deposit">
    <td-header title="激活存管账户"/>
    <div class="txt">为保障您的资金安全，请先激活银行存管账户，激活账户绑定的银 行卡作为提现、充值唯一银行卡。</div>
    <ul>
      <li>
        <div v-if="name">{{ name }}</div>
        <input 
          v-else
          v-model="nameVal" 
          type="text" 
          placeholder="请输入真实姓名">
      </li>
      <li>
        <div v-if="sfz">{{ sfz }}</div>
        <input 
          v-else
          v-model="fszVal" 
          type="text" 
          placeholder="请输入身份证号码">
      </li>
    </ul>
    <div class="sub_btn">
      <td-button
        :disabled="nameVal != '' && fszVal.length >= 18 ?false:true"
        value="确定"
        @btnFn="sunBtn"
      />
    </div>
  </div>
</template>

<script>
import { openAccount } from '../../plugins/api.js'

export default {
  data() {
    return {
      nameVal: '',
      fszVal: '',
      name: '',
      sfz: ''
    }
  },
  mounted() {
    this.$store.dispatch('myCenter/getUser')
    setTimeout(() => {
      this.name = this.$store.state.myCenter.realName
      this.sfz = this.$store.state.myCenter.idCard
    }, 200)
  },
  methods: {
    sunBtn() {
      const params = {
        realName: this.nameVal,
        idCard: this.fszVal
      }
      openAccount(this.$axios, params).then(res => {
        if (res) {
          console.log(res.data.content.url)
          window.location.href = res.data.content.url
        }
      })
    }
  },
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
        display: flex
        div
          flex: 1
          line-height: 100px
          color: $color-gray3
        input
          flex: 1
          line-height: 99px
          caret-color: $color-primary
          font-size: $fontsize-medium
          color: $color-gray1
      li:last-child
        border: none
    .sub_btn
      margin-top: 55px
      padding: 0 30px 
</style>
