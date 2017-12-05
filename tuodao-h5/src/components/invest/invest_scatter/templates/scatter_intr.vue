<template>
	<v-scroll :on-refresh="onRefresh">
		<div class="sift">
			<div class="intro">
				<h3>项目简介</h3>
				<p><b></b>借款人基本情况: 借款人: <i v-if="items != null">{{items.name}}</i>，性别：<i v-if="items != null">{{items.sex}}</i>，现年：<i v-if="items != null">{{items.age}}</i>岁，<i v-if="items != null">{{items.marriage}}</i>，主要从事个体行业。借款人借款期间无重大支出，信誉状况良好，无不良记录。</p>
				<p><b></b>借款人生产经营情况：<i v-if="items != null">{{items.condition}}</i></p>
				<p><b></b>借款用途及还款来源：借款人因经营需要，申请借款<i v-if="items != null">{{items.money}}</i>元，用于经营流动。还款来源为经营收入。</p>
				<p><b></b>项目评级：<i v-if="items != null">{{items.rate}}</i></p>
			</div>
			<div>
				<h3>计划详情</h3>
				<p><span>姓名</span> <i v-if="items != null">{{items.name}}</i></p>
				<p><span>职业</span> <i v-if="items != null">{{items.job}}</i></span></p>
				<p><span>性别</span> <i v-if="items != null">{{items.sex}}</i></span></p>
				<p><span>学历</span> <i v-if="items != null">{{items.education}}</i></span></p>
				<p><span>籍贯</span> <i v-if="items != null">{{items.native}}</i></p>
			</div>
			<div class="car">
				<h3>车辆信息</h3>
				<p><span>车辆品牌</span> <i v-if="items != null">{{items.carModel}}</i></p>
				<p><span>车辆估价</span> <i v-if="items != null">{{items.evaluate}}元</i></p>
				<p><span>购买价格</span> <i v-if="items != null">{{items.buyPrice}}</i></p>
				<p><span>购买时间</span> <i v-if="items != null">{{items.buyTime}}</i></p>
			</div>
			<div class="listimg">
				<h3>审核资料</h3>
				<div class="imglist">
					<ul>
						<li v-for="item in imgList">
							<img :src=item.src>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</v-scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from './../../scroll'
	export default {
		data () {
			return {
				apiUrl: 'api/router/getFrontBorrowExpand',
				imgUrl: 'api/router/getPicListByPcode',
				items: [],
				imgList: []
			}
		},
		mounted() {
			this.addHtml()
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'PC'
			}
		},
		methods: {
			addHtml() {
				let vm = this
				vm.$http.post(vm.apiUrl, {productCode: '1'}).then((response) => {
					vm.items = response.body.content
				})
				vm.$http.post(vm.imgUrl, {productCode: '1'}).then((response) => {
					vm.imgList = response.body.content
				})
			},
			onRefresh(done) {
				done()
				// 松开回到app界面
				this.getInvestList()
			},
			getInvestList() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_PullDetailNib', {}, function (response) {
						})
					})
				}
			},
			setupWebViewJavascriptBridge(callback) {
				if (window.WebViewJavascriptBridge) {
					return callback(window.WebViewJavascriptBridge)
				}
				if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback)
				}
				window.WVJBCallbacks = [callback]
				let WVJBIframe = document.createElement('iframe')
				WVJBIframe.style.display = 'none'
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
				document.documentElement.appendChild(WVJBIframe)
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			}
		},
		components: {
			'v-scroll': Scroll
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