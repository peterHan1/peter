<template>
  <div class="tuodao2">
    <div class="wrapper2">
      <div class="content2">
        <cube-scroll
          ref="contentScroll"
          :data="content"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">
          <ul class="project-wrapper">
            <li
              v-for="(item, index) in content"
              :key="index"
              class="project-item">
              <p>省心投20170908</p>
              <dl>
                <dd>10.0<span>%+3.2%</span></dd>
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
        </cube-scroll>
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
      secondStop: 26
    }
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
.tuodao2
  position: absolute
  z-index: 10
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #efeff4
  >.wrapper2
    height: calc(100% - 44px)
    overflow-x: hidden
    overflow-y: auto
  .content2
    margin: 0 !important
    height: 100%
    width: 100%
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
</style>
