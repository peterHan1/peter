<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.如何成为拓道金服会员？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>网页端注册：登录拓道金服官网www.51tuodao.com，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。手机端注册（ios版本/安卓版本）：打开手机APP点击【我的】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.注册时手机收不到验证码怎么办？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>(1) 请确认手机是否安装短信拦截或过滤软件；</p>
						<p>(2) 请确认手机是否能够正常接收短信（信号问题、欠费、停机等）；</p>
						<p>(3) 短信收发过程中可能会存在延迟，请耐心等待；</p>
						<p>(4) 可能由于以前该号码被通信供应商系统列为黑名单，请联系在线客服，或者拨打热线电话：40085-666-85。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.设置登录密码有什么要求？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>登录密码有6~16位字符，由数字、字母（区分大小写）、符号组成。</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				flag: {
					one: false,
					two: false,
					three: false,
					four: false,
					five: false,
					six: false
				}
			}
		},
		methods: {
			toggle: function (data) {
				this.flag[data] = !this.flag[data]
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.fl
		float:left
	.fr
		float:right
	.help
		max-width:414px
		margin:0 auto
		font-size:0.28rem
		overflow:hidden
		font-family: PingFang-SC-Medium
		.help_bot
			li
				a
					background-color:white
					display:block
					border-bottom:1px solid #e4e4e4
					height:0.8rem
					line-height:0.8rem
					font-size:0.24rem
					color:#707070
					padding:0 0.3rem
				div
					background-color:#f2f3f7
					font-size:0.24rem
					color:#626262
					padding:0.22rem 0.3rem
					p
						line-height:0.4rem
					a
						display:inline-block
						background-color:transparent
						border-bottom:none
						height:auto
						line-height:normal
						color:blue
						padding:0

</style>