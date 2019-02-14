<template>
  <div class="scatter">
    <div class="box">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
      <div class="content">
        <cube-slide
          ref="slide"
          :loop="false"
          :showDots="false"
          :initial-index="initialIndex"
          :auto-play="false"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <cube-slide-item>
            <Details1
              @downFn="returnFn"
              @stopHor="stopHor"
              @bigImg="imgFn"/>
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
      disabled: true,
      tabLabels: [
        {
          label: '项目介绍2'
        },
        {
          label: '透明合规'
        },
        {
          label: '出借记录'
        }
      ],
      showDots: false,
      slideOptions: {}
    }
  },
  mounted() {
    this.slideOptions = {
      scrollX: true
    }
  },
  methods: {
    stopHor() {
      this.$refs.slide.refresh()
    },
    returnFn() {
      this.$emit('pullFn')
    },
    imgFn() {
      this.$emit('bigImgs')
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      console.log(current)
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
.scatter
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 88px;
  .box
    -ms-flex-direction: column
    -webkit-box-direction: normal
    -webkit-box-orient: vertical
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    flex-direction: column
    height: 100%
    /deep/ .cube-tab-bar
      -webkit-box-pack: center
      -webkit-justify-content: center
      display: -webkit-box
      display: -webkit-flex
      display: flex
      justify-content: center
      height: 0.88rem
      .cube-tab
        line-height: 88px
        background-color: $color-white
        font-size: $fontsize-medium
      .cube-tab-bar-slider
        width: 50px
        margin-left: 95px
  .content
    -ms-flex: 1
    -webkit-box-flex: 1
    flex: 1
    overflow: hidden
    z-index: 1
    /deep/ .cube-slide-group
      white-space: normal
      z-index: 1
</style>
