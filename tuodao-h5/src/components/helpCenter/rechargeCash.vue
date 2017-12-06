<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.如何充值？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>(1) 网页端：登录拓道金服官网，点击【我的账户】—【充值】，选择网银支付或者快捷支付，进行充值操作。</p>
						<p>(2) 手机端：登录拓道金服APP，点击【我的】—【充值】，完成操作。<br />
						PS:由于存管资金清算T+1完成，即用户当天充值金额下个工作日北京银行清算后可提现，可用于投资。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.充值银行卡可以绑定多张吗？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>为了保障资金安全，只能绑定1张银行且作为提现卡，做到同卡进出。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.充值需要收取手续费吗？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>充值的费用由平台承担。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.充值何时到账？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>正常情况下，充值即时到账，若在5分钟内还未到账，请联系客服处理（40085-666-85）。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.充值是否限额？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>(1) 支持银行有限额，限额随银行变动会进行调整，以银行限额为准；</p>
						<p>(2) 您银行卡开通额度。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.拓道金服与哪家第三方支付合作？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>拓道金服目前合作的第三方支付平台有“京东支付”和“富友支付”。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">7.可以用信用卡充值吗？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>拓道金服不支持信用卡充值。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eight')">
						<span class="fl">8.如何提现？</span>
						<i class="iconfont fr" v-if="!flag.eight">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eight">
						<p>(1) 网页端：登入PC端账户后，点击右上角“我的账户”，转跳页面后，点击页面“立即提现”输入提现金额，支付密码。</p>
						<p>(2) 手机端：登入APP，点击底部菜单“我的”，进入“我的”页面后，点击“提现”，输入提现金额及支付密码。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('nine')">
						<span class="fl">9.提现需要手续费吗？</span>
						<i class="iconfont fr" v-if="!flag.nine">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.nine">
						<p>成为拓道金服VIP后或通过积分兑换免费提现次数，可享受免费提现。（免费提现包含未投资金额）；具体的免费提现次数，请参照会员体系。<br />
						无免费提现次数：提现金额中含未投资可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取3元/笔的手续费。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('ten')">
						<span class="fl">10.提现申请可以撤销吗？</span>
						<i class="iconfont fr" v-if="!flag.ten">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.ten">
						<p>提现申请不可以撤销。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eleven')">
						<span class="fl">11.提现是什么时候到账？</span>
						<i class="iconfont fr" v-if="!flag.eleven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eleven">
						<p>9:00-21:00提交提现申请，实时到账；</p>
						<p>0:00-9:00提交提现申请，当日9点到账；</p>
						<p>21:00-24:00提交提现申请，次日9点到账；</p>
						<p>部分金额需北京银行清算成功（即下个工作日清算）后可提现。如：当天充值金额、债权转让成功后的部分未清算金额；</p>
						<p>如果出现提现失败的情况，请通过关注“拓道金服”微信(QQ)公众号联系在线客服，服务热线：40085-666-85。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('twelve')">
						<span class="fl">12.提现有限额吗？</span>
						<i class="iconfont fr" v-if="!flag.twelve">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.twelve">
						<p>单次提现额度100元-1000万元。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('thirteen')">
						<span class="fl">13.提现记录在哪里查看？</span>
						<i class="iconfont fr" v-if="!flag.thirteen">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.thirteen">
						<p>(1) 网页端：登入PC端账户后，点击右上角“我的账户”，转跳页面后，点击页面“提现”中“提现记录”。</p>
						<p>(2) 手机端：登入APP客户端，在下方点击“我的“显示菜单栏后，点击右上角“提现”跳转提现页面后，点击“提现记录”即可查看。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('fourteen')">
						<span class="fl">14.为什么提现失败？</span>
						<i class="iconfont fr" v-if="!flag.fourteen">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.fourteen">
						<p>(1) 账户余额不足；</p>
						<p>(2) 银行卡信息错误；</p>
						<p>如果出现提现失败的情况，请联系在线客服处理，或者拨打客服电话40085-666-85进行处理。</p>
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
					six: false,
					seven: false,
					eight: false,
					nine: false,
					ten: false,
					eleven: false,
					twelve: false,
					thirteen: false,
					fourteen: false
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