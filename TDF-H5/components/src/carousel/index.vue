<template>
  <div
    ref="carouselOut"
    class="carousel"
    @touchstart="touchStart($event)">
    <ul
      :style="{left: distance + '%'}"
      :class="{active: active}"
      class="carouselInner">
      <li>
        <img
          ref="img1"
          :style="{ transform: 'translate3d('+ imgDis1 + 'px, 0, 0) scale('+scale1+')', opacity: (scale1-1+0.6)}"
          :class="{active: active}"
          :src="imgs.src1">
      </li>
      <li>
        <img
          ref="img2"
          :style="{ transform: 'translate3d('+ imgDis2 + 'px, 0, 0) scale('+scale2+')', opacity: (scale2-1+0.6)}"
          :class="{active: active}"
          :src="imgs.src2"
          class="img2">
      </li>
      <li>
        <img
          ref="img3"
          :style="{ transform: 'translate3d('+ imgDis3 + 'px, 0, 0) scale('+scale3+')', opacity: (scale3-1+0.6)}"
          :src="imgs.src3"
          :class="{active: active}">
      </li>
    </ul>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'Carousel',
  props: {
    imgs: {
      type: Object
    }
  },
  data() {
    return {
      distance: 0, // div.inner的transformX值
      distanceStart: 0, // 每次拖到鼠标移动时div.inner的transformX的初始值
      startX: 0, // 鼠标按下的位置
      scale1: 1, // 左边图片初始放大倍数
      scale2: 1.4, // 中间图片初始放大倍数
      scale3: 1, // 右边图片初始放大倍数
      // imgDis作用：在div.inner移动到两端时，使两端的图片能够隐藏，并且图片之间的间隔进行微调整
      imgDis1: 0, // 左边图片transLateX的值
      imgDis2: 0, // 中间图片transLateX的值
      imgDis3: 0, // 右边图片transLateX的值
      active: true, // 是否加上动画过渡css属性
      time1: '', // 最外层初始加载的循环计时器
      time2: '', // 最外层初始加载的一次性计时器
      maxDis: 33.33 // 每个模块的百分比宽
    }
  },
  methods: {
    indexChange(index) {
      this.$emit('itemIndex', index)
    },
    touchStart(e) {
      this.startX = e.targetTouches[0].clientX
      this.distanceStart = this.distance
      this.touchMove()
      this.touchEnd()
      let that = this
      that.active = false
      clearInterval(that.time1)
      clearInterval(that.time2)
    },
    touchMove() {
      let that = this
      let maxDis = that.maxDis
      window.ontouchmove = function(e) {
        let event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        let shuX = event.changedTouches[0].clientX
        let jl = shuX - that.startX
        if (jl > 0) {
          jl = Math.pow(jl, 0.6)
        } else if (jl < 0) {
          jl = -Math.pow(Math.abs(jl), 0.6)
        } else {
          jl = 0
        }
        that.distance = that.distanceStart + jl
        if (that.distance <= -maxDis / 2) {
          that.indexChange(3)
        } else if (that.distance < maxDis / 2 && that.distance > -maxDis / 2) {
          that.indexChange(2)
        } else if (that.distance >= maxDis / 2) {
          that.indexChange(1)
        }
        that.change()
      }
    },
    touchEnd() {
      let that = this
      let maxDis = that.maxDis
      window.ontouchend = function(e) {
        that.active = true
        if (that.distance <= -maxDis / 2) {
          that.distance = -maxDis
          that.indexChange(3)
        } else if (that.distance < maxDis / 2 && that.distance > -maxDis / 2) {
          that.distance = 0
          that.indexChange(2)
        } else if (that.distance >= maxDis / 2) {
          that.distance = maxDis
          that.indexChange(1)
        }
        that.change()
        window.ontouchmove = null
        that.time2 = setTimeout(() => {
          that.time1 = setInterval(that.moveAuto, 1)
        }, 3000)
      }
    },
    change() {
      let that = this
      let maxDis = that.maxDis
      let dis = Math.abs(that.distance)
      if (that.distance < 0) {
        that.scale3 = (dis / maxDis) * 0.4 + 1
        that.scale1 = 1
        that.scale2 = -(dis / maxDis) * 0.4 + 1.4
      } else if (that.distance > 0) {
        that.scale1 = (dis / maxDis) * 0.4 + 1
        that.scale3 = 1
        that.scale2 = -(dis / maxDis) * 0.4 + 1.4
      } else {
        that.scale1 = 1
        that.scale3 = 1
        that.scale2 = -(dis / maxDis) * 0.4 + 1.4
      }
    },
    moveAuto() {
      let that = this
      that.active = false
      that.distance -= 0.5
      this.change()
      let maxDis = that.maxDis
      if (that.distance <= -maxDis) {
        that.distance = -maxDis
        that.indexChange(3)
        this.change()
        clearInterval(that.time1)
        clearTimeout(that.time2)
        that.time2 = setTimeout(() => {
          that.time1 = setInterval(() => {
            that.distance += 0.8
            this.change()
            if (that.distance > -maxDis && that.distance < maxDis) {
              that.indexChange(2)
            }
            if (that.distance >= maxDis) {
              that.distance = maxDis
              that.indexChange(1)
              this.change()
              clearInterval(that.time1)
              clearTimeout(that.time2)
              that.time2 = setTimeout(() => {
                that.time1 = setInterval(() => {
                  that.distance -= 0.5
                  this.change()
                  if (that.distance <= 0) {
                    that.distance = 0
                    that.indexChange(2)
                    this.change()
                    clearInterval(that.time1)
                    clearTimeout(that.time2)
                    that.time2 = setTimeout(() => {
                      that.time1 = setInterval(() => {
                        that.moveAuto()
                      }, 1)
                    }, 2000)
                  }
                }, 1)
              }, 2000)
            }
          }, 1)
        }, 2000)
      }
    }
  },
  mounted() {
    let that = this
    that.time2 = setTimeout(() => {
      that.time1 = setInterval(that.moveAuto, 1)
    }, 2000)
    this.indexChange(2)
  }
}
</script>
<style lang="stylus" scoped>
  .carousel
    width: 100%
    min-width: 600px
    margin: auto
    touch-action: none
    webkit-overflow-scrolling: touch
    position: relative
    padding-top: 200px
    overflow: hidden
    text-align: center
    .carouselInner
      padding: 30px 0
      height: 180px
      position: absolute
      width: 100%
      top: 0
      li
        width: 33.33%
        display: inline-block
        float: left
        text-align center
      img
        width: 60%
        vertical-align: middle
    .con_text
      height: 140px
  .active
    transition: all 0.4s ease-out 0s
</style>
