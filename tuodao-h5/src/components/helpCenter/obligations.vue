<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.什么是债权转让？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>债权转让，指投资人将在拓道金服投资的借款项目转让给其他拓道金服用户，并与承接人签订债权转让协议，收回本金和收益的操作。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.什么是债权价值？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>债权价值指投资人转让的本金和剩余收益的总值。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.债权如何转让？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>网页端：点击右上角【我的账户】；转跳页面点击左方【债权转让】→【转让债权】选择【可转让的债权】。</p>
						<p>手机端：点击下方【我的】；转跳页面点击【债权转让】，点击“可转让”选择债权进行转让。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.债权转让必须符合哪些条件？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>(1) 只有等额本息的标才能申请债权转让。</p>
						<p>(2) 可转让日期为当投标成功，满标复审计息开始30天，可以提出债权转让；承接人持有购买债权，超过30天，才可再次转让。</p>
						<p>(3) 转让时间必须大于距离下一个还款日≥7天。</p>
						<p>(4) 债权转让交易未完成时，借款人提前还款，则自动退标。</p>
						<p>(5) 必须一次性转让所有债权，不能转让部分。</p>
						<p>(6) 转让过的债权可以继续转让，且转让次数不受限制。</p>
						<p>(7) 申请通过的债权转让会48个小时的转让时间，超过时间未完成转让的则做退标处理。</p>
						<p>(8) 债权转让金额必须≥100元。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.债权转让手续费如何收取？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>转让手续费：</p>
						<p>持有＜90天，收取0.5%转让金额手续费；</p>
						<p>持有≥90天，收取0.2%转让金额手续费；</p>
						<p>（最低为1元）。</p>
						<p>PS:转让手续费奖励给受让人，且一次性到账。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.单个债权转让标的允许多人投资吗？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>允许。当有多个承接人时，按投资本金比例分配当期未来收益及剩余期数收益。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">6.承接人的收益如何计算？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>转让金额以剩下期限，按照等额本息的计算方获得收益。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eight')">
						<span class="fl">6.购买债权时有哪些注意事项？</span>
						<i class="iconfont fr" v-if="!flag.eight">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eight">
						<p>(1) 计算债权价值时，当月持有天数的收益不包括使用加息券产生的收益；</p>
						<p>(2) 如果转让人使用过加息券，转让当月持有天数的收益会进行计算，在转让成功后，平台会对加息券产生的收益进行发放；</p>
						<p>(3) 受让人不可以使用任何优惠券。</p>
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