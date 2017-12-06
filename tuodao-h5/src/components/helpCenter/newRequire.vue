<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.我可以注册吗？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>可以。只要您年满18周岁，具有完全民事权利能力和民事行为能力，拥有一张开通网银功能的银行卡，并有100元即可投资资金成为拓道金服用户。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.新注册用户有哪些福利？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>(1) 注册的新用户可获得398元红包，红包可用于投资时抵扣现金。</p>
						<p>(2) 新手专享9%+3%加息标。</p>
						<p>(3) 新手任务。平台新注册的用户在30天完成新手任务，可获得相应的积分，积分可兑换加息券。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.我该如何投资？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>(1) 在拓道网站上进行注册；查看<router-link to="loginRegister">如何注册</router-link></p>
						<p>(2) 激活北京银行存管账户，查看<router-link class="p_link" to="/blankDeposit">激活银行存管</router-link>。</p>
						<p>(3) 浏览项目类型选择自己感兴趣的标的进行投资。</p>
						<p>(4) 确认金额，点击立即投资，输入支付密码，投资成功。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.新手标最大金额可以投多少，可以投几次？？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>当前新人标的额度最大值，新人标用户只能投一次且只有首投可用。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.投资后是否可以提前退出？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>仅限等额本息项目可以通过 债权转让方式提前退出。详情请见<router-link class="p_link" to="/obligations">债权转让</router-link>。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.到期后什么时候回款到账？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>拓道金服所有的项目都是真实借款标的，是根据线下借款人的还款时间，来进行回款的。回款为当天内到账，可关注手机短信通知， 回款时间是从早上8：30开始，一直到24：00结束，陆续回款的，请您耐心等待。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">7.投资是否有额外的费用？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>没有。</p>
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
					seven: false
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