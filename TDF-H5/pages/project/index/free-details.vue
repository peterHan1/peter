<template>
  <div class="detail">
    <div class="sift-center">
      <td-header
        :title="projectInfo.title"
        :returnUrl="false"
        url="/project"
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
          @click="toLogin">请先登录</div>
        <div
          v-else-if="userInfo.isOpen!=1"
          @click="toCg">
          激活银行存管即可加入
        </div>
        <div
          v-else-if="userInfo.authStatus!=1"
          @click="toAccredit">
          请重新进行业务授权
        </div>
        <div
          v-else-if="userInfo.isShowTime">
          {{ str }}
        </div>
        <div
          v-else
          @click="toJoin">立即加入</div>
      </footer>
    </div>
    <Layer
      v-show="showDialog"
      close="取消"
      submit="立即评测"
      @on-close="onClose"
      @on-sub="onSub">
      <div class="out_txt">{{ showInfo }}</div>
    </Layer>
  </div>
</template>
<script>
import Sift from '~/components/business/project-detail/siftDetails/sift-details'
import Sifts from '~/components/business/project-detail/siftDetails/sift-details-next'
import { freeBorrowDetail } from '~/api/project.js'
export default {
  // name: 'keep',
  async fetch({ app, params, store }) {
    const desId = encodeURIComponent(params.id)
    const { content } = await freeBorrowDetail(app.$axios, desId)
    store.commit('project/freeDetailData', content)
  },
  data() {
    return {
      transitionName: '',
      conTxt: 'Sift',
      heights: {
        headerH: 0,
        footerH: 0
      },
      showDialog: false,
      showInfo: '',
      str: '',
      timer: ''
    }
  },
  computed: {
    projectInfo() {
      return {
        title: this.$store.state.project.freeDetail.name,
        rate: this.$store.state.project.freeDetail.rate,
        desId: this.$store.state.project.freeDetail.desId,
        isApp: this.$store.state.project.freeDetail.enjoyType,
        dateTimes: this.$store.state.project.freeDetail.publishTime || ''
      }
    },
    userInfo() {
      const end = this.projectInfo.dateTimes
      const now = Date.parse(new Date()) / 1000
      const msec = end - now
      return {
        isLogin: this.$store.state.isLogin,
        accessId: this.$store.state.accessId,
        accessKey: this.$store.state.accessKey,
        isOpen: this.$store.state.openDepository,
        authStatus: this.$store.state.authStatus,
        evaluationStatus: this.$store.state.evaluationStatus,
        isShowTime: msec <= 0 ? false : true
      }
    }
  },
  created() {
    this.timer = setInterval(this.countdown, 1000)
  },
  methods: {
    countdown() {
      const end = this.projectInfo.dateTimes // 秒
      const now = Date.parse(new Date()) / 1000
      const msec = end - now
      if (msec < 0) {
        this.str = 0
        this.userInfo.isShowTime = false
      } else {
        let day = parseInt(msec / 60 / 60 / 24)
        let hr = parseInt((msec / 60 / 60) % 24)
        let min = parseInt((msec / 60) % 60)
        let sec = parseInt(msec % 60)
        // day = day
        hr = hr > 9 ? hr : '0' + hr
        min = min > 9 ? min : '0' + min
        sec = sec > 9 ? sec : '0' + sec
        this.str = `${hr}:${min}:${sec}后开抢`
      }
      // this = setInterval(this.countdown, 1000)
      if (msec < 0) {
        clearInterval(this.timer)
      }
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
    toAccredit() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({ path: '/myCenter/set/xwAccredit' })
    },
    toCp() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({ path: '/appraisal/indexs' })
    },
    toJoin() {
      if (this.userInfo.evaluationStatus != 1) {
        this.showDialog = true
        this.showInfo = '为了保障您的切身利益，请在出借前进行“风险承受能力测评”'
        if (this.userInfo.evaluationStatus == 0)
          this.showInfo = '您的“风险承受能力测评”结果已过期，请在出借前重新测评'
      } else if (this.projectInfo.isApp == 1) {
        this.$App('<p>该项目属于“APP专享”项目，请在APP端操作出借</p>')
      } else {
        this.$store.commit('project/setTransition', 'turn-on')
        this.$router.push({
          name: 'project-index-invest-free',
          query: { desId: this.projectInfo.desId }
        })
      }
    },
    onSub() {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({ path: '/appraisal/indexs' })
    },
    onClose() {
      this.showDialog = false
    }
  },
  // mounted() {},
  components: {
    Sift,
    Sifts
  },
  destroyed() {
    clearInterval(this.timer)
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
.out_txt
  text-align: center
  font-size: $fontsize-medium
  color: $color-gray1
  padding: 48px 40px 21px
</style>
