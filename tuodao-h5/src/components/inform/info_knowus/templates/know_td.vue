<template>
	<div>
		<div class="knowu_td">
			<div class="td">
				<div class="td_logo"></div>
				<h2>公司简介</h2>
				<p>拓道金服是中国领先的汽车金融服务平台，自2013年成立以来，始终秉承着 "安全、专业、共赢" 的宗旨，致力于互联网科技创新，积极发展普惠金融。公司在全国多个省份建有近100家资产端实体门店，员工2500多人。</p>
				<p>目前，拓道金服以汽车抵押借贷为核心业务，凭借丰富的资产管理经验及严谨的风险控制体系，为贷款用户与投资用户搭建起一个互联网金融信息服务平台。通过强大的平台基础设施，优质借款人可以获得来自全国百万投资人的资金支持；通过大数据、云计算等坚实的技术优势，投资人可以享有更便捷、更安全的理财产品。</p>
				<p>2017年，平台完成了8000万A轮融资，并成功接入北京银行资金存管系统。在近四年的合规发展道路上，拓道金服获得了社会各界和资本市场的认可，相继被评为"中国汽车金融十强企业"、"互联网金融百强企业"。</p>
			</div>
			<div class="incident">
				<div class="incident_title" v-on:click="clickFn">
					<h2>企业大事记</h2>
					<span class="iconfont" v-if="isShows === false">&#xe6a3;</span>
					<span class="iconfont" v-else>&#xe6a6;</span>
				</div>
				<div class="incident_list" v-show="isShows"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				isShows: false
			}
		},
		methods: {
			clickFn: function () {
				if (this.isShows === true) {
					this.isShows = false
				} else {
					this.isShows = true
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.knowu_td
		.td
			padding:0 0.3rem 0.4rem
			background-color:$color-background-f
			overflow:hidden
			.td_logo
				width:100%
				height:2.2rem
				background:url(../../../../image/inform/td_logo.png) no-repeat
				background-size:100% 100%
				margin:0.3rem 0
			h2
				font-size:0.28rem
				color:#212a36
				margin:0.3rem 0 0.2rem
			p
				font-size:0.22rem
				color:#828282
				line-height:0.4rem
				margin-top:0.1rem
		.incident
			margin-top:0.2rem
			padding:0 0.3rem
			background-color:$color-background-f
			overflow:hidden
			.incident_title
				overflow:hidden
				line-height:0.8rem
				color:#212a36
				h2
					display:inline-block
					float:left
					font-size:0.28rem
				span
					float:right
					font-size:0.32rem
			.incident_list
				width:100%
				height:13.1rem
				background:url(../../../../image/inform/incident_bg.png) no-repeat
				background-size:100% 100%
				margin:0.1rem auto 0.4rem
		
</style>