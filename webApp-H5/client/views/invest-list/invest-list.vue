<template>
  <div class="investList">
    <div class="tab">
      <span @click="tabFn('SiftList')">省心投</span>
      <span @click="tabFn('ScatterList')">散标区</span>
      <span @click="tabFn('Transfer')">转让区</span>
    </div>
    <div class="realTime" v-show="rollList">
      <ul>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
        <li>10分钟前 重庆用户156*****3678加入300元</li>
      </ul>
    </div>
    <div :is="tabCom"></div>
    <footer-nav :navClass="'investList'"></footer-nav>
  </div>
</template>

<script>
  import SiftList from './list-sift.vue'
  import ScatterList from './list-scatter.vue'
  import Transfer from './list-transfer.vue'
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        tabCom: 'SiftList',
        rollList: true
      }
    },
    mounted () {
    },
    methods: {
      tabFn (txt) {
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
    background-color: #fff
    text-align: center
    font-size: 28px
    span
      display: inline-block
      padding: 0 46px
  .realTime
    height: 68px
    overflow: hidden
    li
      line-height: 68px
      font-size: 24px
      color: #999
      text-align: center
</style>
