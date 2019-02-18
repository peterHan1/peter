<template>
  <div class="resultBox">
    <td-header 
      :returnUrl="false" 
      title="提现结果" 
      url="/myCenter/center"/>
    <result 
      v-if="status===0"
      status="ok" 
      resultTxt="提现成功！"/>
    <result 
      v-else-if="status===2"
      status="no" 
      resultTxt="提现失败！"
      failureTxt="返回提现失败原因"/>
    <result 
      v-else
      status="load" 
      resultTxt="提现处理中！"/>
    <div 
      v-if="status===0" 
      class="btn">
      <div>
        <td-button 
          :border="true" 
          value="继续提现"
          @btnFn="returnCah"/>
      </div>
      <div>
        <td-button 
          value="查看提现记录"
          @btnFn="returnList"/>
      </div>      
    </div>
    <div 
      v-else 
      class="btn">
      <div>
        <td-button 
          :border="true" 
          value="返回"
          @btnFn="btnSub"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getCashResult } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      status: ''
    }
  },
  mounted() {
    if (this.$store.state.isLogin) {
      let orderId = this.$route.query.orderId
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      getCashResult(this.$axios, orderId).then(res => {
        if (res) {
          this.status = res.content.status
        }
      })
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  methods: {
    returnCah() {
      this.$router.push({
        name: 'myCenter-fund-cash'
      })
    },
    returnList() {
      this.$router.push({
        name: 'myCenter-fund-cashRecord'
      })
    },
    btnSub() {
      this.$router.push({
        name: 'myCenter-center'
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
