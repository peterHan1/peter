<template>
	<div class="prize">
		<table>
			<tr>
				<th>奖品名称</th>
				<th>中奖时间</th>
			</tr>
			<tr>
				<td>iPhone8</td>
				<td>2017-04-04 11:30:15</td>
			</tr>
			<tr>
				<td>66积分</td>
				<td>2017-04-04 11:30:15</td>
			</tr>
		</table>
	</div>
</template>
<script type="text/ecmascript-6">
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.prize
		max-width:414px
		margin:0 auto
		overflow:hidden
		table
			width:100%
			tr
				height:.8rem
				border-bottom:1px solid #e4e4e4
				background-color #fff
				line-height:.8rem
				th
					font-size:.28rem
					color:#212a36
				th:first-child
					text-align:left
					padding-left:.31rem
				th:last-child
					text-align:right
					padding-right:.31rem
				td
					font-size:.24rem
					color:#626262
				td:first-child
					text-align:left
					padding-left:.31rem
				td:last-child
					text-align:right
					padding-right:.31rem
			tr:first-child
				border:none
				background-color #f2f3f7
			tr:last-child
				border:none
</style>