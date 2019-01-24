<template>
  <div class="investList">
    <div class="listBox">
      <div class="tab">
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
            <SiftList/>
          </cube-slide-item>
          <cube-slide-item>
            <ScatterList/>
          </cube-slide-item>
          <cube-slide-item>
            <Transfer/>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
    <td-footer :navClass="'project'"/>
  </div>
</template>

<script>
import SiftList from './src-list/list-sift.vue'
import ScatterList from './src-list/list-scatter.vue'
import Transfer from './src-list/list-transfer.vue'
import { findIndex } from '~/components/src/common/util.js'

export default {
  data() {
    return {
      selectedLabel: '省心投',
      disabled: false,
      tabLabels: [
        {
          label: '省心投'
        },
        {
          label: '散标区'
        },
        {
          label: '转让区'
        }
      ],
      tabCom: 'SiftList',
      rollList: true,
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
      content: [
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        },
        {
          name: '拓道金服',
          apr: '3',
          platformApr: '1',
          label: '拓道'
        }
      ],
      secondStop: 26
    }
  },
  mounted() {},
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      console.log(this.selectedLabel)
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
    SiftList,
    ScatterList,
    Transfer
  }
}
</script>

<style lang="stylus" scoped>
.investList
  padding-bottom: 130px
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  .listBox
    overflow-x: hidden
    overflow-y: auto
    height: 100%
    width: 100%
    .tab
      line-height: 88px
      background-color: $color-white
      text-align: center
      font-size: $fontsize-medium
      /deep/ .cube-tab-bar
        height: 0.88rem
        margin: 0 1rem
        .cube-tab-bar-slider
          width: 50px
          margin-left: 65px
    .tab-slide-container
      position: fixed
      top: 89px
      left: 0
      right: 0
      bottom: 93px
</style>
