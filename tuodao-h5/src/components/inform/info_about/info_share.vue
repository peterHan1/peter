<template>
	<div class="share">
		<div class="share_top">
			<h3>实际控制人与持股5%以上股东（当前） </h3>
			<table cellspacing="0" cellpadding="0">
				<tr>
					<th>实际控制人</th>
					<td>张罗军</td>
				</tr>
				<tr>
					<th>持股5%以上股东</th>
					<td>张罗军 &nbsp;&nbsp;范曦云</td>
				</tr>
			</table>
		</div>
		<div class="share_bot">
			<h3>实际控制人与持股5%以上股东（变更中）</h3>
			<table cellspacing="0" cellpadding="0">
				<tr>
					<th>实际控制人</th>
					<td>张罗军</td>
				</tr>
				<tr>
					<th>持股5%以上股东</th>
					<td>浙江拓道网络技术有限公司</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.share
		max-width: 414px;
		background-color:$color-background-f
		padding: 0 0.3rem 0.5rem
		margin: 0.2rem auto 0
		font-family: 'PingFang-SC-Medium'
		.share_bot
			margin-top: 0.2rem
		h3
			font-size: 0.28rem
			color: #212a36
			height: 0.8rem
			line-height: 0.8rem
			border-bottom: 1px solid #e4e4e4
		table
			width: 100%
			font-size: 0.24rem
			color: #626262
			border-collapse: collapse
			margin: 0.4rem 0
			tr
				line-height:0.9rem
			th
				text-align: left
				padding: 0 0.2rem
				border: 1px solid #e4e4e4
				border-right: none
			td
				padding-right: 0.2rem
				width: 58%
				text-align: right
				border: 1px solid #e4e4e4

		
</style>