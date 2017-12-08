<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :listenScroll="listenScroll">
		<div class="safe">
			<div>
				<h3>借款安全</h3>
				<p>汽车抵押借贷具有借款金额少、周期短、实物抵押保障、逾期处理 便捷等显著优势。</p>
			</div>
			<div>
				<h3>风控安全 </h3>
				<p>细化贷前调查、贷中审查、贷后管理、逾期处理等四个风控流程，把风险控制渗入每一个环节中。</p>
				<p>通过详尽的贷前审查、审慎的贷中核查、完善的贷后管理以及妥当的逾期处理，把风险控制在合理的范围内，坚持追求所有标的均真实、有效，可追溯、可审查。</p>
			</div>
			<div>
				<h3>平台安全 </h3>
				<p>卓越的系统架构：可靠、高效、稳定，阿里云服务器，双服务器运 行，每15分钟自动备份保存平台数据。</p>
				<p>安全的管理标准：人员安全，制度安全，系统安全，运营安全。</p>
			</div>
			<div>
				<h3>资金安全</h3>
				<p>拓道金服的北京银行资金存管系统已上线，借款人、投资人和平台均在北京银行资金存管系统开设存管账户。</p>
				<p>借款人通过拓道金服线下门店进行车辆审核后委托拓道金服发布借款信息，平台向借款人和投资人提供信息撮合服务，投资人投标成功后款项进入借款人的存管账户，平台无法接触交易资金，资金流转清晰。</p>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from './../../scroll'
	export default {
		data () {
			return {
				pulldown: true,
				listenScroll: true
			}
		},
		methods: {
			getApp() {
				this.getInvestList()
			},
			getInvestList() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_PullDetailNib', {}, function (response) {
						})
					})
				} else if (/(Android)/i.test(navigator.userAgent)) {
					setTimeout(function() {
						window.TDBridge.h5ToNative_PullDetailNib()
					}, 500)
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
	.safe
		div
			background-color:$color-background-f
			padding:0 0.3rem 0.18rem
			margin-bottom:0.2rem
		h3
			font-size:0.28rem
			color:$color-font-title
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4
			margin-bottom:0.32rem
		p
			font-size:0.24rem
			color:#7e7e7e
			line-height:0.4rem
			margin-bottom:0.22rem
			
</style>