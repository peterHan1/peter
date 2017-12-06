<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a v-on:click="toggle('one')">
						<span class="fl">1.什么是先息后本？</span>
						<i class="iconfont fr" v-if="!flag.one">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.one">
						<p>先息后本的本义是：先还利息再还本金。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('two')">
						<span class="fl">2.什么是等额本息？</span>
						<i class="iconfont fr" v-if="!flag.two">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.two">
						<p>等额本息还款是指借入者每月按相等的金额偿还贷款本息，其中每月贷款利息按月初剩余贷款本金计算并逐月结清。 贷款初期和后期所还本金不同是由于每月的还款额相等，因此在贷款初期每月的还款中，剔除按月结清的利息后，所还的贷款本金就较少；而在贷款后期因贷款本金不断减少、每月的还款额中贷款利息也不断减少，每月所还的贷款本金就较多。即借款人每月还款额中的本金比重逐月递增、利息比重逐月递减。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('three')">
						<span class="fl">3.自动投标排队说明</span>
						<i class="iconfont fr" v-if="!flag.three">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.three">
						<p>系统根据用户的设置选取符合投资条件的标的，根据排名顺序进行投标。</p>
						<p>以下情况将导致重新排队</p>
						<p>(1) 修改自动投标设置：修改相关设置任一项，点击“确认”后会重新排名；</p>
						<p>(2) 自动投标关闭后重新开启；</p>
						<p>(3) 成功投标后；</p>
						<p>(4) 轮到时，账户余额低于所设置投资金额最低值 </p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('four')">
						<span class="fl">4.什么是安存？</span>
						<i class="iconfont fr" v-if="!flag.four">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.four">
						<p>第三方数据存管机构，保全用户信息安全。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('five')">
						<span class="fl">5.如何查看电子合同？</span>
						<i class="iconfont fr" v-if="!flag.five">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.five">
						<p>PC端：点击右上角【我的账户】，左边栏【我的投资】选一个项目查看详情【查看借款协议】。</p>
						<p>APP端：点击【我的】—【我的投资】，选一个项目，点击页面下方的【借款协议】即可查看。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('six')">
						<span class="fl">6.为什么充值时提示 交易拒绝(RM10029)？</span>
						<i class="iconfont fr" v-if="!flag.six">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.six">
						<p>您的充值环境出现异常，建议您使用本人设备或更换安全环境下充值。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('seven')">
						<span class="fl">7.如何更换绑定手机号码？</span>
						<i class="iconfont fr" v-if="!flag.seven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.seven">
						<p>将修改原因及需求、用户名、旧手机号、新手机号、姓名、身份证号，本人手持身份证近照，及身份证正反面照片，发送到tuodaojinfu@51tuodao.com邮箱，我们的工作人员会在3个工作日内进行审核更改。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eight')">
						<span class="fl">8.设置自动投标后是否能投手动标？</span>
						<i class="iconfont fr" v-if="!flag.eight">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eight">
						<p>自动投标设置后，您还是可以去投手动标。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('nine')">
						<span class="fl">9.借款协议是否可以下载？</span>
						<i class="iconfont fr" v-if="!flag.nine">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.nine">
						<p>PC端：点击右上角【我的账户】，左边栏【我的投资】选择一个项目查看详情【查看安存保全】，在页面的最下方点击下载。</p>
						<p>APP端：点击【我的】—【我的投资】，选一个项目，点击页面下方的【安存保全】进行下载。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('ten')">
						<span class="fl">10.无法接收到验证码？</span>
						<i class="iconfont fr" v-if="!flag.ten">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.ten">
						<p>1.请确认手机是否安装短信拦截或过滤软件；</p>
						<p>2.可以通过接收语音验证码来输入验证码；</p>
						<p>3.如是充值时的验证码没有接收到，请咨询银行；</p>
						<p>4.如有特殊情况，请通过关注“拓道金服”微信(QQ)公众号联系在线客服，服务热线：40085-666-85。</p>
					</div>
				</li>
				<li>
					<a v-on:click="toggle('eleven')">
						<span class="fl">11.新手标最大金额可以投多少，可以投几次？</span>
						<i class="iconfont fr" v-if="!flag.eleven">&#xe6a3;</i>
						<i class="iconfont fr" v-else>&#xe6a6;</i>
					</a>
					<div v-show="flag.eleven">
						<p>当前新人标的额度最大值，新人标用户只能投一次且只有首投可用。</p>
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