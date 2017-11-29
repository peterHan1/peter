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
					<tr>
						<td>180****1498</td>
						<td>666.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
					<tr>
						<td>180****1498</td>
						<td>66.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
					<tr>
						<td>180****1498</td>
						<td>1000.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
					<tr>
						<td>180****1498</td>
						<td>10000.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
					<tr>
						<td>180****1498</td>
						<td>100.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
					<tr>
						<td>180****1498</td>
						<td>10000.00</td>
						<td>2017-07-04 11:30</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

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