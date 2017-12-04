<template lang="html">
	<div class="share-page">
		<div class="logo"></div>
		<div class="hongbao"></div>
		<div class="bg-pic"></div>
		<div class="gg">
			<div class="lb"></div>
			<p>您的好友<span v-model="invitePhone">{{invitePhone}}</span>喊您来拓道领红包啦!</p>
		</div>
		<div class="talk"></div>
		<div class="wrongs" v-show="isShow">{{tsShow}}</div>
		<input type="tel" class="phone" v-model="telphone" maxlength="11" placeholder="请输入手机号码">
		<ul class="register" v-show="register">
			<li>
				<div class="yzm"><input type="text" v-model="yzm" placeholder="请输入验证码"></div>
				<div class="anniu" v-on:click="send()">
					<span v-if="sendMsgDisabled">{{time+'秒后重新获取'}}</span>
  					<span v-if="!sendMsgDisabled">请重新获取</span>
					</div>
			</li>
			<li>
				<input type="password" v-model="pas" placeholder="请设置6-16位登录密码" class="password" maxlength="16">
			</li>
		</ul>
		<div class="success-box" v-show="status"><img src="../../image/invite/invites_suc.png"></div>
		<div class="btn" v-show="!register" v-on:click="telphones()">领取<span>398</span>元红包</div>
		<div class="btn" v-show="register" v-on:click="code()">领取<span>398</span>元红包</div>
		<div class="foot-box">
			<div class="line-one">
				<img src="../../image/invite/shili.png">
			</div>
			<div class="line-two">
				<img src="../../image/invite/pinpai.png">
			</div>
			<div class="line-three">
				<img src="../../image/invite/anquan.png">
			</div>
			<div class="address">
				<p>客服电话：4008-365-078</p>
				<p>杭州拓道互联网金融服务有限公司版权所有</p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import md5 from 'js-md5'
	export default {
		data () {
			return {
				telphone: '',
				yzm: '',
				pas: '',
				tsShow: '',
				isShow: false,
				status: false,
				register: false,
				pwSecurityLevel: '',
				time: 60,
				sendMsgDisabled: false,
				invitePhone: '',
				apiUrl: 'http://72.127.2.140:8080/api/router/app/loginAbout/mobileState',
				resgistUrl: 'http://72.127.2.140:8080/api/router/app/h5/invite/register',
				smsSendUrl: 'http://72.127.2.140:8080/api/router/app/loginAbout/smsSend'
			}
		},
		http: {
			root: '/',
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey'
			}
		},
		mounted () {
			this.init()
		},
		methods: {
			init () {
				this.invitePhone = window.location.search
			},
			telphones () {
				if (!(/^1[34578]\d{9}$/.test(this.telphone))) {
					this.tsShow = '请输入正确的手机号码'
					this.isShow = true
				} else {
					this.check()
				}
			},
			send () {
				let me = this
				if (me.sendMsgDisabled === false) {
					me.sendMsgDisabled = true
					me.$http.post(me.smsSendUrl, {'mobile': me.telphone, 'smsType': 'register'}, {emulateJSON: true})
						.then((response) => {
							let interval = window.setInterval(function() {
								if ((me.time--) <= 0) {
									me.time = 60
									me.sendMsgDisabled = false
									window.clearInterval(interval)
								}
							}, 1000)
						})
				}
			},
			code () {
				if (this.yzm === '') {
					this.tsShow = '请输入验证码'
					this.isShow = true
				} else if (this.pas === '') {
					this.tsShow = '请输入密码'
					this.isShow = true
				} else if (this.pas.length < 6) {
					this.tsShow = '密码长度为6—16位'
					this.isShow = true
					// console.log(this.pas.length)
				} else if (this.pas.length > 16) {
					this.tsShow = '密码长度为6—16位'
					this.isShow = true
				} else {
					this.tsShow = ''
					this.isShow = false
					if ((/^[0-9A-Za-z]{6,16}$/.test(this.pas))) {
						this.pwSecurityLevel = 1
					} else if ((/^(?=.{6,16})[0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*$/.test(this.pas))) {
						this.pwSecurityLevel = 2
					} else if ((/^(?=.{6,16})([0-9A-Za-z]*[^0-9A-Za-z][0-9A-Za-z]*){2,}$/.test(this.pas))) {
						this.pwSecurityLevel = 3
					}
					this.pas = md5(this.pas)
					this.$http.post(this.resgistUrl, {'mobile': this.telphone, 'pwd': this.pas, 'pwSecurityLevel': this.pwSecurityLevel, 'smsCode': this.yzm, 'invitePhone': this.invitePhone}, {emulateJSON: true})
						.then((response) => {
							if (response.body.code === 100000) {
								this.status = true
								this.isShow = false
							} else {
								this.tsShow = response.body.msg
								this.isShow = true
							}
						})
				}
			},
			check () {
				let vm = this
				vm.$http.post(vm.apiUrl, {'mobile': vm.telphone}, {emulateJSON: true})
					.then((response) => {
						console.log(response)
						if (response.body.content.status === 1) {
							vm.tsShow = '该手机号已注册认证，请直接登录'
							vm.isShow = true
							vm.register = false
						} else {
							vm.register = true
							vm.isShow = false
							if (vm.sendMsgDisabled === false) {
								vm.send()
							}
						}
					})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.dis_none
	display:none
.share-page
	max-width: 414px
	background-color #fdb418
	overflow:hidden
	margin: 0 auto
	text-align:center;
	line-height:0
	.logo
		width:1.25rem
		height:.59rem
		margin:.32rem 0 .25rem .4rem
		background:url('../../image/invite/logo.png') no-repeat
		background-size: 100%
	.hongbao
		width:6.78rem
		height:5rem
		background:url('../../image/invite/hong.png') no-repeat
		background-size: 100%
		overflow:hidden
		position:absolute
		left:50%
		margin-left:-3.39rem
	.bg-pic
		width:7.5rem
		height:5.16rem
		background:url('../../image/invite/bg.png') no-repeat
		background-size: 100%
		overflow:hidden
	.gg
		width:6.75rem;
		margin:.35rem auto .25rem auto
		height:.76rem
		line-height:.76rem
		overflow:hidden
		.lb
			width:1.16rem
			height:.76rem
			background:url('../../image/invite/lb.png') no-repeat
			background-size: 100%
			float:left
		p
			font-size:.28rem
			color:#333333
			float:left
	.talk
		width:6.68rem
		height:1.6rem
		background:url('../../image/invite/talk.png') no-repeat
		background-size: 100%
		margin: 0 auto .5rem auto
	.wrongs
		width:6.7rem
		margin: 0 auto
		font-size:.28rem
		color:red
		text-align:left
		line-height:.5rem
	.phone
		width:6.33rem
		height:.89rem
		border-radius:.1rem
		padding-left:.37rem
		font-size:.28rem
		color:#777777
		outline:none
	.register
		width:6.7rem
		margin: 0 auto
		li
			overflow:hidden
			margin-top:.3rem
			.yzm
				width:4rem
				float:left
				input
					width:3.63rem
					height:.88rem
					font-size:.28rem
					border-radius:.1rem
					padding-left:.37rem
					outline:none
					color:#777777
			.anniu
				width:2.5rem
				height:.88rem
				line-height:.88rem
				color:#fff
				background-color #f22939
				font-size:.28rem
				text-align:center
				border-radius:.1rem
				float:left
				margin:0 0 0 .2rem
			.password
				width:6.33rem
				height:.89rem
				border-radius:.1rem
				padding-left:.37rem
				font-size:.28rem
				color:#777777
				outline:none
	.success-box
		margin-top:.5rem
		img
			width:100%
	.btn
		width:6.7rem
		height:.89rem
		background-color #f22939
		color:#f9e575
		line-height:.89rem
		text-align:center
		font-size:.34rem
		border-radius:.1rem
		margin: .52rem auto .48rem auto
	.foot-box
		height:6.11rem
		background-color #fcc245
		overflow:hidden
		.line-one
			width:3.98rem
			height:1.1rem
			margin:.5rem auto .38rem auto
			vertical-align:middle
			img
				width:100%
		.line-two
			width:3.98rem
			height:1.1rem
			margin:0 auto .38rem auto
			vertical-align:middle
			img
				width:100%
		.line-three
			width:3.98rem
			height:1.15rem
			margin:0 auto .65rem auto
			img
				width:100%
		.address
			text-align:center
			p
				font-size:.22rem
				color:#333333
				line-height:.35rem
</style>