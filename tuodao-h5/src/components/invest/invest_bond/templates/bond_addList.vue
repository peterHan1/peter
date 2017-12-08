<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :pullup="pullup" @pullup="getList" :listenScroll="listenScroll">
		<div class="addList">
			<div class="list">
				<table>
					<thead>
						<tr>
							<th>投资用户</th>
							<th>投资金额</th>
							<th>投资时间</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="list in bondList">
							<td>{{list.mobile}}</td>
							<td>{{list.account}}</td>
							<td>{{list.addTime}}</td>
						</tr>
					</tbody>
				</table>
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
				listenScroll: true,
				pullup: true,
				bondList: [],
				downdata: [],
				counter: 1,
				listUrl: 'api/router/tender/transfer/list'
			}
		},
		mounted() {
			this.addList()
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'PC'
			}
		},
		methods: {
			addList() {
				let vm = this
				vm.$http.post(vm.listUrl, {transferId: 11, pageSize: 10, currentPage: 1}).then((response) => {
					vm.bondList = response.body.content.list
				})
			},
			getApp() {
				this.getInvestList()
			},
			getList() {
				let vm = this
				vm.counter++
				vm.$http.post(vm.listUrl, {transferId: 11, pageSize: 10, currentPage: vm.counter}).then((response) => {
					vm.downdata = response.body.content.list
					for (let i = 0; i < vm.downdata.length; i++) {
						vm.bondList.push(vm.downdata[i])
					}
				})
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
		height:100%
	.addList
		.list
			padding:0 0.3rem
			background-color:$color-background-f
			table
				width:100%
				tr
					border-bottom:1px solid #e4e4e4
					line-height:0.8rem
					th
						font-size:0.28rem
						color:$color-font-title
						text-align:left
					td
						font-size:0.24rem
						color:#7e7e7e
						text-align:left
					th:nth-child(1)
						width:40%
					th:nth-child(3)
						text-align:right
					td:nth-child(3)
						text-align:right
				tbody
					tr:last-child
						border-bottom:none
</style>