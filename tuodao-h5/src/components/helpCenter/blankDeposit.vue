<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.什么是银行存管？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>银行存管是指用户在P2P平台上的交易资金交由银行进行管理，平台无法接触交易资金的一种资金管理模式。借款人、投资人和平台通过在银行方开设存管账户，来实现交易和资金的结算。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.如何开通北京银行存管？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>(1) 新用户：存管系统上线后新注册用户在充值、投资、提现前需开通银行存管账户；存管账户开通需用户提供真实姓名、身份证号、银行卡号、银行预留手机号，并设置支付密码，该支付密码在投资、提现、债权转让中使用。（所有资料提交正确则开通成功。）</p>
						<p>(2) 老用户：存管系统上线前已实名认证用户，系统自动开通北京银行存管账户，但在充值、投资、提现前需要重新绑定银行卡。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.设置支付密码有什么要求？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>支付密码由6位数字组成。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.开通北京银行存管账户提示失败，该如何处理？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>(1) 根据页面提示的报错信息，对自己填写的姓名、身份证号码、银行卡号码、银行预留手机号进行校对，确认填写无误。</p>
						<p>(2) 暂不支持您输入的银行卡，建议更换银行卡。</p>
						<p>(3) 联系客服，寻求帮助（请联系在线客服，服务热线：40085-666-85）。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.存管后，如何保证用户资金安全？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>拓道金服作为一家致力合规、长远发展的平台，存管系统上线后，用户开户建立独立存管子账户，充值、投资、提现都通过存管子账户，完全分离平台与资金的接触。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.存管后，投资人可以在北京银行查询到存管账户吗？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>开通存管后，用户可通过北京银行微信公众号进行查询账户信息。</p>
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