<template>
  <div
    class="scatterDetails"
    @touchend="touchEnd">
    <div class="detailsBg"/>
    <div
      ref="headers"
      class="headers"/>
    <div
      ref="footers"
      class="footers"/>
    <cube-scroll
      ref="contentScroll0"
      :scrollEvents="['scroll','scroll-end']"
      :options="options"
      @scroll="onScroll"
      @scroll-end="onScrollEnd"
      @pulling-up="onPullingUp"
    >
      <div
        ref="cubeScrolls"
        class="details">
        <div class="money">
          <div class="flex message">
            <div class="flex-1">
              <p>约定利率</p>
              <p><span>{{ data.borrowApr }}</span>%<b v-show="data.awardScale!=0">+{{ data.awardScale }}%</b></p>
            </div>
            <div class="flex-1">
              <p>出借期限</p>
              <p><span>{{ data.borrowPeriod }}</span>个月</p>
            </div>
          </div>
          <div class="progress">
            <div
              :style="{width: iii+'%'}"
              class="in"
              @load="loadProgress">
              <div class="font">{{ iii }}%</div>
            </div>
          </div>
          <div class="flex bottom">
            <div class="flex-1">
              <p>项目总额</p>
              <p>{{ data.account }}</p>
            </div>
            <div class="flex-1">
              <p>剩余可投</p>
              <p>{{ data.borrowAccountWait }}</p>
            </div>
          </div>
        </div>
        <div class="content">
          <ul class="explain">
            <li><span>起投金额</span><span>{{ data.tenderAccountMin }}元</span></li>
            <li><span>还款方式</span><span>{{ data.borrowStyle }}</span></li>
            <li><span>计息方式</span><span>{{ data.jxType }}</span></li>
            <li><span>募集期限</span><span>{{ data.raiseDay }}</span></li>
          </ul>
          <div class="count">
            <div class="top"><span/>&nbsp;收益计算器</div>
            <v-count
              ref="inputs"
              :types="types"/>
          </div>
        </div>
        <div class="down">{{ pullTxt }}</div>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
export default {
  data() {
    return {
      raise: 0,
      progress: 0,
      iii: 0,
      pullTxt: '向上滑动，查看更多详情',
      options: {
        pullUpLoad: {
          threshold: 0
        }
        // closePullUp: false
      },
      pullY: 0,
      bottomflg: false,
      bottomDis: 0,
      bottomSize: null,
      isResize: false
    }
  },
  computed: {
    data() {
      return this.$store.state.project.scatterDetail
    },
    types() {
      return {
        type: this.$store.state.project.scatterDetail.borrowStyle,
        interest:
          this.$store.state.project.scatterDetail.borrowApr +
          this.$store.state.project.scatterDetail.awardScale,
        time: this.$store.state.project.scatterDetail.borrowPeriod
      }
    }
  },
  created() {
    this.loadProgress()
  },
  mounted() {
    let bodyH =
      document.documentElement.clientHeight ||
      document.document.body.clientHeight
    this.bottomDis =
      this.$refs.cubeScrolls.clientHeight -
      (bodyH -
        this.$refs.headers.clientHeight -
        this.$refs.footers.clientHeight)
    let vm = this
    window.onresize = function() {
      let bodyH2 =
        document.documentElement.clientHeight ||
        document.document.body.clientHeight
      if (bodyH2 - bodyH < 0) {
        vm.isResize = true
        vm.bottomSize = bodyH2 - bodyH
        vm.scrollTop()
      } else {
        vm.$refs.inputs.blurs()
        vm.isResize = false
        vm.bottomSize = 30
        vm.scrollTop()
      }
    }
    // this.loadProgress()
  },
  methods: {
    scrollTop() {
      let dis = this.bottomSize - 30
      this.$refs.contentScroll0.scrollTo(0, dis, 500, 'ease')
    },
    onScroll(pos) {
      if (!this.isResize) {
        this.pullY = pos.y
        if (pos.y < -(this.bottomDis + 25)) {
          this.pullTxt = '松手，查看项目详情'
        } else {
          this.pullTxt = '向上滑动，查看更多详情'
        }
      }
    },
    touchEnd() {
      if (
        this.pullY < -(this.bottomDis + 25) &&
        this.bottomflg &&
        !this.isResize
      ) {
        this.$emit('pullFn')
      }
    },
    onPullingUp() {
      console.log('上拉了。。。')
    },
    onScrollEnd(pos) {
      if (pos.y > -this.bottomDis) {
        this.bottomflg = false
      } else {
        this.bottomflg = true
      }
    },
    select(txt) {
      this.raise = txt
    },
    // loadBottom() {
    //   this.$router.push('/project/details/scatter-details/scatter-details')
    // },

    loadProgress(el) {
      let i = 0
      let data = this.data.borrowAccountScale
      setInterval(() => {
        i++
        if (i > data) {
          i = data
        }
        this.iii = i
      }, 1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.scatterDetails
  padding: 88px 0 100px
  height: 100%
  .detailsBg
    position: absolute
    left: 0
    top: 0
    right: 0
    height: 30%
    background: linear-gradient(to right, $color-gradientL , $color-gradientR)
  .details
    .money
      padding-top: 30px
      background: linear-gradient(to right, $color-gradientL , $color-gradientR)
      .message
        padding-bottom: 70px
      .flex
        display: flex
        .flex-1
          flex: 1
          text-align: center
          color: $color-white
          p:first-child
            opacity: 0.6
            font-size: $fontsize-small-s
            height: 33px
            line-height: 33px
          p:last-child
            font-size: $fontsize-large-xxxx
            padding-top: 10px
            span
              font-family: DIN Medium
              font-size: 82px
      .bottom
        width: 100%
        // height: 120px
        padding: 20px 0 10px 0
        background: rgba(255,255,255, 0.1)
        p:last-child
          margin-top: 5px
          font-size: $fontsize-large-xxx
      .progress
        width: 100%
        height: 2px
        background: none
        position: relative
        // overflow: hidden
        .in
          position: absolute
          width: 10%
          height: 2px
          top: 0
          left: 0
          background:linear-gradient(270deg,rgba(255,244,153,1) 0%,rgba(255,196,91,1) 100%);
          .font
            color: $color-linearR
            font-size: $fontsize-small-ss
            position: absolute
            width: 100%
            // display: block
            top: -28px
            text-align right
        .line
          transition: width 1.5s ease-out
          position: relative
          height: 100%
          background: linear-gradient(270deg,$color-linearR 0%,$color-linearL 100%)
    .content
      .explain
        background: $color-white
        padding: 0 30px
        border-bottom: 20px solid $color-background
        li
          display: flex
          justify-content: space-between
          height: 80px
          line-height: 80px
          font-size: $fontsize-medium
          color: $color-gray3
          border-bottom: 1px solid $color-gray7
          span:last-child
            color: $color-gray1
          &:last-child
            border-bottom: none
      .count
        background: $color-white
        .top
          height: 70px
          line-height: 70px
          color: $color-gray1
          font-size: $fontsize-medium
          padding-left: 30px
          border-bottom: 1px solid $color-gray7
          span
            display: inline-block
            width: 6px
            height: 24px
            background-color: $color-primary
            border-radius: 20px
            margin-right: 8px
        .con
          height: 235px
          .title
            width: 270px
            padding: 27px 0 10px
            color: $color-gray3
            font-size: $fontsize-small-ss
            margin: 0 auto
            border-bottom: 2px solid $color-gray5
            text-align: center
            p:last-child
              font-size: $fontsize-large-xxxxxxx
              color: $color-primary
              line-height: 75px
        .bottom
          padding: 10px 0 20px
          .title
            text-align: center
            color: $color-gray3
            font-size: $fontsize-small-ss
            margin-bottom: 35px
            span
              color: $color-primary
          ul
            display: flex
            li
              flex: 1
              text-align: center
              color: $color-gray2
              font-size: $fontsize-small-s
              line-height: 40px
            .on
              color: $color-primary
              i
                color: $color-primary
    .down
      font-size: 24px
      color: #ccc
      text-align: center
      line-height: 90px
  /deep/ .cube-pullup-wrapper
    display: none
.headers,.footers
  height 0.88rem
  position: absolute
  left: 0
  top: 0
  right: 0
  z-index -1
  background none
.footers
  height 1rem
</style>
