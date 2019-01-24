<template>
  <div class="invite">
    <td-header title="邀请奖励记录"/>
    <div class="inviteTop">
      <ul>
        <li>
          <div>
            <p class="pFont">{{ content.totalAward }}</p>
            <p>{{ content.date }}待收返现总奖励(元)</p>
          </div>
        </li>
        <li>
          <div>
            <p>{{ content.totalProfit }}</p>
            <p>已收返现奖励(元)</p>
          </div>
          <div>
            <p>{{ content.totalVoucher }}</p>
            <p>抵用券奖励(元)</p>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/myCenter/invite/inviteList" >
              <p>{{ content.totalDirect }}</p>
              <p>直接邀请人数 <i class="iconfont">&#xe6f2;</i></p>
            </router-link>
          </div>
          <div>
            <router-link to="/myCenter/invite/inviteList" >
              <p>{{ content.totalIndirect }}</p>
              <p>间接邀请人数 <i class="iconfont">&#xe6f2;</i></p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <div class="listBox">
      <div class="tabList">
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
            <Onlist/>
          </cube-slide-item>
          <cube-slide-item>
            <Yetlist/>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>
</template>

<script>
import Onlist from './onList.vue'
import Yetlist from './yetList.vue'
import { findIndex } from '~/components/src/common/util.js'
import { prizeRecord } from '~/plugins/api.js'

export default {
  data() {
    return {
      selectedLabel: '待收返现明细',
      disabled: false,
      tabLabels: [
        {
          label: '待收返现明细'
        },
        {
          label: '已收返现明细'
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
      content: ''
    }
  },
  mounted() {
    prizeRecord(this.$axios).then(res => {
      if (res) {
        this.content = res.data.content
      }
    })
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
    Onlist,
    Yetlist
  }
}
</script>

<style lang="stylus" scoped>
  .invite
    position: absolute
    z-index: 10
    top: 0
    left: 0
    right: 0
    bottom: 0
    padding-top: 88px
    .inviteTop
      background-color: $color-white
      padding-bottom: 30px
      height: 29%
      position: absolute
      left: 0
      right: 0
      top: 88px
      li
        display: flex
        div
          flex: 1
          text-align: center
          p:nth-child(1)
            font-size: $fontsize-large-xxxxx
            color: $color-primary
            line-height: 59px
            margin-top: 20px
          p:nth-child(2)
            font-size: $fontsize-medium 
            color: $color-gray3
            line-height: 40px
          p.pFont
            font-size: $fontsize-large-xxxxxxxx
            margin-top: 29px
          a
            display: block
    .listBox
      position: absolute
      top: 36%
      left: 0
      right: 0
      bottom: 0
      border-top: 20px solid $color-background
      .tabList
        background-color: $color-white
        border-bottom: 1px solid $color-gray5
        /deep/ .cube-tab-bar
          height: 88px
        /deep/ .cube-tab-bar-slider
          width: 0.5rem
          margin-left: 22%
          height: 6px
          border-radius: 3px
      .tab-slide-container
        position: absolute
        left: 0
        right: 0
        top: 88px
        bottom: 0
</style>
