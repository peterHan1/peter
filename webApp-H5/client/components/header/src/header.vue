<template>
  <header class="header_nav">
    <div class="header_left" v-if="navLeftTxt">
      <span @click="returnFn" v-if="navLeftTxt === 'icon'" class="iconfont">&#xe687;</span>
      <span @click="navLeftFn" class="iconfont leftTxt" v-else v-html="navLeftTxt"></span>
    </div>
    <span><slot /></span>
    <div class="header_right"  @click="navRightFn" v-if="navRightTxt">
      <span v-html="navRightTxt"></span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  props: ['navLeftTxt', 'navRightTxt'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    returnFn () {
      window.history.go(-1)
    },
    navLeftFn () {
      this.$emit('navLeftFn')
    },
    navRightFn () {
      this.$emit('navRightFn')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header_nav
    background-color: #fff
    height: 88px
    line-height: 88px
    width: 100%
    border-bottom: 1px solid #E8E8E8
    position: fixed
    top: 0
    left: 0
    right: 0
    overflow: hidden
    box-sizing: border-box
    text-align: center
    font-size: 36px
    color: #333
    z-index: 98
    .header_left
      position: absolute
      left: 30px
      display: inline-block
      font-size: 34px
    .leftTxt
      font-size: 30px
      /deep/ b
        font-size: 32px
        color: #666
    .header_right
      color: #999
      position: absolute
      right: 28px
      font-size: 26px
      display: inline-block
    .iconfont
      font-size: 36px
</style>
