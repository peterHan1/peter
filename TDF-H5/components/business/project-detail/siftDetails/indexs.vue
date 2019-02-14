<template>
  <div class="sift-center">
    <td-header 
      :title="title" 
      class="header"/>
    <transition :name="transitionName">
      <div 
        :is="conTxt"
        @pullFn="cutFn"/>
    </transition>
    <footer @click="lend">{{ btnName }}</footer>
  </div>
</template>
<script>
import Sift from './sift-details.vue'
import Sifts from './sift-details-next.vue'

export default {
  data() {
    return {
      title: '省心投2018061310',
      transitionName: '',
      btnName: '立即出借',
      conTxt: 'Sift'
    }
  },
  methods: {
    cutFn() {
      if (
        this.transitionName === '' ||
        this.transitionName === 'slide-bottom'
      ) {
        this.transitionName = 'slide-top'
        this.conTxt = 'Sifts'
      } else {
        this.transitionName = 'slide-bottom'
        this.conTxt = 'Sift'
      }
    },
    lend() {}
  },
  mounted() {},
  components: {
    Sift,
    Sifts
  }
}
</script>
<style lang="stylus" scoped>
.sift-center
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  .header
    /deep/ header
      background: linear-gradient(to right, #F66F4A , #FC8D26)
      color: $color-white
      border-bottom: none
      .iconfont
        color: $color-white
  footer
    width: 100%
    height: 100px
    line-height: 100px
    color: $color-white
    background: $color-primary
    text-align: center
    font-size: $fontsize-large-xxx
    position: fixed
    left:0
    bottom: 0
    z-index: 999
.slide-bottom-enter-active,.slide-bottom-leave-active,.slide-top-enter-active,.slide-top-leave-active
  will-change: transform
  transition: all 500ms ease
  position: absolute
  width: 100%
.slide-bottom-enter,.slide-top-leave-active
  transform: translate3d(0, -100%, 0)
.slide-bottom-leave-active,.slide-top-enter
  transform: translate3d(0, 100%, 0)    
</style>
