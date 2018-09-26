<template>
  <select class="floating" id="moveBox" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end"></select>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        flags: false,
        position: { x: 0, y: 0 },
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: '',
        screenWidth: document.body.clientWidth,
        screenHeight: document.body.clientHeight
      }
    },
    mounted () {
    },
    methods: {
      down (event) {
        let moveDiv = document.getElementById('moveBox')
        moveDiv.style.transition = '0s'
        this.flags = true
        let touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.position.x = touch.clientX
        this.position.y = touch.clientY
        this.dx = moveDiv.offsetLeft
        this.dy = moveDiv.offsetTop
      },
      move (event) {
        event.preventDefault()
        let moveDiv = document.getElementById('moveBox')
        let maxWidth = this.screenWidth - moveDiv.clientWidth
        let maxHeight = this.screenHeight - moveDiv.clientHeight
        if (this.flags) {
          var touch
          if (event.touches) {
            touch = event.touches[0]
          } else {
            touch = event
          }
          this.nx = touch.clientX - this.position.x
          this.ny = touch.clientY - this.position.y
          this.xPum = this.dx + this.nx
          this.yPum = this.dy + this.ny
          if (this.xPum <= 0) {
            this.xPum = 0
          } else if (this.xPum >= maxWidth) {
            this.xPum = maxWidth
          } else {
            this.xPum = this.xPum
          }
          if (this.yPum <= 0) {
            this.yPum = 0
          } else if (this.yPum >= maxHeight) {
            this.yPum = maxHeight
          }
          moveDiv.style.left = this.xPum + 'px'
          moveDiv.style.top = this.yPum + 'px'
        }
      },
      end () {
        let _this = this
        _this.flags = false
        let moveDiv = document.getElementById('moveBox')
        if (moveDiv.offsetLeft > _this.screenWidth / 2) {
          let lefts = _this.screenWidth - moveDiv.clientWidth
          moveDiv.style.left = lefts + 'px'
        } else {
          moveDiv.style.left = 0
        }
        moveDiv.style.transition = '0.3s'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .floating
    height: 120px
    width: 120px
    z-index: 999
    position: absolute
    top: 50%
    right: 0
    border-radius: 5px
    background: url('../../assets/images/floating.png') no-repeat
    background-size: 100% 100%
</style>