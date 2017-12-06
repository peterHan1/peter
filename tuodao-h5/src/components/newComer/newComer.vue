<template>
	<div class="main">
		<p class="nav"><img src="../../image/newComer_01.png" alt=""></p>
		<div class="shaw" style="margin-bottom:0.4rem;">
			<div class="content">
				<ul>
					<li class="col212">新手大礼包</li>
					<li class="colmain">注册即可获得<span>398</span>元红包</li>
				</ul>
				<img src="../../image/newComer_prize.png" alt="">
			</div>
			<div class="btn" @click="skipLink(1)">注册并领取红包</div>
		</div>
		<div class="shaw">
			<div class="content" style="padding: 0 0.6rem 0.6rem 0.4rem;">
				<ul>
					<li class="col212">新手专享标</li>
					<li class="baio_num"><span style="font-size:0.87rem">9</span>%+3%</li>
					<li class="last_li">预期年化</li>
				</ul>
				<div class="explain">
					<p>1个月期限</p>
					<p>100元起投</p>
				</div>
			</div>
			<div class="btn" @click="skipLink(2)">立即投资</div>
		</div>
		<p class="nav"><img src="../../image/newComer_02.png" alt=""></p>
		<div class="task" id="task">
			<div class="task_top">在注册30天内完成任务即可获得对应的积分</div>
			<div class="content">
				<ul id="content_ul">
					<li v-for="task in taskData">
						<div class="list_left">
							<span class="sp1">{{ task.taskName }}</span>
							<span class="sp2">{{ task.description }}</span>
						</div>
						<a v-on:click="taskEvent(task.appUrl,task.code,task.todo)" v-bind:class="[errorClass ,task.isComplete=='yes' || task.isOverdue=='yes' ? activeClass : '']">{{ task.todo }}</a>
					</li>
				</ul>
			</div>
		</div>
		<p class="nav"><img src="../../image/newComer_03.png" alt=""></p>
		<div class="measure">
			<ul>
				<li>拓道金服教你如何让小金库翻一番，且安全... <span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				errorClass: '',
				activeClass: 'isOver',
				taskData: [],
				taskApiUrl: 'api/router/op/findUserTask',
				accessId: '',
				accessKey: '',
				loginStatus: true
			}
		},
		created () {
			this.getUertInfo()
		},
		methods: {
			getData() {
				let vm = this
				vm.$http({url: vm.taskApiUrl, method: 'POST', params: {'type': 2, 'pageSize': 1000}, headers: {accessId: vm.accessId, accessKey: vm.accessKey}, emulateJSON: true})
				.then((res) => {
					let listData = res.data.content.list
					for (var i = 0; i < listData.length; i++) {
						if (listData[i].isOverdue === 'yes') {
							listData[i].todo = '已过期'
						} else if (listData[i].isComplete === 'yes') {
							listData[i].todo = '已完成'
						}
					}
					vm.taskData = listData
				}, (res) => {
					console.log('请求失败！')
				})
			},
			taskEvent(url, code, todo) {
				if (todo === '已完成' || todo === '已过期') {
					return false
				} else {
					if (code === '5') {
						this.$router.push({path: '/friends'})
					} else if (code === '6') {
						if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
							var nowTime1 = new Date().valueOf()
							var ifr = document.createElement('iframe')
							ifr.src = 'tuodao16TD://?id=login' // 打开app的协议,id=login是传参
							ifr.style.display = 'none'
							window.setTimeout(function() {
								var launchTime1 = new Date().valueOf() - nowTime1
								if (launchTime1 < 28) {
									// 下载app的地址
									document.body.removeChild(ifr)
									window.location.href = 'itms-apps://itunes.apple.com/app/id1030238074'
								}
							}, 25)
							document.body.appendChild(ifr)
						} else if (navigator.userAgent.match(/android/i)) {
							var nowTime2 = new Date().valueOf()
							window.setTimeout(function() {
								var launchTime2 = new Date().valueOf() - nowTime2
								if (launchTime2 < 28) {
									// 下载app的地址
									window.location.href = 'itms-apps://itunes.apple.com/app/id1030238074'
								}
							}, 25)
							window.location.href = 'tuodao16TD://?id=login'
						}
					} else {
						if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
							this.setupWebViewJavascriptBridge(function (bridge) {
								bridge.callHandler(url, {}, function (response) {})
							})
						}
					}
				}
			},
			getUertInfo() {
				let vm = this
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					vm.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GetUserInfo', {}, function (response) {
							vm.accessId = response.accessId
							vm.accessKey = response.accessKey
							vm.loginStatus = response.status
							vm.getData()
						})
					})
				}
			},
			skipLink(type) {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					var nowTime1 = new Date().valueOf()
					var ifr = document.createElement('iframe')
					ifr.src = 'tuodao16TD://' // 打开app的协议,tuodao16TD://?id=login是传参
					ifr.style.display = 'none'
					window.setTimeout(function() {
						var launchTime1 = new Date().valueOf() - nowTime1
						if (launchTime1 < 28) {
							// 下载app的地址
							document.body.removeChild(ifr)
							window.location.href = 'itms-apps://itunes.apple.com/app/id1030238074'
						}
					}, 25)
					document.body.appendChild(ifr)
				} else if (navigator.userAgent.match(/android/i)) {
					alert(1)
					var nowTime2 = new Date().valueOf()
					window.setTimeout(function() {
						var launchTime2 = new Date().valueOf() - nowTime2
						if (launchTime2 < 28) {
							// 下载app的地址
							window.location.href = 'http://www.baidu.com'
						}
					}, 25)
					window.location.href = 'tuodao16TD://'
				}
				if (this.loginStatus === '1') {
					if (type === 1) {
						if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
							this.setupWebViewJavascriptBridge(function (bridge) {
								bridge.callHandler('h5ToNative_GoDiscountPage', {}, function (response) {})
							})
						}
					} else {
						if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
							this.setupWebViewJavascriptBridge(function (bridge) {
								bridge.callHandler('h5ToNative_PullDetailNib', {}, function (response) {})
							})
						}
					}
				} else {
					if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
						this.setupWebViewJavascriptBridge(function (bridge) {
							bridge.callHandler('h5ToNative_Login', {}, function (response) {})
						})
					}
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
	.main
		max-width:414px
		padding:0 0.3rem 0.5rem 0.3rem
		margin:auto
		overflow:hidden
		background: -webkit-linear-gradient(top, #f743a2, #5E02B6 100%)
		font-family: PingFang-SC-Medium
	.nav
		text-align:center
		padding: 0.5rem 0 0.1rem
		img
			height:0.9rem
			width:4rem
	.shaw
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		padding:0.6rem 0.3rem 0.6rem 0.31rem
		background:#ffffff
		.content
			padding: 0 0.6rem 0.6rem 0.4rem
			overflow: hidden
			ul
				float: left
				margin-top: 0.25rem
				.last_li
					font-size:0.24rem
					color: #b6b5b6
			img
				float: right
				height:1.25rem
				width:1.59rem
			.explain
				float: right
				font-size: 0.24rem
				margin-top: 0.9rem
				p
					color: #626262
					margin-top: 0.3rem
	.btn
		display: block
		width:6.3rem
		font-size:0.3rem
		color:#ffffff
		text-align:center
		height:0.8rem
		line-height:0.8rem
		background:#FFB02B
		border-radius:0.04rem
		margin:auto
	.col212
		color:#212a36
		font-size: 0.3rem
		margin-bottom: 0.2rem
	.colmain
		font-size:0.24rem
		color: $color-font-main
		span
			color:#f743a2
			font-weight:bold
			font-size:0.48rem
	.baio_num
		font-family: PingFang SC Bold
		color: #f743a2
		font-size: 0.33rem
		margin-bottom: 0.3rem
		span
			font-size: 0.87rem
	.task
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		background: #ffffff
		overflow:hidden
		.task_top
			height: 0.6rem
			line-height: 0.6rem
			background: #f2f3f7
			text-align: center
			color: #626262
			font-size: 0.2rem
		.content
			position: relative
			max-height:6.08rem
			overflow-y: auto
			&::-webkit-scrollbar
				width: 0.06rem
			&::-webkit-scrollbar-thumb
				width:0.05rem
				heigth:0.5rem
				border-radius:0.04rem
				background:#b6b5b6
			ul
				li
					overflow:hidden
					border-bottom: 1px solid #e4e4e4
					font-size: 0.24rem
					height: 1.5rem
					padding-left: 0.3rem
					overflow:hidden
					.list_left
						margin-top: 0.45rem
						float:left
						span
							display: block
					.sp1
						margin-bottom: 0.2rem
						font-size: 0.28rem
						color: #212a36
					.sp2
						color: #b6b5b6
					a
						display: block
						float: right
						margin-right: 0.6rem
						width: 1.2rem
						height: 0.5rem
						line-height: 0.5rem
						-webkit-border-radius:0.04rem
						-moz-border-radius:0.04rem
						border-radius:0.04rem
						text-align: center
						color: #ffffff
						background:#FFB02B
						margin-top:0.5rem
						&.isOver
							background: #b6b5b6
	.measure
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		background: #ffffff
		overflow:hidden
		ul li
			height: 1rem
			line-height: 1rem
			font-size: 0.28rem
			color: #212a36
			border-bottom: 1px solid #e4e4e4
			padding: 0 0.3rem 0 0.28rem
			span
				float: right

</style>