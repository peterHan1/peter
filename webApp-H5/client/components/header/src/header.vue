<template>
  <header class="header_nav">
    <div class="header_left" v-if="navLeftTxt">
      <span @click="returnFn" v-if="navLeftTxt === 'icon'" class="iconfont">&#xe687;</span>
      <span @click="navLeftFn" class="leftTxt" v-else>{{navLeftTxt}}</span>
    </div>
    <span><slot /></span>
    <div class="header_right" v-if="navRightTxt" @click="navRightFn">{{navRightTxt}}</div>
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
    height: 0.88rem
    line-height: 0.88rem
    width: 100%
    border-bottom: 1px solid #E8E8E8
    position: fixed
    top: 0
    left: 0
    right: 0
    overflow: hidden
    box-sizing: border-box
    text-align: center
    font-size: 0.34rem
    color: #333
    z-index: 98
    .header_left
      position: absolute
      left: 0.3rem
      display: inline-block
      font-size: 0.34rem
    .leftTxt
      font-size: 0.32rem
      color: #626262
    .header_right
      color: #626262
      position: absolute
      right: 0.28rem
      font-size: 0.36rem
      display: inline-block
</style>
