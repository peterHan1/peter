<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :listenScroll="listenScroll">
		<div class="issue">
				<div>
					<h3>精选计划安全吗？ </h3>
					<p>精选计划匹配的资产均经拓道金服多层风控把关、严格筛选，并且确保资金与债权一一匹配。</p>
				</div>
				<div>
					<h3>精选计划什么时候开始计息？</h3>
					<p>精选计划满标复审后计息。</p>
				</div>
				<div>
					<h3>精选计划正常退出需要多久时间到账？</h3>
					<p>精选计划到期后，如持有债权已到期，本金和收益将会回到账户余额。如持有债权未到期，将默认授权平台进行债权转让，转让成功后持有人的本金和利息即可回款到账户余额；转让退出时间预计1到3天内完成。</p>
				</div>
				<div>
					<h3>精选计划支持提前退出吗？</h3>
					<p>精选计划目前主要为1月期和3月期产品，不支持提前退出。</p>
				</div>
				<div>
					<h3>精选计划的还款方式如何？</h3>
					<p>精选计划的还款方式以所匹配的债权为准，计划期间债权所得收益（除管理费外）回到投资人余额，本金继续复投。</p>
				</div>
				<div>
					<h3>精选计划是否可以使用优惠券？</h3>
					<p>可以使用，举例：500000金额加入3个月期限的精选计划，若使用3%加息券，则预计所得 到期收益 = 500000 *（11%+3%）/ 12 * 3 = 17500 元。</p>
				</div>
				<div>
					<h3>精选计划中是否可以及时看到所投资的标的？</h3>
					<p>加入精选计划后，资金匹配的每笔债权，都可以在相应计划的投资详情页查看其具体金额、起止时间以及相关协议。</p>
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
	.issue
		padding:0 0.3rem
		background-color:$color-background-f
		margin-bottom:0.2rem
		div
			padding:0.32rem 0
			border-bottom:1px solid #e4e4e4
			h3
				font-size:0.28rem
				color:#212a36
				line-height:0.4rem
				margin-bottom:0.16rem
			p
				font-size:0.24rem
				color:#7e7e7e
				line-height:0.4rem
		
</style>