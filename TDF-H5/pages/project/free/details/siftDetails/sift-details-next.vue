<template>
  <div class="sift">
    <div class="tab">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
    </div>
    <div class="content">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item>
          <Details1 @downFn="returnFn"/>
        </cube-slide-item>
        <cube-slide-item>
          <Details2 @downFn="returnFn"/>
        </cube-slide-item>
        <cube-slide-item>
          <Details3 @downFn="returnFn"/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
import { findIndex } from '~/components/src/common/util.js'
import Details1 from './details1.vue'
import Details2 from './details2.vue'
import Details3 from './details3.vue'

export default {
  data() {
    return {
      selectedLabel: '项目介绍',
      disabled: false,
      tabLabels: [
        {
          label: '项目介绍'
        },
        {
          label: '透明合规'
        },
        {
          label: '出借记录'
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      secondStop: 26
    }
  },
  methods: {
    returnFn() {
      this.$emit('pullFn')
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
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
  components: {
    Details1,
    Details2,
    Details3
  }
}
</script>
<style lang="stylus" scoped>
.sift
  padding: 88px 0 100px
  overflow-x: hidden
  overflow-y: auto
  height: 100%
  width: 100%
  .tab
    line-height: 88px
    background-color: $color-white
    text-align: center
    font-size: $fontsize-medium
    border-bottom: 1px solid $color-gray5
    /deep/ .cube-tab-bar
      height: 0.88rem
      .cube-tab-bar-slider
        width: 50px
        margin-left: 95px
  .content
    position: fixed
    top: 176px
    left: 0
    right: 0
    bottom: 100px
    white-space: normal
    /deep/ .cube-slide-group
      white-space: normal
</style>
