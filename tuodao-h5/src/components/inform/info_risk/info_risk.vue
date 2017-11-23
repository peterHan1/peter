<template>
	<div class="risk">
		<div class="risk_con">
			<h3>贷前评估</h3>
			<div class="risk_assbg"></div>
		</div>
		<div class="risk_con">
			<h3>贷前审查</h3>
			<div class="risk_combg"></div>
		</div>
		<div class="risk_con">
			<h3>贷中排查和贷后管理</h3>
			<div class="risk_manbg"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.risk
		max-width:414px
		margin:0 auto
		h3
			font-size:0.28rem
			color:#212a36
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4
			margin:0.22rem 0
		.risk_con
			overflow: hidden
			margin-top: 0.2rem
			padding:0 0.3rem
			background-color:$color-background-f
		.risk_assbg
			width: 6.64rem
			height: 3.63rem
			background: url(../../../image/inform/risk_top.png) no-repeat;
			background-size: 100% 100%
			margin: 0.4rem auto
		.risk_combg
			width: 6.89rem
			height: 3.61rem
			background: url(../../../image/inform/risk_combg.png) no-repeat
			background-size: 100% 100%
			margin: 0.4rem auto
		.risk_manbg
			width: 6.92rem
			height: 3.31rem
			background: url(../../../image/inform/risk_botbg.png) no-repeat
			background-size: 100% 100%
			margin: 0.4rem auto
</style>