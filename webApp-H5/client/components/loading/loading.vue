<template>
  <div class="loadBox" v-if="show">
      <div class="loading">
        <div class="logo">加载中...</div>
      </div>
      <div class="shade"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
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
    left: 0
    top: 0
    width: 100%
    height: 100%
    -webkit-transition: opacity 0.3s ease
    -moz-transition: opacity 0.3s ease
    transition: opacity 0.3s ease
    z-index: 99
    -webkit-user-select: none
    .loading
      width: 200px
      height: 200px
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 999
      overflow: hidden
      background-color: #fff
      border-radius: 20px
    .shade
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
</style>