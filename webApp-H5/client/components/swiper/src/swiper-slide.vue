<template>
  <div class="img_show">
    <div class="title">{{showIndex+1}}&nbsp;/&nbsp;{{maxIndex}}</div>
    <ul :style="{ transform: 'translate3d('+ distance + 'px, 0, 0)'}" :class="{active: active}" class="slider">
      <li @touchstart="touchstart($event)"
          @touchmove="touchmove($event)"
          @touchend="touchend($event)"
          v-for="(src,index) in items"  :key="index">
        <img :src="src" :class="{autoHeight: false}" />
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'swiper-slide',
    props: ['items'],
    data () {
      return {
        imgWidth: 0, // 一张图片的宽度（也是整个屏幕的宽）
        startX: 0, // 手指按下的横坐标
        distanceStart: 0, // 每次拖到鼠标移动时div.slider的transformX的初始值
        distance: 0, // div.slider的transformX的值
        active: false, // 是否加上动画过渡css属性
        maxWidth: 0, // 最外层盒子的宽，即屏幕的宽，即图片每次走动的距离
        showIndex: 0, // 需要展示的图片的索引，下标
        maxIndex: 0// 图片的张数
      }
    },
    mounted () {
      this.maxIndex = this.items.length
      this.$nextTick(function () {
        this.maxWidth = document.querySelector('.img_show').clientWidth
      })
      let that = this
      window.onresize = function () {
        that.active = false
        that.maxWidth = document.querySelector('.img_show').clientWidth
        that.distance = -that.maxWidth * that.showIndex
      }
    },
    methods: {
      touchstart (e) {
        this.startX = e.targetTouches[0].pageX
        this.distanceStart = this.distance
      },
      touchmove (e) {
        e.preventDefault()
        e.stopPropagation()
        let shuX = e.targetTouches[0].pageX
        let jl = shuX - this.startX
        if (Math.abs(jl) > 2) {
          this.active = false
        } else {
          return false
        }
        if (jl > 0 && this.showIndex <= 0) {
          jl = Math.pow(jl, 0.8)
        } else if (jl < 0 && this.showIndex >= (this.maxIndex - 1)) {
          jl = -Math.pow(Math.abs(jl), 0.8)
        }
        this.distance = this.distanceStart + jl
      },
      touchend (e) {
        this.active = true
        // 只有滑动了一个图片的一半的距离才会展示下一张或上一张
        // if (this.distance > this.distanceStart) {
        //   this.distance = Math.abs(this.distance)
        //   if (this.distance % this.maxWidth <= this.maxWidth / 2) {
        //     this.showIndex = Math.ceil(this.distance / this.maxWidth) - 1
        //   } else {
        //     this.showIndex = Math.ceil(this.distance / this.maxWidth)
        //   }
        //   if (this.showIndex < 0) {
        //     this.showIndex = 0
        //   }
        // } else if (this.distance < this.distanceStart) {
        //   this.distance = Math.abs(this.distance)
        //   if (this.distance % this.maxWidth >= this.maxWidth / 2) {
        //     this.showIndex = Math.floor(this.distance / this.maxWidth) + 1
        //   } else {
        //     this.showIndex = Math.floor(this.distance / this.maxWidth)
        //   }
        //   if (this.showIndex > (this.maxIndex - 1)) {
        //     this.showIndex = this.maxIndex - 1
        //   }
        // }
        // 只要滑动了就会展示下一张或上一张
        if (this.distance > this.distanceStart) {
          this.distance = Math.abs(this.distance)
          if (this.distance % this.maxWidth < this.maxWidth) {
            this.showIndex = Math.ceil(this.distance / this.maxWidth) - 1
          } else {
            this.showIndex = Math.ceil(this.distance / this.maxWidth)
          }
          if (this.showIndex < 0) {
            this.showIndex = 0
          }
        } else if (this.distance < this.distanceStart) {
          this.distance = Math.abs(this.distance)
          if (this.distance % this.maxWidth > 0) {
            this.showIndex = Math.floor(this.distance / this.maxWidth) + 1
          } else {
            this.showIndex = Math.floor(this.distance / this.maxWidth)
          }
          if (this.showIndex > (this.maxIndex - 1)) {
            this.showIndex = this.maxIndex - 1
          }
        }
        this.distance = -this.maxWidth * this.showIndex
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .img_show
    opacity: 1
    width:100%
    height:100%
    padding:0.8rem 0
    touch-action: none
    box-sizing:border-box
    background-color:#000
    overflow: hidden
    position: fixed
    .title
      width: 100%
      height: 0.8rem
      line-height: 0.8rem
      color: #fff
      font-size: 0.3rem
      text-align: center
      background-color: transparent
      position: absolute
      left: 0
      top:0
    .slider
      height: 100%
      touch-action: none
      width: 100%
      white-space: nowrap
      li
        width: 100%
        height: 100%
        display: inline-block
        position: relative
        img
          position: absolute
          display: block
          height: 100%
          width: 100%
          vertical-align: middle
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          max-height: 100%
          max-width: 100%
          margin-left: auto
          margin-right: auto
          user-select: none
          .autoHeight
            height: auto
  .active
    transition: all 0.5s ease-out 0s
</style>