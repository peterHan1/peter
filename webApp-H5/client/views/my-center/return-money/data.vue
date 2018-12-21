<template>
  <div>
    <div id="calendar" class="calendar">
      <div id="month_wrap" class="month_wrap fix">
        <div id="month_head" class="month_head">
          <span id="lefts" class="iconfont lefts" v-show="timeNav" @click="goPrevFn"> &#xe687; </span>
          <span class="contents" @click="selectTimeFn()">
            <span class="title">{{yearTxt}}年{{monthTxt}}月</span>
            <i class="iconfont" :class="arrows?'on':''">&#xe9bb;</i>
          </span>
          <span id="rights" class="iconfont rights" v-show="timeNav" @click="goNextFn"> &#xe83d; </span>
        </div>
        <div id="calendar_month" class="calendar_month fix" @click="selectDataFn($event)">
          <div id="month_viewA" class="month_view"></div>
          <div id="month_viewB" class="month_view"></div>
          <div id="month_viewC" class="month_view"></div>
        </div>
      </div>
    </div>
    <div :is="timeComp" :year="yearTxt" :month="monthTxt" @closeTime="closeTimeFn" @selectTime="returnTimeFn"></div>
  </div>
</template>
<script>
import {Calendar} from './src/calendar.js'
import Time from './time.vue'
export default {
  data () {
    return {
      yearTxt: '2018',
      monthTxt: '1',
      timeComp: '',
      timeNav: true,
      defaultTime: null,
      schedules: null,
      arrows: false
    }
  },
  mounted () {
    this.schedules = [
      {
        'repayTime': '2018-09-02 11:10:32',
        'repayNum': 1
      }, {
        'repayTime': '2018-09-10 11:10:32',
        'repayNum': 10
      }, {
        'repayTime': '2018-10-01 11:10:32',
        'repayNum': 10
      }, {
        'repayTime': '2018-10-25 11:10:32',
        'repayNum': 999
      }, {
        'repayTime': '2018-10-20 11:10:32',
        'repayNum': 5
      }, {
        'repayTime': '2018-11-10 11:10:32',
        'repayNum': 3
      }, {
        'repayTime': '2018-11-20 11:10:32',
        'repayNum': 11
      }, {
        'repayTime': '2018-12-06 11:10:32',
        'repayNum': 6
      }
    ]
    this.init(this.defaultTime)
  },
  methods: {
    init (data) {
      let vm = this
      vm.calendar = new Calendar(
        document.getElementById('calendar'),
        data,
        function (self, dateRange) {
          if (self.activeView.name === 'month') {
            var date = self.getMonth()
            vm.yearTxt = date.year
            vm.monthTxt = date.month
          }
          self.update(vm.schedules)
        }
      )
      vm.calendar.init()
    },
    selectDataFn (ev) {
      let vm = this
      let e = ev || window.event
      var target = e.target || e.srcElement
      var nam = target.nodeName.toLowerCase()
      var tdTag
      if (nam === 'span' || nam === 'b') {
        tdTag = target.parentNode
      } else {
        tdTag = target
      }
      vm.calendar.tdClick(tdTag, function (t) {
        console.log(t)
      })
    },
    goPrevFn () {
      this.calendar.goPrev()
    },
    goNextFn () {
      this.calendar.goNext()
    },
    returnTimeFn (data) {
      this.yearTxt = data[0]
      this.monthTxt = data[1]
      this.timeComp = ''
      this.timeNav = !this.timeNav
      this.arrows = !this.arrows
      this.defaultTime = this.yearTxt + '-' + this.monthTxt
      this.init(this.defaultTime)
    },
    selectTimeFn () {
      let vm = this
      vm.timeNav = !vm.timeNav
      vm.arrows = !vm.arrows
      if (vm.timeComp === '') {
        vm.timeComp = 'Time'
      } else {
        vm.timeComp = ''
      }
    },
    closeTimeFn () {
      this.timeNav = !this.timeNav
      this.arrows = !this.arrows
      this.timeComp = ''
    }
  },
  components: {
    Time
  }
}
</script>

<style lang="stylus" scoped>
  .calendar
    position:relative
    width:100%
    overflow:hidden
    background-color: #fff
  .calendar-transition .calendar_month, .calendar-transition
    -webkit-transition: -webkit-transform .3s ease-out
    -webkit-transition: transform .3s ease-out
    transition: transform .3s ease-out
  .month_wrap
    position:relative
  .month_head
    position:absolute
    left: 0
    right: 0
    top: 0
    line-height:0.9rem
    text-align:center
    font-size: 0.3rem
    padding:0 0.5rem
    color: #333
    .contents
      display: inline-block
      line-height:0.9rem
      i
        transition: all 0.3s
        display: inline-block
      .on
        transform: rotate(180deg)
    .lefts
      float: left
      font-weight: bold
      color: #FC862A
      font-size: 0.3rem
    .rights
      float: right
      font-weight: bold
      color: #FC862A
      font-size: 0.3rem
  .calendar_month
    position:absolute
    left:-100%
    top: 0.9rem
    width:300%
  .month_view
    float:left
    width:33.33%
    text-align:center
    /deep/ table
      width:100%
      border-collapse: collapse
      th
        line-height:0.6rem
        height:0.4rem
        font-size: 0.26rem
        color: #ccc
      td
        width: 14.2%
        height:0.67rem
        background-color:#F9F9F9
        border:1px solid #fff
        overflow: hidden
        position: relative
        color: #333
        span
          font-size: 0.22rem
          color: #FC862A
          position: absolute
          left: 10%
          top: 10%
        b
          font-weight: normal
          font-size: 0.26rem
          color: #333
          position: absolute
          right: 10%
          bottom: 10%
      .i-today 
        b
          color:#FC862A
      td.return_num
        background-color: #F1F1F3
      td.on
        background-color: #FC862A
        span
          color:#fff
        b
          color:#fff
  .calendar-expand
    text-align:center
    background-color:#ccc
</style>
