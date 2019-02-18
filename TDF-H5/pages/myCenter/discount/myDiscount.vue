<template>
  <div class="discountBox">
    <td-header title="我的优惠券"/>
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
        :showDots="false"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item>
          <Interest/>
        </cube-slide-item>
        <cube-slide-item>
          <Voucher/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Interest from '~/components/business/discount-list/interest-list'
import Voucher from '~/components/business/discount-list/voucher-list'
import { findIndex } from '~/components/src/common/util.js'

export default {
  data() {
    return {
      selectedLabel: '加息券',
      disabled: false,
      tabLabels: [
        {
          label: '加息券'
        },
        {
          label: '抵用券'
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
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    tabFn(com) {
      this.tabCom = com
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
    Interest,
    Voucher
  }
}
</script>

<style lang="stylus" scoped>
  .discountBox
    padding-top: 88px
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    .listTab
      line-height: 88px
      background-color: $color-white
      position: absolute
      top: 88px
      left: 0
      right: 0
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
