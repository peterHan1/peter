<template>
  <div class="scatter-enter">
    <Header 
      navLeftTxt="icon" 
      class="header">{{ title }}</Header>
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <footer @click="lend">{{ btnName }}</footer>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '项目详情'
  },
  data() {
    return {
      title: '宝马X3抵押标',
      transitionName: '',
      btnName: '立即出借'
    }
  },
  watch: {
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.scatterIndex > from.meta.scatterIndex) {
        // 设置动画名称
        this.transitionName = 'slide-top'
      } else {
        this.transitionName = 'slide-bottom'
      }
    }
  },
  methods: {
    getData() {},
    lend() {}
  },
  mounted() {
    this.$router.push('/project/details/scatter-details/scatter-details')
  }
}
</script>
<style lang="stylus" scoped>
  .scatter-enter
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    .header
      background: -webkit-linear-gradient(left, #F66F4A , #FC8D26)
      background: -o-linear-gradient(right, #F66F4A, #FC8D26)
      background: -moz-linear-gradient(right, #F66F4A, #FC8D26)
      background: linear-gradient(to right, #F66F4A , #FC8D26)
      color: #fff
      border-bottom: none
    footer
      width: 100%
      height: 1rem
      line-height: 1rem
      color: #fff
      background: #FF7102
      text-align: center
      font-size: 0.36rem
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
