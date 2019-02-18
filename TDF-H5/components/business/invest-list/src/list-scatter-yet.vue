<template>
  <cube-scroll
    ref="contentScroll1"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul v-if="this.$store.state.myCenter.scatterYet.length" >
      <li 
        v-for="(item,index) in this.$store.state.myCenter.scatterYet" 
        :key="index">
        <router-link to="/myCenter/invest/scatterDetails" >
          <p>
            <span>{{ item.name }} <b>No.{{ item.borrowNid }}</b> </span>
          </p>
          <div>
            <p><span>{{ item.amount }}</span><span>{{ item.interest }}</span></p>
            <p><span>出借金额(元)</span><span>收益(元)</span></p>            
          </div>
          <p>
            <span>出借时间：<i>{{ item.addTime }}</i></span>
            <span>到期时间：<i>{{ item.recoverTime }}</i></span>
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
import { bankTenderNow } from '~/api/myCenter.js'
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
      status: 'repay_yes',
      item: 12,
      pageNum: 1
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    commenParams.accessId = this.$store.state.accessId
    commenParams.accessKey = this.$store.state.accessKey
  },
  methods: {
    async getList() {
      const params = { item: this.item, page: 1, status: this.status }
      const tenderYet = await bankTenderNow(this.$axios, params)
      this.$store.commit('myCenter/setScatterYetNull')
      this.$store.commit('myCenter/setScatterYet', tenderYet.content.dataRows)
    },
    onPullingDown() {
      setTimeout(async () => {
        this.pageNum = 1
        const params = { item: this.item, page: 1, status: this.status }
        const tenderYet = await bankTenderNow(this.$axios, params)
        this.$store.commit('myCenter/setScatterYetNull')
        this.$store.commit('myCenter/setScatterYet', tenderYet.content.dataRows)
        this.$refs.contentScroll1.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      setTimeout(async () => {
        this.pageNum++
        const params = {
          item: this.item,
          page: this.pageNum,
          status: this.status
        }
        const tenderYet = await bankTenderNow(this.$axios, params)
        this.$store.commit('myCenter/setScatterYet', tenderYet.content.dataRows)
        this.$refs.contentScroll1.forceUpdate()
      }, 1000)
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
  right: 25%
  top: 15%      
</style>
