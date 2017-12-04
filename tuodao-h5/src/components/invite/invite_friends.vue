<template lang="html">
	<div class="invite">
		<div class="login-box" v-show="isLogin">
			<button class="btn" v-on:click="login()">登录/注册</button>
			<p>登录查看我的邀请等级</p>
		</div>
		<div class="low-box" v-show="isLow">
			<p>距中级理财师还差2个v1好友，200万待收金额</p>
		</div>
		<div class="middle-box" v-show="isMiddle">
			<p>距王牌理财师还差3个v1好友，100万待收金额</p>
		</div>
		<div class="king-box" v-show="isKing"></div>
		<div class="banner-box"></div>
		<div class="info-box">
			<p class="title">好友首次投资，您将获得</p>
			<p class="one">10元抵用券，好友首次投资金额0.25%返现 </p>
			<hr color="#e4e4e4">
			<div class="sec"></div>
		</div>
		<div class="rule">
			<router-link to="/rule">
				<a href="">查看邀请规则&nbsp;></a>
			</router-link>
		</div>
		<button class="invite-btn" v-on:click="invite()">立即邀请</button>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				apiUrl: 'http://72.127.2.140:8080/api/router/app/h5/invite/inviteFriend',
				ShareUrl: 'http://72.127.2.140:8080/api/router/app/h5/invite/inviteShare',
				isLogin: false,
				isLow: false,
				isMiddle: false,
				isKing: false,
				isOpenDeposit: '',
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
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_ShowRightNavItem', {
							'rightTitle': '邀请记录',
							'url': 'http://72.127.2.40:8080/#/record'
						}, function (response) {
						})
					})
				}
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					vm.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GetUserInfo', {}, function (response) {
							vm.accessId = response.accessId
							vm.accessKey = response.accessKey
							if (response.status === '0') {
								vm.isLogin = true
							}
							vm.$http({url: vm.apiUrl, method: 'POST', headers: {accessId: vm.accessId, accessKey: vm.accessKey}})
							.then((response) => {
								vm.isOpenDeposit = response.body.content.isOpenDeposit
								if (response.body.content.financialPlannerLevel === 1) {
									vm.isLow = true
								} else if (response.body.content.financialPlannerLevel === 2) {
									vm.isMiddle = true
								} else if (response.body.content.financialPlannerLevel === 3) {
									vm.isKing = true
								}
							})
						})
					})
				}
			},
			invite() {
				if (this.isOpenDeposit === 1) {
					if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
						this.setupWebViewJavascriptBridge(function (bridge) {
							bridge.callHandler('h5ToNative_ShowOpenDepositAlert', {}, function (response) {
							})
						})
					}
				} else {
					this.$http({url: this.ShareUrl, method: 'POST', headers: {accessId: this.accessId, accessKey: this.accessKey}})
						.then((response) => {
							if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
								this.setupWebViewJavascriptBridge(function (bridge) {
									bridge.callHandler('h5ToNative_ShowShareView', {
										'url': response.body.content.url,
										'title': response.body.content.title,
										'iconUrl': response.body.content.iconUrl,
										'content': response.body.content.content,
										'inviteCode': response.body.content.inviteCode
									}, function (response) {
									})
								})
							}
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
			},
			login() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_Login', {}, function (response) {})
					})
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.invite
		max-width:414px
		margin:0 auto
		background-color #fff
		.login-box
			height:3.24rem
			background-color #ff8000
			overflow:hidden
			text-align:center
			margin-bottom:.52rem
			.btn
				width:2.37rem
				height:.76rem
				border 1px solid #fff
				background-color #ff8201
				color:#fff
				border-radius:0.05rem
				font-size:.3rem
				margin:1.04rem auto .19rem auto
			p
				font-size:.2rem
				color:#ffffff
				opacity:0.7
		.low-box
			width:6.9rem
			height:3rem
			background:url(../../image/invite/low.png) no-repeat
			background-size: 100% 100%;
			margin: .5rem auto
			text-align:center
			overflow:hidden
			p
				font-size:.24rem
				margin-top:2.18rem
				opacity: 0.6;
				color:#fff
		.middle-box
			width:6.9rem
			height:3rem
			background:url(../../image/invite/middle.png) no-repeat
			background-size: 100% 100%;
			margin: .5rem auto
			text-align:center
			overflow:hidden
			p
				font-size:.24rem
				color:#b6b5b6
				margin-top:2.18rem
		.king-box
			width:6.9rem
			height:3rem
			background:url(../../image/invite/king.png) no-repeat
			background-size: 100% 100%;
			margin: .5rem auto
			text-align:center
			overflow:hidden
		.banner-box
			width:6.9rem
			height:1.4rem
			background:url(../../image/invite/banner-1.png) no-repeat
			background-size: 100%;
			margin:0 auto
		.info-box
			margin: 0 .3rem
			.title
				margin-top:.6rem
				font-size:.28rem
				color:#212a36
			.one
				font-size:.24rem
				color:#626262
				margin-top:.2rem
				margin-bottom:.6rem
			.sec
				width:6.04rem
				height:6.61rem
				margin-top:.6rem
				background:url(../../image/invite/sec.png) no-repeat
				background-size: 100%;
		.rule
			height:1.25rem
			background-color #f2f3f7
			margin-top:.6rem
			text-align:center
			margin-bottom:.88rem
			a
				color:#626262
				font-size:.24rem
		.invite-btn
			width:100%
			max-width:414px
			height:.88rem
			background-color:#ff7400
			outline:none
			border:none
			position:fixed
			bottom:0
			font-size:.3rem
			color:#ffffff
</style>