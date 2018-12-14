<template>
  <div class="car" ref="swiper">
      <p ref="ritem" v-for="(item, index) in newlist" :key="item.value"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
      :style="{backgroundImage: 'url('+ item.src +')'}"  >{{index}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      startX: '',
      moveX: '',
      list: [
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'}
      ],
      contenter: this.$refs.swiper,
      active: -1,
      off: true,
      autoplay: 1000,
      start: null
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.backlate()
      this.backtime()
      this._autoplay()
    })
  },
  computed: {
    newlist: function () {
      this.list.push(this.list[0])
      this.list.unshift(this.list[(this.list.length - 2)])
      return this.list
    }
  },
  methods: {
    backlate (offert) {
      let _that = this
      if (!offert) { offert = 0 }
      (this.list).forEach((item, index) => {
        this.$refs.ritem[index].style.transform = 'translate3d(' + ((index + this.active) * _that.$refs.ritem[index].clientWidth + offert) + 'px,0,0)'
      })
    },
    backtime (duration) {
      if (!duration) { duration = '0ms' }
      (this.$refs.ritem).forEach((item) => {
        item.style.webkitTransition = duration
        item.style.transition = duration
      })
    },
    touchStart (e) {
      this.startX = e.touches[0].pageX
    },
    touchMove (e) {
      e.preventDefault()
      e.stopPropagation()
      this.moveX = e.touches[0].pageX - this.startX
      this.backlate(this.moveX)
    },
    touchEnd (e) {
      this.backtime('300ms')
      if (this.moveX > 100) {
        this.backlate(this.$refs.ritem[0].clientWidth)
        this.active++
      } else if (this.moveX < -100) {
        this.backlate(-this.$refs.ritem[0].clientWidth)
        this.active--
      }
      this.setactive(this.active)
      setTimeout(() => {
        this._autoplay()
      })
    },
    setactive (active) {
      if (active === 0) {
        this.active = -6
      } else if (active === -7) {
        this.active = -1
      } else {
        return false
      }
      this.backtime()
      setTimeout(() => {
        this.backlate()
      }, 300)
    },
    next () {
      this.backtime('300ms')
      this.active--
      this.backlate()
      this.setactive(this.active)
    },
    _autoplay () {
      if (this.autoplay !== '') {
        this.cleartime()
        this.start = setTimeout(() => {
          this.next()
          this._autoplay()
        }, this.autoplay)
      }
    },
    cleartime () {
      clearTimeout(this.start)
      this.start = null
    }
  }
}
</script>
<style lang="stylus">
.car {
  width: 100%;
  height:100%;
  position: relative;
  p{
    position: absolute;
    width: 100%;
    flex: 1;
    height:100%;
    background-size: 100%;
    text-align: center;
    font-size: 30px;
    color: #fff;
    line-height: 500px;
  }
}
</style>