<template>
  <cube-scroll
    ref="contentScroll1"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul v-if="contentList.length > 0">
      <li 
        v-for="(item,index) in contentList" 
        :key="index">
        <div class="discountLeft">
          <p><span>{{ item.amount }}</span>元</p>
          <p>满{{ item.investAmountCondition }}元可用</p>
        </div>
        <div class="discountRight">
          <p class="source">
            <span>{{ item.remark }}</span>
            <router-link to="/project" >去使用</router-link>
          </p>
          <p>{{ item.invalidDate }}</p>
          <p>理财期限{{ item.borrowPeriodCondition }}个月及以上使用</p>
        </div>
      </li>
    </ul>
    <div 
      v-else 
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无抵用券"/>
    </div>
    <div 
      class="discountBottom" 
      @click="downApp">
      <span >查看已使用</span> | <span>已失效</span>
    </div>
  </cube-scroll>
</template>

<script>
import { getVoucherList } from '~/api/myCenter.js'
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
      getVoucherList(this.$axios, params, commenParams).then(res => {
        if (res.code === 100000) {
          let list = res.content.dataRows
          for (let i in list) {
            this.contentList.push(list[i])
          }
        } else {
          this.$store.commit('setToken', { isLogin: false })
          this.$store.commit('srcPath', '/myCenter/center')
          this.$router.push({
            name: 'user-login'
          })
        }
      })
    },
    onPullingDown() {
      setTimeout(() => {
        this.page = 1
        this.contentList = []
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
    background: url(../../../assets/images/my-center/ticket_voucher.png) no-repeat
    background-size: 100% 100%
    div
      display: inline-block
      float: left
    .discountLeft
      width: 30%
      text-align: center
      padding: 32px 0 50px
      p:nth-child(1)
        color: $color-white
        font-size: $fontsize-large-x
        span
          font-size: 72px
          line-height: 87px
      p:nth-child(2)
        color: $color-white
        font-size: $fontsize-small-sss
    .discountRight
      height: 200px
      width: 65%
      padding-left: 30px
      p
        font-size: $fontsize-small-sss
        color: $color-gray3
        padding-bottom: 10px
      .source
        padding: 36px 0 18px
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
.discountBottom
    font-size: $fontsize-small-ss
    color: $color-gray4
    text-align: center
    margin-top: 60px
    span
      color: $color-primary
      margin: 0 40px    
</style>
