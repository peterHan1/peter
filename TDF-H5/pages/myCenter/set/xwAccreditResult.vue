<template>
  <div class="resultBox">
    <td-header 
      :returnUrl="false" 
      title="业务授权" 
      url="myCenter-set-xwAccredit"/>
    <result 
      v-if="status === 1"
      status="ok" 
      resultTxt="业务授权成功！"/>
    <result 
      v-else-if="status === 2"
      status="no" 
      resultTxt="业务授权失败！"/>
    <result 
      v-else
      status="load" 
      resultTxt="业务授权处理中！"/>
    <div class="btn">
      <div v-if="status === 1">
        <td-button 
          :border="true" 
          value="返回"
          @btnFn="returnAccredit"/>
      </div>
      <div v-else>
        <td-button 
          :border="true" 
          value="确定"
          @btnFn="btnSub"/>
      </div>
    </div>
  </div>
</template>

<script>
import { authStatus } from '~/plugins/api.js'
export default {
  data() {
    return {
      status: ''
    }
  },
  mounted() {
    authStatus(this.$axios).then(res => {
      if (res) {
        this.status = res.data.content.status
      }
    })
  },
  methods: {
    returnAccredit() {
      this.$router.push({
        name: 'myCenter-set-xwAccredit'
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
