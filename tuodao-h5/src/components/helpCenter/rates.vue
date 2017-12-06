<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.有利息管理费吗？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p> 暂无。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.有VIP年费吗？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>暂无。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.VIP服务内容收费标准？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>Vip服务内容：</p>
						<p>V1     待收金额1000元   每月首提免费，其他3元一笔</p>
						<p>V2     待收金额10万     每月免费提现次数2次，其他3元一笔</p>
						<p>V3     待收金额20万     每月免费提现次数3次，其他3元一笔</p>
						<p>V4     待收金额30万     每月免费提现次数4次，其他3元一笔</p>
						<p>V5     待收金额40万     每月免费提现次数5次，其他3元一笔 </p>
						<p>V6     待收金额50万     每月免费提现次数6次，其他3元一笔</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.充值费用？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>在线充值不收取任何手续费。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.提现费用规则？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>1.达到相应会员等级，每月享有免费提现次数（含未投资过可提金额）;</p>
						<p>
							<table>
								<tr>
									<th>会员等级</th>
									<th>V1</th>
									<th>V2</th>
									<th>V3</th>
									<th>V4</th>
									<th>V5</th>
									<th>V6</th>
								</tr>
								<tr>
									<td>免费次数</td>
									<td>&nbsp;1</td>
									<td>&nbsp;2</td>
									<td>&nbsp;3</td>
									<td>&nbsp;4</td>
									<td>&nbsp;5</td>
									<td>&nbsp;6</td>
								</tr>
							</table>
						</p>
						<p>无免费提现次数：提现金额中含未投资可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取 3元/笔手续费;</p>
						<p>2.由于存管资金清算T+1完成，即部分金额需北京银行清算成功（即下个工作日清算）后可提现，可以用于投资;</p>
						<p>3.单笔提现范围：100元~1000万元;</p>
						<p>4.提现到账时间：0点-9点提交提现申请，当日9点到账;9点-21点提交提现申请，实时到账;21点-24点提交提现申请，次日9点到账;如未到账请联系客服处理(4008-566-685)</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.债权转让手续费规则？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>转让手续费：</p>
						<p>持有＜90天，收取0.5%转让金额手续费；</p>
						<p>持有≥90天，收取0.2%转让金额手续费；</p>
						<p>（最低为1元）</p>
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
					table tr td
						padding-right:0.5rem;
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