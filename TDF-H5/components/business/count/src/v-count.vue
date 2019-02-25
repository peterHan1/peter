<template>
  <div>
    <div class="con">
      <div class="title">
        <p>出借&nbsp;(元)</p>
        <p>
          <input
            ref="inputs"
            v-model="corpus"
            type="text"
            @focus="focus"
            @blur="blur"
            @input="onInput">
          <span
            v-if="closeShow"
            class="iconfont"
            @click="clears">&#xe6ff;</span>
        </p>
      </div>
      <div 
        id="vue-count" 
        class="vue-count">
        <ul 
          id="ul" 
          :style="{padding: '0.4rem ' + dis + 'px' + ' 0', transform: 'translate3d('+ distance + 'px, 0, 0)'}" 
          :class="{active: active}"
          @touchstart="touchstart($event)"
          @touchmove="touchmove($event)"
          @touchend="touchend($event)">
          <li 
            v-for="(item, index) in dataX" 
            :key="index" 
            :class="[index%10 == 0?'on':'']" 
            :style="{width: lineWidth + 'px',marginRight: index === dataX.length -1?'0':(offset+'px')}"><span >{{ item | capitalize }}</span></li>
        </ul>
        <span 
          :style="{left: + dis + 'px',width: lineWidth + 'px'}" 
          class="center"/>
      </div>
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
    </div>
  </div>
</template>
<script>
let dataX = []
for (let i = 0; i <= 500; i++) {
  dataX[i] = i
}
export default {
  name: 'v-count',
  props: {
    types: {
      type: Object
    }
  },
  data() {
    return {
      closeShow: false,
      dataX: dataX,
      active: false,
      offset: 10, // li标签之间的间距
      lineWidth: 2,
      dis: 0,
      distance: 0,
      distanceStart: 0,
      startX: 0,
      ulWidth: 0,
      index: 1,
      corpus: 0,
      income: 0,
      raise: 0,
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
      ]
    }
  },
  filters: {
    capitalize(value) {
      if (value % 10 === 0) {
        return value * 1000
      } else {
        return ''
      }
    },
    toFixeds(value) {
      return value.toFixed(2)
    }
  },
  methods: {
    onInput() {
      this.corpus = this.corpus.replace(/\D/g, '')
      if (this.corpus > 500000) {
        this.corpus = 500000
      }
      if (this.corpus === '') {
        this.closeShow = false
      } else {
        this.closeShow = true
      }
    },
    focus() {
      if (this.corpus === '') {
        this.closeShow = false
      } else {
        this.closeShow = true
      }
    },
    blurs() {
      this.$refs.inputs.blur()
    },
    blur() {
      this.closeShow = false
      if (this.corpus === '') {
        this.distance = 0
      } else {
        this.distance =
          -this.offsetDis *
          (Math.floor(this.corpus / 1000) + (this.corpus % 1000) / 1000)
        this.incomes()
      }
    },
    clears() {
      this.corpus = ''
      this.distance = 0
      this.incomes()
    },
    select(txt) {
      this.raise = txt
      this.incomes()
    },
    before() {
      let outWidth =
        document.documentElement.clientWidth || document.body.clientWidth
      this.dis = outWidth / 2
      this.ulWidth = document.getElementById('ul').clientWidth
      this.offsetDis = this.offset + this.lineWidth
      this.distance = -this.offsetDis * this.index
      this.corpus = this.index * 1000
      this.incomes()
    },
    touchstart(e) {
      this.active = false
      this.startX = e.targetTouches[0].pageX
      this.distanceStart = this.distance
    },
    touchmove(e) {
      e.preventDefault()
      e.stopPropagation()
      let shuX = e.targetTouches[0].pageX
      let jl = shuX - this.startX
      this.distance = this.distanceStart + jl
      if (this.distance >= 0) {
        this.distance = 0
      } else if (this.distance <= -this.ulWidth) {
        this.distance = -this.ulWidth
      }
    },
    touchend(e) {
      this.active = true
      if (this.distance > this.distanceStart) {
        this.distance = Math.abs(this.distance)
        if (this.distance % this.offsetDis <= this.offsetDis / 2) {
          this.index = Math.ceil(this.distance / this.offsetDis) - 1
        } else {
          this.index = Math.ceil(this.distance / this.offsetDis)
        }
        if (this.index < 0) {
          this.index = 0
        }
      } else if (this.distance < this.distanceStart) {
        this.distance = Math.abs(this.distance)
        if (this.distance % this.offsetDis >= this.offsetDis / 2) {
          this.index = Math.floor(this.distance / this.offsetDis) + 1
        } else {
          this.index = Math.floor(this.distance / this.offsetDis)
        }
        if (this.index > this.maxIndex - 1) {
          this.index = this.maxIndex - 1
        }
      }
      this.distance = -this.offsetDis * this.index
      this.corpus = this.index * 1000
      this.incomes()
    },
    incomes() {
      let projectStyle = this.types.type
      //endday 按天计息,等额本息,到期还本，按月付息
      //投资金额
      let account = Number(this.corpus)
      //基本利息
      let apr = Number(this.types.interest)
      //期限  月/天
      let period = Number(this.types.time)
      //平台加息
      let award = Number(this.raise)
      // 期限的计算方式（按天还是按月）
      let val = null
      let preMonth = null
      let preMonthAll = null
      if (projectStyle === 'endday') {
        val = 365
      } else {
        val = 12
      }
      if (projectStyle === '等额本息') {
        let perMonthAprAll = (apr * 0.01 + award * 0.01) / 12
        let perMonthApr = (apr * 0.01) / 12
        let allAward = null
        preMonth = Number(
          (account * perMonthApr * Math.pow(1 + perMonthApr, period)) /
            (Math.pow(1 + perMonthApr, period) - 1)
        ).toFixed(2)
        preMonthAll = Number(
          (account * perMonthAprAll * Math.pow(1 + perMonthAprAll, period)) /
            (Math.pow(1 + perMonthAprAll, period) - 1)
        ).toFixed(2)
        allAward = Number((preMonthAll - preMonth) * period).toFixed(2)
        let leftAcc = account //剩余本金
        let profit = 0
        for (let i = 0; i < period; i++) {
          let per = i + 1 + '/' + period
          let perCapital = null
          let perInterest = null
          if (i === period - 1) {
            perCapital = leftAcc
            perInterest = (leftAcc * perMonthApr).toFixed(2)
            preMonth = Number(perCapital) + Number(perInterest)
          } else {
            perInterest = (leftAcc * perMonthApr).toFixed(2)
            perCapital = (preMonth - perInterest).toFixed(2)
          }
          profit = Number(Number(profit) + Number(perInterest)).toFixed(2)
          leftAcc =
            Number(Number(leftAcc) - Number(perCapital)).toFixed(2) < 0.2
              ? 0
              : Number(Number(leftAcc) - Number(perCapital)).toFixed(2)
        }
        //总利息
        this.income = Number(Number(allAward) + Number(profit)).toFixed(2)
      } else if (projectStyle === '到期还本，按月付息') {
        let profit = (
          ((account * (award + apr) * 0.01) / val).toFixed(2) * period
        ).toFixed(2)
        this.income = profit
      } else if (projectStyle === 'endday') {
        let allAward = Number(
          (account * (award + apr) * 0.01 * period) / val
        ).toFixed(2)
        this.income = allAward
      }
    }
  },
  mounted() {
    this.before()
  }
}
</script>
<style lang="stylus" scoped>
  .con
    height: 235px
    .title
      width: 260px
      padding: 27px 0 10px
      color: $color-gray3
      font-size: $fontsize-small-ss
      margin: 0 auto
      border-bottom: 2px solid $color-gray5
      text-align: center
      p:last-child
        line-height: 75px
        position relative
        input 
          display block
          width 100%
          font-size: $fontsize-large-xxxxxxx
          padding 0 30px
          text-align center
          border none
          color: $color-primary 
        span 
          position absolute
          width 40px
          height 100%
          line-height: 70px
          top 0
          right 0
          color $color-gray4
          font-size $fontsize-large-xxx
    .vue-count
      width: 100%
      height: 90px
      overflow: hidden
      position: relative
      ul
        height: 89px
        display: flex
        align-items: flex-end
        -webkit-overflow-scrolling: touch
        position: absolute
        left: 0
        top: 0
        border-bottom: 1px solid #E8E8E8
        &.active
          transition: all 0.3s ease
        li
          height: 20px
          text-align: center
          line-height: -30px
          font-size: $fontsize-small-ss
          color: #949494
          float: left
          background: #E8E8E8
          position: relative
          &.on
            height: 30px
          span
            position: absolute
            left:50%
            top: 50%
            transform: translate(-50%, -150%)
      .center
        display: inline-block
        position: absolute
        height: 76px
        bottom: 0
        background: #FF7400
        z-index: 90
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
</style>
