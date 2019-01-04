<template>
  <div id="vue-count" class="vue-count">
    <ul id="ul" :style="{padding: '0.4rem ' + dis + 'px' + ' 0', transform: 'translate3d('+ distance + 'px, 0, 0)'}" :class="{active: active}"
      @touchstart="touchstart($event)"
      @touchmove="touchmove($event)"
      @touchend="touchend($event)">
      <li v-for="(item, index) in dataX" :key="index" :class="[index%10 == 0?'on':'']" :style="{width: lineWidth + 'px',marginRight: index === dataX.length -1?'0':(offset+'px')}"><span >{{item | capitalize}}</span></li>
    </ul>
    <span class="center" :style="{left: + dis + 'px',width: lineWidth + 'px'}"></span>
  </div>
</template>
<script>
  let dataX = []
  for (let i = 0; i <= 200; i++) {
    dataX[i] = i
  }
  export default {
    name: 'v-count',
    data () {
      return {
        dataX: dataX,
        active: false,
        offset: 15, // li标签之间的间距
        lineWidth: 2,
        dis: 0,
        distance: 0,
        distanceStart: 0,
        startX: 0,
        ulWidth: 0,
        index: 0
      }
    },
    filters: {
      capitalize (value) {
        if (value % 10 === 0) {
          return value * 100
        } else {
          return ''
        }
      }
    },
    methods: {
      before () {
        let outWidth = document.documentElement.clientWidth || document.body.clientWidth
        this.dis = outWidth / 2
        this.ulWidth = document.getElementById('ul').clientWidth
        this.offsetDis = this.offset + this.lineWidth
      },
      indexChange (index) {
        this.$emit('Index', index)
      },
      touchstart (e) {
        this.active = false
        this.startX = e.targetTouches[0].pageX
        this.distanceStart = this.distance
      },
      touchmove (e) {
        e.preventDefault()
        e.stopPropagation()
        let shuX = e.targetTouches[0].pageX
        let jl = shuX - this.startX
        this.distance = this.distanceStart + jl
        if (this.distance >= 0) {
          this.distance = 0
        } else if (this.distance <= -this.ulWidth) {
          this.distance = -(this.ulWidth)
        }
      },
      touchend (e) {
        this.active = true
        if (this.distance > this.distanceStart) {
          this.distance = Math.abs(this.distance)
          if (this.distance % this.offsetDis <= this.offsetDis / 2) {
            this.index = Math.ceil(this.distance / this.offsetDis) - 1
          } else {
            this.index = Math.ceil(this.distance / this.offsetDis)
          }
          if (this.index < 0) {
            this.index = 0
          }
        } else if (this.distance < this.distanceStart) {
          this.distance = Math.abs(this.distance)
          if (this.distance % this.offsetDis >= this.offsetDis / 2) {
            this.index = Math.floor(this.distance / this.offsetDis) + 1
          } else {
            this.index = Math.floor(this.distance / this.offsetDis)
          }
          if (this.index > (this.maxIndex - 1)) {
            this.index = this.maxIndex - 1
          }
        }
        this.distance = -this.offsetDis * this.index
        this.indexChange(this.index)
      }
    },
    mounted () {
      this.before()
    }
  }
</script>
<style lang="stylus" scoped>
  .vue-count
    width: 100%
    height: 0.9rem
    overflow: hidden
    position: relative
    ul
      height: 100%
      display: flex
      align-items: flex-end
      -webkit-overflow-scrolling: touch
      border-bottom: 1px solid #E8E8E8
      position: absolute
      left: 0
      top: 0
      &.active
        transition: all 0.3s ease
      li
        height: 0.2rem
        text-align: center
        line-height: -0.3rem
        font-size: 0.24rem
        color: #949494
        float: left
        background: #E8E8E8
        position: relative
        &.on
          height: 0.3rem
        span
          position: absolute
          left:50%
          top: 50%
          transform: translate(-50%, -150%)
    .center
      display: inline-block
      position: absolute
      height: 0.76rem
      bottom: 0
      background: #FF7400
      z-index: 90
</style>