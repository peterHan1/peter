<template>
  <div class="project">
    <div class="content">
      <div class="projectTab">
        <cube-tab-bar
          ref="tabNav"
          v-model="selectedLabel"
          :data="tabLabels"
          show-slider/>
      </div>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @change="changePage"
        >
          <cube-slide-item>
            <free-list />
          </cube-slide-item>
          <cube-slide-item>
            2
            <!-- <scatter-list/> -->
          </cube-slide-item>
          <cube-slide-item>
            3
            <!-- <transfer-list/> -->
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
    <td-footer :navClass="'project'"/>
  </div>
</template>

<script type="text/ecmascript-6">
import { findIndex } from '~/components/src/common/util.js'
import { freeBorrowList } from '~/plugins/api.js'
import freeList from './free/list'
import scatterList from './free/list'
import transferList from './transfer/transfer'
export default {
  async fetch({ app, store }) {
    const params = {
      item: 10,
      page: 1
    }
    await store.dispatch('project/asyTest', params)
    await store.dispatch('project/getScatterList', params)
    //   // const params = {
    //   //   item: 10,
    //   //   page: 1
    //   // }
    //   // store.dispatch('project/getFreeList')
    //   // let { data } = await freeBorrowList(app.$axios, params)
    //   // console.log(data)
    //   // store.commit('project/items', data.content.items)
    //   // store.commit('project/pages', data.content.pages)
    //   // let result = data.content.dataRows
    //   // let list = []
    //   // let invalList = []
    //   // for (let i = 0; i < result.length; i++) {
    //   //   store.commit('project/setContentDate', result[i])
    //   //   if (result[i].rate != 100) {
    //   //     // list.push(result[i])
    //   //     store.commit('project/setFreeList', result[i])
    //   //   } else {
    //   //     // invalList.push(result[i])
    //   //     store.commit('project/setInvalidFreeList', result[i])
    //   //   }
    //   // }
  },
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
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      followersData: [1, 2, 3, 4],
      recommendData: [5, 6, 7, 8],
      hotData: [10, 11, 12, 13]
    }
  },
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      console.log(current)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      console.log(pos)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    resolveTitle(item) {
      return `${item.name}关注了问题 · ${item.postTime} 小时前`
    },
    resolveQuestionFollowers(item) {
      return `${item.answers} 赞同 · ${item.followers} 评论`
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
    freeList,
    scatterList,
    transferList
  }
}
</script>
<style lang="stylus" scoped>
  .project
    .projectTab
      background: #fff
    .cube-tab-bar
      height: 88px
      margin: 0 100px
    // .cube-tab, .cube-tab_active
    //     color: black
    /deep/.cube-tab-bar-slider
      width: 64px
      height: 6px
      margin-left: 58px
      border-radius: 3px
    .tab-slide-container
      // background: blue
      position: fixed
      top: 88px
      left: 0
      right: 0
      bottom: 93px
</style>
