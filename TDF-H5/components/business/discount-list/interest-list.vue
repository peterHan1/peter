<template>
  <cube-scroll
    ref="contentScroll"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul v-if="contentList.length > 0">
      <li 
        v-for="(item,index) in contentList" 
        :key="index">
        <div class="discountLeft">{{ item.voucherApr }}%</div>
        <div class="discountRight">
          <p>
            <span>{{ item.remark }}</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p class="time">{{ item.invalidTime }}</p>
        </div>
      </li>
    </ul>
    <div 
      v-else 
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无加息券"/>
    </div>
    <div 
      class="discountBottom" 
      @click="downApp">
      <span>查看已使用</span> | <span>已失效</span>
    </div>
  </cube-scroll>
</template>

<script>
import { allVoucher } from '~/api/myCenter.js'
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
      clickBlooe: true,
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
        item: this.item,
        page: this.page
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      allVoucher(this.$axios, params, commenParams).then(res => {
        if (res) {
          let list = res.content.dataRows
          for (let i in list) {
            this.contentList.push(list[i])
          }
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
    },
    downApp() {
      if (this.clickBlooe) {
        this.$App('请在电脑端登录官网或在APP端查看')
        this.clickBlooe = false
      }
      setTimeout(() => {
        this.clickBlooe = true
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
ul
  padding: 0 30px
  li
    background-size: 100% 100%
    overflow: hidden
    margin-top: 20px
    background: url(../../../assets/images/my-center/ticket_coupon.png) no-repeat
    background-size: 100% 100%
    div
      display: inline-block
      float: left
    .discountLeft
      width: 30%
      font-size: 80px
      color: $color-white
      line-height: 200px
      text-align: center
    .discountRight
      height: 200px
      width: 65%
      padding-left: 30px
      p:nth-child(1)
        padding-top: 36px
        span
          font-size: $fontsize-large-xx
          color: $color-gray1
          line-height: 45px
        a
          display: inline-block
          float: right
          padding: 0 16px
          line-height: 44px
          font-size: $fontsize-small-s
          color: $color-white
          border-radius: 22px
          background-color: $color-primary
      p:nth-child(2)
        margin-top: 18px
        font-size: $fontsize-small-sss
        color: $color-gray3
.discountBottom
    font-size: $fontsize-small-ss
    color: $color-gray4
    text-align: center
    margin-top: 60px
    span
      color: $color-primary
      margin: 0 40px
.data-status
  margin-top:100px    
</style>
