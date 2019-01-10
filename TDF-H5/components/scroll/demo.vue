<template>
  <div class="cube-page toutiao">
    <div class="wrapper">
      <div class="content">
        <cube-scroll
          ref="contentScroll"
          :data="content"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <ul class="imgs-wrapper">
            <li
              v-for="(item, index) in content"
              :key="index"
              class="imgs-item">
              <img
                :src="item.url"
                @load="onImgLoad">
            </li>
          </ul>
          <template
            slot="pulldown"
            slot-scope="props">
            <div
              v-if="props.pullDownRefresh"
              :style="props.pullDownStyle"
              class="cube-pulldown-wrapper">
              <div
                v-if="props.beforePullDown"
                :style="{paddingTop: props.bubbleY + 'px'}"
                class="before-trigger">
                <span :class="{rotate: props.bubbleY > 0}">↓</span>
              </div>
              <div
                v-else
                class="after-trigger">
                <div
                  v-show="props.isPullingDown"
                  class="loading">
                  <cube-loading/>
                </div>
                <transition name="success">
                  <div
                    v-show="!props.isPullingDown"
                    class="text-wrapper"><span class="refresh-text">今日头条推荐引擎有x条更新</span></div>
                </transition>
              </div>
            </div>
          </template>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CubePage from './cube-page.vue'
const imgs = [
  {
    url:
      'https://dpubstatic.udache.com/static/dpubimg/7EzIhoEvnG/toutiao_12.JPG'
  },
  {
    url:
      'https://dpubstatic.udache.com/static/dpubimg/GR0Piaf5sz/toutiao_21.JPG'
  },
  {
    url:
      'https://dpubstatic.udache.com/static/dpubimg/K1JqUN8HSA/toutiao_31.JPG'
  }
]
const txts = [
  '关注',
  '推荐',
  '新时代',
  '热点',
  '体育',
  '娱乐',
  '科技',
  '头条号',
  '问答',
  '国际',
  'cube-ui666'
]
let cnt = 1
export default {
  data() {
    return {
      content: imgs.slice(),
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true
      },
      navTxts: txts,
      secondStop: 26
    }
  },
  components: {
    CubePage
  },
  methods: {
    onPullingDown() {
      setTimeout(() => {
        this.content.unshift(imgs[cnt++ % 3])
        this.$refs.contentScroll.scrollTo(0, this.secondStop, 300)
      }, 1000)
    },
    onPullingUp() {
      setTimeout(() => {
        this.content = this.content.concat(imgs)
      }, 1000)
    },
    onImgLoad() {
      const contentScroll = this.$refs.contentScroll
      contentScroll.scroll.beforePullDown && contentScroll.refresh()
    }
  },
  mounted() {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
img
  width: 100%
.cube-page
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  >.wrapper
    height: calc(100% - 44px)
    overflow-x: hidden
    overflow-y: auto
.toutiao
  .content
    margin: 0 !important
    height: 100%
    width: 100%
    // display: flex
    // flex-flow: column
  .content-scroll-wrapper
    // flex: 1
    // width: 100%
    // position: relative
    .content-scroll-list-wrap
      height: 100%
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute
      top: 0
      bottom: 0
      overflow: hidden
      .imgs-wrapper
        .imgs-item
          >img
            width: 100%
  .cube-pulldown-wrapper
    text-align: center
    .before-trigger
      height: auto
      font-size: 30px
      align-self: flex-end
      span
        display: inline-block
        line-height: 1
        transition: all 0.3s
        color: #666
        padding: 15px 0
        &.rotate
          transform: rotate(180deg)
    .after-trigger
      flex: 1
      margin: 0
      .text-wrapper
        margin: 0 auto
        margin-top: 14px
        padding: 5px 0
        color: #498ec2
        background-color: #d6eaf8
      .cube-loading-spinners
        margin: auto
  .success-enter-active, .success-leave-active
    transition: width .5s
  .success-enter, .success-leave-to
    width: 70%
  .success-enter-to, .success-leave
    width: 100%
</style>
