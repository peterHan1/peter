<template>
  <div class="accredit">
    <td-header title="业务授权"/>
    <ul>
      <li>
        <span>业务授权</span>
        <!-- <span>已授权</span> -->
        <span>已过期 <router-link to="" >重新授权</router-link></span>
      </li>
      <li>
        <span>授权金额 <i 
          class="iconfont" 
          @click="openLayer()">&#xe6f7;</i></span>
        <span>10,000,000.00元</span>
      </li>
      <li>
        <span>授权期限</span>
        <span>2028-11-30到期</span>
      </li>
    </ul>
    <Layer 
      v-show="layerShow" 
      submit="我知道了" 
      @on-sub="closeLayer()"><span class="accreditLayer">授权金额指授权单笔交易的金额</span></Layer>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      layerShow: false
    }
  },
  mounted() {},
  methods: {
    openLayer() {
      this.layerShow = true
    },
    closeLayer() {
      this.layerShow = false
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .accredit
    padding-top: 88px
    ul
      padding: 0 30px
      background-color: $color-white
      margin-top: 20px
      li
        border-bottom: 1px solid $color-gray5
        overflow: hidden
        span
          font-size: $fontsize-medium
          display: block
          line-height: 100px
          a
            color: $color-primary
          i
            display: inline-block
            padding: 0 10px
            font-size: $fontsize-medium
            color: $color-gray3
        span:nth-child(1)
          color: $color-gray1
          float: left
        span:nth-child(2)
          color: $color-gray3
          float: right
      li:last-child
        border: none
    .accreditLayer
      display: block
      font-size: $fontsize-medium
      color: $color-gray1
      line-height: 50px
      text-align: center
      padding: 50px 0 20px
</style>
