<template>
  <div>
    <div class="timeBox">
      <picker :slots="slots" @change="onValuesChange"></picker>
      <div class="toolbar">
        <span @click="closeFn">取消</span>
        <span @click="confirmFn">确定</span>
      </div>
    </div>
    <div class="time_shade"></div>
  </div>
</template>
<script>
import { Picker } from 'mint-ui'
export default {
  props: ['year', 'month'],
  data () {
    return {
      timeTxt: [],
      slots: [],
      years: ['2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年', '2024年', '2025年', '2026年', '2027年', '2028年', '2029年', '2030年', '2031年', '2032年', '2033年', '2034年', '2035年', '2036年', '2037年', '2038年', '2039年', '2040年'],
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      yearIndex: 0,
      monthIndex: 0
    }
  },
  mounted () {
    let vm = this
    let yearTxt = vm.year + '年'
    let monthTxt = vm.month + '月'
    vm.timeTxt.push(yearTxt, monthTxt)
    vm.yearIndex = vm.search(vm.years, yearTxt)
    vm.monthIndex = vm.search(vm.months, monthTxt)
    vm.slots.push(
      {
        flex: 1,
        values: vm.years,
        className: 'slot1',
        textAlign: 'right',
        value: '2018年',
        defaultIndex: vm.yearIndex
      }, {
        flex: 1,
        values: vm.months,
        className: 'slot3',
        textAlign: 'left',
        defaultIndex: vm.monthIndex
      }
    )
  },
  methods: {
    closeFn () {
      this.$emit('closeTime', '')
    },
    confirmFn () {
      let reg = /[\u4e00-\u9fa5]/g
      let data = []
      for (let x in this.timeTxt) {
        data.push(this.timeTxt[x].replace(reg, ''))
      }
      this.$emit('selectTime', data)
    },
    onValuesChange (picker, values) {
      this.timeTxt = values
    },
    search (arr, dst) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === dst) {
          return i
        }
      }
    }
  },
  components: {
    Picker
  }
}
</script>

<style lang="stylus" scoped>
  .timeBox
    position: fixed
    background: #fff
    top: 268px
    right: 0
    left: 0
    transition: .2s ease-out
    z-index: 999
    .toolbar
      border-bottom: 1px solid #eaeaea
      background-color: #fff
      height: 80px
      display: flex
      span
        display: inline-block
        line-height: 80px
        font-size: 30px
        color: #666
        padding: 0 60px
        flex: 1
      span:nth-child(1)
        text-align: left
      span:nth-child(2)
        text-align: right
        color: #FC862A
  .time_shade
    position: fixed;
    top: 268px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99; 
  /deep/ .picker
    overflow: hidden
    .picker-toolbar
      height: 40px
    .picker-items
      display: -webkit-box
      display: -ms-flexbox
      display: flex
      -webkit-box-pack: center
      -ms-flex-pack: center
      justify-content: center
      padding: 0
      text-align: center
      font-size: 24px
      position: relative
    .picker-center-highlight
      box-sizing: border-box
      position: absolute
      left: 0
      width: 100%
      top: 50%
      margin-top: -18px
      pointer-events: none
    .picker-center-highlight:before, .picker-center-highlight:after
      content: ''
      position: absolute
      height: 2px
      width: 100%
      background-color: #eaeaea
      display: block
      z-index: 15
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
    .picker-center-highlight:before
      left: 0
      top: 0
      bottom: auto
      right: auto
    .picker-center-highlight:after
      left: 0
      bottom: 0
      right: auto
      top: auto
    .picker-slot
      font-size: 18px
      overflow: hidden
      position: relative
      max-height: 100%
    .picker-slot.picker-slot-divider
      color: #000
      display: -webkit-box
      display: -ms-flexbox
      display: flex
      -webkit-box-align: center
      -ms-flex-align: center
      align-items: center
    .picker-slot-wrapper
      -webkit-transition-duration: 0.3s
      transition-duration: 0.3s
      transition-timing-function: ease-out
      backface-visibility: hidden
    .picker-slot-wrapper.dragging, .picker-slot-wrapper.dragging .picker-item
      -webkit-transition-duration: 0s
      transition-duration: 0s
    .picker-item 
      height: 36px
      line-height: 36px
      padding: 0 10px
      font-size: 36px
      white-space: nowrap
      position: relative
      overflow: hidden
      text-overflow: ellipsis
      color: #999
      left: 0
      top: 0
      width: 100%
      box-sizing: border-box
      -webkit-transition-duration: .3s
      transition-duration: .3s
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
    .picker-slot-absolute .picker-item
      position: absolute
    .picker-item.picker-item-far
      pointer-events: none
    .picker-item.picker-selected
      color: #000
      -webkit-transform: translate3d(0, 0, 0) rotateX(0)
      transform: translate3d(0, 0, 0) rotateX(0)
    .picker-3d .picker-items
      overflow: hidden
      -webkit-perspective: 700px
      perspective: 700px
    .picker-3d .picker-item, .picker-3d .picker-slot, .picker-3d .picker-slot-wrapper
      -webkit-transform-style: preserve-3d
      transform-style: preserve-3d
    .picker-3d .picker-slot
      overflow: visible
    .picker-3d .picker-item
      -webkit-transform-origin: center center
      transform-origin: center center
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      -webkit-transition-timing-function: ease-out
      transition-timing-function: ease-out
</style>
