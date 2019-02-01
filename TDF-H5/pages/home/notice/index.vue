<template>
  <div class="notice">
    <td-header title="公告动态"/>
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
          <Notice/>
        </cube-slide-item>
        <cube-slide-item>
          <Dynamic/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Notice from './list-notice.vue'
import Dynamic from './list-dynamic.vue'
import { homeNoticeDynamic } from '../../../plugins/api.js'
import { findIndex } from '../../../components/src/common/util.js'
export default {
  metaInfo: {
    title: '公告动态'
  },
  async fetch({ app, store }) {
    const notice = {
      typeId: 'gonggao',
      page: 1,
      item: 10
    }
    const dynamic = {
      typeId: 'media',
      page: 1,
      item: 10
    }
    await store.dispatch('getNoticeList', notice)
    await store.dispatch('getDynamicList', dynamic)
  },
  data() {
    return {
      selectedLabel: '公告',
      disabled: false,
      tabLabels: [
        {
          label: '公告'
        },
        {
          label: '动态'
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
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      console.log(this.$store.state.noticeData)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    loadTop(done) {
      done() // call done
    },
    loadBottom(done) {
      done()
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
    Notice,
    Dynamic
  }
}
</script>
<style lang="stylus" scoped>
  .notice
    height: 100%
    padding-top 88px
    .nav
      background-color: $color-white
      /deep/ .cube-tab-bar
        height: 80px
      /deep/ .cube-tab
        height 100%
        line-height 80px
      /deep/ .cube-tab:first-child
        border-right 1px solid $color-background
      /deep/ .cube-tab-bar-slider
        width: 50%
        height: 5px
        border-radius: 3px
    .tab-slide-container
      position absolute
      left: 0
      top: 1.68rem
      bottom: 0
      right: 0
</style>
