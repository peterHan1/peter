<template>
  <div class="project-view">
    <div class="wrapper333">
      <div class="content333">
        <div class="tab-bg">
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
            :show-dots="showDots"
            :options="slideOptions"
            @scroll="scroll"
            @change="changePage"
          >
            <cube-slide-item>
              <cube-scroll
                ref="contentScroll0"
                :data="content"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp">
                <ul class="project-wrapper">
                  <li
                    v-for="(item, index) in content"
                    :key="index"
                    class="project-item">
                    <p>{{ item.name }}</p>
                    <dl>
                      <dd>{{ item.apr }}<span>%<i v-show="item.platformApr">+{{ item.platformApr }}</i></span></dd>
                      <dd>12个月</dd>
                      <dd><button>立即加入</button></dd>
                    </dl>
                    <div class="progress">
                      <div class="out">
                        <div class="in"/>
                      </div>
                    </div>
                    <div class="ps">
                      <div>满标复审后计息</div>
                      <div>剩余可投:100.04</div>
                    </div>
                    <!-- <img
                      :src="item.url"
                      @load="onImgLoad"> -->
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
                      <span>加载中</span>
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

            </cube-slide-item>
            <!-- 推荐 -->
            <cube-slide-item>
              <cube-scroll
                ref="contentScroll1"
                :data="imgs"
                :options="options"
                @pulling-down="onPullingDown"
                @pulling-up="onPullingUp">
                <ul class="project-wrapper">
                  <li
                    v-for="(item, index) in imgs"
                    :key="index"
                    class="project-item">
                    <p>1111</p>
                    <dl>
                      <dd>2222<span>%<i v-show="item.platformApr">+{{ item.platformApr }}</i></span></dd>
                      <dd>12个月</dd>
                      <dd><button>立即加入</button></dd>
                    </dl>
                    <div class="progress">
                      <div class="out">
                        <div class="in"/>
                      </div>
                    </div>
                    <div class="ps">
                      <div>满标复审后计息</div>
                      <div>剩余可投:100.04</div>
                    </div>
                    <!-- <img
                      :src="item.url"
                      @load="onImgLoad"> -->
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
                      <span>加载中</span>
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
            </cube-slide-item>
            <cube-slide-item>
              <cube-scroll
                :data="hotData"
                :options="scrollOptions">
                <ul class="list-wrapper">
                  <li
                    v-for="(item, index) in hotData"
                    :key="index"
                    class="list-item">
                    <div class="hot-title">
                      <span class="hot-sequence">{{ item.sequence }}</span>
                      <span/>
                      {{ item.label }}
                    </div>
                    <div class="hot-content is-bold is-black">{{ item.question }}</div>
                  </li>
                </ul>
              </cube-scroll>
            </cube-slide-item>
          </cube-slide>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
// import { FOLLOWERS_DATA, RECOMMEND_DATA, HOT_DATA } from '../../mock/tab-bar.js'
import { findIndex } from '../../components/common/util.js'
// import { SXT } from '../../mock/free.js'
let cnt = 1
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
        directionLockThreshold: 0
      },
      content: [],
      imgs: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      },
      secondStop: 26
    }
  },
  methods: {
    // getFreeData() {
    //   this.$axios.post('/').then(res => {
    //     console.log(res)
    //   })
    // },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      // this.$refs.contentScroll.refreshDelay
      // this.$refs.contentScroll.scrollTo(0, 90, 1000)
      // if(bubbleY)
      console.log(this.props)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
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
    },
    onPullingDown() {
      let idx = this.initialIndex
      console.log(idx)
      setTimeout(() => {
        if (idx == 1) {
          this.imgs.unshift(this.imgs[cnt++ % 3])
        } else {
          this.content.unshift(this.content[cnt++ % 3])
        }

        console.log(idx)
        // if (idx == 0) {
        //   this.$refs.contentScroll0.scrollTo(0, this.secondStopx, 300)
        // } else if (idx == 1) {
        //   this.$refs.contentScroll1.scrollTo(0, this.secondStopx, 300)
        // } else {
        //   this.$refs.contentScroll2.scrollTo(0, this.secondStopx, 300)
        // }
      }, 1000)
    },
    onPullingUp() {
      setTimeout(() => {
        this.content = this.content.concat(imgs)
      }, 1000)
    }
  },
  mounted() {
    this.$axios
      .post('/hanapp/product/h5FreeBorrowList', {
        page: 1,
        item: 10,
        commenParams: {
          deviceType: 'iPhone 5',
          version: '3.7.1',
          type: 'h5',
          accessId: '',
          timestamp: '1546506780',
          accessKey: ''
        }
      })
      .then(resp => {
        this.content = resp.data.content.dataRows
        console.log(resp.data.content.dataRows)
      }),
      this.$axios
        .post('/hanapp/tender/h5tenderList', {
          page: 1,
          item: 10,
          commenParams: {
            deviceType: 'iPhone 5',
            version: '3.7.1',
            type: 'h5',
            accessId: '',
            timestamp: '1546506780',
            accessKey: ''
          }
        })
        .then(resp => {
          this.imgs = resp.data.content.dataRows
        })
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.project-view
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  >.wrapper333
    height: calc(100% - 44px)
    overflow-x: hidden
    overflow-y: auto
  .content333
    margin: 0 !important
    height: 100%
    width: 100%
  .tab-bg
    background: $color-white
  .cube-tab-bar
    height: 88px
    margin:0 100px
  //   background-color: red
  // .cube-tab, .cube-tab_active
  //     color: black
  .cube-tab-bar-slider
    width: 50px;
    margin-left: 65px
  .tab-slide-container
    position: fixed
    top: 89px
    left: 0
    right: 0
    bottom: 0
    .project-item
      background: $color-white
      padding: 35px 28px
      border-bottom:1px solid $color-background
      p
        font-size: 28px
        // margin-bottom: 20px
      dl
        display flex
        justify-content: space-between
        align-items: flex-end
        height: 68px
        // background: pink
        margin: 27px 0 32px 0

        dd:nth-child(1)
          font-size: 68px
          height: 58px
          color: $color-primary
          span
            font-size:32px;
        dd:nth-child(2)
          color: $color-gray1
          font-size: 30px
        dd:nth-child(3)
          button
            background: $color-primary
            color: $color-white
            width: 169px
            height: 68px
            border-radius: 34px
            line-height: 68px
            text-align: center
            align-self: flex-end
      .progress
        .out
          width: 100%
          height: 4px
          border-radius: 2px
          background: $color-gray5
          position: relative
          overflow: hidden
          .in
            position: absolute
            top: 0
            left: 0
            width: 30%
            height: 100%
            background: $gard
      .ps
        display: flex
        justify-content: space-between
        color: $color-gray3
        margin-top: 15px
        font-size: $fontsize-small-ss
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
    // .list-wrapper
    //   overflow: hidden
    //   li
    //     padding: 15px 10px
    //     margin-top: 10px
    //     text-align: left
    //     background-color: white
    //     font-size: 14px
    //     color: #999
    //     white-space: normal
    //     width:100%
    //     .line-height
    //       line-height: 1.5
    //     .is-black
    //       color: black
    //     .is-grey
    //       color: #999
    //     .is-bold
    //       font-weight: bold
    //     .top
    //       display: flex
    //       .avatar
    //         width: 15px
    //         height: 15px
    //         margin-right: 2px
    //         border-radius: 100%
    //       .time
    //         flex: 1
    //     .middle
    //       display: flex
    //       margin: 10px 0
    //       color: black
    //     .hot-title
    //       display: flex
    //       align-items: center
    //       font-size: 12px
    //       .hot-sequence
    //         display: inline-block
    //         margin-right: 2px
    //         padding: 3px 6px
    //         border-radius: 2px
    //         background-color: darkgoldenrod
    //         color: white
    //     .hot-content
    //       margin-top: 15px
</style>
