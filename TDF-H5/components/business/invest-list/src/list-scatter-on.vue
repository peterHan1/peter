<template>
  <cube-scroll
    ref="contentScroll"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul v-if="this.$store.state.myCenter.scatterOn.length" >
      <li 
        v-for="(item,index) in this.$store.state.myCenter.scatterOn"
        :key="index">
        <router-link :to="{path:'/myCenter/invest/scatterDetails',query: {status:'on',tenderId: item.tenderId}}">
          <p>
            <span>{{ item.name }} <b>No.{{ item.borrowNid }}</b> </span>
            <span>{{ item.statusText }}</span>
          </p>
          <div>
            <p><span>{{ item.amount }}</span><span>{{ item.interest }}</span></p>
            <p><span>出借金额(元)</span><span>收益(元)</span></p>            
          </div>
          <p>
            <span>出借时间：<i>{{ item.addTime }}</i></span>
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
      status: 'app',
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
      const tenderOn = await bankTenderNow(this.$axios, params)
      if (tenderOn.code === 100000) {
        this.$store.commit('myCenter/setScatterOnNull')
        this.$store.commit('myCenter/setScatterOn', tenderOn.content.dataRows)
      } else {
        this.returnLogin()
      }
    },
    onPullingDown() {
      setTimeout(async () => {
        this.pageNum = 1
        const params = { item: this.item, page: 1, status: this.status }
        const tenderOn = await bankTenderNow(this.$axios, params)
        if (tenderOn.code === 100000) {
          this.$store.commit('myCenter/setScatterOnNull')
          this.$store.commit('myCenter/setScatterOn', tenderOn.content.dataRows)
          this.$refs.contentScroll.forceUpdate()
        } else {
          this.returnLogin()
        }
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
        const tenderOn = await bankTenderNow(this.$axios, params)
        if (tenderOn.code === 100000) {
          this.$store.commit('myCenter/setScatterOn', tenderOn.content.dataRows)
          this.$refs.contentScroll.forceUpdate()
        } else {
          this.returnLogin()
        }
      }, 1000)
    },
    returnLogin() {
      this.$store.commit('setToken', { isLogin: false })
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
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
    span:nth-child(1)
      width: 85%
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    i
      color: $color-gray2
    b
      font-size: $fontsize-small-ss
  p:nth-child(1)
    span:nth-child(2)
      color: $color-gray3
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
</style>
