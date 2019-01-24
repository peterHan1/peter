<template>
  <div>
    <div class="listTab">
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
        @change="changePage"
      >
        <cube-slide-item>
          <ScatterOn/>
        </cube-slide-item>
        <cube-slide-item>
          <ScatterYet/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>  
</template>

<script>
import ScatterOn from './list-scatter-on.vue'
import ScatterYet from './list-scatter-yet.vue'
import { findIndex } from '~/components/src/common/util.js'

export default {
  data() {
    return {
      selectedLabel: '出借中',
      disabled: false,
      tabLabels: [
        {
          label: '出借中'
        },
        {
          label: '已回款'
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
      }
    }
  },
  mounted() {},
  methods: {
    tabFn(txt) {
      this.tabCom = txt
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
    ScatterOn,
    ScatterYet
  }
}
</script>

<style lang="stylus" scoped>
.listTab
  line-height: 88px
  background-color: $color-white
  position: absolute
  top: 88px
  left: 0
  right: 0
  font-size: $fontsize-large-xx
  /deep/ .cube-tab
    color: $color-gray3
  /deep/ .cube-tab_active
    color: $color-primary
  /deep/ .cube-tab-bar-slider
    width: 50px
    margin-left: 22%
    height: 6px
    border-radius: 3px
.tab-slide-container
  position: absolute
  top: 176px
  left: 0
  right: 0
  bottom: 0
</style>
