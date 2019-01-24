<template>
  <cube-scroll
    :scrollEvents="['scroll','scroll-end']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div 
      class="free_record">
      <ul class="borrow_record">
        <li 
          v-for="(item,index) in items" 
          :key="index">
          <div>{{ item.phone }}</div>
          <div>
            <p>{{ item.money }}</p>
            <p>{{ item.time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: '',
      items: [
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' }
      ]
    }
  },
  methods: {
    onScroll(pos) {
      if (pos.y > 20) {
        this.pullTxt = '松手，返回标的信息'
        this.pullY = pos.y
      } else {
        this.pullTxt = '下拉释放，返回标的信息'
        this.pullY = pos.y
      }
    },
    onPullingDown() {
      setTimeout(() => {
        this.$emit('downFn')
      }, 100)
    }
  }
}
</script>
<style lang="stylus" scoped>
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.free_record
  background-color: $color-white
  .borrow_record
    margin-bottom: 30px
    li
      overflow: hidden
      margin: 0 .3rem
      border-bottom: 1px solid $color-gray7
      font-size: $fontsize-medium
      &:last-child
        border-bottom: none
      div:nth-child(1)
        float: left
        height: 1.37rem
        line-height: 1.37rem
      div:nth-child(2)
        float: right
      div p:nth-child(1)
        font-size: $fontsize-medium
        color: $color-gray1
        margin-top: 0.3rem
        line-height: 0.4rem
        text-align: right
      div p:nth-child(2)
        font-size: $fontsize-small-sss
        color: $color-gray3
        line-height: 0.3rem
        margin-top: 0.08rem
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none          
</style>
