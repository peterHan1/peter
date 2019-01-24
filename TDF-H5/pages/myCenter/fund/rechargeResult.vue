<template>
  <div class="resultBox">
    <td-header title="充值结果"/>
    <!-- <result 
      status="ok" 
      resultTxt="充值成功！"/> -->
    <!-- <result 
      status="load" 
      resultTxt="充值处理中！"/> -->
    <result 
      status="no" 
      resultTxt="充值处理中！"
      failureTxt="返回充值失败原因"/>
    <div class="btn">
      <!-- <div>
        <td-button 
          :border="true" 
          value="继续充值"/>
      </div>
      <div>
        <td-button 
          value="查看充值记录"/>
      </div>       -->
      <div>
        <td-button 
          :border="true" 
          value="更换银行卡"/>
      </div>
      <div>
        <td-button 
          value="重试"/>
      </div>      
      <!-- <div>
        <td-button 
          :border="true" 
          value="返回"
          @btnFn="btnSub"/>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    btnSub() {
      console.log('点击了')
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
