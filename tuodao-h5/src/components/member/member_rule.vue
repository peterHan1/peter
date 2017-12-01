<template>
	<div class="rules">
		<table>
		<tr>
			<th>会员等级</th>
			<th>上月日均账户资产</th>
		</tr>
		<tr>
			<td>V0</td>
			<td>0 ≤X＜5万</td>
		</tr>
		<tr>
			<td>V1</td>
			<td>5万 ≤X＜10万</td>
		</tr>
		<tr>
			<td>V2</td>
			<td>10万 ≤X＜30万</td>
		</tr>
		<tr>
			<td>V3</td>
			<td>30万 ≤X＜50万</td>
		</tr>
		<tr>
			<td>V4</td>
			<td>50万 ≤X＜100万</td>
		</tr>
		<tr>
			<td>V5</td>
			<td>100万 ≤X＜500万</td>
		</tr>
		<tr>
			<td>V6</td>
			<td>X ≥500万</td>
		</tr>
		</table>
		<div class="item">
			<p>1.拓道金服会员包括6个会员等级，根据上月日均账户资产进行划 分，等级越高，特权越多。<br>账户资产=账户余额+冻结金额+待收本金；</p>
			<p>上月日均账户资产=上月每日的账户资产之和/上月的自然月天数；</p>
		</div>
		<div class="item">
			<p>2.新用户：新用户注册后当月会员等级默认为V0；下月日均账户资产=自首投之日起，每日账户资产总和/用户首投日距月底的天数；</p>
		</div>
		<div class="item">
			<p>3.会员等级计算时间：每月1日0点，系统计算用户的上月日均账户资产，对应新的会员等级；用户当月的日均净资产，只会影响下月的会员等级，不会影响本月的会员等级。</p>
		</div>
		<div class="item">
			<p>4.会员有效期：默认一个月；</p>
		</div>
		<div class="item">
			<p>5.会员等级升降级：首次升级到新一级等级获得该等级的升级大礼包，降级或降级再升级到原已达到的等级则不享有升级大礼包奖励；</p>
		</div>
		<div class="item">
			<p>6.拓道金服保留最终解释权，如有疑问请联系客服热线：<br>4008-566-685</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6"></script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.rules
		max-width:414px
		margin: 0 auto
		background-color #fff
		overflow:hidden
		table
			width:6.89rem
			height:4.77rem
			margin:.28rem auto .5rem auto
			font-size:.24rem
			th
				border:1px solid #b6b5b6
				height:.59rem
				line-height:.59rem
				background-color #e4e4e4
				color:#212a36
			td
				border:1px solid #b6b5b6
				height:.59rem
				line-height:.59rem
				color:#626262
				text-align:center
			th:last-child
				text-align:left
				padding-left:.21rem
			td:last-child
				text-align:left
				padding-left:.79rem
		.item
			margin: 0 .3rem .6rem .3rem
			p
				font-size:.24rem
				color:#626262
				line-height:.4rem
</style>
