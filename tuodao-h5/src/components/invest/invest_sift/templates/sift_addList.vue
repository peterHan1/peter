<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :pullup="pullup" @pullup="addList" :listenScroll="listenScroll">
		<div class="addList">
			<div class="flex"  v-show="borrowStatus">
				<div class="flex-1 border_r">
					<div>
						<h3 class="jl">捡漏王</h3>
					</div>
					<div class="flex_bot">
						<p>{{siftmaxList.picker}}<span>积分+{{siftmaxList.last_score}}</span></p>
					</div>
				</div>
				<div class="flex-1">
					<div>
						<h3 class="max">脱颖而出</h3>
					</div>
					<div class="flex_bot">
						<p>{{siftmaxList.maxEr}}<span>双倍积分</span></p>
					</div>
				</div>
			</div>
			<div class="list">
				<table>
					<thead>
						<tr>
							<th>加入用户</th>
							<th>加入金额</th>
							<th>加入时间</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="addlist in siftList">
							<td>{{addlist.tenderUser}}</td>
							<td>{{addlist.tenderAccount}}</td>
							<td>{{addlist.tenderTime}}</td>
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
				borrowStatus: true,
				downdata: [],
				siftList: [],
				siftmaxList: [],
				pulldown: true,
				listenScroll: true,
				pullup: true,
				listUrl: 'api/router/JoinPlanController/getJoinPlanList',
				listmaxUrl: 'api/router/joinPlanController/getMaxAndPic'
			}
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'APP'
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let vm = this
				vm.$http.post(vm.listUrl, {currentPage: 1, pageSize: 1, borrowId: '1'}).then((response) => {
					vm.siftList = response.body.content.list
				})
				if (vm.borrowStatus === true) {
					vm.$http.post(vm.listmaxUrl, {borrowId: '1'}).then((response) => {
						vm.siftmaxList = response.body.content
					})
				}
			},
			getApp() {
				this.getInvestList()
			},
			addList() {
				console.log('上拉了要加载了')
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