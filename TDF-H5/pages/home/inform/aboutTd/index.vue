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
          <Certificate @bigImg="imgFn"/>
        </cube-slide-item>
        <cube-slide-item>
          <Signature/>
        </cube-slide-item>
      </cube-slide>
    </div>
    <BigImg 
      v-if="imgBig" 
      @imgMin="imgMin"/>
  </div>
</template>
<script>
import BigImg from '~/components/business/about-tab/big-img.vue'
import Certificate from '~/components/business/about-tab/certificate.vue'
import Framework from '~/components/business/about-tab/framework.vue'
import Signature from '~/components/business/about-tab/signature.vue'
import Personnel from '~/components/business/about-tab/personnel.vue'
import Terraces from '~/components/business/about-tab/terraces.vue'
import { findIndex } from '~/components/src/common/util.js'
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
      imgBig: false
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
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    imgFn() {
      this.imgBig = true
    },
    imgMin() {
      this.imgBig = false
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  },
  components: {
    Certificate,
    Framework,
    Personnel,
    Terraces,
    Signature,
    BigImg
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
        width: 70px
        margin-left 40px
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
