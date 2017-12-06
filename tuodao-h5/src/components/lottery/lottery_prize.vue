<template>
	<div class="prize">
		<table>
			<tr>
				<th>奖品名称</th>
				<th>中奖时间</th>
			</tr>
			<tr v-for="item in items">
				<td>{{item.prizeName}}</td>
				<td>{{item.hanppenTime}}</td>
			</tr>
		</table>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				apiUrl: 'api/router/op/getMyPrizeResult',
				items: [],
				accessId: 'accessId',
				accessKey: 'accessKey'
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let vm = this
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					vm.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GetUserInfo', {}, function (response) {
							vm.accessId = response.accessId
							vm.accessKey = response.accessKey
							vm.$http({url: vm.apiUrl, method: 'post', headers: {accessId: vm.accessId, accessKey: vm.accessKey}})
								.then((response) => {
									vm.items = response.body.content
								})
						})
					})
				} else if (/(Android)/i.test(navigator.userAgent)) {
					setTimeout(function() {
						window.TDBridge.h5ToNative_GetUserInfo(function(data) {
							data = JSON.parse(data)
							vm.accessId = data.accessId
							vm.accessKey = data.accesskey
							vm.$http({url: vm.apiUrl, method: 'post', headers: {accessId: vm.accessId, accessKey: vm.accessKey}})
								.then((response) => {
									vm.items = response.body.content
								})
						})
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
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.prize
		max-width:414px
		margin:0 auto
		overflow:hidden
		table
			width:100%
			tr
				height:.8rem
				border-bottom:1px solid #e4e4e4
				background-color #fff
				line-height:.8rem
				th
					font-size:.28rem
					color:#212a36
				th:first-child
					text-align:left
					padding-left:.31rem
				th:last-child
					text-align:right
					padding-right:.31rem
				td
					font-size:.24rem
					color:#626262
				td:first-child
					text-align:left
					padding-left:.31rem
				td:last-child
					text-align:right
					padding-right:.31rem
			tr:first-child
				border:none
				background-color #f2f3f7
			tr:last-child
				border:none
</style>