<template>
  <div class="drop-move"
  @touchstart="touchStart($event)"
  @touchmove="touchMove($event)"
  @touchend="touchEnd($event)"
  >
    <section id="drop-move-content" :style="{transform: 'translate3d(0, ' + distance + 'px, 0)'}" :class="{dropMoveActive: active}">
      <div class="drop-move-up" v-show="topShow">
        <i class="iconfont">&#xe843;</i>&nbsp;下拉，返回标的信息
      </div>
      <slot></slot>
      <div class="drop-move-bottom" v-show="bottomShow">
        <p v-if="bottomStatus"><span class="iconfont">&#xe845;</span>&nbsp;向上滑动，查看更多详情</p>
        <p v-else>松开跳转下一页</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'drop-move',
  props: {
    loadTop: { // 下拉回调函数
      type: Function,
      default: undefined
    },
    loadBottom: { // 上拉回调函数
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      topShow: true, // 下拉提示栏
      bottomShow: true, // 上拉提示栏
      offsetUp: 50, // 下拉的偏移值
      offsetBottom: 30, // 上拉的偏移值
      distance: 0, // 元素下拉transformY的值
      bottomStatus: true, // 上拉状态
      startY: 0, // 初始按下Y轴位置
      active: true, // 结束触摸状态，加上动画过渡时间
      enableBottom: true, // 是否可以下拉
      status: true, // 判断此时是上拉还是下拉（true下拉，false上拉）
      startTop: 0, // 下拉时手指按下时的初始滚动条位置
      startBottom: 0 // 上拉时手指按下时的初始滚动条距离页面底部的距离
    }
  },
  mounted () {
    if (this.loadTop === undefined) {
      this.topShow = false
    }
    if (this.loadBottom === undefined) {
      this.bottomShow = false
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
      this.active = false
      this.startTop = this.$el.scrollTop || 0
      this.startBottom = this.$el.scrollHeight - this.$el.clientHeight - this.startTop
    },
    touchMove (e) {
      // 下拉
      // let scrollTop = this.$el.scrollTop
      // let bottom = document.getElementById('drop-move-content').clientHeight - this.$el.clientHeight - scrollTop
      if (this.startTop <= 0 && (e.targetTouches[0].pageY - this.startY) > 0 && this.loadTop !== undefined) {
        this.status = true
        let diffTop = e.targetTouches[0].pageY - this.startY - this.startTop
        if (Math.abs(diffTop) > 0) {
          e.preventDefault()
        }
        this.distance = Math.pow(diffTop, 0.9)
      // 上拉
      } else if (this.startBottom <= 0 && (e.targetTouches[0].pageY - this.startY) < 0 && this.loadBottom !== undefined) {
        this.status = false
        let diffBottom = this.startY - e.targetTouches[0].pageY - this.startBottom
        if (Math.abs(diffBottom) > 0) {
          e.preventDefault()
        }
        this.distance = -Math.pow(diffBottom, 0.75)
        if (this.distance < -this.offsetBottom) {
          this.bottomStatus = false
        } else {
          this.bottomStatus = true
        }
      }
    },
    touchEnd (e) {
      this.active = true
      if (this.status) {
        // 下拉
        if (this.distance > this.offsetUp) {
          if (this.loadTop === undefined) {
            this.loadTop = false
          } else {
            this.loadTop()
          }
        } else {
          this.distance = 0
        }
      } else {
        // 上拉
        if (this.distance < -this.offsetBottom) {
          this.bottomStatus = false
          if (this.loadBottom === undefined) {
            this.loadBottom = false
          } else {
            this.loadBottom()
          }
        } else {
          this.distance = 0
          this.bottomStatus = true
        }
      }
    },
    backDone () {
      this.distance = 0
    }
  }
}
</script>
<style lang="stylus" scoped>
  .drop-move
    width: 100%
    height: 100%
    -webkit-overflow-scrolling: touch
    position: relative
    overflow-y: auto
    .dropMoveActive
      transition-duration: 300ms
    .drop-move-nav
      width:100%
      height:.9rem
      position: fixed
      background-color: #fff
      z-index: 999
      top:0.88rem
      left:0
      ul
        width:100%
        height:100%
        overflow: hidden
        li
          float: left
          width:33%
          height:.9rem
          font-size: .28rem
          color:#999999
          text-align: center
          line-height: .9rem
          position: relative
          -webkit-tap-highlight-color: transparent
          &.on:after
            content: " "
            width:0.68rem
            height:.06rem
            background-color: #FF7102
            position: absolute
            left: 36%
            bottom: 0
            border-radius:3px
            z-index: 5
          &.on
            color:#FF7B00
    .drop-move-up,.drop-move-bottom
      width: 100%
      height: 0.6rem
      line-height: 0.6rem
      font-size: 0.24rem
      color: #CCCCCC
      text-align: center
      background: #f2f3f7
    .drop-move-bottom
      height: 0.7rem
      line-height: 0.7rem
</style>