<template>
	<div class="center">
		<div class="login-bg" v-if="isLogin">
			<button class="btn">登录/注册</button>
			<p>登录后查看您的会员等级</p>
			<div class="numbers">
				<span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
			</div>
			<div class="lines">
				<span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span>
			</div>
			<div class="info">
				<div class="left">本月日均资产 <span>0.00</span> 元</div><div class="right">距离V1等级还差 <span>0</span> 元</div>
			</div>
		</div>
		<div class="member-bg" v-else>
			<p class="welcome">Hi，<span>{{mobile}}</span></p>
			<div class="logo"><img :src="now"></div>
			<p class="day-money">上月日均资产:<span>{{lastMonthAvg}}</span>元</p>
			<div class="numbers">
				<span :class="{ 'bg': v === 0 }">0</span><span :class="{ 'bg': v === 1 }">1</span><span :class="{ 'bg': v === 2 }">2</span><span :class="{ 'bg': v === 3 }">3</span><span :class="{ 'bg': v === 4 }">4</span><span :class="{ 'bg': v === 5 }">5</span><span :class="{ 'bg': v === 6 }">6</span>
			</div>
			<div class="lines" id="lines">
				<span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span><span class="line"></span>
			</div>
			<div class="info">
				<div class="left">本月日均资产 <span>{{thisMonthAvg}}</span> 元</div><div class="right">距离V1等级还差 <span>{{distanceNextLevelAmount}}</span> 元</div>
			</div>
		</div>
		<p class="title">当前等级特权</p>
		<div class="class-privilege" id="privilege">
			<div class="box">
				<div class="logo iconfont">&#xe6b5;</div>
				<div class="font">免费提现</div>
			</div>
			<div class="box">
				<div class="logo iconfont">&#xe6b4;</div>
				<div class="font">大客户专享标</div>
			</div>
			<div class="box">
				<div class="logo iconfont">&#xe6b3;</div>
				<div class="font">生日礼包</div>
			</div>
			<div class="box">
				<div class="logo iconfont">&#xe6b2;</div>
				<div class="font">升级大礼包</div>
			</div>
		</div>
		<router-link to="/privilege">
			<a href="" class="about-privilege"><p>了解等级特权</p><span class="iconfont">&#xe6b8;</span></a>
		</router-link>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				now: require('../../image/member/v0.png'),
				apiUrl: 'http://72.127.2.140:8080/api/router/app/h5/vipCenter/getUserVipData',
				mobile: '',
				lastMonthAvg: '',
				thisMonthAvg: '',
				distanceNextLevelAmount: '',
				v: '',
				loginStatus: '',
				isLogin: false
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
							vm.loginStatus = response.status
						})
					})
				}
				if (vm.loginStatus === 0) {
					vm.isLogin = true
				} else {
					vm.$http.post(vm.apiUrl)
						.then((response) => {
							console.log(response.body.content)
							vm.mobile = response.body.content.mobile
							vm.lastMonthAvg = response.body.content.lastMonthAvg
							vm.thisMonthAvg = response.body.content.thisMonthAvg
							vm.distanceNextLevelAmount = response.body.content.distanceNextLevelAmount
							vm.v = response.body.content.vipLevel
							let _lines = document.getElementById('lines')
							let _privilege = document.getElementById('privilege')
							let liss = _privilege.getElementsByClassName('logo')
							let lis = _lines.getElementsByClassName('line')
							// vm.v = 1
							for (var i = 0; i < vm.v; i++) {
								lis[i].classList.add('white')
							}
							for (var j = 0; j < vm.v + 1; j++) {
								liss[j].classList.add('light')
							}
							if (vm.v === 0) {
								vm.now = require('../../image/member/v0.png')
							} else if (vm.v === 1) {
								vm.now = require('../../image/member/v1.png')
							} else if (vm.v === 2) {
								vm.now = require('../../image/member/v2.png')
							} else if (vm.v === 3) {
								vm.now = require('../../image/member/v3.png')
							} else if (vm.v === 4) {
								vm.now = require('../../image/member/v4.png')
							} else if (vm.v === 5) {
								vm.now = require('../../image/member/v5.png')
							} else {
								vm.now = require('../../image/member/v6.png')
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
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.bg
		background:url(../../image/member/icon-bg.png) no-repeat
		background-size:100%
		color:#ff9600
	.white
		background-color #fff!important
	.light
		color:#ff7400!important
	.center
		max-width:414px
		margin: 0 auto
		.login-bg
			height:4.05rem
			background:url(../../image/member/member1.png) no-repeat
			background-size:100%
			text-align:center
			margin-bottom:.19rem
			.btn
				width:2.36rem
				height:0.76rem
				border:1px solid #fff
				background-color: rgba(0,0,0,0)
				color:#fff
				border-radius:0.05rem
				margin-top:.82rem
			p
				font-size:.2rem
				color:#ffffff
				opacity:0.7
				margin-top:.2rem
			.numbers
				text-align:left
				overflow:hidden
				width:6.32rem
				height:.3rem
				margin:.61rem auto .11rem auto
				span
					margin-top:0.05rem
					display:block
					float:left
					width:0.22rem
					height:0.22rem
					margin-right:.8rem
					text-align:center
					line-height:0.22rem
					color:#ffd298
					font-size:.2rem
					border-radius:.22rem
				span:first-child
					margin-right:.78rem
				span:last-child
					margin-right:0
			.lines
				overflow:hidden
				width:6.12rem
				margin:.03rem auto .44rem auto
				span
					display:block
					float:left
					width:1rem
					height:0.06rem
					background-color #ffbc5c
					margin-right:0.02rem
				span:fist-child
					border-radius:0.06rem
				span:last-child
					border-radius:0.06rem
			.info
				font-size:.24rem
				color:#fff
				overflow:hidden
				.left
					float:left
					margin-left:.3rem
					span
						color:#fff
				.right
					float:right
					margin-right:.3rem
					span
						color:#fff
		.member-bg
			height:4.05rem
			background:url(../../image/member/member1.png) no-repeat
			background-size:100%
			text-align:center
			overflow:hidden
			margin-bottom:.19rem
			.welcome
				font-size:.24rem
				color:#fff
				margin-top:.6rem
			.logo
				width:.61rem
				height:.55rem
				line-height:0
				margin: 0.25rem auto .20rem auto
				img
					width:100%
			.day-money
				font-size:.24rem
				color:#ffd9b8
			.numbers
				text-align:left
				overflow:hidden
				width:6.32rem
				height:.3rem
				margin:.61rem auto 0 auto
				span
					margin-top:0.05rem
					display:block
					float:left
					width:0.20rem
					height:0.26rem
					margin-right:.82rem
					text-align:center
					line-height:0.22rem
					color:#ffd298
					font-size:.2rem
				span:first-child
					margin-right:.8rem
				span:last-child
					margin-right:0
			.lines
				overflow:hidden
				width:6.12rem
				margin:.03rem auto .44rem auto
				span
					display:block
					float:left
					width:1rem
					height:0.06rem
					background-color #ffbc5c
					margin-right:0.02rem
				span:fist-child
					border-radius:0.06rem
				span:last-child
					border-radius:0.06rem
			.info
				font-size:.24rem
				color:#ffd69f
				overflow:hidden
				.left
					float:left
					margin-left:.3rem
					span
						color:#fff
				.right
					float:right
					margin-right:.3rem
					span
						color:#fff
		.title
			height:.82rem
			padding-left:.34rem
			line-height:.82rem
			font-size:.28rem
			color:#212a36
			background-color #fff
		.class-privilege
			height:4.09rem
			background-color #fff
			border-top:1px solid #e4e4e4
			margin-bottom:.2rem
			.box
				width:50%
				height:50%
				float:left
				text-align:center
				.logo
					margin-top:.3rem
				.font
					font-size:.24rem
					color:#626262
		.about-privilege
			display:block
			height:.82rem
			padding-left:.34rem
			line-height:.82rem
			font-size:.28rem
			background-color #fff
			p
				float:left
				color:#212a36
			span
				float:right
				color:#6b6b6b
				margin-right:.32rem
				font-size:.28rem
</style>