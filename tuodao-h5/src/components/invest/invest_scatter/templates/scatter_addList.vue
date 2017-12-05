<template>
	<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
		<div class="addList">
			<div class="flex">
				<div class="flex-1 border_r">
					<div>
						<h3 class="jl">捡漏王</h3>
					</div>
					<div class="flex_bot">
						<p>{{scattermaxList.last}}<span>积分+{{scattermaxList.last_score}}</span></p>
					</div>
				</div>
				<div class="flex-1">
					<div>
						<h3 class="max">脱颖而出</h3>
					</div>
					<div class="flex_bot">
						<p>{{scattermaxList.max}}<span>双倍积分</span></p>
					</div>
				</div>
			</div>
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
						<tr v-for="list in scatterList">
							<td>{{list.tenderUser}}</td>
							<td>{{list.tenderAccount}}</td>
							<td>{{list.tenderTime}}</td>
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
				downdata: [],
				counter: 1,
				num: 15,
				pageStart: 0,
				pageEnd: 0,
				scatterList: [],
				scattermaxList: {},
				listUrl: 'api/router/tc/product/tender_list',
				listmaxUrl: 'api/router/tc/product/tender_max_last'
			}
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'PC'
			}
		},
		mounted() {
			this.addList()
		},
		methods: {
			addList() {
				let vm = this
				vm.$http.post(vm.listUrl, {productId: '123'}).then((response) => {
					vm.scatterList = response.body.content.list
				})
				vm.$http.post(vm.listmaxUrl, {productId: '1'}).then((response) => {
					vm.scattermaxList = response.body.content
				})
			},
			onRefresh(done) {
				done()
				// 松开回到app界面
				this.getInvestList()
			},
			onInfinite(done) {
				let vm = this
				vm.counter++
				vm.$http.post(vm.listmaxUrl, {productId: '1'}).then((response) => {
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
		.flex
			background-color:$color-background-f
			display:flex
			padding:0.32rem 0
			.border_r
				border-right:1px solid #e4e4e4
			.flex-1
				flex:1
				text-align:center
				div
					line-height:0					
					h3
						font-size:0.28rem
						color:#212a36
						display:inline-block
						padding-left:0.7rem
						line-height:0.75rem
					p
						display:inline-block	
						font-size:0.24rem
						color:#626262
						line-height:0.3rem
					span
						display:inline-block
						font-size:0.16rem
						color:#ff7400
						padding:0 0.06rem
						border-radius:2px
						border:1px solid #ff7400
						margin-left:0.1rem
					.jl
						background:url(../../../../image/invest/jl_bg.png) no-repeat
						background-size:40%
					.max
						background:url(../../../../image/invest/tyec_bg.png) no-repeat
						background-size:35%
		.list
			padding:0 0.3rem
			background-color:$color-background-f
			margin-top:0.2rem
			table
				width:100%
				tr
					border-bottom:1px solid #e4e4e4
					line-height:0.8rem
					th
						font-size:0.28rem
						color:#212a36
						text-align:left
					td:nth-child(1)
						width:40%
					td
						font-size:0.24rem
						color:#7e7e7e
						text-align:left
						span
							font-size:0.18rem
							color:#ff7400
							border:1px solid #ff7400
							line-height:0.24rem
							padding:0 0.08rem
							border-radius:2px
							margin-left:0.1rem
					th:nth-child(3)
						text-align:right
					td:nth-child(3)
						text-align:right
				tbody
					tr:nth-child(1)
						td:nth-child(1)
							background:url(../../../../image/invest/first_bg.png) no-repeat 70% 45%
							background-size:25%
					tr:last-child
						border-bottom:none
</style>