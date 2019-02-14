<template>
  <div class="scatterDetails">
    <div class="detailsBg"/>
    <cube-scroll
      :scrollEvents="['scroll','scroll-end']"
      :options="options"
      @scroll="onScroll"
      @scroll-end="onScrollEnd"
      @pulling-up="onPullingUp"
    >
      <div class="details">
        <div class="money">
          <div class="flex message">
            <div class="flex-1">
              <p>约定利率</p>
              <p><span>{{ data.apr }}</span>%<b v-show="data.platformApr!=0">+{{ data.platformApr }}%</b></p>
            </div>
            <div class="flex-1">
              <p>出借期限</p>
              <p><span>{{ data.period }}</span>个月</p>
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
              <p>{{ data.amount }}</p>
            </div>
            <div class="flex-1">
              <p>剩余可投</p>
              <p>{{ data.surplus }}</p>
            </div>
          </div>
        </div>
        <div class="content">
          <ul class="explain">
            <li><span>起投金额</span><span>{{ data.minTenderFormat }}元</span></li>
            <li><span>还款方式</span><span>{{ data.repaymentType }}</span></li>
            <li><span>计息方式</span><span>{{ data.interestAate }}</span></li>
            <li><span>募集期限</span><span>以底层标的为准</span></li>
          </ul>
          <div class="count">
            <div class="top"><span/>&nbsp;收益计算器</div>
            <v-count @Index="Index"/>
            <!-- <div class="con">
              <div class="title">
                <p>出借&nbsp;(元)</p>
                <p>{{ corpus }}</p>
              </div>
              <v-count @Index="Index"/>
            </div>
            <div class="bottom">
              <p class="title">预期收益 <span>{{ income }}</span>（元）</p>
              <ul>
                <li
                  v-for="item in raiseList"
                  :key="item.raise"
                  :class="item.raise === raise?'on':''"
                  @click="select(item.raise)">
                  <i
                    v-if="item.raise === raise"
                    class="iconfont">&#xe61e;</i>
                  <i
                    v-else
                    class="iconfont">&#xe622;</i>
                  {{ item.txt }}
                </li>
              </ul>
            </div> -->
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
      time: '',
      showIndex: 0,
      corpus: 0,
      income: 0,
      type: 0,
      raiseList: [
        {
          raise: 0,
          txt: '无加息'
        },
        {
          raise: 1,
          txt: '1%加息'
        },
        {
          raise: 2,
          txt: '2%加息'
        },
        {
          raise: 3,
          txt: '3%加息'
        }
      ],
      pullTxt: '向上滑动，查看更多详情',
      options: {
        pullUpLoad: {
          threshold: 0
        },
        closePullUp: false
      },
      pullY: 0,
      pullFlag: false
    }
  },
  computed: {
    data() {
      return this.$store.state.project.freeDetail
    }
  },
  created() {
    // this.loadProgress()
  },
  mounted() {
    this.loadProgress()
  },
  methods: {
    onScroll(pos) {
      if (pos.y < -60) {
        this.pullTxt = '松手，查看项目详情'
        this.pullFlag = true
      } else {
        this.pullTxt = '向上滑动，查看更多详情'
        this.pullFlag = false
      }
    },
    onPullingUp() {
      this.$emit('pullFn')
    },
    onScrollEnd(pos) {
      // this.$emit('pullFn')
      if (this.pullFlag) {
        this.$emit('pullFn')
      }
    },
    select(txt) {
      this.raise = txt
    },
    loadBottom() {
      this.$router.push('/project/details/scatter-details/scatter-details')
    },
    // beforeAppear(el) {
    //   el.style.width = '0%'
    // },
    // appear(el) {
    //   let that = this
    //   // 动画开始之前要触发重排重绘，触发浏览器重排和重绘
    //   let elOH = el.offsetHeight
    //   el.style.width = '60.85%'
    //   let outWidth =
    //     document.documentElement.clientWidth || document.body.clientWidth
    //   this.time = setInterval(() => {
    //     that.progress = ((el.clientWidth / outWidth) * 100).toFixed(2)
    //   }, 1)
    // },
    // afterAppear(el) {
    //   if (this.progress !== 60.85) {
    //     this.progress = 60.85
    //     clearInterval(this.time)
    //   }
    // },
    loadProgress(el) {
      let i = 0
      let data = this.data.rate
      setInterval(() => {
        i++
        if (i > data) {
          i = data
        }
        this.iii = i
      }, 1)
    },
    Index(value) {
      this.showIndex = value
      this.corpus = value * 100
      this.income = value * 100 * this.type
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
              font-size: $fontsize-large-xxxxxxxxxx
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
        margin-bottom: 20px
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
      padding-bottom: 40px
  /deep/ .cube-pullup-wrapper
    display: none
</style>
