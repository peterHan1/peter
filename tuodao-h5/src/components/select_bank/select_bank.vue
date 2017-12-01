<template>
	<div class="bank">
		<div class="text_top">银行限额随银行变动会进行调整，以银行限额为准</div>
			<div class="ul_bank">
				<ul id="bank_ul">
					<li v-for="(bank,index) in bankList" @click="selectFn(bank,index)" :class="{on: i==index}">
						<span :class="bank.paymentCode"></span>
						<div>
							<h4>{{bank.name}}</h4>
							<p>单笔限额{{bank.limitOneTime}}万 单日限额{{bank.limitdayTime}}万 每月限额{{bank.limitmonthTime}}万</p>
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
				i: -1,
				bankList: [],
				listUrl: '../../../static/select_bank.json'
			}
		},
		mounted() {
			this.addList()
		},
		methods: {
			addList() {
				this.$http.get(this.listUrl).then((res) => {
					this.bankList = res.body.content
				}, (err) => {
					console.log(err)
				})
			},
			selectFn (bank, index) {
				this.i = index
				console.log(bank.name)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.bank
		max-width: 414px
		margin: 0 auto
		.text_top
			height:0.64rem
			background-color: #f2f3f7
			font-size: 0.2rem
			color: #626262
			line-height: 0.64rem
			text-align:center
		.ul_bank
			li
				border-bottom: 1px solid #e4e4e4
				height:1.3rem
				position: relative
				padding:0 0.3rem 0 0.13rem
				background-color: $color-background-f
				overflow: hidden
				div
					height: 0.8rem
					float: left
					line-height: 0.4rem
					padding-top: 0.3rem
					h4
						font-size: 0.28rem
						color: #626262
					p
						font-size: 0.24rem
						color: #b6b5b6
						margin-top:0.05rem
				span
						display: inline-block
						width: 1rem
						height: 1rem
						float: left
						margin:0.19rem 0.2rem 0 0
						background: url(../../image/select_bank/bank_logo.png) no-repeat
						background-size: 5rem 4rem

			.on
				background: #fff url(../../image/select_bank/yes.png) no-repeat 95% 50%;
				background-size: 6%
			.ICBC
				background-position: 0.0rem 0rem
			.CCB
				background-position: -1rem 0rem
			.BOC
				background-position: -2rem 0rem
			.ABC
				background-position: -3rem 0rem
			.CMB
				background-position: -4rem 0rem
			.CITIC
				background-position: 0rem -1rem
			.SPDB
				background-position: -1rem -1rem
			.CIB
				background-position: -2rem -1rem
			.CMBC
				background-position: -3rem -1rem
			.CEB
				background-position: -4rem -1rem
			.PAB
				background-position: 0rem -2rem
			.HXB
				background-position: -1rem -2rem
			.BOB
				background-position: -2rem -2rem
			.CGB
				background-position: -3rem -2rem
			.NBCB
				background-position: -4rem -2rem
			.HZB
				background-position: 0rem -3rem
			.BOS
				background-position: -1rem -3rem
			.PSBC
				background-position: -2rem -3rem
			.BCM
				background-position: -3rem -3rem
</style>