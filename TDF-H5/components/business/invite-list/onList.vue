<template>
  <cube-scroll
    v-if="contentList.length > 0"
    ref="contentScroll"
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
        <li 
          v-for="(item,index) in contentList" 
          :key="index">
          <span>{{ item.cashAmount }}</span>
          <span>{{ item.awardtype }}</span>
          <span>{{ item.inviteUserName }}</span>
          <span>{{ item.productTime }}</span>
        </li>
      </div>
    </ul>
  </cube-scroll>
  <div 
    v-else 
    class="data-status">
    <data-status
      status="null"
      statusTxt="暂无待收返现明细"/>
  </div>
</template>

<script>
import { recordList } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

let pageNum = 1

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
      type: 2,
      item: 12,
      page: 1,
      contentList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        type: this.type,
        item: this.item,
        page: this.page
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      recordList(this.$axios, params, commenParams).then(res => {
        if (res) {
          this.contentList = res.content.dataRows
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.contentList = []
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      this.page++
      setTimeout(() => {
        this.getList()
        this.$refs.contentScroll.forceUpdate()
      }, 1000)
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
