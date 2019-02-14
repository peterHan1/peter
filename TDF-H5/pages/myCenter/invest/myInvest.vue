<template>
  <div class="myInvest">
    <div class="tabHeader">
      <i 
        class="iconfont" 
        @click="returnFn">&#xe6fe;</i>
      <div class="tabTxt">
        <span 
          :class="tabCom === 'Scatter'?'on':''" 
          @click="tabFn('Scatter')">散标</span>
        <span 
          :class="tabCom === 'Sift'?'on':''" 
          @click="tabFn('Sift')">省心投</span>
      </div>
    </div>
    <div :is="tabCom"/>
  </div>
</template>

<script>
import Scatter from '~/components/business/invest-list/list-scatter'
import Sift from '~/components/business/invest-list/list-sift'
export default {
  data() {
    return {
      tabCom: 'Scatter'
    }
  },
  mounted() {
    if (!this.$store.state.accessId && !this.$store.state.accessKey) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    tabFn(txt) {
      this.tabCom = txt
    },
    returnFn() {
      this.$router.push({
        name: 'myCenter-center'
      })
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
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    padding-top: 88px
    .tabHeader
      width: 100%
      line-height: 88px
      border-bottom: 1px solid $color-gray5
      position: fixed
      top: 0
      left: 0
      right: 0
      font-size: $fontsize-large-xxx
      background-color: $color-white
      text-align: center
      .iconfont
        color: $color-gray1
        position: absolute
        left: 30px
        font-size: $fontsize-large-xxxxxxx
      .tabTxt
        span
          color: $color-gray3
        .on
          color: $color-primary
        span:nth-child(2)
          margin-left: 120px
</style>
