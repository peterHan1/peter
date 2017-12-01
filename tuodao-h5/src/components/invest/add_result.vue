<template>
	<div class="result">
		<div class="result_top">
			<i class="iconfont">&#xe69c;</i>
			<p>加入成功！</p>
			<!-- <p>投资成功</p> -->
		</div>
		<div class="result_com">
			<ul>
				<li>
					<span>项目名称</span>
					<p>精选计划20170707</p>
				</li>
				<li>
					<!-- <span>投资金额</span> -->
					<span>加入金额</span>
					<p>4000.00元</p>
				</li>
				<li>
					<span>到期收益</span>
					<p>45.56元</p>
				</li>
				<li>
					<span>已用优惠券</span>
					<p>加息券 1%</p>
				</li>
			</ul>
		</div>
		<div class="result_bot">
			<span class="invest_list">继续加入</span><span class="add_list">查看投资记录</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.result
		font-family: 'PingFang-SC-Medium'
		.result_top
			width:100%
			height:2.5rem
			text-align:center
			background-color:$color-background-orange
			overflow:hidden
			i
				font-size:0.8rem
				color:$color-font-f
				font-style:normal
				display:block
				margin-top:0.5rem
			p
				font-size:0.32rem
				color:$color-font-f
				margin-top:0.26rem
		.result_com
			padding:0 0.3rem
			li
				border-bottom:1px solid #e4e4e4
				overflow:hidden
				line-height:0.8rem
				span
					font-size:0.24rem
					color:#b6b5b6
					float:left
				p
					font-size:0.24rem
					color:$color-font-title
					float:right
		.result_bot
			padding:0 0.3rem
			overflow:hidden
			margin-top:0.6rem
			span
				display:inline-block
				font-size:0.3rem
				width:46%
				height:0.8rem
				line-height:0.8rem
				text-align:center
				border-radius:4px
				box-sizing: border-box
			.invest_list
				color:$color-font-f
				background-color:$color-background-orange
				float:left
			.add_list
				color:$color-font-main
				background-color:$color-background
				border:1px solid #b6b5b6
				float:right
				
</style>