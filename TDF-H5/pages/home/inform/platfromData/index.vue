<template>
  <div class="platform">
    <td-header title="平台数据"/>
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
          <Collect/>
        </cube-slide-item>
        <cube-slide-item>
          <Details/>
        </cube-slide-item>
        <cube-slide-item>
          <Broadcast/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
import Collect from '~/components/business/platfromData-tab/collect.vue'
import Details from '~/components/business/platfromData-tab/details.vue'
import Broadcast from '~/components/business/platfromData-tab/broadcast.vue'
import { findIndex } from '~/components/src/common/util.js'
export default {
  metaInfo: {
    title: '平台数据'
  },
  data() {
    return {
      selectedLabel: '数据汇总',
      disabled: false,
      tabLabels: [
        {
          label: '数据汇总'
        },
        {
          label: '出借/借款详情'
        },
        {
          label: '数据播报'
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
      }
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
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  },
  components: {
    Collect,
    Details,
    Broadcast
  }
}
</script>
<style lang="stylus" scoped>
  .platform
    padding-top: 0.88rem
    .nav
      background-color: $color-white
      /deep/ .cube-tab-bar
        height: 80px
      /deep/ .cube-tab-bar-slider
        width: 70px
        height: 6px
        margin-left: 88px
        border-radius: 3px
    .tab-slide-container
      position absolute
      left: 0
      top: 1.68rem
      bottom: 0
      right: 0
</style>
