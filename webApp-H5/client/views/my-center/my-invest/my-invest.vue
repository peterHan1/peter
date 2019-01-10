<template>
  <div class="myInvest">
    <div class="tabHeader">
      <i class="iconfont" @click="returnFn">&#xe687;</i>
      <div class="tabTxt">
        <span :class="tabCom === 'Scatter'?'on':''" @click="tabFn('Scatter')">散标</span>
        <span :class="tabCom === 'Sift'?'on':''" @click="tabFn('Sift')">省心投</span>
      </div>
    </div>
    <div :is="tabCom"></div>
  </div>
</template>

<script>
  import Scatter from './list-scatter.vue'
  import Sift from './list-sift.vue'
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        tabCom: 'Scatter'
      }
    },
    mounted () {
    },
    methods: {
      tabFn (txt) {
        this.tabCom = txt
      },
      returnFn () {
        window.history.go(-1)
      }
    },
    components: {
      Scatter,
      Sift
    }
  }
</script>

<style lang="stylus" scoped>
  .myInvest
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .tabHeader
      width: 100%
      line-height: 88px
      border-bottom: 1px solid #E8E8E8
      position: fixed
      top: 0
      left: 0
      right: 0
      font-size: 36px
      background-color: #fff
      text-align: center
      .iconfont
        color: #333
        position: absolute
        left: 30px
      .tabTxt
        span
          color: #999
        .on
          color: #FF7102
        span:nth-child(2)
          margin-left: 120px
</style>
