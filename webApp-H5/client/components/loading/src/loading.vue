<template>
  <div class="loadBox" v-if="loadShow">
    <div class="load">
      <div class="wrapper">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div>
        <div class="line5"></div>
        <div class="line6"></div>
        <div class="line7"></div>
        <div class="line8"></div>
        <div class="line9"></div>
        <div class="line10"></div>
        <div class="line11"></div>
        <div class="line12"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loadShow: false
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
<style lang="stylus" scoped>
.loadBox
  position: fixed
  left: 50%
  top: 50%
  background-color: rgba(0,0,0,0.7)
  border-radius: 10px
  width: 180px
  height: 180px
  transform: translate(-50%, -50%)
  .load
    position: absolute
    top: 20%
    left: 50%
  .wrapper
    position: relative
    display: inline-block
    zoom: 0.3
    div
      width: 3px
      height: 16px
      background: #a4a2a4
      position: absolute
      left: 100%
      top: 100%
      opacity: 0
      animation: loading 1.2s linear infinite
    .line1
      transform: rotate(0deg) translate(0, -34px)
      animation-delay: 0s
    .line2
      transform: rotate(30deg) translate(0, -34px)
      animation-delay: 0.1s
    .line3
      transform: rotate(60deg) translate(0, -34px)
      animation-delay: 0.2s
    .line4
      transform: rotate(90deg) translate(0, -34px)
      animation-delay: 0.3s
    .line5
      transform: rotate(120deg) translate(0, -34px)
      animation-delay: 0.4s
    .line6
      transform: rotate(150deg) translate(0, -34px)
      animation-delay: 0.5s
    .line7
      transform: rotate(180deg) translate(0, -34px)
      animation-delay: 0.6s
    .line8
      transform: rotate(210deg) translate(0, -34px)
      animation-delay: 0.7s
    .line9
      transform: rotate(240deg) translate(0, -34px)
      animation-delay: 0.8s
    .line10
      transform: rotate(270deg) translate(0, -34px)
      animation-delay: 0.9s
    .line11
      transform: rotate(300deg) translate(0, -34px)
      animation-delay: 1.0s
    .line12
      transform: rotate(330deg) translate(0, -34px)
      animation-delay: 1.1s
  @keyframes loading
    from
      opacity: 1
      width: 5px
      height: 20px
    to
      opacity: 0.25
      width: 5px
      height: 20px    
</style>
