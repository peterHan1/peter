<template>
	<div class="sift">
		<div class="sift_top">
			<h3>项目简介</h3>
			<p>精选计划是拓道金服平台推出的优先自动投标工具。经由投资人授权，并由系统为投资人实现分散投标，节省投资时间、提高投资效率的投标产品。</p>
			<p>平台通过多层风控把关，严格的标的筛选的过程，再以分散投标，降低投资人投资风险。</p>
			<p>购买精选计划产品之后，资金无闲置立即开始投标，精选计划到期后，通过债权转让的方式完成本金退出，本金收益一并返还到投资人账户余额中。</p>
		</div>
		<div class="sift_bot">
			<h3>计划详情</h3>
			<ul>
				<li>
					<span>预计项目总额</span>
					<p>100万元</p>
				</li>
				<li>
					<span>起投金额</span>
					<p>500元（剩余可投小于起投金额时除外）</p>
				</li>
				<li>
					<span>单笔限额</span>
					<p>500,000元</p>
				</li>
				<li>
					<span>到账时间</span>
					<p>系统通过债权转让方式完成到期退出；用户持有的债权完成转让后应得本息即可到账</p>
				</li>
				<li>
					<span>退出方式</span>
					<p>系统通过债权转让方式完成到期退出</p>
				</li>
				<li>
					<span>计息方式</span>
					<p>满标复审后计息</p>
				</li>
				<li>
					<span>还款方式</span>
					<p>月付息到期还本，每期还款时间根据所匹配债权进行</p>
				</li>
				<li>
					<span>提前退出</span>
					<p>该项目不支持提前退出</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.sift
		h3
			font-size:0.28rem
			color:#212a36
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4	
			margin-bottom:0.3rem
		.sift_top
			padding:0 0.3rem
			background-color:$color-background-f
			p
				font-size:0.24rem
				color:#7e7e7e
				line-height:0.4rem
		.sift_bot
			padding:0 0.3rem 0.4rem
			background-color:$color-background-f
			margin-top:0.2rem
			h3
				margin-bottom:0
			li
				overflow:hidden
				padding-top:0.3rem
			span
				display:inline-block
				width:27%
				line-height:0.4rem
				font-size:0.24rem
				color:#b6b5b6
				float:left
			p
				width:73%
				display:inline-block
				line-height:0.4rem
				font-size:0.24rem
				color:#7e7e7e
				float:left
		
</style>