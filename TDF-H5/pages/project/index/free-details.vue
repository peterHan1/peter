<template>
  <div class="detail">
    <div class="sift-center">
      <td-header
        :title="title"
        class="header"/>
      <transition :name="transitionName">
        <div
          :is="conTxt"
          @pullFn="cutFn"/>
      </transition>
      <footer>
        <!-- <div>{{ isLogin }}</div> -->
        <div
          v-if="!isLogin"
          @click="toLogin">请登录</div>
        <div
          v-else
          @click="toJoin">立即加入</div>
      </footer>
    </div>
  </div>
</template>
<script>
// import Cookie from 'js-cookie'
import Sift from '~/components/business/project-detail/siftDetails/sift-details'
import Sifts from '~/components/business/project-detail/siftDetails/sift-details-next'
import { commenParams } from '~/api/config.js'
import { freeBorrowDetail } from '~/api/project.js'
console.log('fdfsafsa')
export default {
  // name: 'keep',
  async fetch({ app, params, store }) {
    const desId = encodeURIComponent(params.id)
    // console.log(commenParams.accessKey)
    const { content } = await freeBorrowDetail(app.$axios, desId, commenParams)
    store.commit('project/freeDetailData', content)
  },
  data() {
    return {
      transitionName: '',
      conTxt: 'Sift'
    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to.meta.index)
  //     // if (to.meta.index > from.meta.index) {
  //     //   // console.log(to.meta.index)
  //     //   this.$store.commit('project/setTransition', 'slide-right')
  //     // } else {
  //     //   this.$store.commit('project/setTransition', 'slide-left')
  //     // }
  //   }
  // },
  computed: {
    title() {
      return this.$store.state.project.freeDetail.name
    },
    isLogin() {
      if (this.$store.state.accessId && this.$store.state.accessKey) {
        return true
      } else {
        return false
      }
    }
  },
  // created() {},
  methods: {
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
    toJoin() {
      this.$store.commit('project/setTransition', 'turn-on')
      this.$router.push('/project/investAdd')
    }
  },
  // mounted() {},
  components: {
    Sift,
    Sifts
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
