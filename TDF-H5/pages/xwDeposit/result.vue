<template>
  <div class="resultBox">
    <td-header title="激活存管处理结果"/>
    <result 
      v-if="status === 1"
      status="ok" 
      resultTxt="激活存管成功！"/>
    <result 
      v-else-if="status === 2"
      status="no" 
      resultTxt="激活存管失败！"/>
    <result 
      v-else
      status="load" 
      resultTxt="激活存管处理中！"/>
    <div class="btn">
      <div v-if="status === 1">
        <td-button 
          :border="true" 
          value="完成"
          @btnFn="returnFn"/>
      </div>
      <div v-else-if="status === 2">
        <td-button 
          :border="true" 
          value="请重新激活存管"
          @btnFn="returnDeposit"/>
      </div>
      <div v-else>
        <td-button 
          :border="true" 
          value="返回"
          @btnFn="returnFn"/>
      </div>
    </div>
  </div>
</template>

<script>
import { OpenAccountResult, detailStatus } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      status: 0
    }
  },
  computed: {
    srcPath() {
      return this.$store.state.srcPath || '/myCenter/center'
    }
  },
  async mounted() {
    if (this.$store.state.isLogin) {
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      let deposit = await OpenAccountResult(this.$axios)
      const token = {
        accessId: commenParams.accessId,
        accessKey: commenParams.accessKey
      }
      if (deposit.code === 100000) {
        this.status = deposit.content.code
        const { content } = await detailStatus(this.$axios, commenParams)
        const userInfo = Object.assign({}, token, content, { isLogin: true })
        this.$store.commit('setToken', userInfo)
      }
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    returnFn() {
      this.$router.push(this.srcPath)
    },
    returnDeposit() {
      this.$router.push({
        name: 'xwDeposit-deposit'
      })
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.resultBox
	padding-top: 195px
	position: absolute
	left: 0
	right: 0
	top: 0
	bottom: 0
	background-color: $color-white
	.btn
		margin-top: 60px
		text-align: center
		div
			display: inline-block
		div:nth-last-child(1):first-child
			width: 64%
		div:nth-last-child(2):first-child,
		div:nth-last-child(2):first-child ~ div
			width: 34%
			margin-left: 40px
</style>
