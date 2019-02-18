<template>
  <div class="detail">
    <div class="scatter-enter">
      <td-header
        :title="projectInfo.title"
        class="header"/>
      <transition :name="transitionName">
        <div
          :is="conTxt"
          @pullFn="cutFn"/>
      </transition>
      <footer :class="{over:projectInfo.rate==100}">
        <div v-if="projectInfo.rate==100">
          已抢完
        </div>
        <div
          v-else-if="!userInfo.isLogin"
          @click="toLogin">请登录</div>
        <div
          v-else-if="userInfo.isOpen!=1"
          @click="toCg">
          激活银行存管即可加入
        </div>
        <div v-else-if="userInfo.authStatus!=1">
          请重新进行业务授权
        </div>
        <div
          v-else-if="userInfo.CisShowTime ">
          <count-down :dateTimes="projectInfo.dateTimes"/>
        </div>
        <div
          v-else-if="userInfo.evaluationStatus != 1">
          风险评测
        </div>
        <div
          v-else
          @click="toJoin">立即出借</div>
      </footer>
    </div>
  </div>
</template>
<script>
import Scatter from '~/components/business/project-detail/scatter/details'
import Scatters from '~/components/business/project-detail/scatter/details-next'
import { scatterDetail } from '~/api/project.js'
import CountDown from '~/components/business/count-down/count-down'
export default {
  async fetch({ app, params, store }) {
    const desId = encodeURIComponent(params.id)
    // console.log('//////')
    // console.log(desId)
    const { content } = await scatterDetail(app.$axios, desId)
    // console.log(content)
    store.commit('project/scatterDetailData', content)
  },
  data() {
    return {
      transitionName: '',
      btnName: '立即出借',
      conTxt: 'Scatter',
      dateTimes: '2018-02-15 20:00:00'
    }
  },
  computed: {
    projectInfo() {
      return {
        title: this.$store.state.project.scatterDetail.name,
        rate: this.$store.state.project.scatterDetail.borrowAccountScale,
        desId: this.$store.state.project.scatterDetail.desId,
        dateTimes: '2019/2/15 22:00:00' // 接口缺少字段
      }
    },
    userInfo() {
      const end = Date.parse(new Date(this.projectInfo.dateTimes))
      const now = Date.parse(new Date())
      const msec = end - now
      // let CisShowTimeX = msec <= 0 ? false : true
      return {
        isLogin: this.$store.state.isLogin,
        accessId: this.$store.state.accessId,
        accessKey: this.$store.state.accessKey,
        isOpen: this.$store.state.openDepository,
        authStatus: this.$store.state.authStatus,
        evaluationStatus: this.$store.state.evaluationStatus,
        CisShowTime: msec <= 0 ? false : true
      }
    }
  },
  mounted() {},
  methods: {
    toLogin() {
      // console.log(this.$route)
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    },
    toCg() {
      this.$router.push({ path: '/xwDeposit/deposit' })
    },
    toJoin() {
      this.$store.commit('project/setTransition', 'turn-on')
      this.$router.push({
        name: 'project-index-investAdd.1',
        query: { desId: this.projectInfo.desId }
      })
    },
    cutFn() {
      if (
        this.transitionName === '' ||
        this.transitionName === 'slide-bottom'
      ) {
        this.transitionName = 'slide-top'
        this.conTxt = 'Scatters'
      } else {
        this.transitionName = 'slide-bottom'
        this.conTxt = 'Scatter'
      }
    }
  },
  components: {
    Scatter,
    Scatters,
    CountDown
  }
}
</script>

<style lang="stylus" scoped>
.detail
  position: fixed
  z-index: 100
  width: 100%
  height: 100%
  background: $color-background
  top: 0
  left: 0
  right: 0
  bottom: 0
.scatter-enter
  position: fixed
  left: 0
  top: 0
  background: $color-background
  z-index: 100
  width: 100%
  height: 100%
  .headers
    height 0.88rem
    position: fixed
    left: 0
    top: 0
    right: 0
    z-index 99
  .header
    /deep/ header
      background: linear-gradient(to right, #F66F4A , #FC8D26)
      color: $color-white
      border-bottom: none
      .iconfont
        color: $color-white
  footer
    width: 100%
    height: 100px
    line-height: 100px
    color: $color-white
    background: $color-primary
    text-align: center
    font-size: $fontsize-large-xxx
    position: fixed
    left:0
    bottom: 0
    z-index: 999
    &.over
      background: $color-gray6
.slide-bottom-enter-active,.slide-bottom-leave-active,.slide-top-enter-active,.slide-top-leave-active
  will-change: transform
  transition: all 500ms ease
  position: absolute
  width: 100%
.slide-bottom-enter,.slide-top-leave-active
  transform: translate3d(0, -100%, 0)
.slide-bottom-leave-active,.slide-top-enter
  transform: translate3d(0, 100%, 0)
</style>
