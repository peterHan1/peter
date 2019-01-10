<template>
  <div class="freeDetails">
    <drop-move :load-bottom="loadBottom">
      <div class="details">
        <div class="money">
          <div class="flex">
            <div class="flex-1">
              <p>约定利率</p>
              <p><span>12.5</span>%+0.3%</p>
            </div>
            <div class="flex-1">
              <p>出借期限</p>
              <p><span>24</span>个月</p>
            </div>
          </div>
          <div class="progress">
            <transition 
              appear 
              @before-appear="beforeAppear" 
              @appear="appear" 
              @after-appear="afterAppear">
              <div 
                ref="line" 
                class="line">
                <span>{{ progress }}%</span>
              </div>
            </transition>
          </div>
          <div class="flex bottom">
            <div class="flex-1">
              <p>项目总额&nbsp;<span class="iconfont">&#xe833;</span></p>
              <p>600,000.00</p>
            </div>
            <div class="flex-1">
              <p>剩余可投</p>
              <p>15,087.05</p>
            </div>
          </div>
        </div>
        <div class="content">
          <ul class="explain">
            <li><span>起投金额</span><span>500元</span></li>
            <li><span>还款方式</span><span>先息后本</span></li>
            <li><span>计息方式</span><span>满标复审后计息&nbsp;<i class="iconfont">&#xe833;</i></span></li>
            <li><span>募集期限</span><span>以底层散标为准</span></li>
          </ul>
          <div class="count">
            <div class="top"><span/>&nbsp;收益计算器</div>
            <div class="con">
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
                  :class="{on: active[0]}" 
                  class="flex-1" 
                  @click="select(0)"><span/>&nbsp;无加息</li>
                <li 
                  :class="{on: active[1]}" 
                  class="flex-1" 
                  @click="select(1)"><span/>&nbsp;1%加息</li>
                <li 
                  :class="{on: active[2]}" 
                  class="flex-1" 
                  @click="select(2)"><span/>&nbsp;2%加息</li>
                <li 
                  :class="{on: active[3]}" 
                  class="flex-1" 
                  @click="select(3)"><span/>&nbsp;3%加息</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </drop-move>
    <router-view/>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '项目详情'
  },
  data() {
    return {
      progress: 0,
      show: false,
      active: [true, false, false, false],
      time: '',
      showIndex: 0,
      corpus: 0,
      income: 0,
      type: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    loadBottom() {
      this.$router.push('/freeDetailsNext')
    },
    select(type) {
      if (type === 0) {
        this.active = [true, false, false, false]
        this.type = 0
      } else if (type === 1) {
        this.active = [false, true, false, false]
        this.type = 0.1
      } else if (type === 2) {
        this.active = [false, false, true, false]
        this.type = 0.2
      } else {
        this.active = [false, false, false, true]
        this.type = 0.3
      }
      this.income = this.showIndex * 100 * this.type
    },
    getData() {
      this.show = true
    },
    beforeAppear(el) {
      el.style.width = '0%'
    },
    appear(el) {
      let that = this
      // 动画开始之前要触发重排重绘，触发浏览器重排和重绘
      let elOH = el.offsetHeight
      console.log(elOH)
      el.style.width = '60.85%'
      let outWidth =
        document.documentElement.clientWidth || document.body.clientWidth
      this.time = setInterval(() => {
        that.progress = ((el.clientWidth / outWidth) * 100).toFixed(2)
      }, 1)
    },
    afterAppear(el) {
      if (this.progress !== 60.85) {
        this.progress = 60.85
        clearInterval(this.time)
      }
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
.freeDetails
  padding-bottom: 1rem
  height: 100%
  .details
    .money
      position: relative
      height: 4.2rem
      padding-top: 0.88rem
      background: -webkit-linear-gradient(left, #F66F4A , #FC8D26)
      background: -o-linear-gradient(right, #F66F4A, #FC8D26)
      background: -moz-linear-gradient(right, #F66F4A, #FC8D26)
      background: linear-gradient(to right, #F66F4A , #FC8D26)
      .flex
        display: flex
        .flex-1
          flex: 1
          text-align: center
          color: #fff
          p:first-child
            opacity: 0.6
            font-size: 0.24rem
          p:last-child
            font-size: 0.4rem
            span
              font-family: DIN Medium
              font-size: 0.82rem
              font-weight: bold
      .bottom
        width: 100%
        position: absolute
        bottom: 0
        height: 1.2rem
        padding-top: 0.2rem
        background: rgba(255,255,255, 0.2)
        p:last-child
          margin-top: 0.05rem
          font-size: 0.36rem
      .progress
        width: 100%
        height: 2px
        position: absolute
        bottom: 1.2rem
        span
          color: #FFF499
          font-size: 0.24rem
          position: absolute
          top: -0.33rem
          right: 0
        .line
          transition: width 1.5s ease-out
          position: relative
          height: 100%
          background:linear-gradient(270deg,rgba(255,244,153,1) 0%,rgba(255,196,91,1) 100%)
    .content
      .explain
        background: #fff
        padding: 0 0.3rem
        margin-bottom: 0.2rem
        li
          display: flex
          justify-content: space-between
          height: 0.8rem
          line-height: 0.8rem
          font-size: 0.28rem
          color: #999999
          border-bottom: 1px solid #E0E0E0
          span:last-child
            color: #333
          &:last-child
            border-bottom: none
      .count
        background: #fff
        .top
          height: 0.7rem
          line-height: 0.7rem
          color: #333
          font-size: 0.28rem
          padding-left: 0.3rem
          border-bottom: 1px solid #E0E0E0
          span
            display: inline-block
            width: 0.06rem
            height: 0.24rem
            background-color: #ff7102
            border-radius: 0.2rem
            margin-right: 0.08rem
        .con
          height: 2.35rem
          .title
            width: 2.7rem
            padding: 0.27rem 0 0.1rem
            color: #999999
            font-size: 0.24rem
            margin: 0 auto
            border-bottom: 2px solid #E8E8E8
            text-align: center
            p:last-child
              font-size: 0.54rem
              color: #FF7400
        .bottom
          height: 1.44rem
          padding: 0.1rem 0 0.2rem
          .title
            text-align: center
            color: #999999
            font-size: 0.24rem
            margin-bottom: 0.35rem
            span
              color: #FF7400
          ul
            display: flex
            .flex-1
              flex: 1
              text-align: center
              color: #666666
              font-size: 0.26rem
              span
                display: inline-block
                width: 0.28rem
                height: 0.28rem
                vertical-align: middle
                background: url(../../../../assets/images/invest/select1.png) no-repeat center
                background-size: 100%
              &.on
                color: #FF7400
                span
                  background: url(../../../../assets/images/invest/select2.png) no-repeat center
                  background-size: 100%
  .slide-bottom-enter-active,.slide-bottom-leave-active,.slide-top-enter-active,.slide-top-leave-active
    will-change: transform
    transition: all 800ms ease
    position: absolute
    width: 100%
  .slide-bottom-enter,.slide-top-leave-active
    transform: translate3d(0, -100%, 0)
  .slide-bottom-leave-active,.slide-top-enter
    transform: translate3d(0, 100%, 0)
</style>
