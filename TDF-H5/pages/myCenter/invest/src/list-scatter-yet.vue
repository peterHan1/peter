<template>
  <cube-scroll
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul>
      <li>
        <router-link to="/myCenter/invest/scatterDetails" >
          <p>
            <span>宝马X6抵押续贷标 <b>No.2018110006688</b> </span>
          </p>
          <div>
            <p><span>8,888.88</span><span>66.66</span></p>
            <p><span>出借金额(元)</span><span>收益(元)</span></p>            
          </div>
          <p>
            <span>出借时间：<i>2018.12.12 12:12</i></span>
            <span>到期时间：<i>2019-12-13</i></span>
          </p>
        </router-link>
      </li>
    </ul>
  </cube-scroll>
  <!-- <div class="data-status">
    <data-status
      status="null"
      statusTxt="暂无内容"/>
  </div> -->
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
li
  background-color: $color-white
  margin-top: 20px
  padding: 0 30px
  p
    font-size: $fontsize-medium
    color: $color-gray1
    line-height: 80px
    display: flex
    justify-content: space-between
    i
      color: $color-gray2
    b
      font-size: $fontsize-small-ss
  p:nth-child(3)
    font-size: $fontsize-small-ss
    color: $color-gray3
    border-top: 1px solid $color-gray5
  div
    padding-bottom: 20px
    p:nth-child(1)
      line-height: 50px
      span:nth-child(1)
        font-size: $fontsize-large-xxxxx
        color: $color-primary
      span:nth-child(2)
        font-size: $fontsize-large-xxx
        color: $color-gray1
    p:nth-child(2)
      margin-top: 5px
      line-height: 33px
      font-size: $fontsize-small-ss
      color: $color-gray4
.data-status
  position: absolute
  right: 14%
  top: 15%      
</style>
