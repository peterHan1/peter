<template>
	<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
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
	</v-scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from './../scrollList'
	export default {
		data () {
			return {
				bondList: [],
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
				vm.$http.post(vm.listUrl, {transferId: 1}).then((response) => {
					vm.bondList = response.body.content.list
				})
			},
			onInfinite(done) {
				let vm = this
				vm.counter++
				vm.$http.post(this.listUrl, {transferId: 1}).then((response) => {
					vm.pageEnd = vm.num * vm.counter
					vm.pageStart = vm.pageEnd - vm.num
					let arr = response.data
					let i = vm.pageStart
					let end = vm.pageEnd
					for (; i < end; i++) {
						let obj = {}
						obj['name'] = arr[i].name
						vm.downdata.push(obj)
						if ((i + 1) >= response.data.length) {
							this.$el.querySelector('.load-more').style.display = 'none'
							return
						}
					}
					done()
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