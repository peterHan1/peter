<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.如何获取积分？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>平台积分主要来自新手任务、投资积分等，具体的获取详情请进入【积分和金币】——【积分获取】页面进行查看。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.积分的用途有哪些？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>积分可以用来兑换加息券、免费提现次数，可参与积分活动。</p>
						<p>兑换加息券：每100积分可兑换1张1%加息券</p>
						<p style="padding-left:1.45rem;">每500积分可兑换1张2%加息券</p>
						<p style="padding-left:1.45rem;">每1000积分可兑换1张3%加息券</p>
						<p>(积分兑换的加息券有效期均为30天。)</p>
						<p>积分兑换免费提现次数：每100积分可兑换1次免费提现次数（积分兑换的免费提现次数永久有效。）</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.积分有有效期吗？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>有有效期。本年度获得的积分，在次年12月31日24点前使用有效，过期自动作废。例如：2017年7月获得的积分，在2018年12月31日24点后作废。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.怎么查询积分？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>登录拓道金服账号，PC端：点击【我的账户】—【积分与金币】进行查看。</p>
						<p>APP端：点击【我的】—【我的积分】进行查看。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.什么是优惠券？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>优惠券是提供给拓道金服用户的优惠福利，目前优惠券分为抵用券和加息券，用户在投资时满足一定的投资条件即可使用抵用现金或加息。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.加息券如何获得？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>加息券获得主要有两种途径：</p>
						<p>(1) 在通过积分兑换。</p>
						<p>(2) 在平台活动获得。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">7.加息券如何获得？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>可通过注册账号、邀请好友和活动来获得抵用券</p>
						<p>(1) 注册抵用券是新用户注册成功后，平台赠送的398抵用券。（自由转让中的债权转让标的除外）</p>
						<table>
							<tr>
								<th>面额</th>
								<th>使用条件</th>
								<th>期限</th>
							</tr>
							<tr>
								<td>10元</td>
								<td>满1000元标的期限1个月及以上使用</td>
								<td>7天</td>
							</tr>
							<tr>
								<td>30元</td>
								<td>满5000元标的期限1个月及以上使用</td>
								<td>15天</td>
							</tr>
							<tr>
								<td>60元</td>
								<td>满10000元标的期限12个月及以上使用</td>
								<td>65天</td>
							</tr>
							<tr>
								<td>98元</td>
								<td>满25000元标的期限3个月及以上使用</td>
								<td>33天</td>
							</tr>
							<tr>
								<td>200元</td>
								<td>满25000元标的期限12个月及以上使用</td>
								<td>65天</td>
							</tr>
						</table>
						<p>(2) 邀请好友可获得10元抵用券</p>
						<p>(3) 活动抵用券是在拓道不定期的活动中获得。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eight')">
						<span class="fl">8.优惠券如何使用？</span>
						<i class="iconfont fr" v-if="!flag.eight">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eight">
						<p>(1) 用户在投标时，选择满足使用条件的优惠券即可直接抵用现金或加息。</p>
						<p>(2) 优惠券一次只能使用一次张。（抵用券和加息券不可同时使用）</p>
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
					eight: false
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
					table tr th,table tr td
						border: 1px solid #707070
						padding: 0.1rem 0.25rem
						text-align:center
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