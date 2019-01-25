<template>
  <div class="invite">
    <td-header title="邀请人记录"/>
    <div class="listHeader">
      <span>直接被邀请人</span>
      <span>直接返现奖励(元)</span>
      <span>间接返现奖励(元)</span>
    </div>
    <cube-scroll
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul>
        <li>
          <span>134****9086</span>
          <span>6.66</span>
          <span>10.00</span>
        </li>
        <li>
          <span>134****9086</span>
          <span>6.66</span>
          <span>10.00</span>
        </li>
        <li>
          <span>134****9086</span>
          <span>6.66</span>
          <span>10.00</span>
        </li>
        <li>
          <span>134****9086</span>
          <span>6.66</span>
          <span>10.00</span>
        </li>
        <li>
          <span>134****9086</span>
          <span>6.66</span>
          <span>-</span>
        </li>
      </ul>
    </cube-scroll>
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
      item: 12,
      page: 1
    }
  },
  mounted() {
    let params = {
      item: this.item,
      page: this.page
    }
    inviteFriendList(this.$axios, params).then(res => {
      if (res) {
        this.list = res.data.content
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
  .invite
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    padding-top: 188px
    .listHeader
      position: absolute
      top: 88px
      left: 0
      right: 0
      display: flex
      padding: 0 30px
      border-bottom: 1px solid $color-gray5
      background-color: $color-white
      span
        flex: 1
        font-size: $fontsize-small-ss
        color: $color-gray3
        line-height: 82px
      span:nth-child(2)
        text-align: center
      span:nth-child(3)
        text-align: right
    ul
      padding: 0 30px
      background-color: $color-white
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
</style>
