<template>
  <div class="layerBox" v-if="show">
      <div class="layer">
        <div class="layer_close">X</div>
        <div class="layer_content"></div>
        <div class="layer_btn">
          <div class="layer_btn1"></div>
          <div class="layer_btn2"></div>
        </div>
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
    .layer
      width: 524px
      height: 267px
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 9999
      overflow: hidden
      background-color: #fff
      border-radius: 20px
    .shade
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999
</style>