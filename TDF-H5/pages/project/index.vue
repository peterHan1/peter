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
            <p-list/>
          </cube-slide-item>
          <cube-slide-item>
            <scatter-list/>
          </cube-slide-item>
          <cube-slide-item>
            <div class="listBox">
              <p>请在电脑端登录官网或在APP端查看</p>
              <div class="appBtn">
                <td-button
                  value="立即下载APP"
                  @btnFn="downApp"
                />
              </div>
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
    <td-footer :navClass="'project'"/>
    <transition :name="$store.state.project.trName">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { findIndex } from '~/components/src/common/util.js'
import { commenParams } from '~/api/config.js'
import { freeBorrowList, scatterList } from '~/api/project.js'
import { myBankAssets } from '~/api/user'
import PList from '~/components/business/project-list/list'
import ScatterList from '~/components/business/project-list/scatter'
export default {
  name: 'keep',
  created() {
    // console.log(this.$store.state.accessKey)
    this._getFreeList()
    // this._getSatterList()
  },
  data() {
    return {
      selectedLabel: '省心投',
      disabled: false,
      tttt: '',
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
      }
    }
  },
  // watch: {
  //   $route(to, from) {
  //     if (to.meta.index > from.meta.index) {
  //       // console.log(to.meta.index)
  //       this.$store.commit('project/setTransition', 'slide-right')
  //     } else {
  //       this.$store.commit('project/setTransition', 'slide-left')
  //     }
  //   }
  // },
  methods: {
    async _getFreeList() {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      const freeList = await freeBorrowList(
        this.$axios,
        {
          page: 1,
          item: 10
        },
        commenParams
      )
      // // const params = Object.assign({}, content, { dataName: 'Free' })
      // console.log(freeList.content)
      // console.log('省心投')
      if (freeList.content !== undefined) {
        this.$store.commit('project/handleData', freeList.content)
      } else {
        console.log('重新获取')
      }
      const scatterData = await scatterList(
        this.$axios,
        {
          page: 1,
          item: 10
        },
        commenParams
      )
      // console.log(scatterData.content)
      if (scatterData.content !== undefined) {
        this.$store.commit('project/scatterHandleData', scatterData.content)
      } else {
        console.log('重新获取')
      }
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      // console.log(current)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      console.log(pos)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    downApp() {
      this.$App(
        '<p>您确定下载以下内容吗？</p><p>拓道金服V3.9.2 54MB &nbsp;</p>'
      )
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
    PList,
    ScatterList
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
.listBox
  text-align: center
  p
    font-size: $fontsize-large-x
    color: $color-gray3
    margin-top: 320px
  .appBtn
   margin: 52px auto 0
   text-align: center
   width: 440px
</style>
