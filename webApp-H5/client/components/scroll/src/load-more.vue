<!-- 上拉加载下拉刷新插件 -->
<template>
  <div class="yo-scroll"
  @touchstart="touchStart($event)"
  @touchmove="touchMove($event)"
  @touchend="touchEnd($event)"
  >
    <header class="pull-refresh" :class="{visible:showRefresh}">
      <div class="load">
        <canvas id="refresh" :width="canvasWidth" :height="canvasHeight" :class="{rotate: refreshing}"></canvas>
        <img :style="loadImgStyle" src="../../../assets/images/package/load_logo.png" alt="">
      </div>
      <p>{{reshTXT}}</p>
    </header>
    <section class="inner"  :class="{touch: touching}" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <slot></slot>
      <footer class="load-more" :class="{dataNone: allLoaded, visible:showLoad}">
        <div class="load" v-show="Loading">
          <canvas id="load" :width="canvasWidth" :height="canvasHeight" :class="{rotate: Loading}"></canvas>
          <img :style="loadImgStyle" src="../../../assets/images/package/load_logo.png" alt="">
        </div>
        <p>{{ loadTXT }}</p>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  name: 'load-more',
  props: {
    // offset: {
    //   type: Number,
    //   default: 85// 初始偏移值（下拉距离）,跟下拉刷新该元素的高度有关
    // },
    // isRefreshed: {
    //   type: Boolean,
    //   default: false// 刷新是否成功
    // },
    allLoaded: {
      type: Boolean,
      default: false// 数据是否全部加载
    },
    loadTop: {
      type: Function,
      default: undefined,
      required: false// 下拉刷新回调函数
    },
    loadBottom: {
      type: Function,
      default: undefined,
      required: false// 上拉加载回调函数
    }
  },
  data () {
    return {
      loadImgStyle: {
        width: '',
        height: '',
        position: 'absolute',
        zIndex: 10,
        left: '',
        marginLeft: '',
        top: '',
        marginTop: ''
      },
      canvasWidth: 0, // 画布的宽
      canvasHeight: 0, // 画布的高
      radius: 0, // 画布上的圆弧半径
      scale: 2, // 画布上的放大倍数，作用是优化在移动端上的弧线锯齿效果
      offset: 0, // 初始偏移值（下拉距离）,跟下拉刷新该元素的高度相等
      top: 0, // 元素下拉transformY的值
      deg: -90, // 下拉时图形弧度变化
      showRefresh: false, // 控制在数据刷新之前，隐藏下拉提示栏,因为页面刷新时，需要请求接口，会有延迟，所以需要关闭该下拉菜单，否则影响用户体验
      showLoad: false, // 控制在数据刷新之前，隐藏下拉提示栏
      refreshing: false, // 控制下拉时图形与刷新时图形的过渡
      reshTXT: '下拉可以刷新', // 控制下拉刷新状态
      loadTXT: '↑上拉加载更多', // 控制上拉加载提示信息
      startY: 0, // 初始按下Y轴位置
      touching: false, // 是否为正在触摸状态，正在处于触摸时，使动画过渡时间为0，否则(即松开时)，加上动画过渡时间
      Loading: false, // 是否为正在加载状态
      enableRefresh: true // 是否可以刷新（一般处于刷新状态的时候为false）
    }
  },
  mounted () {
    let outWidth = document.documentElement.clientWidth || document.body.clientWidth
    if (this.IsPC()) {
      this.scale = 1
    }
    this.canvasWidth = document.querySelector('.load').clientWidth * this.scale
    this.canvasHeight = document.querySelector('.load').clientHeight * this.scale
    this.offset = 63 / 400 * outWidth
    this.loadImgStyle = {
      width: 0.6 * this.canvasHeight / this.scale + 'px',
      height: 0.6 * this.canvasHeight / this.scale + 'px',
      position: 'absolute',
      zIndex: 10,
      left: this.canvasWidth / this.scale / 2 + 'px',
      marginLeft: -(0.6 * this.canvasHeight / this.scale) / 2 + 'px',
      top: this.canvasHeight / this.scale / 2 + 'px',
      marginTop: -(0.6 * this.canvasHeight / this.scale) / 2 + 'px'
    }
    this.radius = (0.6 * this.canvasHeight / this.scale / 2 + 2) * this.scale
    this.onScroll()
  },
  updated () {
    // 初始判断该条数据是否足够多，可以下拉加载,不足以下拉则隐藏下拉菜单栏
    // if (this.allLoaded) {
    //   this.showLoad = false
    // } else {
    //   this.showLoad = true
    // }
  },
  methods: {
    // 判断是移动端还是PC
    IsPC () {
      let userAgentInfo = navigator.userAgent
      let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
    },
    touchMove (e) {
      let startScroll = document.body.scrollTop || document.documentElement.scrollTop
      if (!this.enableRefresh || startScroll > 0) {
        return false
      }
      this.touching = true
      this.showRefresh = true
      let diff = e.targetTouches[0].pageY - this.startY - startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8)
      if (this.top > 10) {
        this.deg = (this.top - 10) / (this.offset - 10) * 360 - 90
      }
      if (this.deg > 270) {
        this.deg = 270
      }
      this.draw(this.deg, 'refresh', this.radius)
      if (this.top >= this.offset) {
        this.reshTXT = '松开立即刷新'
      } else {
        this.reshTXT = '下拉可以刷新'
      }
    },
    touchEnd (e) {
      if (!this.enableRefresh) return false
      this.touching = false
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.reshTXT = '下拉可以刷新'
        // let that = this
        // let speed = (this.deg + 90) / 300 // 计算每1ms走多少度，总共需要300ms完成，300ms根据css中的过渡动画时间决定
        // let timer = setInterval(() => {
        //   that.draw(that.deg)
        //   that.deg = that.deg - speed
        //   if (that.deg < -90) {
        //     clearInterval(timer)
        //   }
        // }, 1)
        this.top = 0
      }
    },
    // 刷新中
    refresh () {
      this.reshTXT = '加载中'
      this.refreshing = true
      console.log(this.refreshing)
      this.draw(180, 'refresh', this.radius)
      this.enableRefresh = false
      this.top = this.offset
      if (this.allLoaded) {
        this.loadTXT = '暂无数据'
      } else {
        this.showLoad = '↑上拉加载更多'
      }
      let that = this
      // that.loadTop(that.refreshDone)// 因为数据刷新过快，所以看不到效果
      setTimeout(function () { that.loadTop(that.refreshDone) }, 1500)
    },
    // 刷新完成
    refreshDone () { // isRefreshed判断是否刷新成功是否保留，有待商酌
      this.refreshing = false
      // if (isRefreshed) {
      this.reshTXT = '刷新成功'
      this.draw(270, 'refresh', this.radius)
      let that = this
      setTimeout(function () {
        that.top = 0
        that.deg = -90
        that.enableRefresh = true
      }, 1000)
      // setTimeout(function () {
      //   that.enableRefresh = true
      //   that.showRefresh = false
      // }, 1500)
      // }
      //  else {
      //   this.reshTXT = '刷新失败'
      //   let that = this
      //   setTimeout(function () {
      //     that.top = 0
      //   }, 1000)
      //   setTimeout(function () {
      //     that.enableRefresh = true
      //   }, 1500)
      // }
    },
    load () {
      this.Loading = true
      this.loadTXT = '加载中'
      this.draw(180, 'load', this.radius)
      let that = this
      // that.loadBottom(that.loadDone)
      setTimeout(function () { that.loadBottom(that.loadDone) }, 1500)
    },
    loadDone () {
      this.Loading = false
      if (this.allLoaded) {
        this.loadTXT = '暂无数据'
      } else {
        this.loadTXT = '↑上拉加载更多'
      }
    },
    onScroll () {
      let that = this
      window.onscroll = function () {
        if (that.allLoaded || that.Loading) {
          return false
        }
        that.showLoad = true
        // let innerHeight = document.querySelector('.inner').clientHeight
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        let bottom = document.documentElement.scrollHeight - window.innerHeight - scrollTop
        if (bottom <= 30) {
          that.load()
        } else {
          that.loadTXT = '↑上拉加载更多'
        }
      }
    },
    draw (deg, obj, radius) {
      let canvas = document.getElementById(obj)
      let cWidth = canvas.width
      let cHeight = canvas.height
      let coverColor = '#FF7102'
      if (!canvas || !canvas.getContext) { return false }
      let ctx = canvas.getContext('2d')
      drawCanvas(cWidth / 2, cHeight / 2, radius, -90, deg, coverColor, 2 * this.scale)
      function drawCanvas (x, y, r, sRadian, eRadian, color, lineWidth) {
        ctx.clearRect(0, 0, cWidth, cHeight)
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.arc(x, y, r, sRadian * Math.PI / 180, eRadian * Math.PI / 180)
        ctx.stroke()
        if (deg === -90) {
          ctx.clearRect(0, 0, cWidth, cHeight)
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .yo-scroll
    width: 100%
    position: relative
    -webkit-overflow-scrolling: touch
    background-color: transparent
    .inner
      background: transparent
      width: 100%
      transition-duration: 300ms
    .touch
      transition-duration: 0ms
    .pull-refresh
      position: absolute
      left: 0
      top: 0
      z-index: 0
      width: 100%
      height: 1.2rem
      padding-top: 0.1rem
      padding-bottom: 0.1rem
      display: block
      align-items: center
      background-color: #f3f3f3
      justify-content: center
      text-align: center
      font-size: 0.24rem
      color: #ccc
      visibility: hidden
      &.visible
        visibility: visible
      .load
        width: 100%
        height: 0.7rem
        position: relative
        canvas
          width: 100%
          &.rotate
            -webkit-animation: rotate 0.75s linear infinite
            animation: rotate 0.75s linear infinite
    .dataNone
      padding: 0.2rem 0
    .load-more
      padding-top: 0.1rem
      padding-bottom: 0.1rem
      height: 1.2rem
      align-items: center
      justify-content: center
      text-align: center
      font-size: 0.24rem
      color: #ccc
      visibility: hidden
      &.visible
        visibility: visible
      .load
        width: 100%
        position: relative
        canvas
          width: 100%
          &.rotate
            -webkit-animation: rotate 0.75s linear infinite
            animation: rotate 0.75s linear infinite
  @-webkit-keyframes rotate
    0%
      -webkit-transform: rotate(0deg)
    50%
      -webkit-transform: rotate(180deg)
    100%
      -webkit-transform: rotate(360deg)
  @keyframes rotate
    0%
      transform: rotate(0deg)
    50%
      transform: rotate(180deg)
    100%
      transform: rotate(360deg)
</style>