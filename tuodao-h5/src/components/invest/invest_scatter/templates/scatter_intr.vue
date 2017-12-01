<template>
	<div class="sift">
		<div class="intro">
			<h3>项目简介</h3>
			<p><b></b>借款人基本情况: 借款人{{scatterDetails.name}}，性别：{{scatterDetails.sex}}，现年：{{scatterDetails.age}}岁，{{scatterDetails.marriage}}，主要从事个体行业。借款人借款期间无重大支出，信誉状况良好，无不良记录。</p>
			<p><b></b>借款人生产经营情况：{{scatterDetails.condition}}</p>
			<p><b></b>借款用途及还款来源：借款人因经营需要，申请借款{{scatterDetails.money}}元，用于经营流动。还款来源为经营收入。</p>
			<p><b></b>项目评级：{{scatterDetails.rate}}</p>
		</div>
		<div>
			<h3>计划详情</h3>
			<p><span>姓名</span> {{scatterDetails.name}}</p>
			<p><span>职业</span> {{scatterDetails.occupation}}</span></p>
			<p><span>性别</span> {{scatterDetails.sex}}</span></p>
			<p><span>学历</span> {{scatterDetails.education}}</span></p>
			<p><span>籍贯</span> {{scatterDetails.native}}</p>
		</div>
		<div class="car">
			<h3>车辆信息</h3>
			<p><span>车辆品牌</span> {{scatterDetails.car}}</p>
			<p><span>车辆估价</span> {{scatterDetails.evaluate}}元</p>
			<p><span>购买价格</span> {{scatterDetails.buymoney}}</p>
			<p><span>购买时间</span> {{scatterDetails.buytime}}</p>
		</div>
		<div class="listimg">
			<h3>审核资料</h3>
			<div class="imglist">
				<ul>
					<li>
						<img src="../../../../image/invest/td_loading.png">
					</li>
					<li>
						<img src="../../../../image/invest/td_loading.png">
					</li>
					<li>
						<img src="../../../../image/invest/td_loading.png">
					</li>
					<li>
						<img src="../../../../image/invest/td_loading.png">
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				scatterDetails: [],
				details: 'static/scatterDetalis.json'
			}
		},
		mounted() {
			this.addHtml()
		},
		methods: {
			addHtml() {
				this.$http.get(this.details).then((res) => {
					this.scatterDetails = res.body.content
					console.log(this.scatterDetails)
				}, (err) => {
					console.log(err)
				})
			}
		}
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
		.listimg
			padding:0 0.3rem
		.imglist
			position:relative
			overflow:auto
			height:1.8rem
			padding:0
			display:block
			white-space:nowrap
			margin:0
		ul
			position:absolute
			left:0
			top:0
		li
			display:inline-block
		img
			width:2.1rem
			height:1.4rem
			
</style>