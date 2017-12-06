<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.设置自动投标后能投手动标项吗？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>自动标和手动的是分开的，设置自动投标仍然可以投手动标的。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.自动投标能否使用优惠券？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>可以使用。设置自动投标时，选择“使用优惠券”，则系统在自动投标过程中将使用优惠金额最大的优惠券。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.自动投标使用优惠券会优先使用即将到期的优惠券么？</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>自动投标会选择“优惠金额最大”的优惠券，不考虑优惠券到期时间；</p>
						<p>当有两张同类型“优惠金额”也相同的优惠券时，则优先使用即将到期的那张；</p>
						<p>当有两张不同类型“优惠金额”也相同的优惠券时，则优先使用抵用券；</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.通过自动投标投资成功的标的，可以在哪查到？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>(1) 可在电脑端“自动投标”选择“自动投标记录”即可查看；</p>
						<p>(2) 电脑端、APP端均可在“我的投资”中查看到相关记录。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.自动投标单笔投资最高限额是多少？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>最高限额是10万元。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.自动投标排队说明？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>1、系统根据用户的设置选取符合投资条件的标的，根据排名顺序进行投标。</p>
						<p>以下情况将导致重新排队</p>
						<p>(1) 修改自动投标设置：修改相关设置任一项，点击“确认”后会重新排名；</p>
						<p>(2) 自动投标关闭后重新开启；</p>
						<p>(3) 成功投标后；</p>
						<p>(4) 轮到时，账户余额低于所设置投资金额最低值</p>
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