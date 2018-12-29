<template>
  <div class="discountBox">
    <Header :navLeftTxt="'icon'">我的优惠券</Header>
    <div>
      <span  @click="tabFn('Interest')">加息券</span>
        <span @click="tabFn('Voucher')">抵用券</span>
    </div>
    <div :is='tabCom'></div>
    <div class="discountBottom">
        <span>查看已使用</span> | <span>已失效</span>
      </div>
  </div>
</template>

<script>
import Interest from './interest-list.vue'
import Voucher from './voucher-list.vue'

export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      tabCom: 'Interest'
    }
  },
  mounted () {
  },
  methods: {
    tabFn (com) {
      this.tabCom = com
    }
  },
  components: {
    Interest,
    Voucher
  }
}
</script>

<style lang="stylus" scoped>
  .discountBox
    width: 100%
    padding: 88px 0 50px
    .discountBottom
      font-size: 24px
      color: #ccc
      text-align: center
      margin-top: 60px
      span
        color: #F97C3C
        margin: 0 40px
</style>
