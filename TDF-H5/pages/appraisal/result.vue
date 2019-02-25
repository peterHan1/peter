<template>
  <div class="resule">
    <header class="outHeader">
      <div 
        v-if="evaluationStatus != 1" 
        @click="outAppraisal">
        <span class="iconfont">&#xe6fe;</span>
        <b>退出</b>
      </div>
      <div 
        v-else 
        @click="returnUrl">
        <span class="iconfont">&#xe6fe;</span>
      </div>
      <span>风险测评</span>
    </header>
    <p class="resule_txt">您的评估结果为</p>
    <div class="resule_com">
      <p>{{ txt }}</p>
    </div>
    <p class="resule_time">测评结果有效期截止至{{ time }}</p>
    <div class="resule_accom">
      <div 
        class="resule_btn" 
        @click="returnUrl">完成</div>
    </div>
    <router-link 
      to="/appraisal/list" 
      class="resule_rest">重新测评</router-link>
    <router-link 
      to="/appraisal/explain" 
      class="resule_rest">测评说明</router-link>
    <Layer 
      v-show="layerShow" 
      close="确定" 
      submit="继续评测" 
      @on-close="codeClose()" 
      @on-sub="codeSub()" >
      <span class="quitHint">本次风险测评还未完成，退出后将不保存当前进度，确定退出吗？</span>
    </Layer>
  </div>
</template>

<script>
import { getEvaluationInfo, detailStatus } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      txt: '',
      time: '',
      layerShow: false,
      evaluationStatus: this.$store.state.evaluationStatus
    }
  },
  computed: {
    srcPath() {
      return this.$store.state.srcPath || '/myCenter/center'
    }
  },
  async mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    } else {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      let res = await getEvaluationInfo(this.$axios)
      if (res.code === 100000) {
        this.txt = res.content.evaluationScoreMsg
        this.time = res.content.evaluationTime
        const token = {
          accessId: commenParams.accessId,
          accessKey: commenParams.accessKey
        }
        const details = await detailStatus(this.$axios, commenParams)
        if (details.code === 100000) {
          const userInfo = Object.assign({}, token, details.content, {
            isLogin: true
          })
          this.$store.commit('setToken', userInfo)
        } else {
          this.$store.commit('srcPath', '/myCenter/center')
          this.$router.push({
            name: 'user-login'
          })
        }
      } else {
        this.$store.commit('srcPath', '/myCenter/center')
        this.$router.push({
          name: 'user-login'
        })
      }
    }
  },
  methods: {
    outAppraisal() {
      this.layerShow = true
    },
    codeClose() {
      this.$router.push({
        name: 'myCenter-set-ucSet'
      })
    },
    codeSub() {
      this.layerShow = false
    },
    navLeftFn() {
      this.$router.push({
        name: 'myCenter-set-ucSet'
      })
    },
    navRightFn() {
      this.$router.push({
        name: 'appraisal-explain'
      })
    },
    returnUrl() {
      this.$router.push(this.srcPath)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .resule
    text-align: center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: $color-white
    .outHeader
      height: 0.88rem
      line-height: 0.88rem
      width: 100%
      background: $color-white
      position: fixed
      left: 0
      top: 0
      right: 0
      text-align: center
      font-size: $fontsize-large-xxx
      color: $color-gray1
      border-bottom: 0.01rem solid $color-gray5
      .iconfont
        font-size: 64px
        position: absolute
        left: 15px
      b
        font-size: $fontsize-large-x 
        color: $color-gray2
        position: absolute
        left: 65px
    .resule_txt
      color: $color-gray3
      font-size: $fontsize-large-x
      margin-top: 140px
    .resule_time
      color: $color-gray3
      font-size: $fontsize-large-x
      margin-top: 50px
    .resule_btn
      display: block
      width: 58%
      background-color: $color-primary
      color: $color-white 
      font-size: $fontsize-large-x
      line-height: 74px
      text-align: center
      border-radius: 35px
      margin: 108px auto 0
    .resule_rest
      display: block
      font-size: $fontsize-small-s
      color: $color-primary
      margin-top: 50px
    .resule_com
      height: 378px
      line-height: 378px
      width: 415px
      margin: 50px auto 0
      color: $color-gray1
      font-size: 64px
      text-align: center
      background: url(../../assets/images/my-center/result_com.png) no-repeat
      background-size: 100% 100%
      p
        font-weight: bold
    .quitHint
      display: block
      font-size: $fontsize-small-s
      color: $color-gray2 
      padding: 30px 30px 10px
      line-height: 40px       
</style>
