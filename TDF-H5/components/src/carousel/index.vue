<template>
  <div
    ref="carouselOut"
    class="carousel"
    @touchstart="touchStart($event)">
    <div
      :style="{ transform: 'translate3d('+ distance + 'px, 0, 0)'}"
      :class="{active: active}"
      class="carouselInner">
      <img
        ref="img1"
        :style="{ transform: 'translate3d('+ imgDis1 + 'px, 0, 0) scale('+scale1+')', opacity: (scale1-1+0.6)}"
        :class="{active: active}"
        :src="imgs.src1">
      <img
        ref="img2"
        :style="{ transform: 'translate3d('+ imgDis2 + 'px, 0, 0) scale('+scale2+')', margin: '0 '+offset+'px', opacity: (scale2-1+0.6)}"
        :class="{active: active}"
        :src="imgs.src2"
        class="img2">
      <img
        ref="img3"
        :style="{ transform: 'translate3d('+ imgDis3 + 'px, 0, 0) scale('+scale3+')', opacity: (scale3-1+0.6)}"
        :src="imgs.src3"
        :class="{active: active}">
    </div>
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
      outWidth: 0, // div.inner的父级宽度
      // imgDis作用：在div.inner移动到两端时，使两端的图片能够隐藏，并且图片之间的间隔进行微调整
      imgDis1: 0, // 左边图片transLateX的值
      imgDis2: 0, // 中间图片transLateX的值
      imgDis3: 0, // 右边图片transLateX的值
      offset: 35, // 中间图片的margin值（左右）
      active: true, // 是否加上动画过渡css属性
      time1: '', // 最外层初始加载的循环计时器
      time2: '', // 最外层初始加载的一次性计时器
      time3: '', // 在图形整体移动到最左端时，使用新的一次性计时器
      time4: '', // 在图形整体移动到最左端时，使distan++，使用新的循环计时器
      maxDis: 0, // 每一个图片想要居中所要走的距离
      imgWidth: 0 // 一张图片的宽度
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
      clearInterval(that.time1)
      clearInterval(that.time2)
      clearInterval(that.time3)
      clearInterval(that.time4)
    },
    touchMove() {
      let that = this
      window.ontouchmove = function(e) {
        let event = e || window.event
        event.preventDefault()
        event.stopPropagation()
        let shuX = event.changedTouches[0].clientX
        let jl = shuX - that.startX
        if (Math.abs(jl) > 2) {
          that.active = false
        } else {
          that.active = true
          return false
        }
        if (jl > 0) {
          jl = Math.pow(jl, 0.85)
        } else if (jl < 0) {
          jl = -Math.pow(Math.abs(jl), 0.85)
        } else {
          jl = 0
        }
        that.distance = that.distanceStart + jl
        that.change()
      }
    },
    touchEnd() {
      let that = this
      let maxDis = that.maxDis
      window.ontouchend = function(e) {
        that.active = true
        if (that.distance <= -maxDis) {
          that.distance = -maxDis
          that.indexChange(3)
        } else if (
          that.distance < that.distanceStart &&
          that.distance < 0 &&
          that.distance > -maxDis
        ) {
          that.distance = -maxDis
          that.indexChange(3)
        } else if (
          that.distance > -maxDis &&
          that.distance <= 0 &&
          that.distance > that.distanceStart
        ) {
          that.distance = 0
          that.indexChange(2)
        } else if (
          that.distance < maxDis &&
          that.distance >= 0 &&
          that.distance < that.distanceStart
        ) {
          that.distance = 0
          that.indexChange(2)
        } else if (
          that.distance > that.distanceStart &&
          that.distance > 0 &&
          that.distance < maxDis
        ) {
          that.distance = maxDis
          that.indexChange(1)
        } else if (that.distance >= maxDis) {
          that.distance = maxDis
          that.indexChange(1)
        }
        that.change()
        that.time2 = setTimeout(() => {
          that.time1 = setInterval(that.moveAuto, 1)
        }, 2000)
        window.ontouchmove = null
      }
    },
    change() {
      let that = this
      let maxDis = that.maxDis
      // offsets为两端图片距离左右两端的距离，用以计算两端图片需要位移多少才能完全隐藏
      let offsets =
        (that.outWidth - that.imgWidth * 3 - that.offset * 2) / 2 +
        that.imgWidth
      // 因为两端图片的放大计算方式和中间图的不一样，所以设置两个变量
      let dis1 = Math.abs(that.distance) // 控制左右两端图片的移动和放大以及中间图片的移动
      let dis2 = Math.abs(that.distance) // 控制中间图片的放大
      if (dis1 >= maxDis) {
        dis1 = 2 * maxDis - dis1
        if (dis1 >= maxDis * 2) {
          dis1 = 0
        }
        if (dis2 >= maxDis) {
          dis2 = maxDis
        }
      }
      // 图形整体向右移动
      if (that.distance > 0) {
        that.scale1 = (dis1 / maxDis) * 0.4 + 1
        // 因为视觉效果，左侧图片总感觉居中的时候偏左，所以加上了点偏移值
        that.imgDis1 = (dis2 / maxDis) * 3
        // Math.abs(offsets - maxDis)，计算图片刚好被遮挡的减去父级所走的maxDis还需走的距离
        that.imgDis3 = (dis2 / maxDis) * Math.abs(offsets - maxDis)
        // 图形整体向左移动
      } else if (that.distance < 0) {
        that.scale3 = (dis1 / maxDis) * 0.4 + 1
        that.imgDis1 = -(dis2 / maxDis) * Math.abs(offsets - maxDis)
        // that.imgDis2 = -dis2 / maxDis * (maxDis - offsets - that.imgWidth * 1.4 / 2)
      } else {
        that.scale1 = (dis1 / maxDis) * 0.4 + 1
        that.scale3 = (dis1 / maxDis) * 0.4 + 1
        that.imgDis1 = (dis2 / maxDis) * (maxDis - offsets)
        that.imgDis2 = (dis2 / maxDis) * (maxDis - offsets)
      }
      that.scale2 = -(dis2 / maxDis) * 0.4 + 1.4
    },
    moveAuto() {
      let that = this
      that.active = false
      that.distance -= 1
      let maxDis = that.maxDis
      if (that.distance <= -maxDis) {
        that.distance = -maxDis
        that.indexChange(3)
        that.time3 = setTimeout(() => {
          clearInterval(that.time1)
          clearInterval(that.time2)
          that.time4 = setInterval(() => {
            that.distance += 2
            that.change()
            if (that.distance === 0) {
              that.indexChange(2)
            }
            if (that.distance >= maxDis) {
              that.distance = maxDis
              that.indexChange(1)
              clearInterval(that.time4)
              that.time2 = setTimeout(() => {
                that.time1 = setInterval(that.moveAuto, 1)
              }, 2000)
            }
          }, 1)
        }, 2000)
      }
      that.change()
      if (that.distance % maxDis === 0) {
        if (that.distance > -maxDis && that.distance < maxDis) {
          that.indexChange(2)
        }
        clearInterval(that.time1)
        that.time2 = setTimeout(() => {
          that.time1 = setInterval(that.moveAuto, 1)
        }, 2000)
      }
    }
  },
  mounted() {
    let that = this
    this.imgWidth = this.$refs.img1.width
    // 计算左右两端图片走到居中位置所要走的距离
    this.maxDis = this.imgWidth + this.offset
    this.outWidth = document.querySelector('.carousel').clientWidth
    this.offset = Math.ceil((35 / 414) * this.outWidth)
    this.time2 = setTimeout(() => {
      this.time1 = setInterval(that.moveAuto, 1)
    }, 2000)
    this.indexChange(2)
    window.onresize = function() {
      that.outWidth = document.querySelector('.carousel').clientWidth
      that.offset = Math.ceil((35 / 414) * that.outWidth)
      that.maxDis = that.imgWidth + that.offset
    }
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
      img
        width: 140px
        height: 140px
        vertical-align: middle
    .con_text
      height: 140px
  .active
    transition: transform 0.5s ease-out 0s
</style>
