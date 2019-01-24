<template>
  <div class="recode">
    <td-header title="提现记录"/>
    <!-- <div class="recodeTop">
      <span>提现金额(元)/类型</span>
      <span>状态/时间</span>
    </div>
    <cube-scroll
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul>
        <li>
          <div>
            <p>5000.00 <b>(含3元手续费)</b> </p>
            <p>快速到账</p>
          </div>
          <div>
            <p>成功</p>
            <p>2018-06-07 10:00</p>
          </div>
        </li>
        <li>
          <div>
            <p>5000.00 <b>(含3元手续费)</b> </p>
            <p>快速到账</p>
          </div>
          <div>
            <p>成功</p>
            <p>2018-06-07 10:00</p>
          </div>
        </li>
        <li>
          <div>
            <p>5000.00 <b>(含3元手续费)</b> </p>
            <p>快速到账</p>
          </div>
          <div>
            <p>成功</p>
            <p>2018-06-07 10:00</p>
          </div>
        </li>
      </ul>
    </cube-scroll> -->
    <div class="data-status">
      <data-status
        status="null"
        statusTxt="暂无提现记录"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      }
    }
  },
  mounted() {},
  methods: {
    onPullingDown() {
      console.log(111)
    },
    onPullingUp() {
      console.log(222)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.recode
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 188px
  .recodeTop
    position: absolute
    top: 88px
    left: 0
    right: 0
    line-height: 100px
    padding: 0 30px 
    font-size: 28px
    color: $color-gray2
    background-color: $color-background
    display: flex
    align-items: center
    span
      flex: 1
    span:nth-child(2)
      text-align: right
  ul
    background-color: #fff
    li
      height: 140px
      padding: 0 30px
      border-bottom:1px solid $color-gray5
      display: flex
      align-items: center
      div
        flex: 1
        text-align: left
        p:nth-child(1)
          font-size: $fontsize-large-xxx
          color: $color-gray1
          b
            font-size: $fontsize-small-ss
        p:nth-child(2)
          font-size: $fontsize-medium
          color: $color-gray3
          line-height: 40px
          margin-top: 10px
      div:nth-child(2)
        text-align: right
        p:nth-child(1)
          font-size: $fontsize-large-x
    li:last-child
      border: none
  .data-status
    position: fixed
    left: 0
    right: 0
    top: 40%
    transform: translateY(-50%)  
</style>
