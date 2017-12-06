<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.邀请好友方式有哪些？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>(1) 网页端：登录拓道金服平台，点击【我的账户】—【邀请好友】，通过推荐码、QQ好友、微信、等方式分享给好友。</p>
						<p>(2) 手机端：登录拓道金服APP，点击点击【发现】—【邀请好友】，分享推荐链接到第三方社交平台。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.邀请规则与奖励？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>(1) 好友首投奖励：直接被邀请人首次投资成功并已满标复审，邀请人即可获得10元抵扣红包（使用条件：起投1000元，1个月及以上，有效期为30天）和首次投资金额0.25%的返现奖励；</p>
						<p>(2) 好友第二次投资起，邀请人即可根据目前的理财师等级，享受返现奖励；</p>
						<p>理财师等级及福利如图：</p>
						<table>
							<tr>
								<th>邀请人等级</th>
								<th>直接邀请人达到V1及以上人数</th>
								<th>直接被邀请人总待收</th>
								<th>邀请人享受福利</th>
								<th>返现有效时间</th>
							</tr>
							<tr style="height:0.4rem;line-height:0.4rem;">
								<td>初级理财师</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>无</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>无</td>
								<td>直接被邀请人投资收益2%返现</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>6个月</td>
							</tr>
							<tr style="height:0.5rem;line-height:0.5rem;">
								<td>中级理财师</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>至少6人</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>至少200万</td>
								<td><span>直接被邀请人投资收益3%返现<br />间接被邀请人投资收益1%返现</span></td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>一直有效</td>
							</tr>
							<tr style="height:0.5rem;line-height:0.5rem;">
								<td>王牌理财师</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>至少15人</td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>至少400万</td>
								<td><span>直接被邀请人投资收益5%返现<br />间接被邀请人投资收益2%返现</span></td>
								<td><span style="line-height:0.1rem;">&nbsp;</span>一直有效</td>
							</tr>
						</table>
						<p style="margin-bottom:0.2rem;">理财师返现奖励到账时间：若投资散标项目则被邀请人每笔投资到期，按期返现；投资精选计划项目则奖励将在精选计划到期时一次性发放；</p>
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
					position: relative
					table tr th,table tr td
						border: 1px solid #707070
						text-align: center
						span
							display:block
							line-height: 0.3rem
					table tr th
						background: #C5E0B4
						line-height: 0.5rem
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