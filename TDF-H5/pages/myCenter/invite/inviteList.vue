<template>
  <div class="invite">
    <td-header 
      :returnUrl="false"
      title="邀请人记录" 
      url="myCenter-invite-inviteRecord"/>
    <div class="listHeader">
      <span>直接被邀请人</span>
      <span>直接返现奖励(元)</span>
      <span>间接返现奖励(元)</span>
    </div>
    <cube-scroll
      v-if="content.length > 0"
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul>
        <li 
          v-for="(item,index) in content" 
          :key="index">
          <span>{{ item.inviteUserName }}</span>
          <span>{{ item.cashAmount }}</span>
          <span>{{ item.indirectCashAmount }}</span>
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
import { inviteFriendList } from '~/api/myCenter.js'
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
      content: []
    }
  },
  mounted() {
    if (this.$store.state.accessId && this.$store.state.accessKey) {
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
      let params = {
        item: this.item,
        page: this.page
      }
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      inviteFriendList(this.$axios, params, commenParams).then(res => {
        if (res) {
          let list = res.content.dataRows
          for (let i in list) {
            this.content.push(list[i])
          }
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
.invite
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  padding-top: 188px
  .listHeader
    position: absolute
    top: 88px
    left: 0
    right: 0
    display: flex
    padding: 0 30px
    border-bottom: 1px solid $color-gray5
    background-color: $color-white
    span
      flex: 1
      font-size: $fontsize-small-ss
      color: $color-gray3
      line-height: 82px
    span:nth-child(2)
      text-align: center
    span:nth-child(3)
      text-align: right
  ul
    padding: 0 30px
    background-color: $color-white
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
  .data-status
    position: absolute
    left: 50%
    top: 30%
    transform: translateX(-50%)        
</style>
