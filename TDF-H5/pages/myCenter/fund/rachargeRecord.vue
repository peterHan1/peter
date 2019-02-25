<template>
  <div class="recode">
    <td-header 
      :returnUrl="false" 
      title="充值记录" 
      url="/myCenter/fund/recharge"/>
    <div 
      v-if="this.$store.state.myCenter.rechargeRecord.length > 0" 
      class="recodeTop">
      <span>充值金额(元)/银行卡</span>
      <span>状态/时间</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="this.$store.state.myCenter.rechargeRecord.length > 0">
        <li 
          v-for="(item,index) in this.$store.state.myCenter.rechargeRecord" 
          :key="index">
          <div>
            <p>{{ item.money }}</p>
            <p>{{ item.bankCard }}</p>
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
          statusTxt="暂无充值记录"/>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { rechargeRecord } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'
export default {
  async fetch({ app, store, route }) {
    if (store.state.isLogin) {
      const params = { item: 12, page: 1 }
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const rechargeList = await rechargeRecord(app.$axios, params)
      if (rechargeList.code === 100000) {
        store.commit('myCenter/setRegRecordNull')
        store.commit('myCenter/setRegRecord', rechargeList.content.dataRows)
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
        const accountLog = await rechargeRecord(this.$axios, params)
        if (accountLog.code === 100000) {
          this.$store.commit('myCenter/setRegRecordNull')
          this.$store.commit(
            'myCenter/setRegRecord',
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
          const accountLog = await rechargeRecord(this.$axios, params)
          if (accountLog.code === 100000) {
            if (accountLog.content.dataRows) {
              this.$store.commit(
                'myCenter/setRegRecord',
                accountLog.content.dataRows
              )
              this.$refs.contentScroll.forceUpdate()
            } else {
              this.$refs.contentScroll.forceUpdate()
            }
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
    font-size: $fontsize-medium
    color: $color-gray2
    background-color: $color-background
    display: flex
    span
      flex: 1
    span:nth-child(2)
      text-align: right
  ul
    background-color: $color-white
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
