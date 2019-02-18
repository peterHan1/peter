<template>
  <div class="resultBox">
    <td-header 
      :returnUrl="false" 
      title="充值结果"
      url="/myCenter/center"/>
    <result 
      v-if="status===2"
      status="ok" 
      resultTxt="充值成功！"/>
    <result 
      v-else-if="status===3"
      status="no" 
      resultTxt="充值失败！"/>
    <result 
      v-else
      status="load" 
      resultTxt="充值处理中！"/>
    <div 
      v-if="status===2" 
      class="btn">
      <div>
        <td-button 
          :border="true" 
          value="继续充值"
          @btnFn="returnRecharge"/>
      </div>
      <div>
        <td-button 
          value="查看充值记录"
          @btnFn="returnList"/>
      </div>
    </div>
    <div 
      v-else-if="status===3"
      class="btn">
      <div>
        <td-button 
          :border="true" 
          value="更换银行卡"
          @btnFn="returnBank"/>
      </div>
      <div>
        <td-button 
          value="重试"
          @btnFn="returnRecharge"/>
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
import { quickPayResult } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      status: ''
    }
  },
  mounted() {
    if (this.$store.state.isLogin) {
      let orderNo = this.$route.query.orderNo
      commenParams.accessId = this.$store.state.accessId
      commenParams.accessKey = this.$store.state.accessKey
      quickPayResult(this.$axios, orderNo).then(res => {
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
    returnRecharge() {
      this.$router.push({
        name: 'myCenter-fund-recharge'
      })
    },
    returnList() {
      this.$router.push({
        name: 'myCenter-fund-rachargeRecord'
      })
    },
    btnSub() {
      this.$router.push({
        name: 'myCenter-center'
      })
    },
    returnBank() {
      this.$App('请在电脑端登录官网或在APP端找更换银行卡')
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
