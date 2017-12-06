<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.精选计划安全吗？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>精选计划匹配的资产均经拓道金服多层风控把关、严格筛选，并且确保资金与债权一一匹配。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.精选计划正常退出需要多久时间到账？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>锁定期结束后，如持有债权已到期，到期后将会回到用户账户。如持有债权未到期，将默认授权平台进行债权转让，转让成功后持有人的本金和利息即可回款到用户账户；转让退出时间预计1-3个工作日内完成。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.精选计划支持提前退出吗？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>精选计划目前主要为1月期和3月期产品，不支持提前退出。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.精选计划的还款方式如何？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>精选计划的还款方式以所匹配的债权为准，锁定期间债权所得收益（除管理费外）回到投资人余额，本金继续复投。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.精选计划是否可以使用优惠券？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>可以使用。</p>
						<p>举例：500000金额加入3个月期限的精选计划，若使用3%加息券，则预计所得 到期收益</p>
						<p>=500000*（11%+3%）/12*3=17500元</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.精选计划中是否可以及时看到所投资的标的？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>加入精选计划后，资金匹配的每笔债权，都可以在相应计划的投资详情页查看其具体金额、相关协议。</p>
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