<template>
  <div class="detail">
    <div class="sift-center">
      <td-header
        :title="projectInfo.title"
        class="header"/>
      <transition :name="transitionName">
        <div
          :is="conTxt"
          @pullFn="cutFn"/>
      </transition>
      <footer :class="{over:projectInfo.rate==100}">
        <!-- {{ isShowTime }} -->
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
          v-else-if="userInfo.evaluationStatus != 1"
          @click="toCp">
          风险评测
        </div>
        <div
          v-else
          @click="toJoin">立即加入</div>
      </footer>
    </div>
  </div>
</template>
<script>
import Sift from '~/components/business/project-detail/siftDetails/sift-details'
import Sifts from '~/components/business/project-detail/siftDetails/sift-details-next'
import { freeBorrowDetail } from '~/api/project.js'
import CountDown from '~/components/business/count-down/count-down'
export default {
  // name: 'keep',
  async fetch({ app, params, store }) {
    const desId = encodeURIComponent(params.id)
    // console.log(commenParams.accessKey)
    const { content } = await freeBorrowDetail(app.$axios, desId)
    store.commit('project/freeDetailData', content)
    // console.log(this.$refs.countDown.str)
  },
  data() {
    return {
      transitionName: '',
      conTxt: 'Sift',
      heights: {
        headerH: 0,
        footerH: 0
      },
      btnName: '立即加入',
      isShowTime: true
    }
  },
  computed: {
    projectInfo() {
      return {
        title: this.$store.state.project.freeDetail.name,
        rate: this.$store.state.project.freeDetail.rate,
        desId: this.$store.state.project.freeDetail.desId,
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
  created() {
    // this.isSS()
    // console.log(this.userInfo.CisShowTime)
    // console.log(this.isShowTime)
  },
  // mounted() {
  //   this.isSS()
  // },
  // created() {},
  methods: {
    isSS() {
      const end = Date.parse(new Date(this.userInfo.dateTimes))
      const now = Date.parse(new Date())
      const msec = end - now
      this.userInfo.CisShowTime = msec <= 0 ? false : true
      // if (msec <= 0) {
      //   this.userInfo.CisShowTime = false
      // }
    },
    cutFn() {
      if (
        this.transitionName === '' ||
        this.transitionName === 'slide-bottom'
      ) {
        this.transitionName = 'slide-top'
        this.conTxt = 'Sifts'
      } else {
        this.transitionName = 'slide-bottom'
        this.conTxt = 'Sift'
      }
    },
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
    toCp() {
      this.$router.push({ path: '/appraisal/indexs' })
    },
    toJoin() {
      this.$store.commit('project/setTransition', 'turn-on')
      this.$router.push({
        name: 'project-index-investAdd',
        query: { desId: this.projectInfo.desId }
      })
    }
  },
  // mounted() {},
  components: {
    Sift,
    Sifts,
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
.sift-center
  position: absolute
  left: 0
  top: 0
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
