<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.投资后什么时候开始计息？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>满标复审后开始计息。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.如何查看投资合同？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>投资成功后会生成电子合同，可在【我的账户】—【我的投资】— 投资记录详情页查看。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.一个标的可以使用几张优惠券？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>每个标的只能使用一张优惠券。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.手动投标时候标的还有资金，为什么投资不出去？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>同一个项目，有可能多人同时在投资，当剩余可投金额少于用户的输入金额时，系统会提示您无法投资。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.项目到期，如何还款？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>还款方式根据项目种类不同，分为如下两种：</p>
						<p>(1) 按月付息，到期还本：收益会在付息日当天到达您的资金账户，本金是在到期当天。</p>
						<p>(2) 等额本息：根据期限，每期还款相同的金额，期满全部还清。每期归还部分本金和收益，因本金在每期都会有归还，已归还的部分本金在之后将不再计息。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.借款人逾期了怎么办，本息什么时候回来？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>借款人一旦逾期不还，将由线下专门的风控部门进行催收，变现资产，在回款当日返回到投资人的账户里。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">7.什么是新手标？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>拓道金服针对在本平台暂未投资过的新用户设立的项目，享受3%的额外加息奖励，主要是为了让新用户体验充值、投资等环节，也是平台对新用户投资的一种奖励。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eight')">
						<span class="fl">8.什么是自动标？</span>
						<i class="iconfont fr" v-if="!flag.eight">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eight">
						<p>拓道金服为了避免用户资金闲置，由用户预先设定投标规则，可以在无需自己操作的情况下系统按用户设定自动代为投标的项目。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('nine')">
						<span class="fl">9.什么是积分标？</span>
						<i class="iconfont fr" v-if="!flag.nine">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.nine">
						<p>是拓道金服为投资用户专门设定的积分奖励项目，投资该标的用户可以获得基础积分倍数奖励。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('ten')">
						<span class="fl">10.今天标到期了，什么时候回款呢？</span>
						<i class="iconfont fr" v-if="!flag.ten">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.ten">
						<p>拓道金服所有的项目都是真实借款标的，是根据线下借款人的还款时间，来进行回款的。回款为当天内到账，可关注手机短信通知，回款时间是从早上8：30开始，一直到24：00结束，陆续回款的，请您耐心等待。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eleven')">
						<span class="fl">11.借款人提前还款怎么办？</span>
						<i class="iconfont fr" v-if="!flag.eleven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eleven">
						<p>还款金额：</p>
						<p>(1) 等额本息：借款人提前还款需支付当期本金和利息以及剩余本金0.3%的罚息作为补偿金支付给投资人；其中补偿金将和利息一起回给用户；</p>
						<p>(2) 按月付息：借款人提前还款需支付当期全部利息及本金支付给投资人；</p>
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
					eleven: false
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