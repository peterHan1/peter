<template>
	<div class="addList">
		<div class="flex">
			<div class="flex-1 border_r">
				<div>
					<h3 class="jl">捡漏王</h3>
				</div>
				<div class="flex_bot">
					<p>135****0004<span>积分+5</span></p>
				</div>
			</div>
			<div class="flex-1">
				<div>
					<h3 class="max">脱颖而出</h3>
				</div>
				<div class="flex_bot">
					<p>135****0004<span>双倍积分</span></p>
				</div>
			</div>
		</div>
		<div class="list">
			<table>
				<thead>
					<tr>
						<th>加入用户</th>
						<th>加入金额</th>
						<th>加入时间</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>180****1498 <span>首投</span></td>
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
		.flex
			background-color:$color-background-f
			display:flex
			padding:0.32rem 0
			.border_r
				border-right:1px solid #e4e4e4
			.flex-1
				flex:1
				text-align:center
				div
					line-height:0					
					h3
						font-size:0.28rem
						color:#212a36
						display:inline-block
						padding-left:0.7rem
						line-height:0.75rem
					p
						display:inline-block	
						font-size:0.24rem
						color:#626262
						line-height:0.3rem
					span
						display:inline-block
						font-size:0.16rem
						color:#ff7400
						padding:0 0.06rem
						border-radius:2px
						border:1px solid #ff7400
						margin-left:0.1rem
					.jl
						background:url(../../../image/invest/jl_bg.png) no-repeat
						background-size:40%
					.max
						background:url(../../../image/invest/tyec_bg.png) no-repeat
						background-size:35%
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
						color:#212a36
						text-align:left
					td
						font-size:0.24rem
						color:#7e7e7e
						text-align:left
						span
							font-size:0.18rem
							color:#ff7400
							border:1px solid #ff7400
							line-height:0.24rem
							padding:0 0.08rem
							border-radius:2px
							margin-left:0.1rem
					th:nth-child(3)
						text-align:right
					td:nth-child(3)
						text-align:right
</style>