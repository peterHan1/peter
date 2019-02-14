<template>
  <cube-scroll
    ref="contentScroll1"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul v-if="content.length" >
      <li 
        v-for="(item,index) in content"
        :key="index">
        <router-link :to="{path:'/myCenter/invest/siftDetails',query: {tenderId: item.tenderId, borrowNid: item.borrowNid}}">
          <p>
            <span>{{ item.name }}</span>
          </p>
          <div>
            <p><span>{{ item.joinMoney }}</span><span>{{ item.interest }}</span></p>
            <p><span>加入金额(元)</span><span>参考收益(元)</span></p>            
          </div>
          <p>
            <span>加入时间：<i>{{ item.addTime }}</i></span>
            <span>预计退出时间：<i>{{ item.endTime }}</i></span>
          </p>
        </router-link>
      </li>
    </ul>
    <div
      v-else
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无内容"/>
    </div>
  </cube-scroll>
</template>
<script>
import { freeTenderList } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

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
      status: 1,
      page: 1,
      item: 12,
      content: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        status: this.status,
        page: this.page,
        item: this.item
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      freeTenderList(this.$axios, params, commenParams).then(res => {
        let list = res.content.dataRows
        for (let i in list) {
          this.content.push(list[i])
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.content = []
        this.getList()
        this.$refs.contentScroll1.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      this.page++
      setTimeout(() => {
        this.getList()
        this.$refs.contentScroll1.forceUpdate()
      }, 1000)
    }
  }
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
  right: 25%
  top: 15%      
</style>
