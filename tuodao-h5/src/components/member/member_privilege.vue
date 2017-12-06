<template>
	<div class="privilege">
		<table>
			<tr>
				<th>等级</th>
				<th>账户资产（上月日均）</th>
				<th>特权</th>
			</tr>
			<tr v-for="item in items">
				<td>{{item.vipLevel}}</td>
				<td>{{item.accountFund}}</td>
				<td><span v-for="value in item.privileges">{{value}}<br></span></td>
			</tr>
		</table>
	</div>
</template>
<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				apiUrl: 'api/router/app/h5/vipCenter/getVipWelfareList',
				items: []
			}
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey'
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let vm = this
				vm.$http.post(vm.apiUrl)
					.then((response) => {
						this.items = response.body.content
					})
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.privilege
		max-width:414px
		margin:0 auto
		table
			width:100%
			font-size:.28rem
			text-align:center
			tr
				height:.81rem
				line-height:.81rem
				th
					background-color #f2f3f7
					color:#212a36
				th:first-child
					padding-left:.32rem
				th:last-child
					text-align:right
					padding-right:.32rem
				td
					font-size:.24rem
					background-color #fff
					color:#626262
					vertical-align:middle
					border-bottom:1px solid #e4e4e4
				td:first-child
					color:#ff7400
					font-size:.32rem
					text-align:center
					padding-left:.32rem
				td:last-child
					text-align:right
					padding-right:.32rem
					line-height:.5rem
</style>