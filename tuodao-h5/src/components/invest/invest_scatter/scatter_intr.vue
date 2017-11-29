<template>
	<div class="sift">
		<div class="intro">
			<h3>项目简介</h3>
			<p><b></b>借款人基本情况: 借款人戴**，性别：男，现年：46岁，已婚，主要从事个体行业。借款人借款期间无重大支出，信誉状况良好，无不良记录。</p>
			<p><b></b>借款人生产经营情况：借款人从事个体行业，现业务运转正常。</p>
			<p><b></b>借款用途及还款来源：借款人因经营需要，申请借款2000000元，用于经营流动。还款来源为经营收入。</p>
			<p><b></b>项目评级：A</p>
		</div>
		<div>
			<h3>计划详情</h3>
			<p><span>姓名</span> 张*</p>
			<p><span>职业</span> 个体</span></p>
			<p><span>性别</span> 男</span></p>
			<p><span>学历</span> 大专</span></p>
			<p><span>籍贯</span> 河南</p>
		</div>
		<div class="car">
			<h3>车辆信息</h3>
			<p><span>车辆品牌</span> 马自达</p>
			<p><span>车辆估价</span> 47000元</p>
			<p><span>购买价格</span> 270000元</p>
			<p><span>购买时间</span> 2009-01-05</p>
		</div>
		<div>
			<h3>审核资料</h3>
			<ul>
				<li>
					<img src="../../../image/invest/td_loading.png">
				</li>
				<li>
					<img src="../../../image/invest/td_loading.png">
				</li>
				<li>
					<img src="../../../image/invest/td_loading.png">
				</li>
				<li>
					<img src="../../../image/invest/td_loading.png">
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
		div
			padding:0 0.3rem 0.2rem
			background-color:$color-font-f
			overflow:hidden
			margin-bottom:0.2rem
		h3
			font-size:0.28rem
			color:#212a36
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4	
			margin-bottom:0.3rem
		p
			font-size:0.24rem
			color:#7e7e7e
			line-height:0.4rem
			margin-bottom:0.22rem
			span
				color:#b6b5b6
				display:inline-block
				width:0.9rem
		.car
			p
				span
					width:1.4rem
		.intro
			p
				padding-left:0.3rem
				position:relative
				b
					position:absolute
					left:0
					top:16%
					display:inline-block
					width:6px			
					height:6px
					border-radius:50%
					background-color:#cacaca
			p:nth-child(2)
				b	
					top:10%
			p:last-child
				b	
					top:30%
		ul
			width:200%
			overflow-y:scroll
		li
			float:left
			margin-right:0.2rem
		img
			width:2.1rem
			height:1.4rem
			
</style>