<template>
	<div class="lottery">
		<div class="login-box" v-if="!isLogin">
			<button class="btn" v-on:click="login()">登录/注册</button>
			<p>登录查看我的积分</p>
		</div>
		<p class="integral" v-else>当前积分：<span class="sumCount" v-model="sumCount">{{sumCount}}</span></p>
		<div class="lottery-box">
			<div class="lottery-top">
				<span :class="{ 'on': isShow }" v-on:click="lottery1()">抽iPhone8</span>
				<span :class="{ 'on': !isShow }" v-on:click="lottery2()">抽688积分</span>
			</div>
			<div id="lottery1" class="lotterys" v-show="isShow" ref="mybox1">
			    <table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <td class="lottery-unit lottery-unit-0" ref="mybox"><img src="../../image/lottery/iphone8.png"class="sapce"><div class="mask"></div></td>
			            <td class="lottery-unit lottery-unit-1" ref="mybox"><img src="../../image/lottery/tv.png" class="sapce"><div class="mask"></div></td>
			            <td class="lottery-unit lottery-unit-2" ref="mybox"><img src="../../image/lottery/yashua.png"><div class="mask"></div></td>
			        </tr>
			        <tr>
			            <td class="lottery-unit lottery-unit-7"><img src="../../image/lottery/%3.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="btn sapce" v-on:click="runs()"><img src="../../image/lottery/start.png"class="sapce spa"></td>
			            <td class="lottery-unit lottery-unit-3"><img src="../../image/lottery/268.png" class="spa"><div class="mask spa"></div></td>
			        </tr>
			        <tr>
			            <td class="lottery-unit lottery-unit-6"><img src="../../image/lottery/68.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="lottery-unit lottery-unit-5"><img src="../../image/lottery/388.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="lottery-unit lottery-unit-4"><img src="../../image/lottery/10.png" class="spa"><div class="mask spa"></div></td>
			        </tr>
			    </table>
			</div>
			<div id="lottery2" class="lotterys" v-show="!isShow">
			    <table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <td class="lottery-unit lottery-unit-0"><img src="../../image/lottery/1fen.png"class="sapce"><div class="mask"></div></td>
			            <td class="lottery-unit lottery-unit-1"><img src="../../image/lottery/6fen.png" class="sapce"><div class="mask"></div></td>
			            <td class="lottery-unit lottery-unit-2"><img src="../../image/lottery/16fen.png"><div class="mask"></div></td>
			        </tr>
			        <tr>
			            <td class="lottery-unit lottery-unit-7"><img src="../../image/lottery/688fen.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="btn sapce" v-on:click="move()"><img src="../../image/lottery/fenstart.png"class="sapce spa"></td>
			            <td class="lottery-unit lottery-unit-3"><img src="../../image/lottery/36fen.png" class="spa"><div class="mask spa"></div></td>
			        </tr>
			        <tr>
			            <td class="lottery-unit lottery-unit-6"><img src="../../image/lottery/366fen.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="lottery-unit lottery-unit-5"><img src="../../image/lottery/166fen.png" class="sapce spa"><div class="mask spa"></div></td>
			            <td class="lottery-unit lottery-unit-4"><img src="../../image/lottery/66fen.png" class="spa"><div class="mask spa"></div></td>
			        </tr>
			    </table>
			</div>
		</div>
		<router-link to="/lotteryRule">
			<a href="javascript:;" class="rule">活动规则&nbsp;<span class="iconfont">&#xe6b9;</span></a>
		</router-link>
		<my-dialog :is-show="isShowDialog" @on-close="closeDialog('isShowDialog')"></my-dialog>
   		<lottery-Dialog :is-show="isShowDialogs" @on-close="closeDialogs('isShowDialogs')">
   		<slot>
   			<p class="til">恭喜您获得<span v-model="prizeFont">{{prizeFont}}</span></p>
        	<div class="pic"><img :src="imgUrl"></div>
        	<div class="ts" v-if="tsShow">
        		<p>请在5个工作日内联系客服40085-666-85</p>
        		<p>领取奖品，否则视为放弃</p>
        	</div>
        	<div class="ts2" v-show="ssShow">
        		<p>该奖品已放入您的账户中</p>
        	</div>
        	<div class="ts3" v-show="jfShow">
        		<p>该奖品已放入您的账户中</p>
        	</div>
        	<button class="btn" v-show="tsShow" v-on:click="goService()">联系客服</button>
        	<button class="btn" v-show="ssShow" v-on:click="goDiscount()">查看我的优惠券</button>
        	<button class="btn" v-show="jfShow" v-on:click="goIntegral()">查看我的积分</button>
   		</slot>
   		</lottery-Dialog>
	</div>
</template>
<script type="text/ecmascript-6">
	import Dialog from '../base/dialog'
	import lotteryDialog from '../base/lotteryDialog'
	export default {
		components: {
			MyDialog: Dialog,
			lotteryDialog: lotteryDialog
		},
		data () {
			return {
				apiUrl: '../../../static/draw_result.json',
				jfUrl: 'http://72.127.2.140:8080/api/router/app/mine/getMyScoreStatistic',
				isShow: true,
				sumCount: 10010,
				isLogin: true,
				place: 0,
				click: false,
				index: -1,
				count: 0,
				timer: 0,
				speed: 20,
				times: 0,
				cycle: 20,
				prize: -1,
				isShowDialog: false,
				isShowDialogs: false,
				imgUrl: require('../../image/lottery/prize1.png'),
				tsShow: '',
				jfShow: '',
				ssShow: '',
				result: '',
				prizeFont: '',
				accessId: 'accessId',
				accessKey: 'accessKey'
			}
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			getInfo: function() {
				let vm = this
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_ShowRightNavItem', {
							'rightTitle': '我的奖品',
							'url': 'http://72.127.2.40:8080/#/prize'
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
								vm.isLogin = false
							} else {
								vm.isLogin = true
							}
							vm.$http({url: vm.jfUrl, method: 'post', headers: {accessId: vm.accessId, accessKey: vm.accessKey}})
								.then((response) => {
									vm.sumCount = response.body.content.scoreCurrent
								})
						})
					})
				}
			},
			lottery1: function () {
				this.isShow = true
				this.tsShow = ''
				this.jfShow = ''
				this.ssShow = ''
			},
			lottery2: function () {
				this.isShow = false
				this.tsShow = ''
				this.jfShow = ''
				this.ssShow = ''
			},
			init: function(id) {
				let _units = document.getElementById(id).getElementsByClassName('lottery-unit')
				if (_units.length > 0) {
					let _lotterys = document.getElementById(id)
					let _unitss = _lotterys.getElementsByClassName('lottery-unit')
					this.obj = _lotterys
					this.count = _unitss.length
				};
			},
			roll: function() {
				let index = this.index
				let	count = this.count
				let	lottery = this.obj
				for (let i = 0; i < 8; i++) {
					let haha = lottery.getElementsByClassName('lottery-unit-' + i)[0]
					haha.classList.remove('active')
				}
				index += 1
				if (index > count - 1) {
					index = 0
				};
				for (let i = 0; i < 8; i++) {
					let haha = lottery.getElementsByClassName('lottery-unit-' + index)[0]
					haha.classList.add('active')
				}
				this.index = index
				return false
			},
			stop: function() {
				let lottery = this
				lottery.times += 1
				lottery.roll()
				// 转动过程调用的是lottery的roll方法，这里是第一次调用初始化
				if (lottery.times > lottery.cycle + 10 && lottery.prize === lottery.index) {
					clearTimeout(lottery.timer)
					lottery.prize = -1
					lottery.times = 0
					lottery.click = false
					setTimeout(function() {
						lottery.dialogs()
					}, 500)
				} else {
					if (lottery.times < lottery.cycle) {
						lottery.speed -= 10
					} else if (lottery.times === lottery.cycle) {
						lottery.place = lottery.result
						// 案例中奖物品通过一个随机数生成
						lottery.prize = lottery.place
						// lottery.prize = lottery.place;  //这个可以通过ajax请求回来的数据赋值给lottery.place
					} else {
						if (lottery.times > lottery.cycle + 10 && ((lottery.prize === 0 && lottery.index === 7) || lottery.prize === lottery.index + 1)) {
							lottery.speed += 110
						} else {
							lottery.speed += 20
						}
					}
					if (lottery.speed < 40) {
						lottery.speed = 80
					};
					lottery.timer = setTimeout(lottery.stop, lottery.speed)
					// 循环调用
				}
				return false
			},
			getLottery: function() {
				let lottery = this
				lottery.speed = 100
				lottery.stop()
				lottery.click = true
			},
			runs: function () {
				let lottery = this
				if (lottery.click) {
					return false
				} else {
					if (this.isLogin === false) {
						return false
					} else {
						if (this.sumCount < 100) {
							this.dialog()
							return false
						} else {
							lottery.init('lottery1')
							this.sumCount = this.sumCount - 100
							lottery.getLottery()
							let vm = this
							vm.$http({url: vm.apiUrl, method: 'get', data: {inverstType: 2, score: 100}, headers: {accessId: vm.accessId, accessKey: vm.accessKey}, emulateJSON: true})
								.then((response) => {
									let res = response.body.content.prizeName
									if (res === 'iphone8') {
										vm.result = 0
										vm.imgUrl = require('../../image/lottery/prize0.png')
										vm.prizeFont = 'iphone8'
										vm.tsShow = true
									} else if (res === 'tv') {
										vm.result = 1
										vm.imgUrl = require('../../image/lottery/prize1.png')
										vm.prizeFont = '小米电视'
										vm.tsShow = true
									} else if (res === 'yashua') {
										vm.result = 2
										vm.imgUrl = require('../../image/lottery/prize2.png')
										vm.prizeFont = '飞利浦电动牙刷'
										vm.tsShow = true
									} else if (res === '268') {
										vm.result = 3
										vm.imgUrl = require('../../image/lottery/red.png')
										vm.prizeFont = '268元红包'
										vm.ssShow = true
									} else if (res === '10') {
										vm.result = 4
										vm.imgUrl = require('../../image/lottery/red.png')
										vm.prizeFont = '10元红包'
										vm.ssShow = true
									} else if (res === '388') {
										vm.result = 5
										vm.imgUrl = require('../../image/lottery/red.png')
										vm.prizeFont = '388元红包'
										vm.ssShow = true
									} else if (res === '68') {
										vm.result = 6
										vm.imgUrl = require('../../image/lottery/red.png')
										vm.prizeFont = '68元红包'
										vm.ssShow = true
									} else if (res === '3%') {
										vm.result = 7
										vm.imgUrl = require('../../image/lottery/3%.png')
										vm.prizeFont = '3%加息券'
										vm.ssShow = true
									}
								})

							return false
						}
					}
				}
			},
			move: function() {
				let lottery = this
				if (lottery.click) {
					return false
				} else {
					if (this.isLogin === false) {
						return false
					} else {
						if (this.sumCount < 10) {
							this.dialog()
							return false
						} else {
							lottery.init('lottery2')
							this.sumCount = this.sumCount - 10
							lottery.getLottery()
							let vm = this
							vm.$http({url: vm.apiUrl, method: 'get', data: {inverstType: 1, score: 10}, headers: {accessId: vm.accessId, accessKey: vm.accessKey}, emulateJSON: true})
								.then((response) => {
									let res = response.body.content.prizeName
									if (res === '1') {
										vm.result = 0
										vm.imgUrl = require('../../image/lottery/jf1.png')
										vm.prizeFont = '1积分'
										vm.jfShow = true
									} else if (res === '6') {
										vm.result = 1
										vm.imgUrl = require('../../image/lottery/jf2.png')
										vm.prizeFont = '6积分'
										vm.jfShow = true
									} else if (res === '16') {
										vm.result = 2
										vm.imgUrl = require('../../image/lottery/jf3.png')
										vm.prizeFont = '16积分'
										vm.jfShow = true
									} else if (res === '36') {
										vm.result = 3
										vm.imgUrl = require('../../image/lottery/jf4.png')
										vm.prizeFont = '36积分'
										vm.jfShow = true
									} else if (res === '66') {
										vm.result = 4
										vm.imgUrl = require('../../image/lottery/jf5.png')
										vm.prizeFont = '66积分'
										vm.jfShow = true
									} else if (res === '166') {
										vm.result = 5
										vm.imgUrl = require('../../image/lottery/jf6.png')
										vm.prizeFont = '166积分'
										vm.jfShow = true
									} else if (res === '366') {
										vm.result = 6
										vm.imgUrl = require('../../image/lottery/jf7.png')
										vm.prizeFont = '366积分'
										vm.jfShow = true
									} else if (res === '688') {
										vm.result = 7
										vm.imgUrl = require('../../image/lottery/jf8.png')
										vm.prizeFont = '688积分'
										vm.jfShow = true
									}
								})
							return false
						}
					}
				}
			},
			getResult: function() {
			},
			dialog: function() {
				this.isShowDialog = true
			},
			closeDialog: function (attr) {
				this[attr] = false
			},
			dialogs: function() {
				this.isShowDialogs = true
			},
			closeDialogs: function (attr) {
				this[attr] = false
			},
			login: function() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_Login', {}, function (response) {})
					})
				}
			},
			goDiscount: function() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GoDiscountPage', {}, function (response) {
						})
					})
				}
			},
			goIntegral: function() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GoIntegral', {}, function (response) {
						})
					})
				}
			},
			goService: function() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_CallNum', {
							'callNum': '400-9899-9090'
						}, function (response) {
						})
					})
				}
			},
			setupWebViewJavascriptBridge: function (callback) {
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
	.on
		background-color #f87867!important
		color:#fff!important
	.dis_none
		display:none
	.lottery
		max-width:414px
		margin:0 auto
		height:15.32rem
		background:url(../../image/lottery/lottery.png) no-repeat
		background-size:100%
		text-align:center
		overflow:hidden
		.login-box
			.btn
				width:3.12rem
				height:.76rem
				border 1px solid #fff
				background-color: rgba(0,0,0,0)
				margin-top:3.31rem
				color:#fff
				border-radius:0.05rem
				font-size:.3rem
			p
				font-size:.2rem
				color:#ffffff
				opacity:0.7
				margin-top:.2rem
		.integral
			margin:3.3rem auto 1.03rem auto
			color:#fff
			font-size:.28rem
			vertical-align:middle
			span
				font-size:.54rem
		.lottery-box
			overflow:hidden
			width:6.9rem
			height:8.75rem
			background-color #f87c64
			margin:.6rem auto 0 auto
			.lottery-top
				width:6.9rem
				height:.8rem
				span
					display:block
					float:left
					width:50%
					height:100%
					background-color:#fdd3c8
					font-size:.28rem
					color:#ff5425
					line-height:.8rem
					cursor:pointer
			.lotterys
				width: 6.39rem
				height: 7.26rem
				margin: .3rem  auto
			 	table
					td
						position: relative
						width: 2rem
						height: 2.22rem
						text-align: center
						color: #333
						img
							display: block
							width: 2rem
							height: 2.22rem
						.mask
							width: 2rem
							height: 2.22rem
							position: absolute
							left: 0
							top: 0
							background-color: #c3bbb5
							opacity: .5
							display: none
					td.active
						.mask
							display: block
				.sapce
					margin-right:.2rem
				.spa
					margin-top:.3rem
		.rule
			font-size:.24rem
			color:#fff
		.dialog-content
			.til
				font-size:.36rem
				color:#ffe53d
				text-align:center
				margin:.48rem auto .3rem auto
			.pic
				width:2.15rem
				height:1.56rem
				margin: .5rem auto .5rem auto
				background-size:100%
				img
					width:100%
			.ts
				font-size:.2rem
				color:#fff
				text-align:center
				margin: .3rem auto
				p
					line-height:.3rem
			.ts2
				font-size:.2rem
				color:#fff
				text-align:center
				margin: .8rem auto 0 auto
				p
					line-height:.3rem
			.ts3
				font-size:.2rem
				color:#fff
				text-align:center
				margin: .8rem auto 0 auto
				p
					line-height:.3rem
			.btn
				width:4.5rem
				height:.8rem
				background-color #fff
				position:absolute
				font-size:.3rem
				color:#ff7400
				outline:none
				border:none
				border-radius:.05rem
				bottom:.51rem
				left:50%
				margin-left:-2.25rem
</style>