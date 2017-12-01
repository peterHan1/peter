<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.拓道金服的会员等级如何划分？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>拓道金服会员包括7个会员等级，当月的会员等级根据上月日均账户资产进行划分；账户资产=账户余额+冻结金额+待收本金（不包含利息）；上月日均账户资产=上月每日的账户资产之和/上月的自然月天数）。</p>
						<table class="tableLev">
							<tr>
								<td style="width:42%">会员等级</td>
								<td>上月日均账户资产</td>
							</tr>
							<tr>
								<td>V0 等级</td>
								<td>0≤上月日均账户资产＜5万</td>
							</tr>
							<tr>
								<td>V1 等级</td>
								<td>5万≤上月日均账户资产＜10万</td>
							</tr>
							<tr>
								<td>V2 等级</td>
								<td>10万≤上月日均账户资产＜30万</td>
							</tr>
							<tr>
								<td>V3 等级</td>
								<td>30万≤上月日均账户资产＜50万</td>
							</tr>
							<tr>
								<td>V4 等级</td>
								<td>50万≤上月日均账户资产＜100万</td>
							</tr>
							<tr>
								<td>V5 等级</td>
								<td>100万≤上月日均账户资产＜500万</td>
							</tr>
							<tr>
								<td>V6 等级</td>
								<td>上月日均账户资产≥500万</td>
							</tr>
						</table>
						<p>新用户注册后当月会员等级默认为V0；下月日均账户资产=自首投之日起，每日账户资产总和/用户首投日距月底的天数；</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.会员等级的有效期是多少？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>拓道金服的各等级会员有效期是一个月，并于每月1号的0点根据用户上月日均账户资产调整会员等级。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.会员有哪些权益？（以下的表格仅支持在pc端查看）？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>免费提现次数：注册成为拓道金服会员后，根据每月的会员等级可享有不同的免费提现次数。每月享有的免费提现次数仅限当月有效，若当月免费体现次数未用完，则下月作废。</p>
						<p>大客户专享标：平台会不定期发出大客户专享标，只有部分等级较高的用户可以购买。</p>
						<p>生日礼包：根据注册用户认证时的身份证信息，每年生日的0点会发放生日大礼包。礼包中包含抵用券和加息券。具体的使用说明见券的详情。</p>
						<p>升级大礼包：每月1日的0点，根据用户上月的日均账户资产计算并对应新的会员等级，若用户首次升级至新的会员等级，可领取新的等级对应的升级大礼包。</p>
						<table class="tableBenefit">
							<tr>
								<th></th>
								<th>v0</th>
								<th>v1</th>
								<th>v2</th>
								<th>v3</th>
								<th>v4</th>
								<th>v5</th>
								<th>v6</th>
							</tr>
						</table>
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
					three: false
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
					position: relative
					table.tableLev tr td
						padding-left:3%
						border: 1px solid #707070
						height: 0.3rem
						line-height: 0.3rem
					table.tableBenefit
						position: absolute;
						top:3rem
						left:-1rem
						text-align: center;
						tr
							td
							border: 1px solid #707070;
							/*width: 120px;*/
							color: #707070;
							font-size: 14px;
							span
								display: block;
								line-height: 0.2rem;
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