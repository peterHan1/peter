<template>
  <div class="loadBox" v-if="loadShow">
      <div class="loading">
         <div class="load right">
            <div class="loads rightLoad"></div>
        </div>
        <div class="load left">
            <div class="loads leftLoad"></div>
        </div>
        <div class="logo"></div>
      </div>
      <div class="shade"></div>
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
    -webkit-transition: opacity 0.3s ease
    -moz-transition: opacity 0.3s ease
    transition: opacity 0.3s ease
    z-index: 99
    -webkit-user-select: none
    .loading
      width: 220px
      height: 220px
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 999
      overflow: hidden
      background-color: #fff
      border-radius: 20px
      box-sizing: border-box
      .logo
        width: 70px
        height: 70px
        background: url(img/loading_logo.png) no-repeat
        background-size: 100% 100%
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
      .load
        width: 66px
        height: 130px
        position: absolute
        top: 50%
        transform: translateY(-50%)
        overflow: hidden
      .right
        right: 45px
      .left
        left: 45px
      .loads
        width: 130px
        height: 130px
        border: 5px solid #ededed
        border-radius: 50%
        position: absolute
        top: 0
        -webkit-transform: rotate(45deg)
        transform: rotate(45deg)
        box-sizing: border-box
      .rightLoad
        right: 2px
        -webkit-animation: load_right 3s linear infinite
      .leftLoad
        left: 2px
        -webkit-animation: load_left 3s linear infinite
      @-webkit-keyframes load_right
        0%
          -webkit-transform: rotate(45deg)
          border-bottom: 5px solid #fb9c3a
          border-left: 5px solid #fb9c3a
        25%
          -webkit-transform: rotate(135deg)
        50%
          -webkit-transform: rotate(225deg)
        75%
          -webkit-transform: rotate(315deg)
        100%
          -webkit-transform: rotate(405deg)
          border-bottom: 5px solid #fcaa46
          border-left: 5px solid #fcaa46
      @-webkit-keyframes load_left
        0%
          -webkit-transform: rotate(45deg)
          border-bottom: 5px solid #fcaa46
          border-left: 5px solid #fcaa46
        25%
          -webkit-transform: rotate(135deg)
        50%
          -webkit-transform: rotate(225deg)
        75%
          -webkit-transform: rotate(315deg)
        100%
          -webkit-transform: rotate(405deg)
          border-bottom: 5px solid #fb9c3a
          border-left: 5px solid #fb9c3a
</style>
