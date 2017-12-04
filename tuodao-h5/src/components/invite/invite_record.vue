<template>
	<div class="record">
		<div class="record-top">
			<div class="left">
				<dl>
					<dt><span>{{this.cashBackSum}}</span>元</dt>
					<dd>返现奖励</dd>
				</dl>
			</div>
			<div class="right">
				<dl>
					<dt><span>{{this.voucherSum}}</span>元</dt>
					<dd>抵用券奖励</dd>
				</dl>
			</div>
			<div class="line"></div>
		</div>
		<div class="list">
			<table>
				<tr>
					<th>好友</th>
					<th>直接返现奖励</th>
					<th>间接返现奖励</th>
				</tr>
				<tr v-for="item in items">
					<td>{{item.friendPhoneNum}}</td>
					<td>{{item.directCashback}}</td>
					<td>{{item.indirectCashback}}</td>
				</tr>
			</table>
		</div>
		<div class="til">“-”表示未返现</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				apiUrl: 'http://72.127.2.140:8080/api/router/app/h5/invite/appInviteRecord',
				items: [],
				cashBackSum: '',
				voucherSum: '',
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
									vm.items = response.body.content.recordVOList
									vm.cashBackSum = response.body.content.cashBackSum
									vm.voucherSum = response.body.content.voucherSum
								})
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
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.record
		max-width:414px
		margin:0 auto
		.record-top
			height:1.94rem
			background-color #fff
			margin:.2rem auto
			text-align:center
			position:relative
			.left
				float:left
				width:50%
				height:100%
				dt
					margin-top:.59rem
					font-size:.42rem
					color:#ff7400
				dd
					margin-top:.18rem
					font-size:.24rem
					color:#626262
			.right
				float:left
				width:50%
				height:100%
				dt
					margin-top:.59rem
					font-size:.42rem
					color:#ff7400
				dd
					margin-top:.18rem
					font-size:.24rem
					color:#626262
			.line
				width:1px
				height:1rem
				background-color #e4e4e4
				position:absolute
				top:.47rem
				left:50%
		.list
			background-color #fff
			table
				width:6.9rem
				margin:0 auto
				text-align:center
				tr
					width:100%
					height:.8rem
					border-bottom:1px solid #e4e4e4
					line-height:.8rem
					th
						font-size:.28rem
						color:#212a36
					td
						font-size:.24rem
						color:#626262
					th:first-child
						text-align:left
					th:last-child
						text-align:right
					td:first-child
						text-align:left
					td:last-child
						text-align:right
				tr:last-child
					border:none
		.til
			float:right
			color:#7e7e7e
			font-size:.2rem
			margin:.2rem
</style>