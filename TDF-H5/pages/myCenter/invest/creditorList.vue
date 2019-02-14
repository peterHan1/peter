<template>
  <div class="myInvest">
    <td-header 
      :returnUrl="false"
      title="债权明细" 
      url="myCenter-invest-siftDetails"/>
    <cube-scroll
      v-if="content.length > 0"
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <div class="titleTxt">
        <span>{{ this.$route.query.name }}</span>
        <b v-if="status === 1">额度已满</b>
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
            <router-link to="" >查看协议</router-link>
            <router-link to="" >查看项目</router-link>
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
      status: '',
      list: '',
      name: '',
      tenderId: '',
      item: 12,
      page: 1,
      content: []
    }
  },
  mounted() {
    if (this.$store.state.accessId && this.$store.state.accessKey) {
      this.tenderId = this.$route.query.tenderId
      this.name = this.$route.query.name
      this.status = this.$route.query.status
      this.getList()
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    getList() {
      const params = {
        tenderId: this.tenderId,
        item: this.item,
        page: this.page
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      joinTenderList(this.$axios, params, commenParams).then(res => {
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
  .data-status
    position: absolute
    left: 50%
    top: 30%
    transform: translateX(-50%)
</style>
