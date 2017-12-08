<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :listenScroll="listenScroll">
		<div class="safe">
			<div>
				<h3>借款安全</h3>
				<p><b></b>借款人按比例缴纳保证金。</p>
				<p><b></b>车辆完成合法抵押手续。</p>
				<p class="dot"><b></b>车辆在车管所进行登记并安装GPS追踪器，由风控部门进行全程 监控。</p>
				<p><b></b>专业车辆评估机构评估，保证评估价格合理。</p>
				<p><b></b>电话核实商业保单正常。</p>
			</div>
			<div>
				<h3>资金安全</h3>
				<p>拓道金服的北京银行资金存管系统已上线，借款人、投资人和平台通过在北京银行资金存管系统开设存管账户，来实现交易和资金的结算。用户在平台上的交易资金交由银行进行管理，平台无法接触交易资金，完全分离平台与资金的接触。</p>
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
			padding:0 0.3rem 0.32rem
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
			padding-left:0.2rem
			position:relative
			b
				position:absolute
				left:0
				top:28%
				display:inline-block
				width:6px			
				height:6px
				border-radius:50%
				margin-right:0.1rem
				background-color:#cacaca
		.dot
			b
				top:18%
</style>