<template>
  <!-- <cube-scroll
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul>
      <div class="listTop">
        <li>
          <span>奖励金额(元)</span>
          <span>奖励类型</span>
          <span>奖励来源人</span>
          <span>产生时间</span>
        </li>
      </div>
      <div>
        <li>
          <span>6.66</span>
          <span>直接奖励</span>
          <span>134****9086</span>
          <span>12月20日</span>
        </li>
        <li>
          <span>6.66</span>
          <span>直接奖励</span>
          <span>134****9086</span>
          <span>12月20日</span>
        </li>
        <li>
          <span>8.88</span>
          <span>直接奖励</span>
          <span>134****9086</span>
          <span>12月20日</span>
        </li>
        <li>
          <span>6.66</span>
          <span>直接奖励</span>
          <span>134****9086</span>
          <span>12月20日</span>
        </li>
        <li>
          <span>8.88</span>
          <span>直接奖励</span>
          <span>134****9086</span>
          <span>12月20日</span>
        </li>
      </div>
    </ul>
  </cube-scroll> -->
  <div class="data-status">
    <data-status
      status="null"
      statusTxt="暂无待收返现明细"/>
  </div>
</template>

<script>
import { inviteFriendList } from '~/plugins/api.js'

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
      },
      item: 10,
      page: 1
    }
  },
  mounted() {
    const params = {
      item: this.item,
      page: this.page
    }
    inviteFriendList(this.$axios, params).then(res => {
      if (res) {
        this.content = res.data.content
      }
    })
  },
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
ul
  background-color: $color-white
  div
    padding: 0 30px
  li
    display: flex
    border-bottom: 1px solid $color-gray5
    span
      flex: 1
      text-align: center
      line-height: 90px
      font-size: $fontsize-medium
      color: $color-gray1
    span:first-child
      text-align: left
    span:last-child
      text-align: right 
  .listTop
    border-top: 1px solid $color-gray5
    border-bottom: 1px solid $color-gray5
    li
      border: none
      span
        line-height: 82px
        font-size: $fontsize-small-ss
        color: $color-gray3
.data-status
  position: absolute
  left: 15%
  top: 10%
</style>
