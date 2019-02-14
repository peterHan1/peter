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
import { OpenAccountResult } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  data() {
    return {
      status: ''
    }
  },
  mounted() {
    commenParams.accessId = this.$store.state.accessId
    commenParams.accessKey = this.$store.state.accessKey
    OpenAccountResult(this.$axios, commenParams).then(res => {
      if (res) {
        this.status = res.content.code
        console.log(res)
      }
    })
  },
  methods: {
    returnFn() {
      this.$router.push({
        name: 'myCenter-center'
      })
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
