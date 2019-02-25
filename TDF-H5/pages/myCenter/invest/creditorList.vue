<template>
  <div class="myInvest">
    <td-header title="债权明细" />
    <cube-scroll
      v-if="content.length > 0"
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="titleTxt">
        <span>{{ this.$route.query.name }}</span>
        <b v-if="status === 1 || status === '1'">额度已满</b>
        <b v-else>加入中</b>
      </div>
      <ul>
        <li 
          v-for="(item,index) in content" 
          :key="index">
          <p>
            <span>{{ item.productName }}</span>
            <span>{{ item.statusName }}</span>
          </p>
          <p>
            <span>加入金额:<b>{{ item.tenderMoney }}</b>元</span>
            <span>加入时间:{{ item.addTime }}</span>
          </p>
          <div>
            <router-link :to="{path:'/myCenter/invest/scatterProtocol',query: {tenderId: item.tenderId}}">查看协议</router-link>
            <router-link 
              :to="{path:'/project/scatter-details/' + item.desId}"
              class="linkA">查看项目</router-link>
          </div>
        </li>
      </ul>
    </cube-scroll>
    <div
      v-else
      class="data-status">
      <data-status
        status="null"
        statusTxt="暂无内容"/>
    </div>
  </div>
</template>

<script>
import { joinTenderList } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'
let pageNum = 1
export default {
  async fetch({ app, store, route }) {
    if (app.store.state.isLogin) {
      const params = {
        tenderId: route.query.tenderId,
        item: 12,
        page: 1
      }
      commenParams.accessId = app.store.state.accessId
      commenParams.accessKey = app.store.state.accessKey
      const tenderList = await joinTenderList(app.$axios, params)
      if (tenderList.code === 100000) {
        app.store.commit('myCenter/setTenderListNull')
        app.store.commit('myCenter/setTenderList', tenderList.content.dataRows)
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
      status: this.$route.query.status,
      name: this.$route.query.name,
      tenderId: this.$route.query.tenderId,
      item: 12,
      content: this.$store.state.myCenter.tenderList
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
        pageNum = 1
        const params = { tenderId: this.tenderId, item: this.item, page: 1 }
        commenParams.accessId = this.$store.state.accessId
        commenParams.accessKey = this.$store.state.accessKey
        const tenderList = await joinTenderList(this.$axios, params)
        if (tenderList.code === 100000) {
          this.$store.commit('myCenter/setTenderListNull')
          this.$store.commit(
            'myCenter/setTenderList',
            tenderList.content.dataRows
          )
          this.$refs.contentScroll.forceUpdate()
        } else {
          this.returnLogin()
        }
      }, 1000)
    },
    onPullingUp() {
      setTimeout(async () => {
        pageNum++
        const params = {
          tenderId: this.tenderId,
          item: this.item,
          page: pageNum
        }
        commenParams.accessId = this.$store.state.accessId
        commenParams.accessKey = this.$store.state.accessKey
        const tenderList = await joinTenderList(this.$axios, params)
        if (tenderList.code === 100000) {
          this.$store.commit(
            'myCenter/setTenderList',
            tenderList.content.dataRows
          )
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
.myInvest
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 88px
  .titleTxt
    line-height: 90px
    font-size: $fontsize-large-xx
    overflow: hidden
    padding: 0 30px
    span
      color: $color-gray1
      float: left
    b
      color: $color-gray3
      float: right
  li
    background-color: $color-white
    margin-bottom: 20px
    padding: 0 30px
    p
      overflow: hidden
      span:nth-child(2)
        float: right
    p:nth-child(1)
      font-size: $fontsize-medium
      color: $color-gray1
      line-height: 40px
      padding: 30px 0 16px
    p:nth-child(2)
      line-height: 33px
      padding-bottom: 27px
      span
        font-size: $fontsize-small-ss
        color: $color-gray2
        b
          color: $color-primary
          font-size: $fontsize-large-xx
    div
      height: 80px
      border-top: 1px solid #E8E8E8
      display: flex
      align-items: center
      a
        flex: 1
        color: $color-primary
        font-size: $fontsize-small-ss
      a:nth-child(2)
        text-align: right
</style>
