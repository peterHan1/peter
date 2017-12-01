<template>
	<div class="addList">
		<div class="list">
			<table>
				<thead>
					<tr>
						<th>投资用户</th>
						<th>投资金额</th>
						<th>投资时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in bondList">
						<td>{{list.tenderUser}}</td>
						<td>{{list.tenderAccount}}</td>
						<td>{{list.tenderTime}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				bondList: [],
				listUrl: '../../../static/bondAddlist.json'
			}
		},
		mounted() {
			this.addList()
		},
		methods: {
			addList() {
				this.$http.get(this.listUrl).then((res) => {
					this.bondList = res.body.content.list
				}, (err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.addList
		.list
			padding:0 0.3rem
			background-color:$color-background-f
			margin-top:0.2rem
			table
				width:100%
				tr
					border-bottom:1px solid #e4e4e4
					line-height:0.8rem
					th
						font-size:0.28rem
						color:$color-font-title
						text-align:left
					td
						font-size:0.24rem
						color:#7e7e7e
						text-align:left
					th:nth-child(1)
						width:40%
					th:nth-child(3)
						text-align:right
					td:nth-child(3)
						text-align:right
				tbody
					tr:last-child
						border-bottom:none
</style>