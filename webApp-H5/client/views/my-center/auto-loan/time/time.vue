<template>
  <div>
    <div class="timeBox">
    <div class="toolbar">
      <span @click="closeFn">取消</span>
      <span @click="confirmFn">确定</span>
    </div>
    <picker :slots="slots" @change="onValuesChange"></picker>
  </div>
    <div class="shade"></div>
  </div>
  
</template>
<script>
import { Picker } from 'mint-ui'
export default {
  props: ['startTime', 'endTime'],
  data () {
    return {
      timeTxt: '',
      slots: []
    }
  },
  mounted () {
    let vm = this
    vm.slots.push(
      {
        flex: 1,
        values: ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '12个月', '13个月', '14个月', '15个月', '16个月', '17个月', '18个月', '19个月', '20个月', '21个月', '22个月', '23个月', '24个月', '25个月', '26个月', '27个月', '28个月', '29个月', '30个月', '31个月', '32个月', '33个月', '34个月', '35个月', '36个月'],
        className: 'slot1',
        textAlign: 'right',
        defaultIndex: vm.startTime
      }, {
        flex: 1,
        values: ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '12个月', '13个月', '14个月', '15个月', '16个月', '17个月', '18个月', '19个月', '20个月', '21个月', '22个月', '23个月', '24个月', '25个月', '26个月', '27个月', '28个月', '29个月', '30个月', '31个月', '32个月', '33个月', '34个月', '35个月', '36个月'],
        className: 'slot3',
        textAlign: 'left',
        defaultIndex: vm.endTime
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
      data = data.sort((a, b) => { return a - b })
      this.$emit('selectTime', data)
    },
    onValuesChange (picker, values) {
      this.timeTxt = values
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
    top: auto
    right: 0
    bottom: 0
    left: 0
    transition: .2s ease-out
    z-index: 999
    .shade
      z-index: 1
    .toolbar
      border-bottom: 1px solid #eaeaea
      background-color: #eaeaea
      height: 80px
      display: flex
      span
        display: inline-block
        text-align: center
        line-height: 80px
        font-size: 30px
        color: #000
        flex: 1
      span:nth-child(1)
        float: left  
      span:nth-child(2)
        float: right
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
