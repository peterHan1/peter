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
import Notice from '~/components/business/notice-list/list-notice.vue'
import Dynamic from '~/components/business/notice-list/list-dynamic.vue'
import { homeNoticeDynamic } from '~/api/home.js'
import { findIndex } from '~/components/src/common/util.js'
export default {
  metaInfo: {
    title: '公告动态'
  },
  created() {
    this.getData()
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
    async getData() {
      const notice = {
        typeId: 'gonggao',
        page: 1,
        item: this.$store.state.home.noticeItem
      }
      const dynamic = {
        typeId: 'media',
        page: 1,
        item: this.$store.state.home.dynamicItem
      }
      let noticeList = await homeNoticeDynamic(this.$axios, notice)
      console.log(noticeList)
      // this.$store.commit('home/setNoticePages', noticeList.content.pages)
      // for (let i = 0; i < noticeList.content.dataRows.length; i++) {
      //   noticeList.content.dataRows[i].url =
      //     'http://72.127.2.140:9090' + noticeList.content.dataRows[i].url
      // }
      noticeList.content.dataRows.map(o => {
        this.$store.commit('home/setNoticeData', o)
      })
      this.$store.commit('home/setNoticePages', noticeList.content.pages)
      let dynamicList = await homeNoticeDynamic(this.$axios, dynamic)
      // for (let i = 0; i < noticeList.content.dataRows.length; i++) {
      //   dynamicList.content.dataRows[i].url =
      //     'http://72.127.2.140:9090' + dynamicList.content.dataRows[i].url
      // }
      dynamicList.content.dataRows.map(o => {
        this.$store.commit('home/setDynamicData', o)
      })
      this.$store.commit('home/setDynamicPages', dynamicList.content.pages)
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
      top: 168px
      bottom: 0
      right: 0
</style>
