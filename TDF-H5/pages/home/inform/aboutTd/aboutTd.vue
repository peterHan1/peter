<template>
  <div class="about">
    <td-header title="关于拓道"/>
    <div class="nav">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
    </div>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage">
        <cube-slide-item>
          <Terraces/>
        </cube-slide-item>
        <cube-slide-item>
          <Framework/>
        </cube-slide-item>
        <cube-slide-item>
          <Personnel/>
        </cube-slide-item>
        <cube-slide-item>
          <Certificate/>
        </cube-slide-item>
        <cube-slide-item>
          <Signature/>
        </cube-slide-item>
      </cube-slide>
    </div>   
  </div>
</template>
<script>
import Certificate from './src/certificate.vue'
import Framework from './src/framework.vue'
import Signature from './src/signature.vue'
import Personnel from './src/personnel.vue'
import Terraces from './src/terraces.vue'
import { findIndex } from '../../../../components/src/common/util.js'
export default {
  metaInfo: {
    title: '关于拓道'
  },
  data() {
    return {
      selectedLabel: '平台信息',
      disabled: false,
      tabLabels: [
        {
          label: '平台信息'
        },
        {
          label: '组织架构'
        },
        {
          label: '人员信息'
        },
        {
          label: '相关证件'
        },
        {
          label: '法人签章'
        }
      ],
      loop: false,
      autoPlay: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      maskShow: false,
      imgLists: `{src1: img1, title1: '新网银行存管协议-1', src2: img2, title2: '新网银行存管协议-2'}, {src1: img3, title1: '拓道金服营业执照', src2: img4, title2: '营业许可证(ICP+EDI)-1'}, {src1: img5, title1: '营业许可证(ICP+EDI)-2', src2: img6, title2: '营业许可证(ICP+EDI)-3'}, {src1: img7, title1: '营业许可证(ICP+EDI)-4', src2: img8, title2: '信息系统安全等级证书'}, {src1: img9, title1: '信息系统等级测评基本页', src2: '', title2: ''}`,
      imgSrc: `imgActive1, imgActive2, imgActive3, imgActive4, imgActive5, imgActive6, imgActive7, imgActive8, imgActive9`,
      distanceStart: 0,
      distance: 0,
      showIndex: 0,
      isActive: false,
      startX: 0,
      maxWidth: 0,
      maxIndex: 0
    }
  },
  computed: {
    initialIndex() {
      let index = 0
      index = findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      )
      return index
    }
  },
  mounted() {},
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    show(index) {
      this.maskShow = true
      this.isActive = false
      this.$nextTick(function() {
        // this.maxIndex = document.querySelector('.slider').getElementsByTagName('li').length
        // this.maxWidth = document.documentElement.clientWidth || document.body.clientWidth
        this.showIndex = index
        this.distance = -this.maxWidth * index
      })
    },
    touchstart(e) {
      this.startX = e.targetTouches[0].pageX
      this.distanceStart = this.distance
    },
    touchmove(e) {
      e.preventDefault()
      e.stopPropagation()
      let shuX = e.targetTouches[0].pageX
      let jl = shuX - this.startX
      if (Math.abs(jl) > 2) {
        this.isActive = false
      } else {
        return false
      }
      if (jl > 0 && this.showIndex <= 0) {
        jl = Math.pow(jl, 0.8)
      } else if (jl < 0 && this.showIndex >= `this.maxIndex - 1`) {
        jl = -Math.pow(Math.abs(jl), 0.8)
      }
      this.distance = this.distanceStart + jl
    },
    touchend(e) {
      this.isActive = true
      if (this.distance > this.distanceStart) {
        this.showIndex -= 1
        if (this.showIndex < 0) {
          this.showIndex = 0
        }
      } else if (this.distance < this.distanceStart) {
        this.showIndex += 1
        if (this.showIndex > `this.maxIndex - 1`) {
          this.showIndex = this.maxIndex - 1
        }
      } else {
        this.showIndex = this.showIndex
      }
      this.distance = -this.maxWidth * this.showIndex
    }
  },
  components: {
    Certificate,
    Framework,
    Personnel,
    Terraces,
    Signature
  }
}
</script>
<style lang="stylus" scoped>
  .about
    padding-top: 0.88rem
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color:$color-white
    width: 100%
    height: 100%
    .nav
      background-color: $color-white
      /deep/ .cube-tab-bar
        height: 80px
      /deep/ .cube-tab-bar-slider
        width: 18%
        margin-left 1%
        height: 5px
        border-radius: 3px
    .tab-slide-container
      position absolute
      left: 0
      top: 1.68rem
      bottom: 0
      right: 0
  .img_show
    opacity: 1
    z-index: 90
    width: 100%
    height: 100%
    padding: 1.68rem 0 0.8rem
    box-sizing: border-box
    background-color: #000
    overflow: hidden
    position: fixed
    top: 0
    left: 0
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
          height: auto
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
    .active
      transition: all 0.5s ease-out 0s
  h3
    font-size: $fontsize-medium
    color: $color-gray1
    height: 0.8rem
    line-height: 0.8rem
    border-bottom: 1px solid $color-gray5
    font-weight: normal
</style>
