<template>
  <div v-if="param.show">
      <div class="layer_win">
        <img :src="param.imgUrl">
        <div class="layer_close" @click="closeFn">X</div>
      </div>
      <div class="shade"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        param: {
          show: false,
          imgUrl: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      closeFn () {
        this.param.show = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
    .layer_win
      position: fixed
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 9999
      overflow: hidden
      border-radius: 20px
      text-align: center
      img
        width: 600px
        height: 800px
    .layer_close
      display: inline-block
      font-size: 30px
      text-align: center
      width: 50px
      height: 50px
      line-height: 50px
      border: 2px solid #fff
      border-radius: 100%
      z-index: 9999
      color: #fff
    .shade
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, 0.5)
      z-index: 999
</style>
