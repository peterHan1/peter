<template>
  <div class="loadBox">
    <canvas 
      ref="bubble" 
      width="30" 
      height="30"
      style="height: 30px; width:30px;"/>
    <div class="loadBg"/>  
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 50,
      height: 80,
      index: 0
    }
  },
  mounted() {
    this._draw(this.y)
  },
  methods: {
    _draw(i) {
      console.log(i * 12)
      const bubble = this.$refs.bubble
      let ctx = bubble.getContext('2d')
      this.index = i
      ctx.clearRect(0, 0, bubble.width, bubble.height)
      ctx.beginPath()
      ctx.arc(
        15,
        15,
        13,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * (i * 10 + 270)
      )
      ctx.strokeStyle = '#FF7102'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  },
  watch: {
    y() {
      this._draw(this.y)
    }
  }
}
</script>
<style lang="stylus" scoped>
.loadBox
  width: 30px; /*no*/
  height: 30px; /*no*/
  position: relative
  .loadBg
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    width: 42px
    height: 42px
    background: url(../../../assets/images/common/load.png) no-repeat
    background-size: 100% 100%
</style>
