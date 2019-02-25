<template>
  <div class="recode">
    <td-header 
      :returnUrl="false"
      title="资金记录" 
      url="/myCenter/center"/>
    <div class="recodeTop">
      <span>类型/时间</span>
      <span>金额(元)/状态</span>
    </div>
    <cube-scroll
      ref="contentScroll"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul v-if="this.$store.state.myCenter.moneyRecord.length > 0">
        <li 
          v-for="(item,index) in this.$store.state.myCenter.moneyRecord" 
          :key="index">
          <p>
            <span>{{ item.type }}</span>
            <span>{{ item.money }}</span>
          </p>
          <p>
            <span>{{ item.addtime }}</span>
            <span>成功</span>
          </p>
        </li>
      </ul>
      <div 
        v-else
        class="data-status">
        <data-status
          status="null"
          statusTxt="暂无资金记录"/>
      </div>
      <div class="loadBox">
        <canvas 
          ref="bubble" 
          width="22" 
          height="22"
          style="height: 30px; width:30px;"/>
        <div class="loadBg"/>  
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { getAccountLogById } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (app.store.state.isLogin) {
      const params = { item: 12, page: 1 }
      commenParams.accessId = app.store.state.accessId
      commenParams.accessKey = app.store.state.accessKey
      const accountLog = await getAccountLogById(app.$axios, params)
      // if (accountLog.code === 100000) {
      //   app.store.commit('myCenter/setMoneyRecordNull')
      //   app.store.commit('myCenter/setMoneyRecord', accountLog.content.dataRows)
      // } else {
      //   store.commit('setToken', { isLogin: false })
      // }
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
      content: [],
      item: 12,
      pageNum: 1,
      bscroll: true
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.returnLogin()
    } else {
      let index = 0
      setInterval(() => {
        index++
        this._draw(index)
      }, 20)
    }
  },
  methods: {
    _draw(i) {
      // console.log(i)
      const bubble = this.$refs.bubble
      let ctx = bubble.getContext('2d')
      this.index = i
      ctx.clearRect(0, 0, bubble.width, bubble.height)
      ctx.beginPath()
      ctx.arc(11, 11, 15, (Math.PI / 180) * 270, (Math.PI / 180) * (i + 270))
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 1
      ctx.stroke()
    },
    onPullingDown() {
      setTimeout(async () => {
        this.pageNum = 1
        const params = { item: this.item, page: 1 }
        const accountLog = await getAccountLogById(this.$axios, params)
        if (accountLog.code === 100000) {
          this.$store.commit('myCenter/setMoneyRecordNull')
          this.$store.commit(
            'myCenter/setMoneyRecord',
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
          const accountLog = await getAccountLogById(this.$axios, params)
          if (accountLog.code === 100000) {
            this.$store.commit(
              'myCenter/setMoneyRecord',
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
    padding: 0 30px 
    line-height: 88px
    background-color: $color-white
    font-size: $fontsize-large-x
    color: $color-gray2
    display: flex
    justify-content: space-between
  ul
    margin-top: 20px
    padding: 0 30px
    background-color: $color-white
    li
      border-bottom:1px solid $color-gray5
      p
        display: flex
        justify-content: space-between
      p:nth-child(1)
        line-height: 40px
        color: $color-gray1
        font-size: $fontsize-medium
        padding-top: 20px
        span:nth-child(2)
          color: $color-primary
      p:nth-child(2)
        font-size: $fontsize-small-ss
        line-height: 33px
        color: $color-gray2
        padding: 10px 0 20px
    li:last-child
      border: none
  .loadBox
    width: 50px
    height: 50px
    position: relative
    .loadBg
      position: absolute
      left: 0
      top: 0
      width: 42px
      height: 42px
      background: url(../../../assets/images/common/load.png) no-repeat
      background-size: 100% 100%    
</style>
