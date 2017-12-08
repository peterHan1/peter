<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :listenScroll="listenScroll">
		<div class="bond">
			<div>
				<p>债权转让，指投资人将在拓道金服平台投资的借款项目转让给其他拓道金服用户，并与授让人签订债权转让协议，收回本金及利息的操作。债权转让能提高投资者资金的流动性，当你需要流动资金时，可以通过出售你名下拥有的符合相应条件的债权给其他投资人，从而完成债权转让，获得流动资金。</p>
				<p>本次债权转让，经拓道审核通过，转让人的奖励会在债权转让完成时对转让人进行扣除，并发放到承接人账户。</p>
			</div>
			<div class="bond_a">查看原始标的</div>
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
	.bond
		div
			padding:0.32rem 0.3rem
			margin-bottom:0.2rem
			background-color:$color-background-f
			p
				font-size:0.24rem
				color:#7e7e7e
				line-height:0.4rem
		.bond_a
			padding:0
			line-height:0.9rem
			font-size:0.28rem
			color:$color-font-orange
			text-align:center
</style>