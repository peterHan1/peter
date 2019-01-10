<template>
  <div class="investList">
    <div class="tab">
      <span @click="tabFn('SiftList')">省心投</span>
      <span @click="tabFn('ScatterList')">散标区</span>
      <span @click="tabFn('Transfer')">转让区</span>
    </div>
    <div 
      v-show="rollList" 
      class="realTime">
      <ul>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
      </ul>
    </div>
    <div :is="tabCom"/>
    <footer-nav :navClass="'investList'"/>
  </div>
</template>

<script>
import SiftList from './src-list/list-sift.vue'
import ScatterList from './src-list/list-scatter.vue'
import Transfer from './src-list/list-transfer.vue'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      tabCom: 'SiftList',
      rollList: true
    }
  },
  mounted() {},
  methods: {
    tabFn(txt) {
      this.tabCom = txt
      if (txt === 'Transfer') {
        this.rollList = false
      } else {
        this.rollList = true
      }
    }
  },
  components: {
    SiftList,
    ScatterList,
    Transfer
  }
}
</script>

<style lang="stylus" scoped>
.investList
  padding-bottom: 130px
  .tab
    line-height: 88px
    background-color: $color-white
    text-align: center
    font-size: $fontsize-medium
    span
      display: inline-block
      padding: 0 46px
  .realTime
    height: 68px
    overflow: hidden
    li
      line-height: 68px
      font-size: $fontsize-small-ss
      color: $color-gray3
      text-align: center
</style>
