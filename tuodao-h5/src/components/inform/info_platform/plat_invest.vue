<template>
	<div class="plat_invest">
		<div class="ranking_top">
			<h3>今日投资风云榜</h3>
			<ul>
				<li class="one">
					<p>139****3339</p>
					<p>投资389400元</p>
				</li>
				<li class="two">
					<p>188****9333</p>
					<p>投资249704.08元</p>
				</li>
				<li class="three">
					<p>136****0498</p>
					<p>投资200000元</p>
				</li>
				<li>
					<p>138****9308</p>
					<p>投资192000元</p>
				</li>
				<li>
					<p>189****6382</p>
					<p>投资100000元</p>
				</li>
				<li>
					<p>157****8580</p>
					<p>投资99796.33元</p>
				</li>
			</ul>
		</div>
		<div class="ranking_com">
			<h3>今日投资风云榜</h3>
			<ul>
				<li class="one">
					<p>139****3339</p>
					<p>投资389400元</p>
				</li>
				<li class="two">
					<p>188****9333</p>
					<p>投资249704.08元</p>
				</li>
				<li class="three">
					<p>136****0498</p>
					<p>投资200000元</p>
				</li>
				<li>
					<p>138****9308</p>
					<p>投资192000元</p>
				</li>
				<li>
					<p>189****6382</p>
					<p>投资100000元</p>
				</li>
				<li>
					<p>157****8580</p>
					<p>投资99796.33元</p>
				</li>
			</ul>
		</div>
		<div class="ranking_bot">
			<h3>借款排行榜</h3>
			<table>
				<tr class="tr_color">
					<th colspan="3">前10名借款人分布</th>
				</tr>
				<tr class="tr_colors">
					<th class="th_l">排名</th>
					<th class="th_c">待还金额</th>
					<th class="th_r">占比</th>
				</tr>
				<tr>
					<td>第一名</td>
					<td>2999.77万元</td>
					<td>2.19%</td>
				</tr>
				<tr>
					<td>第二名</td>
					<td>2999.77万元</td>
					<td>1.19%</td>
				</tr>
				<tr>
					<td>第三名</td>
					<td>2999.77万元</td>
					<td>0.19%</td>
				</tr>
				<tr>
					<td>第四名</td>
					<td>2999.77万元</td>
					<td>0.17%</td>
				</tr>
				<tr>
					<td>第五名</td>
					<td>2999.77万元</td>
					<td>0.15%</td>
				</tr>
				<tr>
					<td>第六名</td>
					<td>299999.77万元</td>
					<td>0.13%</td>
				</tr>
				<tr>
					<td>第七名</td>
					<td>2999.77万元</td>
					<td>0.10%</td>
				</tr>
				<tr>
					<td>第八名</td>
					<td>2999.77万元</td>
					<td>0.08%</td>
				</tr>
				<tr>
					<td>第九名</td>
					<td>2999.77万元</td>
					<td>0.05%</td>
				</tr>
				<tr>
					<td>第十名</td>
					<td>2999.77万元</td>
					<td>0.03%</td>
				</tr>
				<tr>
					<td>其他</td>
					<td>2999.77万元</td>
					<td>0.02%</td>
				</tr>
			</table>
			<p class="txt_p">备注：当前第一名借款人为二手车经销商，车辆库存质押</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	h3
		line-height: 0.8rem
		font-size: 0.26rem
		color: #212a36
		background-color: white
		border-bottom: 1px solid #e4e4e4;
	.ranking_top
		padding: 0 0.3rem
		background-color: white
	li
		height: 0.8rem
		line-height: 0.8rem
		font-size: 0.26rem
		color: #626262
		border-bottom: 1px solid #e4e4e4
		padding: 0 0.1rem 0 0.58rem
		p:nth-child(1)
			float:left
		p:nth-child(2)
			float:right
	.one
		background: url(../../../image/inform/one.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	.two
		background: url(../../../image/inform/two.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	.three
		background: url(../../../image/inform/three.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	.ranking_com
		padding: 0 0.3rem
		background-color: white
		margin-top: 0.2rem
	.ranking_bot
		padding: 0 0.3rem
		background-color: white
		margin-top: 0.2rem
		table
			width: 100%
			border-collapse: collapse
			.tr_color
				background-color: #e4e4e4
			.tr_colors
				background-color: #efefef
			tr
				height: 0.8rem
				line-height: 0.8rem
				th
					color: #212a36
					font-size: 0.26rem
				.th_l
					width: 40%
					padding-left: 0.25rem
					text-align: left
				.th_c
					width: 45%
					text-align: left
				.th_r
					width: 15%
					text-align: right
					padding-right: 0.25rem
				td
					color: #626262
					font-size: 0.24rem
					border-bottom: 1px solid #e4e4e4
				td:nth-child(1)
					width: 40%
					padding-left: 0.25rem
					text-align: left
				td:nth-child(2)
					width: 45%
					text-align: left
				td:nth-child(3)
					width: 15%
					text-align: right
					padding-right: 0.25rem
	.txt_p
		line-height: 0.8rem
		font-size: 0.2rem
		color: #7e7e7e
		margin-top: 0.1rem
		padding-left: 0.25rem
</style>