<template>
  <div class="recode">
    <td-header 
      :returnUrl="false" 
      title="提现记录" 
      url="/myCenter/fund/cash"/>
    <div class="recodeTop">
      <span>提现金额(元)/类型</span>
      <span>状态/时间</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="this.$store.state.myCenter.cashRecord.length">
        <li 
          v-for="(item,index) in this.$store.state.myCenter.cashRecord" 
          :key="index">
          <div>
            <p>{{ item.total }} <b v-if="item.fee">(含{{ item.fee }}元手续费)</b> </p>
            <p v-if="item.withdrawType === 'URGENT'">快速到账</p>
            <p v-else-if="item.withdrawType === 'NORMAL'">普通到账</p>
          </div>
          <div>
            <p>{{ item.status }}</p>
            <p>{{ item.addtime }}</p>
          </div>
        </li>
      </ul>
      <div 
        v-else 
        class="data-status">
        <data-status
          status="null"
          statusTxt="暂无提现记录"/>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { getCashById } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'
export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      const params = { item: 12, page: 1 }
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const rechargeList = await getCashById(app.$axios, params)
      if (rechargeList.code === 100000) {
        store.commit('myCenter/setCashRecordNull')
        store.commit('myCenter/setCashRecord', rechargeList.content.dataRows)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
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
      pageNum: 1,
      bscroll: true
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.returnLogin()
    }
  },
  methods: {
    onPullingDown() {
      setTimeout(async () => {
        this.pageNum = 1
        const params = { item: this.item, page: 1 }
        const accountLog = await getCashById(this.$axios, params)
        if (accountLog.code === 100000) {
          this.$store.commit('myCenter/setCashRecordNull')
          this.$store.commit(
            'myCenter/setCashRecord',
            accountLog.content.dataRows
          )
          this.$refs.contentScroll.forceUpdate()
        } else {
          this.returnLogin()
        }
      }, 1000)
    },
    onPullingUp() {
      if (this.bscroll) {
        setTimeout(async () => {
          this.pageNum++
          const params = { item: this.item, page: this.pageNum }
          const accountLog = await getCashById(this.$axios, params)
          if (accountLog.code === 100000) {
            this.$store.commit(
              'myCenter/setCashRecord',
              accountLog.content.dataRows
            )
            this.$refs.contentScroll.forceUpdate()
            this.bscroll = true
          } else {
            this.returnLogin()
          }
        }, 1000)
      }
      this.bscroll = false
    },
    returnLogin() {
      this.$store.commit('setToken', { isLogin: false })
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
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
    line-height: 100px
    padding: 0 30px 
    font-size: 28px
    color: $color-gray2
    background-color: $color-background
    display: flex
    align-items: center
    span
      flex: 1
    span:nth-child(2)
      text-align: right
  ul
    background-color: #fff
    li
      height: 140px
      padding: 0 30px
      border-bottom:1px solid $color-gray5
      display: flex
      align-items: center
      div
        flex: 1
        text-align: left
        p:nth-child(1)
          font-size: $fontsize-large-xxx
          color: $color-gray1
          b
            font-size: $fontsize-small-ss
        p:nth-child(2)
          font-size: $fontsize-medium
          color: $color-gray3
          line-height: 40px
          margin-top: 10px
      div:nth-child(2)
        text-align: right
        p:nth-child(1)
          font-size: $fontsize-large-x
    li:last-child
      border: none
</style>
