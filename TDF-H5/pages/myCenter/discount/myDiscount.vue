<template>
  <div class="discountBox">
    <td-header title="我的优惠券"/>
    <div class="listTab">
      <span :class="tabCom === 'Interest'?'on':''" >
        <b @click="tabFn('Interest')">加息券</b>
      </span>
      <span :class="tabCom === 'Voucher'?'on':''" >
        <b @click="tabFn('Voucher')">抵用券</b>
      </span>
     
    </div>
    <div :is="tabCom"/>
    <div class="discountBottom">
      <span @click="downApp">查看已使用</span> | <span @click="downApp">已失效</span>
    </div>
  </div>
</template>

<script>
import Interest from './src/interest-list.vue'
import Voucher from './src/voucher-list.vue'

export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      tabCom: 'Interest'
    }
  },
  mounted() {},
  methods: {
    tabFn(com) {
      this.tabCom = com
    },
    downApp() {
      this.$App('请在电脑端登录官网或在APP端查看')
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
      font-size: $fontsize-small-ss
      color: $color-gray4
      text-align: center
      margin-top: 60px
      span
        color: $color-primary
        margin: 0 40px
    .listTab
      display: flex
      background-color: $color-white
      span
        flex: 1
        text-align: center
        font-size: $fontsize-large-xx
        color: $color-gray3
        line-height: 88px
        b
          display: inline-block
          position: relative
      .on
        color: $color-primary
        b:after
          content: ''
          display: block
          width: 60px
          height: 6px
          background-color: $color-primary
          position: absolute
          bottom: 0
          left: 50%
          transform: translateX(-50%)
          border-radius: 10px    
</style>
