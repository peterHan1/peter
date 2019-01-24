<template>
  <div class="recode">
    <td-header title="资金记录"/>
    <div class="recodeTop">
      <span>类型/时间</span>
      <span>金额(元)/状态</span>
    </div>
    <cube-scroll
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul>
        <li>
          <p>
            <span>充值</span>
            <span>1.00</span>
          </p>
          <p>
            <span>2017-01-10 15:29:00</span>
            <span>成功</span>
          </p>
        </li>
        <li>
          <p>
            <span>充值</span>
            <span>1.00</span>
          </p>
          <p>
            <span>2017-01-10 15:29:00</span>
            <span>成功</span>
          </p>
        </li>
        <li>
          <p>
            <span>充值</span>
            <span>1.00</span>
          </p>
          <p>
            <span>2017-01-10 15:29:00</span>
            <span>成功</span>
          </p>
        </li>
        <li>
          <p>
            <span>充值</span>
            <span>1.00</span>
          </p>
          <p>
            <span>2017-01-10 15:29:00</span>
            <span>成功</span>
          </p>
        </li>
        <li>
          <p>
            <span>充值</span>
            <span>1.00</span>
          </p>
          <p>
            <span>2017-01-10 15:29:00</span>
            <span>成功</span>
          </p>
        </li>
      </ul>
    </cube-scroll>
    <!-- <div class="data-status">
      <data-status
        status="null"
        statusTxt="暂无资金记录"/>
    </div> -->
    
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
    padding: 0 30px 
    line-height: 88px
    background-color: $color-white
    font-size: $fontsize-large-x
    color: $color-gray2
    display: flex
    justify-content: space-between
  ul
    margin-top: 20px
    padding: 0 30px
    background-color: $color-white
    li
      border-bottom:1px solid $color-gray5
      p
        display: flex
        justify-content: space-between
      p:nth-child(1)
        line-height: 40px
        color: $color-gray1
        font-size: $fontsize-medium
        padding-top: 20px
        span:nth-child(2)
          color: $color-primary
      p:nth-child(2)
        font-size: $fontsize-small-ss
        line-height: 33px
        color: $color-gray2
        padding: 10px 0 20px
    li:last-child
      border: none
  .data-status
    position: fixed
    left: 0
    right: 0
    top: 40%
    transform: translateY(-50%)    
</style>
