<template>
<div class="terraces">
	<div class="terrace_top">
		<h3>基本信息</h3>
		<div>
			<p>拓道金服（杭州拓道互联网金融服务有限公司）是中国领先的汽车金融服务平台，成立于2013年11月，注册/实缴资本5000万元。公司拥有员工132人，在全国拥有80多处的合作机构。</p>
			<p>2017年，平台完成了8000万A轮融资（由杭州市财政、西湖房产集团、济民资本参股的知名机构帮实资本、虫二文化产业基金领投，蓝山资本、宏桥资本、透视资本等跟投）。在近四年的合规发展道路上，拓道金服获得了社会各界和资本市场的认可，相继被评为“中国汽车金融十强企业”、“互联网金融百强企业”。并于同年3月成功接入北京银行资金存管。</p>
		</div>
	</div>
	<div class="terrace_bot">
		<h3>企业相关信息</h3>
		<div class="bot_icon">
			<div class='icon_top flex'>
				<router-link tag="div" class="tab-item flex-1" to="/info_terrace">
					<i class="iconfont">&#xe69f;</i>
					<p>从业机构 </p>
					<p>平台信息</p>
				</router-link>
				<router-link tag="div" class="tab-item flex-1" to="/info_bank">
					<i class="iconfont">&#xe6a2;</i>
					<p>资金存管 </p>
					<p>北京银行</p>
				</router-link>
				<router-link tag="div" class="tab-item flex-1" to="/info_board">
					<i class="iconfont">&#xe6a0;</i>
					<p>董事、监事</p>
					<p>高级管理人员</p>
				</router-link>
			</div>
			<div class='icon_bot flex'>
				<router-link tag="div" class="tab-item flex-1" to="/info_share">
					<i class="iconfont">&#xe69e;</i>
					<p>实际控制人与</p>
					<p>持股5%以上股东</p>
				</router-link>
				<router-link tag="div" class="tab-item flex-1" to="/info_great">
					<i class="iconfont">&#xe6a1;</i>
					<p>从业机构</p>
					<p>重大事项信息</p>
				</router-link>
			</div>
		</div>
	</div>
</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.terraces
		margin-top:0.2rem
		i
			font-style: normal
		h3
			font-size: 0.28rem
			color: #212a36
			height: 0.8rem
			line-height: 0.8rem
			border-bottom: 1px solid #e4e4e4
		.terrace_top
			background-color: $color-background-f
			padding: 0 0.3rem
			div
				overflow: hidden
				padding-bottom: 0.32rem
				p
					font-size: 0.24rem
					color: #626262
					line-height: 0.4rem
					margin-top: 0.14rem
		.terrace_bot
			margin-top: 0.2rem
			background-color: $color-background-f
			padding: 0 0.3rem
			.bot_icon
				overflow:hidden
				.flex
					display:flex
					.flex-1
						flex: 1
				.icon_top
					margin-top: 0.2rem
				.icon_bot
					margin: 0.3rem 0 0.8rem 0
				.tab-item
					text-align: center
				.iconfont
					color: #FF7400
					font-size: 0.6rem
				p
					font-size: 0.24rem
					color: #626262
					margin:0.2rem 0
</style>