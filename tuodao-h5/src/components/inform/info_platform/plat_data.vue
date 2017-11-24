<template>
	<div class="plat_data">
		<div class="platfrom_a_top">
			<div class="flex">
				<dl class="flex-1">
					<dt>104840.66万</dt>
					<dd>累计借款金额（元）</dd>
				</dl>
				<dl class="flex-1">
					<dt>1000</dt>
					<dd>累计借款个数（个）</dd>
				</dl>
			</div>
			<div class="flex platfrom_num">
				<dl class="flex-1">
					<dt>69</dt>
					<dd>累计借款人数（人）</dd>
				</dl>
				<dl class="flex-1">
					<dt>18888</dt>
					<dd>累计投资人数（人）</dd>
				</dl>
			</div>
		</div>
		<div class="platfrom_a_com">
			<div class="flex">
				<dl class="flex-1">
					<dt>104840.66万</dt>
					<dd>当前借款余额（元）</dd>
				</dl>
				<dl class="flex-1">
					<dt>104840</dt>
					<dd>当前借款人数（人）</dd>
				</dl>
			</div>
			<div class="flex">
				<dl class="flex-1">
					<dt>1000</dt>
					<dd>当前借款个数（个）</dd>
				</dl>
				<dl class="flex-1">
					<dt>104840</dt>
					<dd>当前投资人数（人）</dd>
				</dl>
			</div>
			<div class="flex">
				<dl class="flex-1">
					<dt>69</dt>
					<dd>今日已发标数量（个）</dd>
				</dl>
				<dl class="flex-1">
					<dt>651.72万</dt>
					<dd>今日已发标金额（元）</dd>
				</dl>
			</div>
		</div>
		<div class="platfrom_a_bot">
			<div class="flex">
				<dl class="flex-1">
					<dt>2.34%</dt>
					<dd>逾期率</dd>
				</dl>
				<dl class="flex-1">
					<dt>0.00</dt>
					<dd>逾期金额（元）</dd>
				</dl>
			</div>
			<div class="flex">
				<dl class="flex-1">
					<dt>69</dt>
					<dd>逾期90天（不含） <br />以上个数（个）</dd>
				</dl>
				<dl class="flex-1">
					<dt>104840.66万</dt>
					<dd>逾期90天（不含） <br />以上金额</dd>
				</dl>
			</div>
			<div class="flex">
				<dl class="flex-1">
					<dt>0</dt>
					<dd>逾期个数（个）</dd>
				</dl>
				<dl class="flex-1">
					<dt>1104840.66万</dt>
					<dd>累计代偿金额（元）</dd>
				</dl>
			</div>
			<div class="flex">
				<dl class="flex-1">
					<dt>69</dt>
					<dd>累计代偿个数（个）</dd>
				</dl>
				<dl class="flex-1">
					<dt>0.00</dt>
					<dd>关联关系借款余额（元）</dd>
				</dl>
			</div>
			<div class="">
				<dl class="">
					<dt>0</dt>
					<dd>关联关系借款个数（个）</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.plat_data
		.flex
			display:flex
			.flex-1
				flex:1
		.platfrom_a_top
			padding: 0.58rem 0
			background-color:$color-background-f
			dl
				text-align:center
				dt
					font-size: 0.36rem
					color: #ff7400
					font-weight: bold
					margin-bottom: 0.15rem
				dd
					font-size: 0.22rem
					color: #7e7e7e
		.platfrom_num
			margin-top: 0.55rem
		.platfrom_a_com
			padding-top: 0.6rem
			margin-top: 0.2rem
			background-color:$color-background-f
			overflow: hidden
			div
				width: 100%
				margin-bottom: 0.5rem
				dl
					width: 50%
					text-align: center
					dt
						font-size: 0.3rem
						color: #ff7400
						margin-bottom: 0.14rem
					dd
						font-size: 0.2rem
						color: #626262
		.platfrom_a_bot
			margin-top: 0.2rem
			background-color:$color-background-f
			overflow: hidden
			padding-top: 0.58rem
			div
				width: 100%
				margin-bottom: 0.6rem
				dl
					width: 50%
					text-align: center
					dt
						font-size: 0.3rem
						color: #212a36
						margin-bottom: 0.12rem
					dd
						font-size: 0.2rem;
						color: #626262;
						line-height:0.28rem
</style>