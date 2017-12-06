<template>
	 <scroll class="wrapper"
          :pulldown="pulldown"
           @pulldown="loadData"
           :listenScroll="listenScroll">
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
						<p>{{items.borrowAmount}}万元</p>
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
						<p>{{items.refundWay | wayType}}，每期还款时间根据所匹配债权进行</p>
					</li>
					<li>
						<span>提前退出</span>
						<p>该项目不支持提前退出</p>
					</li>
				</ul>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from './../../scroll'
	export default {
		data () {
			return {
				borrowStatus: false,
				apiUrl: 'api/router/getFrontProduct',
				items: [],
				pulldown: true,
				listenScroll: true
			}
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'PC'
			}
		},
		created() {
			// this.loadData()
		},
		methods: {
			init() {
				let vm = this
				vm.$http.post(vm.apiUrl, {id: '1'})
					.then((response) => {
						vm.items = response.body.content
					})
			},
			loadData() {
				console.log('shuaxin')
			},
			hehe() {
				console.log('shabi')
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
			'scroll': Scroll
		},
		filters: {
			wayType(type) {
				switch (type) {
				case 0:
					return '等额本息'
				case 2:
					return '按月付息'
				case 3:
					return '按天付息'
				default: return ''
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.wrapper
		position:absolute
		top:0
		left:0
		bottom:0
		right:0
		overflow:hidden
	.sift
		h3
			font-size:0.28rem
			color:#212a36
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4	
			margin-bottom:0.3rem
		.sift_top
			padding:0 0.3rem 0.3rem
			background-color:$color-background-f
			margin-bottom:0.2rem
			p
				font-size:0.24rem
				color:#7e7e7e
				line-height:0.4rem
		.sift_bot
			padding:0 0.3rem 0.4rem
			background-color:$color-background-f
			margin-bottom:0.2rem
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